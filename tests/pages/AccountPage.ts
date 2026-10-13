import { Selector, t } from 'testcafe';
import BasePage from './BasePage';

/**
 * Личный кабинет пользователя.
 */
export default class AccountPage extends BasePage {
  constructor() {
    super('https://automationteststore.com/');
  }

  // Селекторы
  readonly myAccountTitle = Selector('.maintext').withText('My Account');
  readonly logoutLink = Selector('a').withText('Logoff');
  readonly orderHistoryLink = Selector('a').withText('Order History');
  readonly orderRows = Selector('.table tbody tr');

  // Методы

  /** Проверить, что пользователь залогинен */
  async isLoggedIn(): Promise<boolean> {
  // Проверяем, что на странице есть ссылка Logoff (видна только залогиненным)
  const logoffLink = Selector('a').withText('Logoff');
  return logoffLink.exists;
}

  /** Выйти из аккаунта */
  async logout(): Promise<void> {
  // Ищем ссылку Logoff в меню аккаунта
  const logoffLink = Selector('a').withText('Logoff');
  if (await logoffLink.exists) {
    await t.click(logoffLink);
  }
}

  /** Открыть историю заказов */
  async openOrderHistory(): Promise<void> {
    await t.click(this.orderHistoryLink);
  }

  /** Получить количество заказов */
  async getOrdersCount(): Promise<number> {
    return await this.orderRows.count;
  }
}