import { Selector, t } from 'testcafe';
import BasePage from './BasePage';

export default class AccountPage extends BasePage {
  constructor() {
    super('https://automationteststore.com/');
  }

  readonly myAccountTitle = Selector('.maintext').withText('My Account');
  readonly orderHistoryLink = Selector('a').withText('Order history');
  readonly orderRows = Selector('.table tbody tr');
  readonly logoffLink = Selector('a').withText('Logoff');

  async isLoggedIn(): Promise<boolean> {
    // Проверяем по приветствию — есть только у залогиненных
    return Selector('body').withText(/Welcome back/i).exists;
  }

  async logout(): Promise<void> {
    // Самый надёжный способ — идём на серверный logout по URL
    await t.navigateTo('https://automationteststore.com/index.php?rt=account/logout');
    await t.wait(2500);
  }

  async openOrderHistory(): Promise<void> {
    await t.click(this.orderHistoryLink);
  }

  async getOrdersCount(): Promise<number> {
    return this.orderRows.count;
  }
}