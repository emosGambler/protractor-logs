var fs = require('fs');

const takeScreenshot = (path, pageName, format = 'png', encoding = 'base64') => {
    protractor.browser.takeScreenshot().then(png => {
        let stream = fs.createWriteStream(`${path}/${pageName}.${format}`);
        stream.write(new Buffer(png, encoding));
        stream.end();
    });
    return `${path}/${pageName}.${format}`;
};

module.exports = { takeScreenshot };