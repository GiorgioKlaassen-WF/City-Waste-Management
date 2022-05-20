const express = require("express");
const router = express.Router();

let Sensor = require('../models/Sensor');

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

router.get('/:id', (req, res) => {
    Sensor.findById(req.params.id)
        .then((data) => res.status(200).json({found: data}))
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

router.get('/map/data', async (req, res) => {
    const points = await Sensor.aggregate([
        {
            $lookup: {
                from: 'sensorreadings',
                localField: '_id',
                foreignField: 'sensorId',
                as: 'sensors',
                pipeline: [
                    { $sort: {createdAt: -1}},
                    { $limit: 1 }
                ]
            },
        }
    ])
    res.status(200).json(points)
})

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

module.exports = router;
