"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// creating a "var module: any" will allow use of module.exports
var myPlugin = {
    addSuccess: function (info) {
        console.log('on success: ' + info.specName);
    },
    onPrepare: function () {
        this.addSuccess({ specName: 'Hello, World!' });
    },
    postTest: function () {
        console.log('WUBBA LUBBA DUB DUB');
    }
};
module.exports = myPlugin;
//# sourceMappingURL=index.js.map