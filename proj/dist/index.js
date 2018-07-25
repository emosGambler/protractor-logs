"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// creating a "var module: any" will allow use of module.exports
var myPlugin = {
    onPageLoad: function (browser) {
        setHTMLValue(browser);
    }
};
function setHTMLValue(browser) {
    // function setInnerHTML (div, content) {
    //     div.innerHTML = content;
    // }
    browser.executeScript('$("body").attr("style", "background-color: red")');
}
module.exports = myPlugin;
//# sourceMappingURL=index.js.map