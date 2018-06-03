import { $, $$, element, by, promise, ElementFinder } from 'protractor';
import { openUrl } from 'protractor-logs';

export class HomePage {
    public url: string;
    private container: ElementFinder;
    public nameInput: ElementFinder;
    public greeting: ElementFinder;

    constructor() {
        this.url = 'https://angularjs.org/';
        this.container = $$('.container').get(3);

        this.greeting = this.container.$('div > h1');
        this.nameInput = this.container.$('input[placeholder="Enter a name here"]');
    }

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