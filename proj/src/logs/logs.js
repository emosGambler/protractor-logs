var protractor = require('protractor');
var rimraf = require('rimraf');
var fs = require('fs');

let logs = { actions: [] };
let currentPage = 'not specified yet';
let pageLogs = [];

const ELEMENT_CLEAR_LOG = 'element.clear()';
const ELEMENT_CLICK_LOG = 'element.click()';
const ELEMENT_GET_ATTRIBUTE_LOG = 'element.getAttribute()';
const ELEMENT_GET_TEXT_LOG = 'element.getText()';
const ELEMENT_IS_DISPLAYED_LOG = 'element.isDisplayed()';
const ELEMENT_IS_PRESENT_LOG = 'element.isPresent()';
const ELEMENT_SEND_KEYS_LOG = 'element.sendKeys()';
const URL_OPENED = 'browser.get()';

class ElementFinder {
    constructor(selector){
        this.element = protractor.$(selector);
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
        this.elementArray = protractor.$$(selector);
    };

    $(selector) {
        return new ElementFinder(selector);  
    };

    get(index) {
        const clear = () => {
            this.elementArray.get(index).getLocation().then(location => {
                addLogs(ELEMENT_CLEAR_LOG, null, location.x, location.y);
            });
            return this.elementArray.get(index).clear();
        };
        
        const click = () => {
            this.elementArray.get(index).getLocation().then(location => {
                addLogs(ELEMENT_CLICK_LOG, null, location.x, location.y);
            });
            return this.elementArray.get(index).click();
        };

        const getAttribute = (attribute) => {
            this.elementArray.get(index).getLocation().then(location => {
                addLogs(ELEMENT_GET_ATTRIBUTE_LOG, null, location.x, location.y);
            });
            return this.elementArray.get(index).getAttribute(attribute);
        };

        const getText = () => {
            this.elementArray.get(index).getLocation().then(location => {
                addLogs(ELEMENT_GET_TEXT_LOG, null, location.x, location.y);
            });
            return this.elementArray.get(index).getText();
        };

        const isDisplayed = () => {
            this.elementArray.get(index).getLocation().then(location => {
                this.elementArray.get(index).isPresent().then(isPresent => {
                    if (isPresent) {
                        this.elementArray.get(index).isDisplayed().then(isDisplayed => {
                            addLogs(ELEMENT_IS_DISPLAYED_LOG, isDisplayed, location.x, location.y);
                        });
                    } else {
                        addLogs(ELEMENT_IS_DISPLAYED_LOG, false, location.x, location.y);
                    }
                });
            });
            return this.elementArray.get(index).isDisplayed();
        };

        const isPresent = () => {
            this.elementArray.get(index).getLocation().then(location => {
                this.elementArray.get(index).isPresent().then(isPresent => {
                    addLogs(ELEMENT_IS_PRESENT_LOG, isPresent, location.x, location.y);
                });
            });
            return this.elementArray.get(index).isPresent();
        };

        const sendKeys = (query) => {
            this.elementArray.get(index).getLocation().then(location => {
                addLogs(ELEMENT_SEND_KEYS_LOG, null, location.x, location.y);
            });
            return this.elementArray.get(index).sendKeys(query);
        };
    };
};


const $ = (selector) => {
    return new ElementFinder(selector);  
};

const $$ = (selector) => {
    return new ElementArrayFinder(selector);  
};

const addLogs = (action, value, x, y, page = currentPage) => {
    logs['actions'].push({ 
        time: new Date(), 
        action: action, 
        value: value,
        x: x,
        y: y,
        page: page
    });
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

const saveLogs = () => {
    const PATH = './logs';
    fs.mkdir(PATH, () => {
        fs.writeFile(`${PATH}/logs.json`, JSON.stringify(logs).replace(/.$/, '').concat(',"pages":').concat(JSON.stringify(pageLogs).concat('}')));
    });
};

const setPage = (pageName) => {
    console.log('\npagename: ', pageName);
    if (isPageNew(pageName)) {
        let screenshotPath = 'makeScreenshot()';
        pageLogs.push({
            pageName: pageName,
            screenshotPath: screenshotPath
        });
    }
    currentPage = pageName;
};

module.exports = { $, $$, ElementFinder, ElementArrayFinder, openUrl, saveLogs, setPage };