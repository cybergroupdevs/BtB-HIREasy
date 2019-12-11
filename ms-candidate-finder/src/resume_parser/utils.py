import pandas as pd
import os
import io
import src.resume_parser.constants as cs
import re
import docx2txt
import nltk
import json
import textwrap
import src.api.mongo_adapter as mdb
from nltk.stem import WordNetLemmatizer
from nltk.corpus import stopwords
from pdfminer.converter import TextConverter
from pdfminer.pdfinterp import PDFPageInterpreter
from pdfminer.pdfinterp import PDFResourceManager
from pdfminer.layout import LAParams
from pdfminer.pdfpage import PDFPage


class Utility:

    def __init__(self):
        self.__name = ''
        self.__contact = ''
        self.__email = ''
        self.__skills = []
        self.__exp = []
        self.__edu = []

    # Function to get contents from a docx file and return a string
    def parse_docx(self, resume_file_path):
        temp = docx2txt.process(resume_file_path)
        text = [line.replace('\t', ' ') for line in temp.split('\n') if line]
        return ' '.join(text)

    # Function to get contents from a PDF file and return a string
    def parse_pdf(self, resume_file):
        with open(resume_file, 'rb') as fh:
            for page in PDFPage.get_pages(fh,
                                          caching=True,
                                          check_extractable=True):
                resource_manager = PDFResourceManager()
                fake_file_handle = io.StringIO()
                converter = TextConverter(resource_manager, fake_file_handle, codec='utf-8', laparams=LAParams())
                page_interpreter = PDFPageInterpreter(resource_manager, converter)
                page_interpreter.process_page(page)

                text = fake_file_handle.getvalue()
                yield text

                # close open handles
                converter.close()
                fake_file_handle.close()

    # Function to insert parsed resume to mongodb
    def insert_to_db(self):
        mongodb = mdb.MongoAdapter()
        insert_id = mongodb.insert_document(self.__name, self.__email, self.__contact, self.__skills, self.__edu, self.__exp)
        return insert_id

    # PARSING FUNCTIONS
    def parse_skills(self, nlp_string):
        tokens = [token.text for token in nlp_string if not token.is_stop]

        data = pd.read_csv(os.path.join(os.path.dirname(__file__), 'skills.csv'))

        skills = list(data.columns.values)
        skill_set = []
        # check for one-grams
        for token in tokens:
            if token.lower() in skills:
                skill_set.append(token)

        # check for bi-grams and tri-grams
        for token in nlp_string.noun_chunks:
            token = token.text.lower().strip()
            if token in skills:
                skill_set.append(token)
        self.__skills = [i.capitalize() for i in set([i.lower() for i in skill_set])]

    def parse_name(self, nlp_string, matcher, nlp):
        nlp_string = nlp(textwrap.wrap(nlp_string, 20)[0])
        pattern = [cs.NAME_PATTERN]

        matcher.add('NAME', None, *pattern)

        matches = matcher(nlp_string)

        for match_id, start, end in matches:
            span = nlp_string[start:end]
            self.__name = span.text

    def parse_phone(self, nlp_string):
        phone = re.findall(re.compile("(?:(?:\+?([1-9]|[0-9][0-9]|[0-9][0-9][0-9])\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([0-9][1-9]|[0-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{7})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?"),nlp_string)
        if phone:
            number = ''.join(phone[0])
            if len(number) > 10:
                number = '+' + number

            self.__contact = number

    def parse_email(self, nlp_string):
        mail_id = ''
        email = re.findall("([^@|\s]+@[^@]+\.[^@|\s]+)", nlp_string)
        if email:
            try:
                mail_id = email[0].split()[0].strip(';')
            except IndexError:
                pass

        self.__email = mail_id

    def parse_education(self, nlp_string):
        edu = {}
        # Extract education degree
        for index, text in enumerate(nlp_string):
            for tex in text.split():
                tex = re.sub(r'[?|$|.|!|,]', r'', tex)
                if tex.upper() in cs.EDUCATION and tex not in cs.STOPWORDS:
                    edu[tex] = text + nlp_string[index + 1]

        # Extract year
        education = []
        for key in edu.keys():
            year = re.search(re.compile(cs.YEAR), edu[key])
            if year:
                education.append((key, ''.join(year.group(0))))
            else:
                education.append(key)
        self.__edu = education

    def parse_experience(self, nlp_string):
        lem = WordNetLemmatizer()
        stop_words = set(stopwords.words('english'))

        # word tokenization
        word_tokens = nltk.word_tokenize(nlp_string)

        # remove stop words and lemmatize
        filtered_sentence = [w for w in word_tokens if
                             not w in stop_words and lem.lemmatize(w) not in stop_words]
        sent = nltk.pos_tag(filtered_sentence)

        # parse regex
        cp = nltk.RegexpParser('P: {<NNP>+<CD>}')
        cs = cp.parse(sent)

        # for i in cs.subtrees(filter=lambda x: x.label() == 'P'):
        #     print(i)

        test = []

        for vp in list(cs.subtrees(filter=lambda x: x.label() == 'P')):
            test.append(" ".join([i[0] for i in vp.leaves() if len(vp.leaves()) >= 2]))

        # Search the word 'experience' in the chunk and then print out the text after it
        self.__exp = [x[x.lower().index('experience') + 10:] for i, x in enumerate(test) if x and 'experience' in x.lower()]

    def parse_file(self, file_path):
        # Get file extension
        file_content = ''
        file_ext = os.path.splitext(file_path)[1]
        if file_ext == '.pdf':
            for page in self.parse_pdf(file_path):
                file_content += ' ' + page

        elif file_ext == '.docx':
            file_content = self.parse_docx(file_path)

        return file_content

    def convert_to_json(self):
        resume_json = {
            "name": self.__name,
            "contact": self.__contact,
            "email": self.__email,
            "skills": self.__skills,
            "education": self.__edu,
            "experience": self.__exp
        }

        return json.dumps(resume_json)

    def parse_name_nltk(self, document):
        names = []
        sentences = self.ie_preprocess(textwrap.wrap(document, 20)[0])
        for tagged_sentence in sentences:
            for chunk in nltk.ne_chunk(tagged_sentence):
                if type(chunk) == nltk.tree.Tree:
                    if chunk.label() == 'PERSON':
                        names.append(' '.join([c[0] for c in chunk]))
        self.__name = names

    def ie_preprocess(self, document):
        stop = stopwords.words('english')
        document = ' '.join([i for i in document.split() if i not in stop])
        sentences = nltk.sent_tokenize(document)
        sentences = [nltk.word_tokenize(sent) for sent in sentences]
        sentences = [nltk.pos_tag(sent) for sent in sentences]
        return sentences

    def move_to_archive(self, filename):
        os.rename(filename, "src//ftp_archive//"+os.path.basename(filename))

