require('dotenv').config();

const express = require('express');
const bodyParser = require("body-parser");
const helmet = require('helmet');
const middleware = require("./middlewares");
const cors = require('cors');




// routes
const sensor = require("./routes/sensors");
const mongoose = require("mongoose");

let app = express();

mongoose.connect(`mongodb://localhost:27017/waste`, {

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



// error middleware
app.use(middleware.notFound);
app.use(middleware.errorHandler);

app.listen(process.env.PORT, () => {
    console.log(`[Server] Running on port ${process.env.PORT}`)
});
