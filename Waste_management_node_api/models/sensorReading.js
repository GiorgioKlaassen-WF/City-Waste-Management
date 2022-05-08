const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//TODO: make sure that we can upload sensor reading data into data
const SensorReading = new Schema({
    id: mongoose.SchemaTypes.ObjectId,
    sensorId: {type: Schema.Types.ObjectId, ref: 'Sensor'},
    data: [],
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
});

SensorReading.set('timestamps', true);
module.exports = mongoose.model("SensorReading", SensorReading);
