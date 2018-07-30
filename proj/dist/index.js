"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// creating a "var module: any" will allow use of module.exports
var myPlugin = {
    onPageLoad: function (browser) {
        browser.executeScript("\n                document.addEventListener('click', function(e) {\n                    e = e || window.event;\n                    var target = e.target || e.srcElement;\n                    demo(target);\n                }, false);\n                \n                document.addEventListener('keydown', function(e) {\n                    e = e || window.event;\n                    var target = e.target || e.srcElement;\n                    demo(target);\n                }, false);\n\n                function colorRed(target) {\n                    target.setAttribute(\"style\", \"background-color: red\");\n                }\n\n                function colorBlue(target) {\n                    target.setAttribute(\"style\", \"background-color: blue\");\n                }\n\n                function sleep(ms) {\n                    return new Promise(resolve => setTimeout(resolve, ms));\n                }\n            \n                async function demo(target) {\n                    colorRed(target);\n                    await sleep(2000);\n                    colorBlue(target);\n                }\n\n                // document.addEventListener('click mousedown mouseup focus blur keydown change mouseup click dblclick mousemove mouseover mouseout mousewheel keydown keyup keypress textInput touchstart touchmove touchend touchcancel resize scroll zoom focus blur select change submit reset', function(e) {\n                //     e = e || window.event;\n                //     var target = e.target || e.srcElement;\n                //     demo(target);\n                // }, false);\n            ");
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