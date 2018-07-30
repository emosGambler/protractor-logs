import { ProtractorPlugin, ProtractorBrowser, ElementFinder, $ } from 'protractor';

declare var module: any;

// creating a "var module: any" will allow use of module.exports

let myPlugin: ProtractorPlugin = {
    onPageLoad(browser: ProtractorBrowser) {
        browser.executeScript(`
            document.addEventListener('click', function(e) {
                e = e || window.event;
                var target = e.target || e.srcElement;
                target.setAttribute("style", "color: Blue; border: 2px solid blue;");   
            }, false);
        `);
    }
};

module.exports = myPlugin;
