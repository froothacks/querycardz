from flask import Flask, request
# from flask_pyoidc.flask_pyoidc import OIDCAuthentication
import textinput
import topics
import database
import questions
import json
# import atexit

app = Flask(__name__)


@app.route('/', methods=["POST"])
def storeQueryForUser():
    search_query = request.args.get('query')
    print("sq", search_query, request.args)
    if isQ.predict_question(search_query):
        answer = textinput.getAnswer(search_query)
        if answer is not None:
            query_topics = topics.getTopics(search_query, answer)
            print("sending", search_query, answer, query_topics)
            db.search_query("test@test.ca", search_query, answer, query_topics)
        else:
            print("no assistant response:", search_query)
    else:
        print("not a question:", search_query)
    return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}


@app.route('/getCards')
def getCardsForUser():
    topic = request.args.get('topic')
    print(topic)
    res = db.getCards("test@test.ca", topic)
    print(res)
    return json.dumps(res)

# @atexit.register
# def shutdown():
#     client.disconnect()


if __name__ == '__main__':
    isQ = questions.IsQuestion()
    db = database.QueryCardzDatabase("querycardz", "auth/ibm_credentials.json")
    db.connect()
    print(db.getCards("test@test.ca", "biology"))
    app.run()
