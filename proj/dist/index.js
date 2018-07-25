"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// creating a "var module: any" will allow use of module.exports
var myPlugin = {
    onPageLoad: function (browser) {
        browser.executeScript('$("body").on("click", () => { alert("OOOOPS") })');
    }
};
module.exports = myPlugin;
//# sourceMappingURL=index.js.map