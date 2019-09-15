from azure.cognitiveservices.vision.computervision.models import ComputerVisionErrorException
from azure.cognitiveservices.vision.computervision import ComputerVisionClient
from msrest.authentication import CognitiveServicesCredentials
from flask import Flask
from flask import request
import os
import json
import requests
import base64
from flask_cors import CORS, cross_origin
import pyodbc 

# Load the system variables using dotenv
from dotenv import load_dotenv
load_dotenv()

# Load keys
endpoint = os.environ["ENDPOINT"]
vision_key = os.environ["VISION_KEY"]

# Create vision_client

computervision_credentials = CognitiveServicesCredentials(vision_key)
computervision_client = ComputerVisionClient(
    endpoint, computervision_credentials)

# Create SQL 
server = os.environ["SERVER"]
database = os.environ["DATABASE"]
username = os.environ["USERNAME"]
password = os.environ["PASSWORD"]
driver= '{ODBC Driver 17 for SQL Server}'

# Create flask application
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'application/json'

@app.route("/", methods=["GET", "POST"])
def index():
    return "Hello world"

@app.route("/image", methods=["GET", "POST"])
def indentify():
    data = request.get_json(force=True)
    objects = get_info(data["image"])

    # Insert the image path that is being analyzed
    image_path = "http://amazingdomains.com/wp-content/uploads/2017/01/groceries.jpg"

    # Detect specific objects
    remote_image_objects = computervision_client.detect_objects(image_path)

    objects = []

    print("\nDetecting objects in remote image:")
    if len(remote_image_objects.objects) == 0:
        print("No objects detected.")
    else:
        for object in remote_image_objects.objects:
            objects.append(object.object_property)

    recipies = get_recipes(objects)

    return json.dumps(recipies)

def get_info(image):
    decoded_image = base64.b64decode(image)
    print(len(decoded_image))
    return ["hi"]

def get_recipes(objects):
    cnxn = pyodbc.connect('DRIVER='+driver+';SERVER='+server+';PORT=1433;DATABASE='+database+';UID='+username+';PWD='+ password)
    cursor = cnxn.cursor()

    recipes = []

    for ingredient in objects:
        sql = "SELECT * from epi_r where {0}=1".format(ingredient)
        try:
            cursor.execute(sql)
            row = cursor.fetchone()
        except:
            continue
        while row:
            obj = { "recipeName":str(row[0]),
                    "calories": str(row[2])
                  }
                  
            if (obj in recipes):
                    row = cursor.fetchone()
                    continue
            
            recipes.append(obj)
            row = cursor.fetchone()

    return recipes

if __name__ == "__main__":
    app.run(debug=True)
