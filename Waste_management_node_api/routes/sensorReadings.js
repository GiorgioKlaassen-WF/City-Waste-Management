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
// request naar azure cognitive services
    

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

    sensorReading.save()
        .then((data) => res.status(200).json({ok: true, body: data}))
})

const b64toBlob = (b64Data, contentType='', sliceSize=512) => {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);

        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, {type: contentType});
    return blob;
}

module.exports = router;
