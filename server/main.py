from flask import Flask
import textinput
app = Flask(__name__)


@app.route('/', methods=["POST"])
def storeQueryForUser():
    return textinput.getAnswer("This is a test")


if __name__ == '__main__':
    app.run()
