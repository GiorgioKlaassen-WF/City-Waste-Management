require('dotenv').config();
const bodyParser = require("body-parser");
const helmet = require('helmet');
const middleware = require("./middlewares");
const cors = require('cors');

const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:4200",
        methods: ["GET", "POST"]
    }
});
// {msg: "Connected to API", id: socket.id, connectionCount: io.sockets.server.engine.clientsCount}

io.on('connection', socket => {
    console.log(io.sockets.server.engine.clientsCount);
    console.log(`Socket ${socket.id} has connected`);
    io.emit('connection', {msg: "Connected to API", id: socket.id, connectionCount: io.sockets.server.engine.clientsCount});

    socket.on("disconnecting", (reason) => {
        console.log(reason)
        console.log(io.sockets.server.engine.clientsCount)
        io.emit('connection', {msg: "Connected to API", id: socket.id, connectionCount: io.sockets.server.engine.clientsCount});
    })
});



// routes
const sensor = require("./routes/sensors");
const sensorReadings = require("./routes/sensorReadings")
const mongoose = require("mongoose");

app.use(bodyParser.json({limit: '150mb'}));
app.use(bodyParser.urlencoded({
    limit: '150mb',
    extended: true
}));

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

http.listen(process.env.PORT, () => {
    console.log(`[Server] Running on port ${process.env.PORT}`)
});


module.exports = {app: app, io: io};

