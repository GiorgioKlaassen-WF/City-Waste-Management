const express = require("express");
const router = express.Router();

let Sensor = require('../models/Sensor');
let SensorReadings = require('../models/SensorReading');

router.get('/', (req, res) => {
    getAllData()
        .then((data) => res.status(200).json(data))
        .catch((err) => res.status(400).json(err))
});

router.post('', (req, res) => {
    const sensor = new Sensor({
        sensorName: req.body.sensorName,
        location: req.body.location,
    })
    sensor.save()
        .then((data) => res.status(200).json({ok: "Sensor saved", body: data}))

})

router.get('/map/data', async (req, res) => {
    const points = await getAllData()
    res.status(200).json(points)
})

router.get('/:id', (req, res) => {
    Sensor.findById(req.params.id)
        .then((data) => res.status(200).json({found: data}))
        .catch((err) => res.status(400).json({error: err}))
});

router.get('/:id/data', (req, res) => {
    GetAllSensorDataFromOne(req.params.id)
        .then((data) => res.status(200).json(data))
        .catch((err) => res.status(400).json({error: err}))
});

router.delete('/:id', (req, res) => {
    Sensor.deleteOne({_id: req.params.id})
        .then((data) => {
            res.status(200).json({success: true, message: "Deleted successfully"})
        })
        .catch((err) => {
            res.status(400).json("Request Failed")
        });
});


let getAllData = async () => {
    return Sensor.aggregate([
        {
            $lookup: {
                from: 'sensorreadings',
                localField: '_id',
                foreignField: 'sensorId',
                as: 'sensors',
                pipeline: [
                    {$sort: {createdAt: -1}},
                    {$limit: 1}
                ]
            },
        }
    ]);
}

let GetAllSensorDataFromOne = async (id) => {
    let sensor = await Sensor.findById(id)
    let readings = await SensorReadings.find({'sensorId' : sensor['_id']}, {}, {sort: { 'created_at': -1}}).limit(30)
    return {"sensor": sensor, "readings": readings};
}

module.exports = router;
