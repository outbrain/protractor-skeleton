import { $, browser, ElementFinder } from 'protractor';

class WikiHomePage {
    private searchBox: ElementFinder;
    private thirdSuggestions: ElementFinder;
    private titleOfResultPage: ElementFinder;

    constructor() {
        this.searchBox = $('#searchInput');
        this.thirdSuggestions = $('body > div.suggestions > div > a:nth-child(3) > div');
        this.titleOfResultPage = $('#firstHeading');
    }

    async navigate() {
        browser.get('https://en.wikipedia.org/wiki/Main_Page');
    }

    async typeSearch(q: string) {
        await this.searchBox.sendKeys(q);
    }

    // click on the third result in wiki page
    async clickOnTheSuggestion3() {
        await this.thirdSuggestions.click();
    }
    // get the title of the result page
    async getTitleOfResultPage() {
        await this.titleOfResultPage.getText();
    }
    // get the text of the third suggestion
    async getTextOfSuggestion3() {
        await this.thirdSuggestions.getText();
    }

}

export const wikiHomePage = new WikiHomePage();