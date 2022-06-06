from io import BytesIO
from time import sleep
from picamera import PiCamera
import base64
import requests
import board
import busio
import adafruit_sgp30
from adafruit_bme280 import basic as adafruit_bme280
from PPD42NS import PPD42NS as ppd
import pigpio


def main(camera, stream, sgp30, bme280, ppdSensor):
    while True:
        camera.capture(stream, format='jpeg')
        stream.seek(0)
        img_str = base64.b64encode(stream.getvalue())

        gpio, ratio, concentration = ppdSensor.read()
        print("ratio={:.1f} conc={} pcs per 0.01 cubic foot".
              format(ratio, int(concentration)))
        
        value_by_m3 = concentration / 35.315
        print(value_by_m3)

        postbody = {
            "sensorId": "628a2d33e455631ca0f4bfb7",
            "sensors": {
                "tempSensor": int(bme280.temperature),
                "humiSensor": int(bme280.relative_humidity),
                "pressureSensor": int(bme280.pressure),
                "eCO2Sensor": sgp30.eCO2,
                "TVOCSensor": sgp30.TVOC,
                "dustSensor": int(value_by_m3),
                "CO2Sensor": 0,  # not in use
                "CO2eqSensor": 0  # not in use
            },
            "image": img_str
        }
        try:
            response = requests.post(
                'http://192.168.178.234:3000/api/sensor-reading', json=postbody)
            response.status_code
            response.json()
        except:
            continue

        sleep(10)


if __name__ == '__main__':
    camera = PiCamera()
    stream = BytesIO()

    # Uart setup
    pi = pigpio.pi()
    ppdSensor = ppd(pi, 20)

    # I2C setup
    i2c = busio.I2C(board.SCL, board.SDA, frequency=100000)
    sgp30 = adafruit_sgp30.Adafruit_SGP30(i2c)
    bme280 = adafruit_bme280.Adafruit_BME280_I2C(i2c, 0x76)

    # SGP30 Sensor init
    sgp30.iaq_init()
    sgp30.set_iaq_baseline(0x8973, 0x8AAE)

    # BME Sensor init
    bme280.sea_level_pressure = 1013.25

    # Camera Start
    camera.start_preview()
    sleep(2)  # warm-up camera

    main(camera, stream, sgp30, bme280, ppdSensor)
