import json 
import requests
import time 

url= 'http://localhost:3000/post'

response = requests.post('/post')
response.status_code
response.json()

{
  "photo": {},
  "DHT": {
    "temperature_f": {},
    "temperature_c": {},
    "humidity": {}
  },

  "CCS811":{
    "ccs811.eco2":{},
    "ccs811.tvoc":{}
  },

  "BME280":{
    "data.id":{},
    "data.timestamp":{},
    "data.temperature":{},
    "data.pressure":{},
    "data.humidity":{}
  },

  "SGP30":{
    "sgp30.baseline_eCO2":{},
    "sgp30.baseline_TVOC":{}
  }
}
