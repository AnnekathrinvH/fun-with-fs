var fs = require('fs');

var fileSystem = {};

read('./files', fileSystem);
function read(path, objRef) {
    var files = fs.readdirSync(path);
    checkFiles(files, path, objRef);
}

function checkFiles(files, path, objRef) {

    for(var i = 0; i < files.length; i++) {
        var item = files[i];
        checkStatus(item, path, objRef);
    }
}

function checkStatus(item, path, objRef) {
    var newPath = path + '/' + item;
    var status = fs.statSync(newPath);

    if(status.isFile()) {
        var size = status.size;
        objRef[item] = size;
    }

    if(status.isDirectory()) {
        objRef[item] = {};
        read(newPath, objRef[item]);
    }


}
console.log(fileSystem);

var jsonString = JSON.stringify(fileSystem, null, 4);
console.log(jsonString);

fs.writeFile('files.json', jsonString, (err) => {
  if (err) throw err;
  console.log('It\'s saved!');
});
