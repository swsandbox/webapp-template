var fs = require('fs');
var path = require('path');

var files = fs.readdirSync(path.join('lib', 'scripts'));

var fileData = files.map(f=>{
    return fs.readFileSync(path.join('lib', 'scripts', f)).toString('utf-8');
}).join('\n\n');

fs.writeFileSync(path.join('src', 'public', 'app.js'), fileData);
