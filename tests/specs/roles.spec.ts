import { Selector, t } from 'testcafe';
import AccountPage from '../pages/AccountPage';
import HomePage from '../pages/HomePage';
import { defaultUserRole } from '../helpers/roles';

const accountPage = new AccountPage();
const homePage = new HomePage();

fixture('Проверка роли залогиненного пользователя');

test('Role: пользователь залогинен — доступ в личный кабинет', async t => {
  await t.useRole(defaultUserRole);

  // Проверяем, что мы залогинены
  const isLoggedIn = await accountPage.isLoggedIn();
  await t.expect(isLoggedIn).ok();
});

test('Role: пользователь может открыть историю заказов', async t => {
  await t.useRole(defaultUserRole);

  await t.navigateTo('https://automationteststore.com/index.php?rt=account/history');
  await t.wait(1500);

  // Проверяем, что открылась страница истории
  const historyPage = Selector('body').withText(/Order History/i);
  await t.expect(historyPage.exists).ok();
});

test('Role: пользователь может перейти на главную и остаться залогиненным', async t => {
  await t.useRole(defaultUserRole);

  await homePage.openHome();
  await t.wait(1000);

  // Остаёмся залогиненными
  const isLoggedIn = await accountPage.isLoggedIn();
  await t.expect(isLoggedIn).ok();
});