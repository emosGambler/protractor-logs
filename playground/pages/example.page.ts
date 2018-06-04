import { promise } from 'protractor';
import { $, $$, ElementFinder, ElementArrayFinder } from 'protractor-logs';

export class ExamplePage {
    public url: string;

    public greeting: ElementArrayFinder;
    public logo: ElementFinder;
    public learnMenuOption: ElementFinder;
    public learnMenu: ElementFinder;
    public nameInput: ElementFinder;

    constructor() {
        this.url = 'https://angularjs.org/';
        
        this.greeting = $$('div > h1').get(1);
        this.logo = $('.hero > h2');
        this.learnMenuOption = $$('.dropdown-toggle').get(0);
        this.learnMenu = $$('.dropdown-menu').get(0);
        this.nameInput = $('input[placeholder="Enter a name here"]');
    }
}