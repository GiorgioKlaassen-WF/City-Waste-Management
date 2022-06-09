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
import adafruit_ssd1306
from PIL import Image, ImageDraw, ImageFont







def main(camera, stream, sgp30, bme280, ppdSensor, oled):

    oled.fill(0)
    oled.show()
    image = Image.new("1", (oled.width, oled.height))

    draw = ImageDraw.Draw(image)
    font = ImageFont.load_default()
    width = 128
    height = 64
    x = 4
    padding = -2
    top = padding


    while True:
        draw.rectangle((0, 0, width, height), outline=0, fill=0)

        camera.capture(stream, format='jpeg')
        stream.seek(0)
        img_str = base64.b64encode(stream.getvalue())

        gpio, ratio, concentration = ppdSensor.read()
        print("ratio={:.1f} conc={} pcs per 0.01 cubic foot".
              format(ratio, int(concentration)))
        
        value_by_m3 = concentration / 35.315
        print(value_by_m3)

        postbody = {
            "sensorId": "629e0b52a9f7583eb8f99f18",
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
                'https://139-162-139-209.ip.linodeusercontent.com/api/sensor-reading', json=postbody)
            response.status_code
            response.json()
        except:
            continue

        # draw.text((x, top),     "Waste management sensor unit",  font=font, fill=255)
        draw.text((x, top + 8), "Humidity: " + str(int(bme280.relative_humidity)) + "%",  font=font, fill=255)
        draw.text((x, top + 18),"Air pressure: " + str(int(bme280.pressure)) + "Pha",  font=font, fill=255)
        draw.text((x, top + 28),"CO2: " + str(sgp30.eCO2) + "PPM",  font=font, fill=255)
        draw.text((x, top + 36),"TVOS: " + str(sgp30.TVOC) + "PPM",  font=font, fill=255)
        draw.text((x, top + 45),"Status code: " + str(response.status_code),  font=font, fill=255)



        oled.image(image)
        oled.show()
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

    oled = adafruit_ssd1306.SSD1306_I2C(128, 64, i2c, addr=0x3c)

    # Camera Start
    camera.start_preview()
    sleep(2)  # warm-up camera

    main(camera, stream, sgp30, bme280, ppdSensor, oled)
