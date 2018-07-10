"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require('fs');
exports.appendToFile = function (path, value) {
    fs.appendFile(path, value, function (err) {
        return err;
    });
};
exports.createDir = function (path) {
    fs.mkdirSync(path);
};
exports.doesDirExists = function (path) {
    return fs.existsSync(path);
};
exports.writeToFile = function (path, value) {
    fs.writeFile(path, value, function (err) {
        return err;
    });
};
exports.createDirIfNotExists = function (path) {
    if (!exports.doesDirExists(path)) {
        exports.createDir(path);
    }
    ;
};
exports.cleanFile = function (path) {
    exports.writeToFile(path, '');
};
exports.getFileContent = function (path, encoding) {
    if (encoding === void 0) { encoding = 'utf8'; }
    // return new Promise((resolve, reject) => {
    //     return fs.readFile(path, encoding, (err, data) => {
    //         return err ? reject(err) : resolve(data);
    //     });
    // });
};
//# sourceMappingURL=file-manager.js.map