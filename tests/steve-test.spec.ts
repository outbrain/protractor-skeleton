import { wikiHomePage  } from '../page-objects/wikiHome.po'
const whatToSearch: string = "javascript";

describe('Wikipedia Search',  () => {

    it('should do a search', async ()  => {
      wikiHomePage.navigate();
      wikiHomePage.typeSearch(whatToSearch);
    });

    it('should click on third value & compare third value with page title', async ()  => {
      const thirdSeachValue = wikiHomePage.getThirdResultTextLink();
      wikiHomePage.clickOnThirdResult();
      wikiHomePage.compareTextResultToPageTitle(thirdSeachValue);
    });
  });