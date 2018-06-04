var protractor = require('protractor');
var rimraf = require('rimraf');
var fs = require('fs');

let logs = { actions: [] };

class ElementFinder {
    constructor(selector){
        this.element = protractor.$(selector);
    };

    clear() {
        this.element.getLocation().then(location => {
            addLogs('Element input cleaned', null, location.x, location.y);
        });
        return this.element.clear();
    };

    click() {
        this.element.getLocation().then(location => {
            addLogs('Element clicked', null, location.x, location.y);
        });
        return this.element.click();
    };

    getAttribute(attribute) {
        this.element.getLocation().then(location => {
            addLogs('Reading element attribute', attribute, location.x, location.y);
        });
        return this.element.getAttribute(attribute);
    };

    getText() {
        this.element.getLocation().then(location => {
            addLogs('Reading element inner text', null, location.x, location.y);
        });
        return this.element.getText();
    };

    isDisplayed() {
        this.element.getLocation().then(location => {
            this.element.isPresent().then(isPresent => {
                if (isPresent) {
                    this.element.isDisplayed().then(isDisplayed => {
                        addLogs('Checking if element is displayed', isDisplayed, location.x, location.y);
                    });
                } else {
                    addLogs('Checking if element is displayed', isPresent, location.x, location.y);
                }
            });
        });
        return this.element.isDisplayed();
    };

    isPresent() {
        this.element.getLocation().then(location => {
            this.element.isPresent().then(isPresent => {
                if (isPresent) {
                        addLogs('Checking if element is present', isPresent, location.x, location.y);
                } else {
                    addLogs('Checking if element is present', isPresent, location.x, location.y);
                }
            });
        });
        return this.element.isPresent();
    };

    sendKeys(query) {
        this.element.getLocation().then(location => {
            addLogs('Keys entered to element', query, location.x, location.y);
        });
        return this.element.sendKeys(query);
    };
};

class ElementArrayFinder {
    constructor(selector){
        this.selector = selector;
        this.elementArray = protractor.$$(selector);
    };

    get(index) {
        return this.elementArray.get(index);
    };
};


const $ = (selector) => {
    return new ElementFinder(selector);  
};

const $$ = (selector) => {
    return new ElementArrayFinder(selector);  
};

const addLogs = (action, value, x, y) => {
    logs['actions'].push({ 
        time: new Date(), 
        action: action, 
        value: value,
        x: x,
        y: y
    });
};

const openUrl = (url) => {
    addLogs('URL opened', url, null, null);
    return protractor.browser.get(url);
};

const saveLogs = () => {
    const PATH = './logs';
    fs.mkdir(PATH, () => {
        fs.writeFile(`${PATH}/logs.json`, JSON.stringify(logs));
    });
};

module.exports = { $, $$, ElementFinder, ElementArrayFinder, openUrl, saveLogs, };