'use strict';
let io = require('./server').io;
let uuid = require('node-uuid');

var clients = {};

io.on('connection', function (socket) {
    let id = uuid.v1();

    console.log('connection made', id);
    socket.emit('status', {
        status: 'ok',
        id: id
    });

});
