/**
 * Генератор тестовых пользователей.
 * Создаёт уникальные email и логины, чтобы тесты не пересекались.
 */
export interface TestUser {
  firstName: string;
  lastName: string;
  email: string;
  telephone: string;
  address1: string;
  city: string;
  postcode: string;
  loginName: string;
  password: string;
}

/** Сгенерировать случайное число (для уникальности) */
function randomId(): number {
  return Math.floor(Math.random() * 1000000);
}

/** Создать нового случайного пользователя */
export function createRandomUser(): TestUser {
  const id = randomId();
  return {
    firstName: 'Test',
    lastName: 'User',
    email: `testuser${id}@example.com`,
    telephone: '+1234567890',
    address1: '123 Test Street',
    city: 'London',
    postcode: 'SW1A 1AA',
    loginName: `testuser${id}`,
    password: 'TestPassword123',
  };
}