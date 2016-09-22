'use strict';

let socket = io();
let log = function (...messages) {
    console.log(messages);
}

socket.on('status', function (data) {
    log('data received on status ' + JSON.stringify(data));
});

let errorCount = 0;
socket.on('connect_error', function () {
    errorCount++;
    log('connection_error', errorCount);
    if (errorCount >= 2) {
        log('toasting connection error');
    }
});

socket.on('connect', function () {
    errorCount = 0;
});
