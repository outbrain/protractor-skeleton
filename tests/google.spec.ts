import { wikiHomePage  } from '../page-objects/wikiHome.po'
import {$, browser, ElementFinder} from 'protractor';

describe('Wikipedia Search',  () => {
    it('should do a search', async ()  => {
      wikiHomePage.navigate();
	 ;
	  
	 // In the input field type a search value of your choice.
	  var textSearch = 'python';
      wikiHomePage.typeSearch(textSearch);
      wikiHomePage.clickSearch();
	  browser.sleep(1000);
	  
	 // Click on the third wiki result
	  let thirdResult = $('#mw-content-text > div.mw-parser-output > ul:nth-child(7) > li:nth-child(1) > a');
	  var txt = thirdResult.getText();
      thirdResult.click();
	  browser.sleep(1000);
	  
	  let resultTitle = $('#firstHeading');
	  
	 // Verify the title match the clicked link.
	  expect(resultTitle.getText()).toContain(txt);

    });
  });