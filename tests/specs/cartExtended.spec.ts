import { t } from 'testcafe';
import HomePage from '../pages/HomePage';
import ProductPage from '../pages/ProductPage';
import CartPage from '../pages/CartPage';
import RegisterPage from '../pages/RegisterPage';
import AccountPage from '../pages/AccountPage';
import { createRandomUser } from '../helpers/userFactory';

const homePage = new HomePage();
const productPage = new ProductPage();
const cartPage = new CartPage();
const registerPage = new RegisterPage();
const accountPage = new AccountPage();

fixture('Корзина — расширенные сценарии')
  .page('https://automationteststore.com/');

test('TC-015: Изменение количества товара', async t => {
  await homePage.openHome();
  await homePage.searchProduct('shirt');
  await t.click(homePage.searchResults.nth(0));
  await productPage.addToCart();
  await cartPage.openCart();
  await cartPage.changeQuantity('2');
  await t.wait(1500);
  const count = await cartPage.getItemsCount();
  await t.expect(count).gt(0);
});

test('TC-016: Удаление товара из корзины', async t => {
  await homePage.openHome();
  await homePage.searchProduct('shirt');
  await t.click(homePage.searchResults.nth(0));
  await productPage.addToCart();
  await cartPage.openCart();
  await cartPage.removeFirstItem();
  await t.wait(1500);
  const isEmpty = await cartPage.isEmpty();
  await t.expect(isEmpty).ok();
});

test('TC-008: Выход из аккаунта', async t => {
  // Регистрируем пользователя
  const user = createRandomUser();
  await registerPage.openRegister();
  await registerPage.register(user);

  // Проверяем, что залогинены
  const isLoggedIn = await accountPage.isLoggedIn();
  await t.expect(isLoggedIn).ok();

  // Выходим
  await accountPage.logout();
  await t.wait(2000);

  // Ещё раз перезагружаем главную — на всякий случай
  await t.navigateTo('https://automationteststore.com/');
  await t.wait(1500);

  // Проверяем, что вышли
  const stillLoggedIn = await accountPage.isLoggedIn();
  await t.expect(stillLoggedIn).notOk();
});