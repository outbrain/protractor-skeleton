import { wikiHomePage  } from '../page-objects/wikiHome.po'
const whatToSearch: string = "javascript";

describe('Wikipedia Search',  () => {
    it('should do a search', async ()  => {
      wikiHomePage.navigate();
      wikiHomePage.typeSearch(whatToSearch);
      wikiHomePage.clickOnThirdResult();
    });
  });