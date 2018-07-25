"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// creating a "var module: any" will allow use of module.exports
var myPlugin = {
    onPageLoad: function (browser) {
        browser.executeScript("\n            document.getElementsByTagName(\"body\")[0].onclick = something(this);\n            \n            function something(element) {\n            }\n            ");
        //element.setAttribute("style", "background-color: red");
    }
};
module.exports = myPlugin;
//# sourceMappingURL=index.js.map