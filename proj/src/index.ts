import { ProtractorPlugin, ProtractorBrowser, ElementFinder, $ } from 'protractor';

declare var module: any;

// creating a "var module: any" will allow use of module.exports

let myPlugin: ProtractorPlugin = {
onPageLoad(browser: ProtractorBrowser) {

    setHTMLValue(browser);
  }
};

function setHTMLValue(browser: ProtractorBrowser) {
    // function setInnerHTML (div, content) {
    //     div.innerHTML = content;
    // }
    browser.executeScript('$("body").attr("style", "background-color: red")');
}

module.exports = myPlugin;