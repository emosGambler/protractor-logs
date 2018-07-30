"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// creating a "var module: any" will allow use of module.exports
var myPlugin = {
    onPageLoad: function (browser) {
        browser.executeScript("\n                document.addEventListener('click', function(e) {\n                    e = e || window.event;\n                    var target = e.target || e.srcElement;\n                    styling = window.getComputedStyle(target).getPropertyValue('background-color');;\n                    demo(target, styling);\n                }, false);\n\n                document.addEventListener('keydown', function(e) {\n                    e = e || window.event;\n                    var target = e.target || e.srcElement;\n                    demo(target);\n                }, false);\n\n                function before(target) {\n                    target.setAttribute(\"style\", \"background-color: red\");\n                }\n\n                function after(target, defaultStyle) {\n                    target.setAttribute(\"style\", \"background-color: defaultStyle\");\n                }\ntop\n                function sleep(ms) {\n                    return new Promise(resolve => setTimeout(resolve, ms));\n                }\n            \n                async function demo(target, defaultStyle) {\n                    before(target);\n                    await sleep(2000);\n                    after(target, defaultStyle);\n                }\n\n                // ('click mousedown mouseup focus blur keydown change mouseup click dblclick mousemove mouseover mouseout mousewheel keydown keyup keypress textInput touchstart touchmove touchend touchcancel resize scroll zoom focus blur select change submit reset', function(e) {\n\n            ");
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
//# sourceMappingURL=index.js.map