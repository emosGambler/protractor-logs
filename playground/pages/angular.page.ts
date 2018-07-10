import { $, ElementFinder } from 'protractor';

export class AngularPage {
    public url: string;

    public title: ElementFinder;

    constructor() {
        this.url = 'https://angular.io/';
        this.title = $('.hero-headline');
    }
}