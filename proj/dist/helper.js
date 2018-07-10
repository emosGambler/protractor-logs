"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var protractor = require("protractor");
exports.convertListToJSON = function (list) {
    return list.map(function (element) {
        return JSON.parse(element);
    });
};
exports.getElementsLocation = function (element) {
    return element.getLocation().then(function (location) {
        return element.getSize().then(function (size) {
            return {
                x: Math.floor(location.x + size.width / 2),
                y: Math.floor(location.y + size.height / 2)
            };
        });
    });
};
exports.getScreenSize = function () {
    return protractor.browser.driver.manage().window().getSize();
};
exports.isElementPresentInList = function (element, list) {
    var result = true;
    if (list.length === 0) {
        return true;
    }
    else {
        list.forEach(function (elementOfList) {
            if (elementOfList === element) {
                result = false;
            }
        });
        return result;
    }
    ;
};
exports.isPageNewInList = function (pageName, pagesList) {
    var result = true;
    if (pagesList.length === 0) {
        return true;
    }
    else {
        pagesList.forEach(function (page) {
            if (JSON.parse(page)['page'] === pageName) {
                result = false;
            }
        });
        return result;
    }
    ;
};
exports.removeLastElementFromList = function (lines) {
    return exports.removeElementFromList(lines, lines.length - 1);
};
exports.removeElementFromList = function (list, index) {
    return list.splice(index, 1);
};
//# sourceMappingURL=helper.js.map