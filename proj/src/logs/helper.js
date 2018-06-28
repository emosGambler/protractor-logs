var protractor = require('protractor');

const convertListToJSON = (list) => {
    return list.map(element => {
        return JSON.parse(element);
    });
};

const getElementsLocation = (element) => {
    return element.getLocation().then(location => {
        return element.getSize().then(size => {
            return {
                x: Math.floor(location.x + size.width / 2),
                y: Math.floor(location.y + size.height / 2)
            }
        });
    });
};

const getScreenSize = () => {
    return protractor.browser.driver.manage().window().getSize();
};

const isElementPresentInList = (element, list) => {
    let result = true;
    if (list.length === 0) {
        return true;
    } else {
        list.forEach((elementOfList) => {
            if (elementOfList === element) {
                result = false;
             }
        });
        return result;
    };
};

const isPageNewInList = (pageName, pagesList) => {
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

const removeLastElementFromList = (lines) => {
    return removeElementFromList(lines, lines.length - 1);
};

const removeElementFromList = (list, index) => {
    return list.splice(index, 1);
};

module.exports = { convertListToJSON, getElementsLocation, getScreenSize, isElementPresentInList, isPageNewInList, removeElementFromList, removeLastElementFromList };