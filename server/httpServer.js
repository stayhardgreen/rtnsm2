const http = require('http');
const express = require('express');
const session = require('express-session');
const app = express();
const configRoutes = require('../routes/init');
const realTimeServer = require('./realTimeServer')
const httpServer = function () {


    // Create the HTTP & RealTime Server
    let _httpServer = http.createServer(app);

    // Set the View Engine
    app.set('view engine', 'ejs');

    // Settup sessions
    app.use(session({
        secret: 'keyboard cat',
        saveUninitialized: true
    }));

    // Let Express know where to find the public folder
    app.use('/public', express.static('public'));
    configRoutes(app);
    realTimeServer(_httpServer);


    //Start the server
    _httpServer.listen(3000, function () {
        console.log('Your routes will be running on http://localhost:3000');
    });
}



module.exports = httpServer
