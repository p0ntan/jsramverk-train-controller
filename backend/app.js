require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const fetchTrainPositions = require('./models/trains.js');
const delayed = require('./routes/delayed.js');
const tickets = require('./routes/tickets.js');
const codes = require('./routes/codes.js');
const port = process.env.PORT || 1337;

const app = express();
const httpServer = require("http").createServer(app);

app.use(cors());
app.options('*', cors());

// For logging, uses morgan when not in test environment
if (process.env.NODE_ENV !== 'test') {
    app.use(morgan('combined'));
}

app.disable('x-powered-by');

// Middleware
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

const io = require("socket.io")(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// Routes
app.get('/', (req, res) => {
    res.json({
        data: 'This is the API for the course jsramverk, by students poak22 and elmo22'
    });
});
app.use("/delayed", delayed);
app.use("/tickets", tickets);
app.use("/codes", codes);

httpServer.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

// Used for moving trains
fetchTrainPositions(io);

// For 404-errors when accessing a route that doesn't exist
app.use((req, res, next) => {
    const err = new Error("Not Found");

    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    res.status(err.status || 500).json({
        "errors": [
            {
                "status": err.status,
                "title":  err.message,
                "detail": err.message
            }
        ]
    });
});

// Export httpServer so it can be used for testing
module.exports = httpServer;
