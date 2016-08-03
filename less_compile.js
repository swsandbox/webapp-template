var less = require('less');
var lessPluginCleanCSS = require('less-plugin-clean-css');
var cleanCSSPlugin = new lessPluginCleanCSS({advanced: true});
var fs = require('fs');
var path = require('path');

var baseFile = fs.readFileSync(path.join('lib', 'styles', '_base.less')).toString('utf-8');

less.render(baseFile, {
    plugins: [cleanCSSPlugin],
    paths: [path.join('lib', 'styles')]
}, (err, output)=>{
    if (err) {
        console.error(`unable to process less ${err.message}`, err);
        process.exit(1);
    }
    fs.writeFileSync(path.join('src', 'public', 'styles.css'), output.css);
});
