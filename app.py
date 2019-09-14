from flask import Flask
app = Flask(__name__)

# Load the system variables using dotenv
from dotenv impot load.dotenv
load_dotenv()

# Load keys
endpoint = os.environ["ENDPOINT"]
vision_key = os.environ["VISION_KEY"]

@app.route("/<name>")
def hello(name):
    return "Hello " + name

if __name__=="__main__":
    app.run(debug=True)