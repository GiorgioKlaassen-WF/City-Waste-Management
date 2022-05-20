# SPDX-FileCopyrightText: 2021 ladyada for Adafruit Industries
# SPDX-License-Identifier: MIT

# SGP30

import time
import board
import busio
import smbus2
import pigpio
import adafruit_dht
import adafruit_ccs811
import bme280
import adafruit_sgp30
from picamera import PiCamera
from time import sleep

#BME280
port = 1
address = 0x76
bus = smbus2.SMBus(port)

# uses board.SCL and board.SDA CCS811
i2c = board.I2C() 
i2c = busio.I2C(board.SCL, board.SDA, frequency=100000)

# Initial the dht + ccs811 + SGP30 device, with data pin connected to:
dhtDevice = adafruit_dht.DHT22(23)
ccs811 = adafruit_ccs811.CCS811(i2c)
sgp30 = adafruit_sgp30.Adafruit_SGP30(i2c)

# Calibration BME280
calibration_params = bme280.load_calibration_params(bus, address)

# the sample method will take a single reading and return a
# compensated_reading object
data = bme280.sample(bus, address, calibration_params)

#Initalize Camera
camera = PiCamera()
camera.start_preview()
for i in range(5):
    sleep(1)
    camera.capture('/home/pi/Documents/Waste/Camera/image%s.jpg' % i)
camera.stop_preview()

#Initalize SGP30
print("SGP30 serial #", [hex(i) for i in sgp30.serial])
sgp30.iaq_init()
sgp30.set_iaq_baseline(0x8973, 0x8AAE)
#sgp30.set_iaq_relative_humidity(celcius=22.1, relative_humidity=44)
elapsed_sec = 0

#Initalize PPD42NS
class sensor:
   
    def __init__(self, pi, gpio):
       
        self.pi = pi
        self.gpio = gpio

        self._start_tick = None
        self._last_tick = None
        self._low_ticks = 0
        self._high_ticks = 0

        pi.set_mode(gpio, pigpio.INPUT)

        self._cb = pi.callback(gpio, pigpio.EITHER_EDGE, self._cbf)

    def read(self):
       
        interval = self._low_ticks + self._high_ticks

        if interval > 0:
            ratio = float(self._low_ticks)/float(interval)*100.0
            conc = 1.1*pow(ratio, 3)-3.8*pow(ratio, 2)+520*ratio+0.62
        else:
            ratio = 0
            conc = 0.0

        self._start_tick = None
        self._last_tick = None
        self._low_ticks = 0
        self._high_ticks = 0

        return (self.gpio, ratio, conc)

    def _cbf(self, gpio, level, tick):

        if self._start_tick is not None:

            ticks = pigpio.tickDiff(self._last_tick, tick)

            self._last_tick = tick

            if level == 0:  # Falling edge.
                self._high_ticks = self._high_ticks + ticks

            elif level == 1:  # Rising edge.
                self._low_ticks = self._low_ticks + ticks

            else:  # timeout level, not used
                pass

        else:
            self._start_tick = tick
            self._last_tick = tick




while not ccs811.data_ready:
    pass


# PPD42NS
if __name__ == "__main__":

    import time
    import pigpio
    import PPD42NS

    pi = pigpio.pi()  # Connect to Pi.

    s = PPD42NS.sensor(pi, 20)

while True:
    try:
        # Print the values to the serial port DHT22
        temperature_c = dhtDevice.temperature
        temperature_f = temperature_c * (9 / 5) + 32
        humidity = dhtDevice.humidity
        print(
            "Temp: {:.1f} F / {:.1f} C    Humidity: {}% ".format(
                temperature_f, temperature_c, humidity
            )
        )

        # Print the values from ccs811
        print("CO2: {} PPM, TVOC: {} PPB".format(
            ccs811.eco2, ccs811.tvoc
            )
        )

        # the compensated_reading class has the following attributes BME280
        print(data.id)
        print(data.timestamp)
        print(data.temperature)
        print(data.pressure)
        print(data.humidity)
        print(data)

        # Print the values from SGP30
        print("eCO2 = %d ppm \t TVOC = %d ppb" % (sgp30.eCO2, sgp30.TVOC))
        time.sleep(1)
        elapsed_sec += 1
        if elapsed_sec > 10:
            elapsed_sec = 0
            print(
                "**** Baseline values: eCO2 = 0x%x, TVOC = 0x%x"
                % (sgp30.baseline_eCO2, sgp30.baseline_TVOC)
            )

        # Print PPD42NS
        time.sleep(1)  # Use 30 for a properly calibrated reading.

        g, r, c = s.read()

        print("gpio={} ratio={:.1f} conc={} pcs per 0.01 cubic foot".
              format(g, r, int(c)))



    except RuntimeError as error:
        # Errors happen fairly often, DHT's are hard to read, just keep going
        print(error.args[0])
        time.sleep(2.0)
        continue
    except Exception as error:
        dhtDevice.exit()
        raise error

    time.sleep(2.0)
