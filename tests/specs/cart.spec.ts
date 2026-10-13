import { Selector, t } from 'testcafe';
import HomePage from '../pages/HomePage';
import ProductPage from '../pages/ProductPage';
import CartPage from '../pages/CartPage';

const homePage = new HomePage();
const productPage = new ProductPage();
const cartPage = new CartPage();

fixture('Корзина')
  .page('https://automationteststore.com/');

test('TC-013: Добавление товара в корзину с главной', async t => {
  await homePage.openHome();
  // Ищем товар, чтобы появился список
  await homePage.searchProduct('shirt');
  // Кликаем по первому товару
  await t.click(homePage.searchResults.nth(0));
  // Добавляем в корзину
  await productPage.addToCart();
  // Открываем корзину
  await cartPage.openCart();

  const count = await cartPage.getItemsCount();
await t.expect(count).gt(0);
});

test('TC-014: Добавление товара в корзину со страницы товара', async t => {
  await homePage.openHome();
  await homePage.searchProduct('shirt');
  await t.click(homePage.searchResults.nth(0));
  await productPage.addToCart();
  await cartPage.openCart();

  await t.expect(cartPage.cartTable.exists).ok();
});