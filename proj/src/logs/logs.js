var protractor = require('protractor');
var rimraf = require('rimraf');
var fs = require('fs');

let logs = { actions: [] };

const openUrl = (url) => {
    logs['actions'].push({ 
        time: new Date(), 
        action: 'URL opened', 
        value: url,
        x: null,
        y: null
    });
    return protractor.browser.get(url);
};

const $ = (selector) => {
    return new Element(selector);  
};

class Element {
    constructor(selector){
        this.element = protractor.$(selector);
    };

    click() {
        this.element.getLocation().then(location => {
            logs['actions'].push({ 
                time: new Date(), 
                action: 'Element clicked', 
                value: null,
                x: location.x,
                y: location.y
            });
        });
        return this.element.click();
    };
};

const saveLogs = () => {
    const PATH = './logs';
    fs.mkdir(PATH, () => {
        fs.writeFile(`${PATH}/logs.json`, JSON.stringify(logs));
    });
};

module.exports = { $, openUrl, saveLogs, Element };