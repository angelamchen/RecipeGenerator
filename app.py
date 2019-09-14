from azure.cognitiveservices.vision.computervision.models import ComputerVisionErrorException
from azure.cognitiveservices.vision.computervision import ComputerVisionClient
from msrest.authentication import CognitiveServicesCredentials
from flask import Flask
import os
import json
import requests

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

# Create flask application
app = Flask(__name__)


@app.route("/")
def index():
    return "Hello world"


@app.route("/image", methods=["GET", "POST"])
def indentify():
    # Insert the image path that is being analyzed
    image_path = "http://amazingdomains.com/wp-content/uploads/2017/01/groceries.jpg"

    # detect general image
    image_description = computervision_client.describe_image(image_path)

    print("\nCaptions from remote image: ")
    if (len(image_description.captions) == 0):
        print("No captions detected.")
    else:
        for caption in image_description.captions:
            print("'{}' with confidence {:.2f}%".format(
                caption.text, caption.confidence * 100))

    # Detect specific objects
    remote_image_objects = computervision_client.detect_objects(image_path)

    objects = []

    print("\nDetecting objects in remote image:")
    if len(remote_image_objects.objects) == 0:
        print("No objects detected.")
    else:
        for object in remote_image_objects.objects:
            objects.append(object.object_property)

    recipies = []
    recipies = getRecipies(objects)

    return json.dumps(objects)


if __name__ == "__main__":
    app.run(debug=True)
