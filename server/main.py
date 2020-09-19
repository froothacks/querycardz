from flask import Flask
from flask_pyoidc.flask_pyoidc import OIDCAuthentication
import textinput
import atexit


@app.route('/', methods=["POST"])
def storeQueryForUser():
    search_query = request.args.get('query')
    textinput.getAnswer(search_query)


@atexit.register
def shutdown():
    client.disconnect()


if __name__ == '__main__':
    app.run()
