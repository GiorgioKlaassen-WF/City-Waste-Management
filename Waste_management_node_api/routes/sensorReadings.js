const express = require("express");
const router = express.Router();

const SensorReading = require('models/sensorReading')

router.post('', (req, res) => {
    const sensorReading = new SensorReading({
        sensorId: req.body.sensorId,
        data: req.body.data
    })
    sensorReading.save()
        .then((data) => res.status(200).json({ok: "Sensor saved", body: data}))
} )


module.exports = router;
