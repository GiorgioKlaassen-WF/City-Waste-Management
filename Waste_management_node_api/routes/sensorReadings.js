require('dotenv').config();
const express = require("express");
const router = express.Router();
const Jimp = require("jimp");
const https = require('https');

let SensorReading = require('../models/SensorReading')
let Sensor = require('../models/Sensor')

router.get('/', (req, res) => {
    SensorReading.find()
        .then((data) => res.status(200).json(data))
        .catch((err) => res.status(400).json(err))
});

router.post('', async (req, res) => {

    // get correct sensor id from database
    let sensor = await Sensor.findById(req.body.sensorId).then((data, err) => {
        if (data) {
            return data
        } else {
            console.log(err)
        }
    })

    let sensorReading;
    sensorReading = new SensorReading({
        sensorId: sensor._id,
        sensors: {
            tempSensor: req.body.sensors.tempSensor,
            humiSensor: req.body.sensors.humiSensor,
            dustSensor: req.body.sensors.dustSensor,
            eCO2Sensor: req.body.sensors.eCO2Sensor,
            TVOCSensor: req.body.sensors.TVOCSensor,
            CO2Sensor: req.body.sensors.CO2Sensor,
            CO2eqSensor: req.body.sensors.CO2eqSensor,
            pressureSensor: req.body.sensors.pressureSensor
        },
        trash: false,
    });

    req.io.emit("logs", { sensorReading: sensorReading });

    sensorReading.save()
        .then((data) => res.status(200).json({ok: true, body: data}))
})


module.exports = router;
