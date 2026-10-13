import { createRandomUser, TestUser } from './userFactory';

/**
 * Хелпер для подготовки тестовых данных через UI.
 * Используем UI, потому что у сайта нет публичного API.
 */

/**
 * Регистрирует пользователя через UI.
 * Используется в тестах, где нужен готовый аккаунт.
 */
export async function prepareUser(user?: TestUser): Promise<TestUser> {
  return user || createRandomUser();
}