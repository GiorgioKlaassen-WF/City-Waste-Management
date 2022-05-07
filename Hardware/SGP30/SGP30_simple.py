import busio
import board
import adafruit_sgp30

port = 1
address = 0x58

i2c = busio.I2C(board.SCL, board.SDA, frequency=100000)
sgp30 = adafruit_sgp30.Adafruit_SGP30(i2c)


co2eq, tvoc = sgp30.iaq_measure()
print("CO2eq = %d ppm \t TVOC = %d ppb" % (co2eq, tvoc))