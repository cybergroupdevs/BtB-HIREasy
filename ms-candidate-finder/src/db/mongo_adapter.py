import pymongo


class MongoAdapter:
    def __init__(self):
        host = 'mongodb+srv://vac_user1:admin_password@btb-test-cluster-ukene.mongodb.net/test?retryWrites=true&w=majority'
        self.client = pymongo.MongoClient(host)

    def get_all_data(self):
        ma = MongoAdapter()
        vl = ma.client.hrdb.candidate_list.find()
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
        post_id = adapter.client.hrdb.candidate_list.insert_one(post).inserted_id
        return str(post_id)


