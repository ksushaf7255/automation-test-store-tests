import { Selector, t } from 'testcafe';
import HomePage from '../pages/HomePage';
import ProductPage from '../pages/ProductPage';
import CartPage from '../pages/CartPage';

const homePage = new HomePage();
const productPage = new ProductPage();
const cartPage = new CartPage();

fixture('Оформление заказа')
  .page('https://automationteststore.com/');

test('TC-018: Оформление заказа гостем — переход к оформлению', async t => {
  // 1. Добавляем товар в корзину
  await homePage.openHome();
  await homePage.searchProduct('shirt');
  await t.click(homePage.searchResults.nth(0));
  await productPage.addToCart();

  // 2. Открываем корзину
  await cartPage.openCart();

  // 3. Проверяем, что товар в корзине
  const count = await cartPage.getItemsCount();
  await t.expect(count).gt(0);

  // 4. Переходим к оформлению
  await cartPage.goToCheckout();

  // 5. Проверяем, что мы на странице оформления
  // (сайт предложит залогиниться или продолжить как гость)
  const onCheckoutPage = Selector('body').withText('Checkout');
  await t.expect(onCheckoutPage.exists).ok();
});