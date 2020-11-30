import { outbrainTestPage } from '../page-objects/outbrainTestPage'
import { $, browser, by, element, ElementFinder, protractor } from 'protractor';

describe('Outbrain widget tests', () => {
	outbrainTestPage.navigate();
	browser.sleep(5000);

	it('Performance test- Event writing should be within 2 seconds', async () => {
		outbrainTestPage.waitForInteractionLayer();
		outbrainTestPage.clickOnLikeBTN();
		outbrainTestPage.waitForFirstEventElement();
		browser.sleep(3000);
		outbrainTestPage.getTextOfLastEvent().then(function (text) {
			outbrainTestPage.compareBetweenActionToWriting(text);
		});
	});

	it('Events test- Events are written to the events param with the correct event data', async () => {
		outbrainTestPage.clickOnLikeBTN();
		outbrainTestPage.verifyActionInTheEvent("like");
		browser.sleep(5000);
		outbrainTestPage.clickOnDisLikeBTN();
		outbrainTestPage.verifyActionInTheEvent("dislike");
	});

	it('Read more button test- Verify that new tab will open with the current article', async () => {
		outbrainTestPage.clickOnReadMoreBTN();
		browser.sleep(3000);
		outbrainTestPage.verifyNewTabWithTitleNotEmpty();
	});

	it('Widget appearance test- Widget should not be displayed after all suggestions got like/dislike', async () => {
		outbrainTestPage.navigate();
		for (let i = 0; i < 4; i++) {
			outbrainTestPage.clickOnDisLikeBTN();
		}
		browser.sleep(3000);
		outbrainTestPage.verifyWidgetPresentFalse();
	});

	it('Outbrain logo test- About outbrain widget popup should be open', async () => {
		outbrainTestPage.navigate();
		browser.sleep(5000);
		outbrainTestPage.clickOnOutbrainLogo();
		outbrainTestPage.waitAndVerifyAboutWindow();
	});
});