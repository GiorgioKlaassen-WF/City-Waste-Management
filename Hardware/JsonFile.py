import json 
import requests
import time 
import Source
import base64
import os


#url= 'http://localhost:3000/post'


image_file = 'sample_image.png'

for x in os.listdir("/Waste/Camera"): 
  with open(x, "rb") as f:
     im_bytes = f.read()        
  im_b64 = base64.b64encode(im_bytes).decode("utf8")
  photo = {x:im_b64}


postbody = {
	"sensorId": "",
	"sensorss": {
		"tempSensor": Source.temperature_c,
		"humiSensor": Source.humidity,
		"dustSensor": Source.s,
		"eCO2Sensor": Source.sgp30.baseline_eCO2,
		"TVOCSensor": Source.ccs811.tvoc,
		"CO2Sensor": Source.ccs811.eco2,
        "CO2eqSensor" : Source.sgp30.baseline_eCO2,
		"pressureSensor": Source.data.pressure
	},
	"image": photo
}

response = requests.post('http://localhost:3000/api/sensor-reading', json=postbody)
response.status_code
response.json()