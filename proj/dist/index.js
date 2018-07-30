"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// creating a "var module: any" will allow use of module.exports
var myPlugin = {
    onPageLoad: function (browser) {
        browser.executeScript("\n        document.addEventListener('click', function(e) {\n            e = e || window.event;\n            var target = e.target || e.srcElement;\n            target.setAttribute(\"style\", \"color: Red; border: 2px solid red;\");   \n        }, false);\n            \n            ");
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