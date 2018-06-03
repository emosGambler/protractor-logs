# IN PROGRESS
# How to use it?
1. `npm install --save protractor-logs` where your package.json is

2. Now import desired protractor things like ElementFinder, $, ... etc.:

`import { ElementFinder, $ } from 'protractor-logs'`

It works the same way as protractor, but will also add logs about these actions.

3. Use like normally you would:

`public nameInput: ElementFinder;
this.nameInput = $('input[placeholder="Enter a name here"]');
this.nameInput.sendKeys(userName);` 

etc.

4. In protractor config add import (or require if using js):

`import { saveLogs } from 'protractor-logs'`

5. And then add this:

`onComplete: () => { saveLogs(); }`
 
 This will create a `logs/logs.json` file in your directory:
 
 ![https://i.imgur.com/cfSIGhm.png](https://i.imgur.com/cfSIGhm.png)
