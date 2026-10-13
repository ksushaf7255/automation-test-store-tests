import { Role } from 'testcafe';
import RegisterPage from '../pages/RegisterPage';
import AccountPage from '../pages/AccountPage';
import { createRandomUser, TestUser } from './userFactory';

/**
 * Хранилище пользователей, которые были зарегистрированы через роли.
 * Нужно, чтобы разные тесты могли получить доступ к данным одного и того же
 * пользователя, залогиненного через Role.
 */
export const registeredUsers: Map<string, TestUser> = new Map();

/**
 * Создать Role для конкретного пользователя.
 * Логин выполняется один раз — TestCafe затем переиспользует cookies.
 */
export function createUserRole(user: TestUser): Role {
  const registerPage = new RegisterPage();
  const accountPage = new AccountPage();

  return Role(
    'https://automationteststore.com/',
    async () => {
      // Регистрируемся
      await registerPage.openRegister();
      await registerPage.register(user);

      // Проверяем, что залогинены
      const isLoggedIn = await accountPage.isLoggedIn();
      if (!isLoggedIn) {
        throw new Error('Не удалось залогиниться');
      }
    },
    { preserveUrl: true }
  );
}

/**
 * Готовая роль — создаётся один раз для всего прогона.
 * Использование: await t.useRole(defaultUserRole);
 */
const defaultUser = createRandomUser();
registeredUsers.set('default', defaultUser);
export const defaultUserRole = createUserRole(defaultUser);