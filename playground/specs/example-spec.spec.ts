import { AngularPage } from './../pages/angular.page';
import { HomePage } from './../pages/home.page';
import { openUrl, setPage, saveLogs } from 'protractor-logs';

const homePage: HomePage = new HomePage();
const angularPage: AngularPage = new AngularPage();

describe('Example', () => {
    beforeAll(() => {
        openUrl(homePage.url);
        setPage('home.page');
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

        homePage.learnMenu.click();
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

    it('test', () => {
        homePage.todoAddButton.click();
    });
});
describe('Example of another page', () => {
    beforeAll(() => {
        openUrl(angularPage.url);
        setPage('angular.page');
    });
    
    it('should new page be added to logs', () => {
        expect(angularPage.title.getText()).toBe('One framework.\nMobile & desktop.');
    });
});
fdescribe('Going back to home page', () => {
    beforeAll(() => {
        openUrl(homePage.url);
        setPage('home.page');
    });
    
    it('should not add any more pages to logs', () => {
        expect(homePage.logo.isPresent()).toBe(true);
    });
    
    it('should each() work', () => {
        homePage.variousButtons.each((element, index) => {
            element.getText().then(text => {
                console.log('text: ', text);
                console.log('index: ', index);
            });
        });
    });
    
    it('should getText() work', () => {
        expect(homePage.variousButtons.getText()).toEqual(['something']);
    });
});