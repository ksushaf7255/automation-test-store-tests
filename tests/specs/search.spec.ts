import { Selector, t } from 'testcafe';
import HomePage from '../pages/HomePage';

const homePage = new HomePage();

fixture('Поиск товаров')
  .page('https://automationteststore.com/');

test('TC-009: Поиск существующего товара', async t => {
  await homePage.openHome();
  await homePage.searchProduct('shirt');

  await t.expect(homePage.searchResults.exists).ok();
});

test('TC-010: Поиск несуществующего товара', async t => {
  await homePage.openHome();
  await homePage.searchProduct('thisproductdoesnotexist12345');

  await t.expect(homePage.noResultsMessage.exists).ok();
});