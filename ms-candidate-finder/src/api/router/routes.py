import src.resume_parser.parser as parser
from bottle import route, run
import src.db.mongo_adapter as db
from bson.json_util import dumps


@route('/')
def index():
    return "Hello!"

# Calling this route will parse resumes present in FTP folder
# Insert into the collection and return ObjectID for each document


@route('/parseResumes')
def parse_resumes():
    ret_json = parser.resume_main()
    temp = ""
    for x in ret_json:
        temp += x + ", "

    return temp


# Call to see all data in collection


@route('/getAllData')
def get_all_data():
    mon = db.MongoAdapter()
    return dumps(mon.get_all_data())


run(host='localhost', port=8080, debug=True)

