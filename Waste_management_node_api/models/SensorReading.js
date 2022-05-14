const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SensorReading = new Schema({
    id: mongoose.SchemaTypes.ObjectId,
    sensorId: {type: Schema.Types.ObjectId, ref: 'Sensor'},
    sensors: {
        tempSensor: {},
        humiSensor: {},
        dustSensor: {},
        eCO2Sensor: {},
        TVOCSensor: {},
        CO2eqSensor: {},
        pressureSensor: {}
    },
    trash: {type: Boolean, default: false},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
});

SensorReading.set('timestamps', true);
module.exports = mongoose.model("SensorReading", SensorReading);
