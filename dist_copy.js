'use strict';

let fs = require('fs-extra');
let path = require('path');

fs.ensureDirSync(path.join('dist'));
fs.copySync(path.join('src', 'server'), path.join('dist'));
fs.copySync(path.join('src', 'public', 'app'), path.join('dist', 'public'));
