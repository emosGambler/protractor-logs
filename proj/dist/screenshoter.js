"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var protractor_1 = require("protractor");
var fs = require('fs');
exports.takeScreenshot = function (path, pageName, format, encoding) {
    if (format === void 0) { format = 'png'; }
    if (encoding === void 0) { encoding = 'base64'; }
    protractor_1.protractor.browser.takeScreenshot().then(function (png) {
        var stream = fs.createWriteStream(path + "/" + pageName + "." + format);
        stream.write(new Buffer(png, encoding));
        stream.end();
    });
    return path + "/" + pageName + "." + format;
};
//# sourceMappingURL=screenshoter.js.map