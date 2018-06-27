var protractor = require('protractor');
var fs = require('fs');
var logsTextValues = require('./logs-text-values.json');
let currentPage = 'not specified yet';
let allPagesList = [];
let isNewRun = true;
const PATH = './logs';
var fileManager = require('./file-manager');
var screenshoter = require('./screenshoter');
var helper = require('./helper');

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

const savePage = (pageName) => {
    if (helper.isElementPresentInList(pageName, allPagesList)) {
        allPagesList.push(pageName);
    };
    helper.getScreenSize().then(size => {
        addLogs(logsTextValues.PAGE_CHANGED_LOG, { screenshot: screenshoter.takeScreenshot(`${PATH}/screenshots`, pageName), resolution: { width: size.width, height: size.height } }, null, null, pageName);
    });
    currentPage = pageName;
};

const saveLogs = () => {
    fileManager.getFileContent(`${PATH}/tmp-logs`).then((logs) => {
        let lines = logs.split('\n');
        let pages = [];
        helper.removeLastElementFromList(lines); // because it is an empty one
        lines.forEach((line, index) => {
            let parsedLine = JSON.parse(line);
            if (parsedLine['action'] === logsTextValues.PAGE_CHANGED_LOG) {
                if (helper.isPageNewInList(parsedLine['page'], pages)) {
                    pages.push(line);
                };
                helper.removeElementFromList(lines, index);
            };
        });
        let result = { actions: helper.convertListToJSON(lines), pages: helper.convertListToJSON(pages) };
        fileManager.writeToFile(`${PATH}/logs.json`, JSON.stringify(result));
    });
};

module.exports = { $, $$, ElementFinder, ElementArrayFinder, openUrl, savePage, saveLogs };