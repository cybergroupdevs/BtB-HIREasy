# Author : Zeeshan Al Abedin

import os
import spacy
from spacy.matcher import Matcher

import utils as util


def resume_parser_wrapper(file_path):

    nlp = spacy.load('en_core_web_sm')
    parser_class = util.Utility()
    # get resume contents
    rs_content = parser_class.parse_file(file_path)
    rs_content_nlp = nlp(rs_content)

    matcher = Matcher(nlp.vocab)

    # parse data
    parser_class.parse_name(rs_content, matcher, nlp)
    parser_class.parse_phone(rs_content)
    parser_class.parse_email(rs_content)
    parser_class.parse_skills(rs_content_nlp)
    parser_class.parse_education([sent.string.strip() for sent in rs_content_nlp])
    parser_class.parse_experience(rs_content)

    return parser_class.convert_to_json()


if __name__ == "__main__":

    resumes = []
    results = []
    # get file
    for root, directories, filenames in os.walk('..\\ftp'):
        for filename in filenames:
            file = os.path.join(root, filename)
            ret = resume_parser_wrapper(file)
            print(ret)















