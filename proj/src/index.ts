import { ProtractorPlugin, ProtractorBrowser, ElementFinder, $ } from 'protractor';

declare var module: any;

// creating a "var module: any" will allow use of module.exports

let myPlugin: ProtractorPlugin = {
    onPageLoad(browser: ProtractorBrowser) {
        browser.executeScript(`
        document.addEventListener('click', function(e) {
            e = e || window.event;
            var target = e.target || e.srcElement;
            target.setAttribute("style", "background-color: red");  
        }, false);
            
            `);
            //element.setAttribute("style", "background-color: red");
    }
};

module.exports = myPlugin;

// document.addEventListener('click'), function(e) {
//     e = e || window.event;
//     var target = e.target || e.srcElement,
//         text = target.textContent
// }


// document.getElementsByTagName("body")[0].onclick = something;
            
//             function something() {
//                 this.setAttribute("style", "background-color: red");
//             }