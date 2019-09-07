const express = require('express');
const mongoose = require('mongoose');
const logger = require("morgan");

// turn on our app
const app = express();
const PORT = process.env.PORT || 3001;

// set up middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger('dev'));

// turn on routes
const routes = require('./routes');
app.use(routes);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}

// set up mongoose connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/googlebooks', {
    useNewUrlParser: true
});

// start API server
app.listen(PORT, function () {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`)
})

