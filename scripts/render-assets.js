'use strict';
const fs = require('fs');
const upath = require('upath');
const sh = require('shelljs');
const path = require('path');

const diretoryTreeToObj = function(dir, done) {
    var results = [];

    fs.readdir(dir, function(err, list) {
        if (err)
            return done(err);

        var pending = list.length;

        if (!pending)
            return done(null, {name: path.basename(dir), type: 'folder', children: results});

        list.forEach(function(file) {
            file = path.resolve(dir, file);
            fs.stat(file, function(err, stat) {
                if (stat && stat.isDirectory()) {
                    diretoryTreeToObj(file, function(err, res) {
                        results.push({
                            name: path.basename(file),
                            type: 'folder',
                            children: res
                        });
                        if (!--pending)
                            done(null, results);
                    });
                }
                else {
                    results.push({
                        type: 'file',
                        name: path.basename(file)
                    });
                    if (!--pending)
                        done(null, results);
                }
            });
        });
    });
};


module.exports = function renderAssets() {
    const sourcePath = upath.resolve(upath.dirname(__filename), '../src/assets');
    const destPath = upath.resolve(upath.dirname(__filename), '../dist/.');
    const includePath = upath.resolve(upath.dirname(__filename), '../src/pug/includes');

    diretoryTreeToObj(sourcePath, function(err, res){
        if(err)
            console.error(err);
    
        var data = "- \n\tvar files = " + JSON.stringify(res, null, 4).split('\n').join('\n\t\t')
        fs.writeFile(includePath+'/images.pug', data, function(err) {
            if (err) {
               console.error(err);
            }
        });
    });

    sh.cp('-R', sourcePath, destPath)
};
