var fileManager = require('./file-manager');
var helper = require('./helper');
var logsTextValues = require('./logs-text-values.json');
var protractor = require('protractor');
var screenshoter = require('./screenshoter');
let currentPage = 'not specified yet';
let allPagesList = [];
let isNewRun = true;
const PATH = './logs';
class ElementFinder extends protractor.ElementFinder {
    constructor(handler) {
        switch (typeof handler) {
            case 'string':
                element = protractor.$(handler);
                break;
            case 'object': // ElementFinder
                element = handler;
                break;
        }
    }
    ;
    clear() {
        helper.getElementsLocation(element).then(location => {
            addLogs(logsTextValues.ELEMENT_CLEAR_LOG, null, location.x, location.y);
        });
        return super.clear();
    }
    ;
    click() {
        helper.getElementsLocation(element).then(location => {
            addLogs(logsTextValues.ELEMENT_CLICK_LOG, null, location.x, location.y);
        });
        return super.click();
    }
    ;
    sendKeys(query) {
        helper.getElementsLocation(element).then(location => {
            addLogs(logsTextValues.ELEMENT_SEND_KEYS_LOG, query, location.x, location.y);
        });
        return super.sendKeys(query);
    }
    ;
}
;
class ElementArrayFinder extends protractor.ElementArrayFinder {
    $(selector) { return protractor.ElementFinder; }
    ;
    get(index) { return protractor.ElementFinder(); }
    ;
}
;
const $ = (search) => protractor.ElementFinder;
const $$ = (selector) => protractor.ElementArrayFinder;
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
    }
    ;
    helper.getScreenSize().then(size => {
        addLogs(logsTextValues.PAGE_CHANGED_LOG, { screenshot: screenshoter.takeScreenshot(`${PATH}/screenshots`, pageName), resolution: { width: size.width, height: size.height } }, null, null, pageName);
    });
    currentPage = pageName;
};
const saveLogs = () => {
    fileManager.getFileContent(`${PATH}/tmp-logs`).then((logs) => {
        let lines = logs.split('\n');
        helper.removeLastElementFromList(lines); // because it is an empty one
        let pages = [];
        lines.forEach((line, index) => {
            let parsedLine = JSON.parse(line);
            if (parsedLine['action'] === logsTextValues.PAGE_CHANGED_LOG) {
                if (helper.isPageNewInList(parsedLine['page'], pages)) {
                    pages.push(line);
                }
                ;
                helper.removeElementFromList(lines, index);
            }
            ;
        });
        let result = { actions: helper.convertListToJSON(lines), pages: helper.convertListToJSON(pages) };
        fileManager.writeToFile(`${PATH}/logs.json`, JSON.stringify(result));
    });
};
module.exports = { $, $$, ElementFinder, ElementArrayFinder, openUrl, savePage, saveLogs };
//# sourceMappingURL=logs.js.map