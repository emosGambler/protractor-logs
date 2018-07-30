import { ProtractorPlugin, ProtractorBrowser, ElementFinder, $ } from 'protractor';

declare var module: any;

// creating a "var module: any" will allow use of module.exports

let myPlugin: ProtractorPlugin = {
    onPageLoad(browser: ProtractorBrowser) {
        browser.executeScript(`
                document.addEventListener('click', function(e) {
                    e = e || window.event;
                    var target = e.target || e.srcElement;
                    styling = window.getComputedStyle(target).getPropertyValue('background-color');;
                    demo(target, styling);
                }, false);

                document.addEventListener('keydown', function(e) {
                    e = e || window.event;
                    var target = e.target || e.srcElement;
                    demo(target);
                }, false);

                function before(target) {
                    target.setAttribute("style", "background-color: red");
                }

                function after(target, defaultStyle) {
                    target.setAttribute("style", "background-color: defaultStyle");
                }
top
                function sleep(ms) {
                    return new Promise(resolve => setTimeout(resolve, ms));
                }
            
                async function demo(target, defaultStyle) {
                    before(target);
                    await sleep(2000);
                    after(target, defaultStyle);
                }

                // ('click mousedown mouseup focus blur keydown change mouseup click dblclick mousemove mouseover mouseout mousewheel keydown keyup keypress textInput touchstart touchmove touchend touchcancel resize scroll zoom focus blur select change submit reset', function(e) {

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