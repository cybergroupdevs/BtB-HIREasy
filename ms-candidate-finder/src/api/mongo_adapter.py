import pymongo
import src.config as config


class MongoAdapter:
    def __init__(self):
        host = config.MONGO_HOST
        self.client = pymongo.MongoClient(host)
        self.database = self.client[config.MONGO_DATABASE]
        self.collection = self.database[config.MONGO_COLLECTION]

    def get_all_data(self):
        adapter = MongoAdapter()
        vl = adapter.collection.find()
        return vl

    def insert_document(self, name, email, contact, skills, edu, exp):
        adapter = MongoAdapter()
        post = {
            "name": name,
            "email": email,
            "contact": contact,
            "skills": skills,
            "education": edu,
            "experience": exp
        }
        post_id = adapter.collection.insert_one(post).inserted_id
        return str(post_id)


