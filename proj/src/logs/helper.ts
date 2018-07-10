import * as protractor from 'protractor';

export const convertListToJSON = (list) => {
    return list.map(element => {
        return JSON.parse(element);
    });
};

export const getElementsLocation = (element) => {
    return element.getLocation().then(location => {
        return element.getSize().then(size => {
            return {
                x: Math.floor(location.x + size.width / 2),
                y: Math.floor(location.y + size.height / 2)
            }
        });
    });
};

export const getScreenSize = () => {
    return protractor.browser.driver.manage().window().getSize();
};

export const isElementPresentInList = (element, list) => {
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

export const isPageNewInList = (pageName, pagesList) => {
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

export const removeLastElementFromList = (lines) => {
    return removeElementFromList(lines, lines.length - 1);
};

export const removeElementFromList = (list, index) => {
    return list.splice(index, 1);
};