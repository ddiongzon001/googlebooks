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

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}

// turn on routes
const routes = require('./routes');
app.use(routes);

// set up mongoose connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/googlebooks', {
    useNewUrlParser: true
});

// start API server
app.listen(PORT, function () {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`)
})

