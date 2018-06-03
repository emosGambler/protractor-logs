import { promise } from 'protractor';
import { openUrl, ElementFinder, ElementArrayFinder, $, $$ } from 'protractor-logs';

export class HomePage {
    public url: string;
    public nameInput: ElementFinder;
    public greeting: ElementArrayFinder;
    public elemencik: ElementFinder;

    constructor() {
        this.url = 'https://angularjs.org/';

        this.elemencik = $('img[src="https://ssl.gstatic.com/images/icons/gplus-32.png"]');
        this.greeting = $$('div > h1').get(1);
        this.nameInput = $('input[placeholder="Enter a name here"]');
    }

    public clickGooglePlusicon(): void {
        this.elemencik.click();
    };

    public open(): void {
        openUrl(this.url);
    };

    public setName(userName: string): void {
        this.nameInput.clear();
        this.nameInput.sendKeys(userName);
    };

    public getName(): promise.Promise<string> {
        return this.nameInput.getAttribute('value');
    };

    public getGreetings(): promise.Promise<string> {
        return this.greeting.getText();
    };
}