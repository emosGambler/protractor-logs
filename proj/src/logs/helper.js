var protractor = require('protractor');

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

module.exports = { getScreenSize, isElementPresentInList };