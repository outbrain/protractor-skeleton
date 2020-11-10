import { wikiHomePage  } from '../page-objects/wikiHome.po'

describe('Wikipedia Search',  () => {
    it('should do a search', async ()  => {
      wikiHomePage.navigate();
      wikiHomePage.typeSearch('guitar music');
      wikiHomePage.clickOnThirdResult();
      wikiHomePage.verifyTextHeader("Leon Koudelak");
    });
  });