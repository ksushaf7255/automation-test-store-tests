import { Selector, t } from 'testcafe';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import AccountPage from '../pages/AccountPage';
import { createRandomUser } from '../helpers/userFactory';

const homePage = new HomePage();
const loginPage = new LoginPage();
const registerPage = new RegisterPage();
const accountPage = new AccountPage();

fixture('Авторизация и регистрация')
  .page('https://automationteststore.com/');

test('TC-001: Регистрация нового пользователя', async t => {
  const user = createRandomUser();

  await registerPage.openRegister();
  await registerPage.register(user);

  const isSuccess = await registerPage.isRegistrationSuccessful();
await t.expect(isSuccess).ok();
});

test('TC-004: Вход с валидными данными', async t => {
  // Сначала регистрируем пользователя
  const user = createRandomUser();
  await registerPage.openRegister();
  await registerPage.register(user);

  // Проверяем, что регистрация прошла
  const isSuccess = await registerPage.isRegistrationSuccessful();
  await t.expect(isSuccess).ok();

  // Выходим (кликаем Logoff, если есть)
  await t.navigateTo('https://automationteststore.com/index.php?rt=account/logout');

  // Ждём немного, чтобы logout точно прошёл
  await t.wait(1000);

  // Логинимся с теми же данными
  await loginPage.openLogin();
  await loginPage.login(user.loginName, user.password);

  // Проверяем, что залогинились
  const isLoggedIn = await accountPage.isLoggedIn();
  await t.expect(isLoggedIn).ok();
});

test('TC-005: Вход с неверным паролем', async t => {
  await loginPage.openLogin();
  await loginPage.login('wronguser', 'wrongpassword');

  const hasError = await loginPage.hasError();
await t.expect(hasError).ok();
});