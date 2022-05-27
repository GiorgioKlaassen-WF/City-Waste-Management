# sudo apt-get update
# sudo apt-get upgrade
# sudo apt-get install python3-pip
# sudo pip3 install --upgrade setuptools


# cd ~
# sudo pip3 install --upgrade adafruit-python-shell wget https://raw.githubusercontent.com/adafruit/Raspberry-Pi-Installer-Scripts/master/raspi-blinka.py sudo python3 raspi-blinka.py 
# (hiermee download je alle adafruit dependicies)

# install BME280 --> pip install adafruit-circuitpython-bme280 en of pip install RPi.bme280
# install PPDN42S --> run eerst  "sudo pigpiod" daarna de file 
# install SGP30 --> sudo pip3 install adafruit-circuitpython-sgp30

# (NOT IN USE can be also used for temp + humidity incase BME280 doesnt work) install DHT -->  sudo pip3 install Adafruit_DHT
# (NOT IN USE can replace SGP30) install CJMI-811 --> sudo pip3 install adafruit-circuitpython-ccs811


# Enable: I2C, legacy camera, VNC 
# Raspberry boot/config.txt (in termninal cd /boot enter ...  sudo nano config.txt )
# uitcommenten in config.txt ---> (hdmi_force_hotplug=1, hdmi_group=1, hdmi_mode=1, hdmi_drive=2, dtparam=i2c_arm=on,
# dtparam=i2s=on, dtparam=spi=on, dtoverlay=gpio-ir,gpio_pin=17, dtoverlay=gpio-ir-tx,gpio_pin=18, dtparam=audio=on, start_x=1, 
# display_auto_detect=1, max_framebuffers=2, disable_overscan=1, otg_mode=1, dtoverlay=vc4-fkms-v3d, arm_boost=1,
# enable_uart=1, gpu_mem=128, gpio=8=op,dh, dtparam=i2c1=on  )


# BME280 adress =76
# SGP30 adress = 58
# CJMU-811 adress = 5a