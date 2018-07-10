import * as protractor from 'protractor';

import * as fileManager from './file-manager';
import * as helper from './helper';
import * as screenshoter from './screenshoter';
import * as logsTextValues from './logs-text-values';

let currentPage = 'not specified yet';
let allPagesList = [];
let isNewRun = true;
const PATH = './logs';

export let element: protractor.ElementHelper;
export let $: (search: string) => protractor.ElementFinder;
export let $$: (search: string) => protractor.ElementArrayFinder;

export class ElementArrayFinder extends protractor.ElementArrayFinder {

    constructor(browser_: protractor.ProtractorBrowser, getWebElements?: () => protractor.promise.Promise<protractor.WebElement[]>, locator_?: any, actionResults_?: protractor.promise.Promise<any>) {
        super(browser_, getWebElements, locator_, actionResults_);
    };
};

export class ElementFinder extends protractor.ElementFinder {

    constructor(browser_: protractor.ProtractorBrowser, elementArrayFinder: protractor.ElementArrayFinder) {
        super(browser_, elementArrayFinder);
    };
    
    /*constructor(handler) {
        switch(typeof handler) {
            case 'string':
                element = protractor.$(handler);
                break;
            case 'object': // ElementFinder
                element = handler;
                break;
        }
    };

    clear() {
        helper.getElementsLocation(element).then(location => {
            addLogs(logsTextValues.ELEMENT_CLEAR_LOG, null, location.x, location.y);
        });
        return super.clear();
    };

    click() {
        helper.getElementsLocation(element).then(location => {
            addLogs(logsTextValues.ELEMENT_CLICK_LOG, null, location.x, location.y);
        });
        return super.click();
    };

    sendKeys(query) {
        helper.getElementsLocation(element).then(location => {
            addLogs(logsTextValues.ELEMENT_SEND_KEYS_LOG, query, location.x, location.y);
        });
        return super.sendKeys(query);
    };*/
};

/*export class ElementArrayFinder extends protractor.ElementArrayFinder{
    $(selector) { return protractor.ElementFinder; };
    get(index: number): any { return ElementFinder; };
};*/

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

export const openUrl = (url) => {
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

export const savePage = (pageName) => {
    if (helper.isElementPresentInList(pageName, allPagesList)) {
        allPagesList.push(pageName);
    };
    helper.getScreenSize().then(size => {
        addLogs(logsTextValues.PAGE_CHANGED_LOG, { screenshot: screenshoter.takeScreenshot(`${PATH}/screenshots`, pageName), resolution: { width: size.width, height: size.height } }, null, null, pageName);
    });
    currentPage = pageName;
};

export const saveLogs = () => {
    fileManager.getFileContent(`${PATH}/tmp-logs`).then((logs) => {
        let lines = logs.split('\n');
        helper.removeLastElementFromList(lines); // because it is an empty one
        let pages = [];
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