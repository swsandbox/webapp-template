'use strict';

let server = require('./server').server;
let port = process.env.PORT || 3000;

require('./events');

server.listen(port, function () {
    console.log(`listening on ${port}`);
});



