import json 
import requests
import Source
import base64
import os


url= 'http://localhost:3000/post'

response = requests.post('/post')
response.status_code
response.json()

image_file = 'sample_image.png'

for x in os.listdir("/Waste/Camera"): 
  with open(x, "rb") as f:
     im_bytes = f.read()        
  im_b64 = base64.b64encode(im_bytes).decode("utf8")
  photo = {x:im_b64}


{
	"sensorId": "",
	"sensorss": {
		"tempSensor": Source.temperature_c,
		"humiSensor": Source.humidity,
		"dustSensor": Source.c,
		"eCO2Sensor": Source.ccs811.eco2,
		"TVOCSensor": Source.ccs811.tvoc,
		"CO2Sensor": 458,
		"CO2eqSensor" : 450,
		"pressureSensor": Source.data.pressure
	},
	"image": "photo"
}
