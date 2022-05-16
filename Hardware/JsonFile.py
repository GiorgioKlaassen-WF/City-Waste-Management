import json 
import requests
import time 
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

Waste = {
  "photo": { photo
  },

  "DHT": {
    "temperature_f": Source.temperature_f, 
    "temperature_c": Source.temperature_c,
    "humidity": Source.humidity
  },

  "CCS811":{
    "ccs811.eco2": Source.ccs811.eco2,
    "ccs811.tvoc": Source.ccs811.tvoc
  },

  "BME280":{
    "data.id":Source.data.id,
    "data.timestamp":Source.data.timestamp,
    "data.temperature":Source.data.temperature,
    "data.pressure":Source.data.pressure,
    "data.humidity":Source.data.humidity
  },

  "SGP30":{
    "sgp30.baseline_eCO2":Source.sgp30.baseline_eCO2,
    "sgp30.baseline_TVOC":Source.sgp30.baseline_TVOC
  },

  #g=Gpio r=Ratio c=concentration pcs per 0.01 cubic foot
   "PPD42NS":{
    "g":Source.g, 
    "r":Source.r,
    "c":Source.c 
  }
}

print(Waste)
