import { ProtractorPlugin, ProtractorBrowser, ElementFinder, $ } from 'protractor';

declare var module: any;

// creating a "var module: any" will allow use of module.exports

let myPlugin: ProtractorPlugin = {
    onPageLoad(browser: ProtractorBrowser) {
        browser.executeScript(`
            document.getElementsByTagName("body")[0].onclick = something(this);
            
            function something(element) {
                
            }
            `);
            //element.setAttribute("style", "background-color: red");
    }
};


module.exports = myPlugin;