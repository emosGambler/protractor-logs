var fs = require('fs');

export const appendToFile = (path, value) => {
    fs.appendFile(path, value, (err) => { 
        return err; 
    });
};

export const createDir = (path) => {
    fs.mkdirSync(path);
};

export const doesDirExists = (path) => {
    return fs.existsSync(path)
};

export const writeToFile = (path, value) => {
    fs.writeFile(path, value, (err) => { 
        return err; 
    });
};

export const createDirIfNotExists = (path) => {
    if (!doesDirExists(path)){
        createDir(path);
    };
};

export const cleanFile = (path) => {
    writeToFile(path, '');
};

export const getFileContent = (path: string, encoding: string = 'utf8'): Promise<string> => {
    return new Promise((resolve, reject) => {
        return fs.readFile(path, encoding, (err, data) => {
            return err ? reject(err) : resolve(data);
        });
    });
}