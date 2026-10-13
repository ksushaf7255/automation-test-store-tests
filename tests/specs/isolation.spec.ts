import { Selector, t } from 'testcafe';
import RegisterPage from '../pages/RegisterPage';
import AccountPage from '../pages/AccountPage';
import { createRandomUser } from '../helpers/userFactory';

const registerPage = new RegisterPage();
const accountPage = new AccountPage();

fixture('Изоляция тестов')
  .page('https://automationteststore.com/');

test('Изоляция: пользователь #1 регистрируется', async t => {
  const user = createRandomUser();
  await registerPage.openRegister();
  await registerPage.register(user);

  const isSuccess = await registerPage.isRegistrationSuccessful();
  await t.expect(isSuccess).ok();

  // Проверяем, что мы видим имя именно этого пользователя
  const welcomeText = Selector('body').withText(new RegExp(user.firstName, 'i'));
  await t.expect(welcomeText.exists).ok();
});

test('Изоляция: пользователь #2 регистрируется — независимо от #1', async t => {
  // Создаём другого пользователя с уникальным email
  const user = createRandomUser();
  await registerPage.openRegister();
  await registerPage.register(user);

  const isSuccess = await registerPage.isRegistrationSuccessful();
  await t.expect(isSuccess).ok();

  // Проверяем, что видим нового пользователя
  const welcomeText = Selector('body').withText(new RegExp(user.firstName, 'i'));
  await t.expect(welcomeText.exists).ok();
});

test('Изоляция: гость не имеет доступа к личному кабинету', async t => {
  // Открываем URL личного кабинета без логина
  await t.navigateTo('https://automationteststore.com/index.php?rt=account/account');
  await t.wait(1500);

  // Должны быть перенаправлены на страницу логина
  const loginForm = Selector('#loginFrm_loginname');
  const isLoginPage = await loginForm.exists;

  await t.expect(isLoginPage).ok();
});