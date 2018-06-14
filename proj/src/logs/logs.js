var protractor = require('protractor');
var fs = require('fs');

let currentPage = 'not specified yet';
let pageLogs = [];
const currentTime = new Date();

const getCurrentDate = () => {
    return `${currentTime.getFullYear()}-${currentTime.getMonth() + 1}-${currentTime.getDate()}-${currentTime.getHours()}-${currentTime.getMinutes()}-${currentTime.getSeconds()}-${currentTime.getMilliseconds()}`;
};

let currentDate = getCurrentDate();
const PATH = './logs';

const ELEMENT_CLEAR_LOG = 'element.clear()';
const ELEMENT_CLICK_LOG = 'element.click()';
const ELEMENT_GET_ATTRIBUTE_LOG = 'element.getAttribute()';
const ELEMENT_GET_TEXT_LOG = 'element.getText()';
const ELEMENT_IS_DISPLAYED_LOG = 'element.isDisplayed()';
const ELEMENT_IS_PRESENT_LOG = 'element.isPresent()';
const ELEMENT_SEND_KEYS_LOG = 'element.sendKeys()';
const URL_OPENED = 'browser.get()';

class ElementFinder {
    constructor(handler){
        switch(typeof handler) {
            case 'string':
                this.element = protractor.$(handler);
                break;
            case 'object': // ElementFinder
                this.element = handler;
                break;
        }
    };

    clear() {
        this.element.getLocation().then(location => {
            addLogs(ELEMENT_CLEAR_LOG, null, location.x, location.y);
        });
        return this.element.clear();
    };

    click() {
        this.element.getLocation().then(location => {
            addLogs(ELEMENT_CLICK_LOG, null, location.x, location.y);
        });
        return this.element.click();
    };

    getAttribute(attribute) {
        this.element.getLocation().then(location => {
            addLogs(ELEMENT_GET_ATTRIBUTE_LOG, attribute, location.x, location.y);
        });
        return this.element.getAttribute(attribute);
    };

    getText() {
        this.element.getLocation().then(location => {
            addLogs(ELEMENT_GET_TEXT_LOG, null, location.x, location.y);
        });
        return this.element.getText();
    };

    isDisplayed() {
        this.element.getLocation().then(location => {
            this.element.isPresent().then(isPresent => {
                if (isPresent) {
                    this.element.isDisplayed().then(isDisplayed => {
                        addLogs(ELEMENT_IS_DISPLAYED_LOG, isDisplayed, location.x, location.y);
                    });
                } else {
                    addLogs(ELEMENT_IS_DISPLAYED_LOG, isPresent, location.x, location.y);
                }
            });
        });
        return this.element.isDisplayed();
    };

    isPresent() {
        this.element.getLocation().then(location => {
            this.element.isPresent().then(isPresent => {
                if (isPresent) {
                        addLogs(ELEMENT_IS_PRESENT_LOG, isPresent, location.x, location.y);
                } else {
                    addLogs(ELEMENT_IS_PRESENT_LOG, isPresent, location.x, location.y);
                }
            });
        });
        return this.element.isPresent();
    };

    sendKeys(query) {
        this.element.getLocation().then(location => {
            addLogs(ELEMENT_SEND_KEYS_LOG, query, location.x, location.y);
        });
        return this.element.sendKeys(query);
    };
};

class ElementArrayFinder {
    
    constructor(selector){
        this.selector = selector;
    };

    $(selector) {
        return new ElementFinder(selector);  
    };

    get(index) {
        return new ElementFinder(protractor.$$(this.selector).get(index));
    };
};


const $ = (selector) => {
    return new ElementFinder(selector);  
};

const $$ = (selector) => {
    return new ElementArrayFinder(selector);  
};

const addLogs = (action, value, x, y, page = currentPage) => {
    let actionLog = { 
        time: new Date(), 
        action: action, 
        value: value,
        x: x,
        y: y,
        page: page
    };
    saveAction(actionLog);
};

const openUrl = (url) => {
    addLogs(URL_OPENED, url, null, null);
    return protractor.browser.get(url);
};

const isPageNew = (pageName) => {
    let result = true;
    if (pageLogs.length === 0) {
        return true;
    } else {
        pageLogs.forEach((page) => {
            if(page.pageName === pageName) {
                result = false;
             }
        });
        return result;
    };
};

const saveAction = (log) => {
    fs.appendFile(`${PATH}/tmp-logs${currentDate}`, `${JSON.stringify(log)}\n`, (err) => { return err; } );
};

const savePage = (pageName) => {
    if (isPageNew(pageName)) {
        let screenshotPath = 'makeScreenshot()';
        let log = { 
            time: new Date(), 
            action: 'Page changed', 
            value: { screenshot: screenshotPath, resolution: '1000px x 1000px'},
            x: null,
            y: null,
            page: pageName
        };
        fs.appendFile(`${PATH}/tmp-logs${currentDate}`, `${JSON.stringify(log)}\n`, (err) => { return err; } );
    }
    currentPage = pageName;
};

const saveLogs = () => {
    rawLogs = () => { 
        return new Promise((resolve, reject) => {
            return fs.readFile(`${PATH}/tmp-logs${currentDate}`, 'utf8', (err, data) => {
                return err ? reject(err) : resolve(data);
            });
        });
    };
    rawLogs().then(logs => {
        console.log('logs: ', logs);
    });
    currentDate = getCurrentDate();
};

module.exports = { $, $$, ElementFinder, ElementArrayFinder, openUrl, savePage, saveLogs };