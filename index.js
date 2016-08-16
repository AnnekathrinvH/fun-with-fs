var fs = require('fs');

read('./files');
function read(path) {
    fs.readdir(path, function(err, files) {
        if(err) {
            console.log(err);
            return;
        }
        checkFiles(files, path);
    });
}

function checkFiles(files, path) {
    console.log(path + ' contains ' + files);

    for(var i = 0; i < files.length; i++) {
        var item = files[i];
        checkStatus(item, path);
    }
}

function checkStatus(item, path) {
    var newPath = path + '/' + item;
    fs.stat(newPath, function(err, stats){
        if(err) {
            console.log(err);
            return;
        }
        if(stats.isDirectory()) {
            read(newPath);
        }
        
    });
}
/*



                fs.readdir(files[i], function(err, data2) {
                    if(err) {
                        console.log(err);
                        return;
                    }
                    console.log(data2);
                })
            }
        })
    }*/
