const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Sensor = new Schema({
    id: mongoose.SchemaTypes.ObjectId,
    sensorName: {type: String, default: ''},
    location: {
        lat: Number,
        lon: Number,
        locationName: String
    },
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
});

Sensor.set('timestamps', true);
module.exports = mongoose.model("Sensor", Sensor);
