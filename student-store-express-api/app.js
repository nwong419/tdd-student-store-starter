// YOUR CODE HERE
const express = require("express");
const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());

app.get('/', (req,res) => {
    return res.status(200).json({
        "ping":"pong",
    })
});


const storeRoute = require("./route/store");
app.use('/', storeRoute);

//generic error handling
app.use((error, req, res, next) => {
    const status = error.status || 500;
    const message = error.message || "Something went wrong in the application.";

    return res.status(status).json({
        error: { status, message },
    });
});

module.exports = app;