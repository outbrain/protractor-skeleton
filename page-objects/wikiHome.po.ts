import {$, browser, ElementFinder} from 'protractor';

class WikiHomePage {
    private searchBox: ElementFinder;
    private searchButton: ElementFinder;

    constructor() {
        this.searchBox = $(`#searchInput`);
        this.searchButton = $('#searchButton');
    }

    async navigate() {
        browser.get('https://en.wikipedia.org/wiki/Main_Page');
    }

    async typeSearch(q: string) {
        await this.searchBox.sendKeys(q);
    }

    async clickSearch() {
        await this.searchButton.click();
    }
}

export const wikiHomePage = new WikiHomePage();