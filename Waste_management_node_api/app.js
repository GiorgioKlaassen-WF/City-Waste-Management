require('dotenv').config();

const express = require('express');
const bodyParser = require("body-parser");
const helmet = require('helmet');
const middleware = require("./middlewares");
const cors = require('cors');
const { Server } = require("socket.io");

// routes
const sensor = require("./routes/sensors");
const sensorReadings = require("./routes/sensorReadings")
const mongoose = require("mongoose");

let app = express();
app.use(bodyParser.json({limit: '150mb'}));
app.use(bodyParser.urlencoded({
    limit: '150mb',
    extended: true
}));


const http = require('http');
const server = http.createServer(app);
const io = new Server(server);


io.on('connection', (socket) => {
    console.log('a user connected');
});

mongoose.connect(`mongodb://localhost:27017/waste`, {
// mongoose.connect(`mongodb://mongo:27017/waste`, {

    // mongo settings:
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
});


mongoose.connection.once("open", () => console.log("Database connected"))
    .on("error", (err) => {
        console.log(err)
    })


app.use(cors());
app.use(helmet());

// setup middleware
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// routes
app.use('/api/sensor', sensor);
app.use('/api/sensor-reading', sensorReadings)



// error middleware
app.use(middleware.notFound);
app.use(middleware.errorHandler);

app.listen(process.env.PORT, () => {
    console.log(`[Server] Running on port ${process.env.PORT}`)
});


module.exports = {app: app, server: server};

