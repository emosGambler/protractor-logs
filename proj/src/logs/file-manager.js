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

const getFileContent = (path, encoding = 'utf8') => {
    return new Promise((resolve, reject) => {
        return fs.readFile(path, encoding, (err, data) => {
            return err ? reject(err) : resolve(data);
        });
    });
}
module.exports = { appendToFile, cleanFile, createDir, createDirIfNotExists, doesDirExists, getFileContent, writeToFile };