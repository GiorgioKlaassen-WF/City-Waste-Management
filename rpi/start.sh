#!/bin/bash
pip install -r requirements.txt
sudo pigpiod
python main.py
