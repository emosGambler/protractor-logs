"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var protractor = require("protractor");
var fileManager = require("./file-manager");
var helper = require("./helper");
var screenshoter = require("./screenshoter");
var logsTextValues = require("./logs-text-values");
var currentPage = 'not specified yet';
var allPagesList = [];
var isNewRun = true;
var PATH = './logs';
var ElementArrayFinder = /** @class */ (function (_super) {
    __extends(ElementArrayFinder, _super);
    function ElementArrayFinder(browser_, getWebElements, locator_, actionResults_) {
        return _super.call(this, browser_, getWebElements, locator_, actionResults_) || this;
    }
    ;
    return ElementArrayFinder;
}(protractor.ElementArrayFinder));
exports.ElementArrayFinder = ElementArrayFinder;
;
var ElementFinder = /** @class */ (function (_super) {
    __extends(ElementFinder, _super);
    function ElementFinder(browser_, elementArrayFinder) {
        return _super.call(this, browser_, elementArrayFinder) || this;
    }
    ;
    return ElementFinder;
}(protractor.ElementFinder));
exports.ElementFinder = ElementFinder;
;
/*export class ElementArrayFinder extends protractor.ElementArrayFinder{
    $(selector) { return protractor.ElementFinder; };
    get(index: number): any { return ElementFinder; };
};*/
var addLogs = function (action, value, x, y, page) {
    if (page === void 0) { page = currentPage; }
    var actionLog = {
        time: new Date(),
        action: action,
        value: value,
        x: x,
        y: y,
        page: page
    };
    saveAction(actionLog);
};
exports.openUrl = function (url) {
    addLogs(logsTextValues.URL_OPENED_LOG, url, null, null);
    return protractor.browser.get(url);
};
var saveAction = function (log) {
    if (isNewRun) {
        fileManager.createDirIfNotExists("" + PATH);
        fileManager.createDirIfNotExists(PATH + "/screenshots");
        fileManager.cleanFile(PATH + "/tmp-logs");
        fileManager.cleanFile(PATH + "/logs.json");
        isNewRun = false;
    }
    fileManager.appendToFile(PATH + "/tmp-logs", JSON.stringify(log) + "\n");
};
exports.savePage = function (pageName) {
    if (helper.isElementPresentInList(pageName, allPagesList)) {
        allPagesList.push(pageName);
    }
    ;
    helper.getScreenSize().then(function (size) {
        addLogs(logsTextValues.PAGE_CHANGED_LOG, { screenshot: screenshoter.takeScreenshot(PATH + "/screenshots", pageName), resolution: { width: size.width, height: size.height } }, null, null, pageName);
    });
    currentPage = pageName;
};
exports.saveLogs = function () {
    fileManager.getFileContent(PATH + "/tmp-logs").then(function (logs) {
        var lines = logs.split('\n');
        helper.removeLastElementFromList(lines); // because it is an empty one
        var pages = [];
        lines.forEach(function (line, index) {
            var parsedLine = JSON.parse(line);
            if (parsedLine['action'] === logsTextValues.PAGE_CHANGED_LOG) {
                if (helper.isPageNewInList(parsedLine['page'], pages)) {
                    pages.push(line);
                }
                ;
                helper.removeElementFromList(lines, index);
            }
            ;
        });
        var result = { actions: helper.convertListToJSON(lines), pages: helper.convertListToJSON(pages) };
        fileManager.writeToFile(PATH + "/logs.json", JSON.stringify(result));
    });
};
//# sourceMappingURL=logs.js.map