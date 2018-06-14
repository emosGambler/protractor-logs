const { $, $$, ElementFinder, ElementArrayFinder, openUrl,  savePage, saveLogs } = require('./logs/logs');
setPage = savePage;
module.exports = { $, $$, ElementFinder, ElementArrayFinder, openUrl, setPage, saveLogs };