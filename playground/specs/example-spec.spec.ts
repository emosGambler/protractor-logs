import { browser } from 'protractor';
import { HomePage } from './../pages/examplePage.page';
import { namesData } from './../data/example.td';
import * as using from 'jasmine-data-provider';
import { openUrl } from 'protractor-logs';

const homePage: HomePage = new HomePage();

describe('Example', () => {
    beforeAll(() => {
        openUrl(homePage.url);
    });
    
    it('should logo be displayed', () => {
        expect(homePage.logo.isDisplayed()).toBe(true);
    });

    it('should logo be present', () => {
        expect(homePage.logo.isPresent()).toBe(true);
    });

    it('should type name', () => {
        homePage.setName('name');
        expect(homePage.getName()).toEqual('name');
    });
    
    it('should update greetings', () => {
        expect(homePage.getGreetings()).toEqual('Hello name!');
    });

    it('should not fail', () => {
        homePage.open();
        homePage.clickGooglePlusicon();
        expect(browser.driver.getCurrentUrl()).toContain('plus.google.com');
    });
});