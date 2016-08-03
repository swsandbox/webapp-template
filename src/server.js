'use strict';

var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var path = require('path');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/lib', express.static(path.join('node_modules')));

module.exports.app = app;
module.exports.io = io;
