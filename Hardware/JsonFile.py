import json 
import requests 
import Source
import os
import base64
from PIL import Image
import glob

Photos = []
source_path = "/home/pi/Documents/Waste/Camera"
image_files = [source_path  + f for f in glob.glob('*.jpg')]

for filepath in os.listdir(source_path):
	callimage = Image.open(filepath).load()
	#print(callimage)
	Photos.append(callimage)
	print(Photos)

#for filename in glob.glob(source_path"*.jpg") 
#    im = Image.open(filename)
#    Photos.append(im)


#Photos = []
#for x in os.listdir("/home/pi/Documents/Waste/Camera"): 
# Camera Image 
#	with open(x, "rb") as f:
#		im_bytes = f.read()        
#	im_b64 = base64.b64encode(im_bytes).decode("utf8")
#	Photos.append(im_b64)

#url= 'http://localhost:3000/post'
#@app.route("/post", methods=['POST'])



postbody = {
	"sensorId": "6287660406ff490e508dce61",
	"sensorss": {
		"tempSensor": Source.data.temperature,
		"humiSensor": Source.data.humidity,
		"pressureSensor": Source.data.pressure,
		"eCO2Sensor": Source.sgp30.baseline_eCO2,
		"TVOCSensor": Source.sgp30.baseline_TVOC,
		#"dustSensor": Source.c,
		"CO2Sensor": 00, #not in use
        "CO2eqSensor" : 00 #not in use
	},
	"image": Photos
}

#print(postbody)

#response = requests.post('http://localhost:3000/api/sensor-reading', json=postbody)
#response.status_code
#response.json()