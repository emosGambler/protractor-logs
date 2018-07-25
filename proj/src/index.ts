import { ProtractorPlugin } from 'protractor';

declare var module: any;

// creating a "var module: any" will allow use of module.exports

let myPlugin: ProtractorPlugin = {
  addSuccess(info: {specName: string}) {
    console.log('on success: ' + info.specName);
},
onPrepare() {
    this.addSuccess({specName: 'Hello, World!'});
},
postTest() {
    console.log('WUBBA LUBBA DUB DUB');
  }
};

module.exports = myPlugin;