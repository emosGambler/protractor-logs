import { ProtractorPlugin, ProtractorBrowser, ElementFinder, $ } from 'protractor';

declare var module: any;

// creating a "var module: any" will allow use of module.exports

let myPlugin: ProtractorPlugin = {
    onPageLoad(browser: ProtractorBrowser) {
        browser.executeScript(`
                document.addEventListener('click', function(e) {
                    e = e || window.event;
                    var target = e.target || e.srcElement;
                    demo(target);
                }, false);
                
                document.addEventListener('keydown', function(e) {
                    e = e || window.event;
                    var target = e.target || e.srcElement;
                    demo(target);
                }, false);

                function colorRed(target) {
                    target.setAttribute("style", "background-color: red");
                }

                function colorBlue(target) {
                    target.setAttribute("style", "background-color: blue");
                }

                function sleep(ms) {
                    return new Promise(resolve => setTimeout(resolve, ms));
                }
            
                async function demo(target) {
                    colorRed(target);
                    await sleep(2000);
                    colorBlue(target);
                }

                // document.addEventListener('click mousedown mouseup focus blur keydown change mouseup click dblclick mousemove mouseover mouseout mousewheel keydown keyup keypress textInput touchstart touchmove touchend touchcancel resize scroll zoom focus blur select change submit reset', function(e) {
                //     e = e || window.event;
                //     var target = e.target || e.srcElement;
                //     demo(target);
                // }, false);
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