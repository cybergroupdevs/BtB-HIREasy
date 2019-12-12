# Author : Zeeshan Al Abedin

import os
import spacy
import threading
from spacy.matcher import Matcher

import src.resume_parser.utils as util


def resume_parser_wrapper(file_path):

    nlp = spacy.load('en_core_web_sm')
    parser_class = util.Utility()
    # get resume contents
    rs_content = parser_class.parse_file(file_path)
    rs_content_nlp = nlp(rs_content)

    matcher = Matcher(nlp.vocab)

    # parse data
    t1 = threading.Thread(target=parser_class.parse_name, args=(rs_content, matcher, nlp,))
    t2 = threading.Thread(target=parser_class.parse_phone, args=(rs_content,))
    t3 = threading.Thread(target=parser_class.parse_email, args=(rs_content,))
    t4 = threading.Thread(target=parser_class.parse_skills, args=(rs_content_nlp,))
    t5 = threading.Thread(target=parser_class.parse_education, args=([sent.string.strip() for sent in rs_content_nlp],))
    t6 = threading.Thread(target=parser_class.parse_experience, args=(rs_content,))

    # Extremely ghetto way of threading for testing purposes
    # TODO: Create a wrapper and use ThreadPoolExecutor to call and join threads
    # At least its faster than before
    t1.start()
    t2.start()
    t3.start()
    t4.start()
    t5.start()
    t6.start()
    t1.join()
    t2.join()
    t3.join()
    t4.join()
    t5.join()
    t6.join()
    parser_class.move_to_archive(file_path)
    return parser_class.insert_to_db()
    # return parser_class.convert_to_json()


def resume_main():

    ret = []
    # get file
    for root, directories, filenames in os.walk('src\\ftp'):
        for filename in filenames:
            file = os.path.join(root, filename)
            ret.append(resume_parser_wrapper(file))

    return ret


















