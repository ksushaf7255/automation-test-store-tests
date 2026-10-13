import { Selector, t } from 'testcafe';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import AccountPage from '../pages/AccountPage';
import { createRandomUser } from '../helpers/userFactory';

const loginPage = new LoginPage();
const registerPage = new RegisterPage();
const accountPage = new AccountPage();

fixture('Негативные сценарии авторизации')
  .page('https://automationteststore.com/');

test('TC-002: Регистрация с уже существующим email', async t => {
  // 1. Регистрируем пользователя #1
  const user = createRandomUser();
  await registerPage.openRegister();
  await registerPage.register(user);

  const isSuccess = await registerPage.isRegistrationSuccessful();
  await t.expect(isSuccess).ok();

  // 2. Выходим
  await accountPage.logout();
  await t.wait(2000);

  // 3. Открываем регистрацию через прямой URL и ждём загрузку формы
  await t.navigateTo('https://automationteststore.com/index.php?rt=account/create');
  await t.wait(3000);

  // 4. Пытаемся зарегистрироваться снова с тем же email
  await registerPage.register(user);

  // 5. Проверяем, что показана ошибка
  const errorShown = await registerPage.hasError();
  await t.expect(errorShown).ok();
});

test('TC-003: Регистрация с пустыми обязательными полями', async t => {
  await registerPage.openRegister();
  await t.click(registerPage.submitButton);
  const validationError = await registerPage.hasError();
  await t.expect(validationError).ok();
});

test('TC-006: Вход с пустыми полями', async t => {
  await loginPage.openLogin();
  await t.click(loginPage.loginButton);
  const hasError = await loginPage.hasError();
  await t.expect(hasError).ok();
});