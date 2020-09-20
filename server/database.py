from cloudant.client import Cloudant
from cloudant.error import CloudantException
from cloudant.result import Result, ResultByKey
import json

databaseName = "querycardz"
TOPICS = "topics"
QUERIES = 'queries'
QUERY = 'query'
ANSWER = 'answer'


class QueryCardzDatabase:
    database_name = ""
    database = None
    client = None

    def __init__(self, database_name, ibm_credentials_path):
        self.database_name = database_name
        with open(ibm_credentials_path) as json_file:
            ibm_credentials = json.load(json_file)
            self.client = Cloudant(
                ibm_credentials['username'], ibm_credentials["password"], url=ibm_credentials["url"])

    def connect(self):
        self.client.connect()
        self.database = self.client.create_database(databaseName)

    def getUserRecord(self, user_email):
        return self.database[user_email]

    def getTopics(self, user_email):
        doc = self.getUserRecord(user_email)[TOPICS]
        return doc

    def search_query(self, user_email, search, answer, search_topic_array):
        doc_exists = user_email in self.database
        search_data_object = {
            QUERY: search,
            TOPICS: search_topic_array,
            ANSWER: answer
        }
        if doc_exists:
            doc = self.getUserRecord(user_email)
            doc[QUERIES].append(search_data_object)
            doc[TOPICS] += search_topic_array
            doc[TOPICS] = list(set(doc[TOPICS]))
            doc.save()
        else:
            data = {
                "_id": user_email,
                QUERIES: [search_data_object],
                TOPICS: search_topic_array
            }
            doc = self.database.create_document(data)


if __name__ == "__main__":
    db = QueryCardzDatabase(databaseName, "auth/ibm_credentials.json")
    db.connect()
    db.search_query("test@test.ca", "Another query", "F", ["A", "D"])
    print(db.getTopics("test@test.ca"))
