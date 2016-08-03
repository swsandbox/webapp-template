'use strict';

let app = require('./server').app;
let port = process.env.PORT || 3000;

app.listen(port, function () {
    console.log(`listening on ${port}`);
});
