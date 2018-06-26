var protractor = require('protractor');
var fs = require('fs');
var logsTextValues = require('./logs-text-values.json');
let currentPage = 'not specified yet';
let allPagesList = [];
let isNewRun = true;
const PATH = './logs';
var fileManager = require('./file-manager');

class ElementFinder {
    constructor(handler) {
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
            addLogs(logsTextValues.ELEMENT_CLEAR_LOG, null, location.x, location.y);
        });
        return this.element.clear();
    };

    click() {
        this.element.getLocation().then(location => {
            addLogs(logsTextValues.ELEMENT_CLICK_LOG, null, location.x, location.y);
        });
        return this.element.click();
    };

    getAttribute(attribute) {
        this.element.getLocation().then(location => {
            addLogs(logsTextValues.ELEMENT_GET_ATTRIBUTE_LOG, attribute, location.x, location.y);
        });
        return this.element.getAttribute(attribute);
    };

    getText() {
        this.element.getLocation().then(location => {
            addLogs(logsTextValues.ELEMENT_GET_TEXT_LOG, null, location.x, location.y);
        });
        return this.element.getText();
    };

    isDisplayed() {
        this.element.getLocation().then(location => {
            this.element.isPresent().then(isPresent => {
                if (isPresent) {
                    this.element.isDisplayed().then(isDisplayed => {
                        addLogs(logsTextValues.ELEMENT_IS_DISPLAYED_LOG, isDisplayed, location.x, location.y);
                    });
                } else {
                    addLogs(logsTextValues.ELEMENT_IS_DISPLAYED_LOG, 'false', location.x, location.y);
                }
            });
        });
        return this.element.isDisplayed();
    };

    isPresent() {
        this.element.getLocation().then(location => {
            this.element.isPresent().then(isPresent => {
                if (isPresent) {
                        addLogs(logsTextValues.ELEMENT_IS_PRESENT_LOG, 'true', location.x, location.y);
                } else {
                    addLogs(logsTextValues.ELEMENT_IS_PRESENT_LOG, 'false', location.x, location.y);
                }
            });
        });
        return this.element.isPresent();
    };

    sendKeys(query) {
        this.element.getLocation().then(location => {
            addLogs(logsTextValues.ELEMENT_SEND_KEYS_LOG, query, location.x, location.y);
        });
        return this.element.sendKeys(query);
    };
};

class ElementArrayFinder {
    
    constructor(selector) {
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
    addLogs(logsTextValues.URL_OPENED_LOG, url, null, null);
    return protractor.browser.get(url);
};

const isPageNew = (pageName, pagesList) => {
    let result = true;
    if (pagesList.length === 0) {
        return true;
    } else {
        pagesList.forEach((page) => {
            if (page === pageName) {
                result = false;
             }
        });
        return result;
    };
};

const isPageNew2 = (pageName, pagesList) => {
    let result = true;
    if (pagesList.length === 0) {
        return true;
    } else {
        pagesList.forEach((page) => {
            if (JSON.parse(page)['page'] === pageName) {
                result = false;
             }
        });
        return result;
    };
};

const saveAction = (log) => {
    if (isNewRun) {
        fileManager.createDirIfNotExists(`${PATH}`);
        fileManager.createDirIfNotExists(`${PATH}/screenshots`);
        fileManager.cleanFile(`${PATH}/tmp-logs`);
        fileManager.cleanFile(`${PATH}/logs.json`);
        isNewRun = false;
    }
    fileManager.appendToFile(`${PATH}/tmp-logs`, `${JSON.stringify(log)}\n`);
};

// file manager from here 

const savePage = (pageName) => {
    if (isPageNew(pageName, allPagesList)) {
        allPagesList.push(pageName);
    };
    let screenshotPath = takeScreenshot(pageName);
    protractor.browser.driver.manage().window().getSize().then(size => {
        addLogs('Page changed', { screenshot: screenshotPath, resolution: `${size.width} x ${size.height}`}, null, null, pageName);
    });
    currentPage = pageName;
};

const takeScreenshot = (pageName) => {
    protractor.browser.takeScreenshot().then(png => {
        let stream = fs.createWriteStream(`${PATH}/screenshots/${pageName}.png`);
        stream.write(new Buffer(png, 'base64'));
        stream.end();
    });
    return `${PATH}/screenshots/${pageName}.png`;
};

const saveLogs = () => {
    rawLogs = () => { 
        return new Promise((resolve, reject) => {
            return fs.readFile(`${PATH}/tmp-logs`, 'utf8', (err, data) => {
                return err ? reject(err) : resolve(data);
            });
        });
    };
    rawLogs().then((logs) => {
        let lines = logs.split('\n');
        let pages = [];
        lines.splice(lines.length - 1, 1);
        // get unique pages
        lines.forEach((line, index) => {
            let parsedLine = JSON.parse(line);
            if (parsedLine['action'] === 'Page changed') {
                if (isPageNew2(parsedLine['page'], pages)) {
                    pages.push(line);
                };
                lines.splice(index, 1);
            };
        });
        // saving file
        lines = lines.map(line => {
            return JSON.parse(line);
        });
        pages = pages.map(page => {
            return JSON.parse(page);
        });
        let finalLogs = { actions: lines, pages: pages };
        fs.writeFile(`${PATH}/logs.json`, JSON.stringify(finalLogs), (err) => { return err; } );
    });
};

module.exports = { $, $$, ElementFinder, ElementArrayFinder, openUrl, savePage, saveLogs };