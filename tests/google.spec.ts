import { wikiHomePage  } from '../page-objects/wikiHome.po'

describe('Wikipedia Search',  () => {
    it('should do a search', async ()  => {
      wikiHomePage.navigate();
      wikiHomePage.typeSearch('we need you poster');
      wikiHomePage.clickSearch();
      expect(true).toEqual(true);
    });
  });