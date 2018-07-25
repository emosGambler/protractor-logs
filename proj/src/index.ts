import { ProtractorPlugin, ProtractorBrowser, ElementFinder, $ } from 'protractor';

declare var module: any;

// creating a "var module: any" will allow use of module.exports

let myPlugin: ProtractorPlugin = {
    onPageLoad(browser: ProtractorBrowser) {
        browser.executeScript('$("body").on("click", () => { alert("OOOOPS") })');
    }
};


module.exports = myPlugin;