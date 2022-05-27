# SPDX-FileCopyrightText: 2021 ladyada for Adafruit Industries
# SPDX-License-Identifier: MIT

from pickle import NONE
import smbus2
import bme280
import time
import board
import busio
import adafruit_sgp30
import pigpio
from picamera import PiCamera
from time import sleep
import base64
import os

x = None

port = 1
address = 0x76
bus = smbus2.SMBus(port)

# Calibration BME280
calibration_params = bme280.load_calibration_params(bus, address)
data = bme280.sample(bus, address, calibration_params)

# Create library object on our I2C port SGP30
i2c = busio.I2C(board.SCL, board.SDA, frequency=100000)
sgp30 = adafruit_sgp30.Adafruit_SGP30(i2c)
sgp30.iaq_init()
sgp30.set_iaq_baseline(0x8973, 0x8AAE)
elapsed_sec = 0




# -- Initialize Picamera --
camera = PiCamera()

camera.start_preview()
for i in range(5):
    sleep(0.1)
    camera.capture('/home/pi/Documents/Waste/Camera/image%s.jpg' % i)
camera.stop_preview()
camera.close()

# -- Initializa PPD42NS
class sensor:
    """
    A class to read a Shinyei PPD42NS Dust Sensor, e.g. as used
    in the Grove dust sensor.

    This code calculates the percentage of low pulse time and
    calibrated concentration in particles per 1/100th of a cubic
    foot at user chosen intervals.

    You need to use a voltage divider to cut the sensor output
    voltage to a Pi safe 3.3V (alternatively use an in-line
    20k resistor to limit the current at your own risk).
    """

    def __init__(self, pi, gpio):
        """
        Instantiate with the Pi and gpio to which the sensor
        is connected.
        """

        self.pi = pi
        self.gpio = gpio

        self._start_tick = None
        self._last_tick = None
        self._low_ticks = 0
        self._high_ticks = 0

        pi.set_mode(gpio, pigpio.INPUT)

        self._cb = pi.callback(gpio, pigpio.EITHER_EDGE, self._cbf)

    def read(self):
        """
        Calculates the percentage low pulse time and calibrated
        concentration in particles per 1/100th of a cubic foot
        since the last read.

        For proper calibration readings should be made over
        30 second intervals.

        Returns a tuple of gpio, percentage, and concentration.
        """
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



if __name__ == "__main__":

    import Source

    pi = pigpio.pi()  # Connect to Pi.

    s = Source.sensor(pi, 20)


    while True: 

        # BME280 Temp + Pressure + humidity
        print(data.temperature)
        print(data.humidity)
        print(data.pressure)

        #SGP30 CO2 + TVOC
        print("eCO2 = %d ppm \t TVOC = %d ppb" % (sgp30.eCO2, sgp30.TVOC))
        elapsed_sec += 1
        if elapsed_sec > 10:
            elapsed_sec = 0
            print(
                "**** Baseline values: eCO2 = 0x%x, TVOC = 0x%x"
                % (sgp30.baseline_eCO2, sgp30.baseline_TVOC)
            )

        #PPD42NS Dustsensor
        time.sleep(0.5)  # Use 30 for a properly calibrated reading.

        g, r, c = s.read()
        x = c

        #print("gpio={} ratio={:.1f} conc={} pcs per 0.01 cubic foot".
        #        format(g, r, int(c)))
        print(c)
        #pi.stop()  # Disconnect from Pi.
        pi.stop()

        
