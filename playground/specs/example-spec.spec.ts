import { browser } from 'protractor';
import { ExamplePage } from './../pages/example.page';
import { namesData } from './../data/example.td';
import * as using from 'jasmine-data-provider';
import { openUrl } from 'protractor-logs';

const homePage: ExamplePage = new ExamplePage();

describe('Example', () => {
    beforeAll(() => {
        openUrl(homePage.url);
    });
    
    it('should element.clear() work', () => {
        homePage.nameInput.sendKeys('test');
        expect(homePage.nameInput.getAttribute('value')).toBe('test');
        
        homePage.nameInput.clear();
        expect(homePage.nameInput.getAttribute('value')).toBe('');
    });
    
    it('should element.click() work', () => {
        expect(homePage.learnMenu.isDisplayed()).toBe(false);
        
        homePage.learnMenuOption.click();
        expect(homePage.learnMenu.isDisplayed()).toBe(true);
    });
    
    it('should element.getAttribute() work', () => {
        expect(homePage.nameInput.getAttribute('value')).toBe('');
    });
    
    it('should element.getText() work', () => {
        homePage.nameInput.sendKeys('test');
        expect(homePage.greeting.getText()).toBe('Hello test!');
    });
    
    it('should element.isDisplayed() work', () => {
        expect(homePage.logo.isDisplayed()).toBe(true);
    });
    
    it('should element.isPresent() work', () => {
        expect(homePage.logo.isPresent()).toBe(true);
    });
    
    it('should element.sendKeys() work', () => {
        homePage.nameInput.clear();
        homePage.nameInput.sendKeys('test');
        expect(homePage.nameInput.getAttribute('value')).toBe('test');
    });
});