import requests
import base64
import json

with open("groceries.jpg", "rb") as image_file:
    encoded_string = base64.b64encode(image_file.read())

dictToSend = {'image': 'string'}

r = requests.post("http://localhost:5000/image", data=json.dumps(dictToSend))
print(r.content)
