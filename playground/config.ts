import { Config } from 'protractor';
import * as JasmineConsoleReporter from 'jasmine-console-reporter';
import { saveLogs } from 'protractor-logs';

export let config: Config = {
    baseUrl: 'https://angularjs.org/',
    capabilities: {
        'browserName': 'chrome'
    },
    framework: 'jasmine2',
    specs: ['specs/**/*.spec.js'],
    jasmineNodeOpts: {
        defaultTimeoutInterval: 30000
    },
    onPrepare: () => {
        jasmine.getEnv().addReporter(new JasmineConsoleReporter({
            colors: 1,
            cleanStack: 1,
            verbosity: 4,
            listStyle: 'indent',
            activity: false
        }));
    },
    onComplete: () => {
        saveLogs();
    }
};