"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// creating a "var module: any" will allow use of module.exports
var myPlugin = {
    onPageLoad: function (browser) {
        browser.executeScript("\n            document.getElementsByTagName(\"body\")[0].onclick = something;\n            \n            function something() {\n                this.setAttribute(\"style\", \"background-color: red\");\n            }\n            ");
        //element.setAttribute("style", "background-color: red");
    }
};
module.exports = myPlugin;
//# sourceMappingURL=index.js.map