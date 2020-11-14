import { wikiHomePage } from '../page-objects/wikiHome.po'
import { $, browser, ElementFinder } from 'protractor';

describe('Wikipedia Search', () => {
	it('should do a search', async () => {

		// In the input field type a search value of your choice.
		const textSearch = 'disney';
		wikiHomePage.navigate();
		wikiHomePage.typeSearch(textSearch);
		const linkText = wikiHomePage.getTextOfSuggestion3();
		
		// Click on the third wiki result 
		wikiHomePage.clickOnTheSuggestion3();

		// Verify the title match the clicked link.
		expect(linkText).toEqual(wikiHomePage.getTextOfSuggestion3());

	});
});





