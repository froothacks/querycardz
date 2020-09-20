from flask import Flask, request
# from flask_pyoidc.flask_pyoidc import OIDCAuthentication
import textinput
import topics
import database
import questions
import spellcheck
import json
# import atexit

app = Flask(__name__)


@app.route('/', methods=["POST"])
def storeQueryForUser():
    search_query = request.args.get('query')
    search_query = spellcheck.spell(search_query)
    email = request.args.get('email')

    print("sq", search_query, request.args)
    if isQ.predict_question(search_query):
        answer = textinput.getAnswer(search_query)
        if answer is not None:
            query_topics = topics.getTopics(search_query, answer)
            print("sending", search_query, answer, query_topics)
            db.search_query(email, search_query, answer, query_topics)
        else:
            print("no assistant response:", search_query)
    else:
        print("not a question:", search_query)
    return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}


@app.route('/getCards')
def getCardsForUser():
    topic = request.args.get('topic')
    email = request.args.get('email')
    res = db.getCards(email, topic)
    return json.dumps(res)


if __name__ == '__main__':
    isQ = questions.IsQuestion()
    spell = spellcheck.Speller()
    db = database.QueryCardzDatabase("querycardz", "auth/ibm_credentials.json")
    db.connect()
    app.run()
