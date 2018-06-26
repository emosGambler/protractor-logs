var fs = require('fs');

const appendToFile = (path, value) => {
    fs.appendFile(path, value, (err) => { 
        return err; 
    });
};

const createDir = (path) => {
    fs.mkdirSync(path);
};

const doesDirExists = (path) => {
    return fs.existsSync(path)
};

const writeToFile = (path, value) => {
    fs.writeFile(path, value, (err) => { 
        return err; 
    });
};

const createDirIfNotExists = (path) => {
    if (!doesDirExists(path)){
        createDir(path);
    };
};

const cleanFile = (path) => {
    writeToFile(path, '');
};

module.exports = { appendToFile, cleanFile, createDir, createDirIfNotExists, doesDirExists, writeToFile };