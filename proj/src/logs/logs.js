require('protractor');
var rimraf = require('rimraf');
var fs = require('fs');

let logs = { actions: [] };

const openUrl = (url) => {
    logs['actions'].push({ 
        time: new Date(), 
        action: 'URL opened', 
        value: url
    });
    return browser.get(url);
};

const saveLogs = () => {
    const PATH = './logs';
    fs.mkdir(PATH, () => {
        fs.writeFile(`${PATH}/logs.json`, JSON.stringify(logs));
    });
};

module.exports = { openUrl, saveLogs };