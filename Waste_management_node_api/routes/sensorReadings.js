require('dotenv').config();
const express = require("express");
const router = express.Router();
let axios = require("axios").default;


let SensorReading = require('../models/SensorReading')
let Sensor = require('../models/Sensor')


router.get('/', (req, res) => {
    SensorReading.find()
        .then((data) => res.status(200).json(data))
        .catch((err) => res.status(400).json(err))
});

router.post('', async (req, res) => {

    const buffer = Buffer.from(req.body.image, "base64");
    let trash = false;


    let options = {
        method: 'POST',
        url: 'https://smartcity-customvision.cognitiveservices.azure.com/customvision/v3.0/Prediction/aa0ddd12-f0a8-4ddd-bbc0-91828251163e/classify/iterations/V1/image',
        headers: {
            'Prediction-Key': '3c2208773abd44bcaf5cd81792975211',
            'Content-Type': 'application/octet-stream'
        },
        data: buffer,
    };

    let customVisionResponse = await axios.request(options)
    let prediction = customVisionResponse.data.predictions[0]
    if (prediction.tagName == 'Trash') {
        trash = true
    }
    // axios.request(options).then(function (response) {
    //     // console.log(response.data)
    //     console.log(response.data.predictions[0])
    //     let predictions = response.data.predictions[0]
    //     if (predictions.tagName == 'Trash') {
    //         trash = true
    //     }
    // }).catch(function (error) {
    //     console.error(error);
    // })
    console.log("Trash detected: ", trash)


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
        trash: trash,
    });

    req.io.emit("logs", { sensorReading: sensorReading });
    console.log("send")

    sensorReading.save()
        .then((data) => res.status(200).json({ok: true, body: data}))
})


module.exports = router;
