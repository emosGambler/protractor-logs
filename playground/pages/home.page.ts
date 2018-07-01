import { $, $$, ElementFinder, ElementArrayFinder } from 'protractor-logs';

export class HomePage {
    public url: string;

    public greeting: ElementArrayFinder;
    public logo: ElementFinder;
    public learnMenuOption: ElementFinder;
    public learnMenu: ElementFinder;
    public nameInput: ElementFinder;
    public tryNewAngularButton: ElementFinder;
    public todoAddButton: ElementFinder;
    public variousButtons: ElementArrayFinder;


    constructor() {
        this.url = 'https://angularjs.org/';
        
        this.greeting = $$('div > h1').get(1);
        this.logo = $('.hero > h2');
        this.learnMenuOption = $$('.dropdown-toggle').get(0);
        this.learnMenu = $$('.dropdown-menu').get(0);
        this.nameInput = $('input[placeholder="Enter a name here"]');
        this.tryNewAngularButton = $('a[href="http://angular.io"]');
        this.todoAddButton = $$('input').get(4);
        this.variousButtons = $$('.button');
    }
}