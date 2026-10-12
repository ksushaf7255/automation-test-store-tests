import { Selector, t } from 'testcafe';
import BasePage from './BasePage';

/**
 * Главная страница Automation Test Store.
 * Отвечает за поиск, навигацию и переход к категориям.
 */
export default class HomePage extends BasePage {
  constructor() {
    super('https://automationteststore.com/');
  }

  // ===== Селекторы =====
  readonly searchInput = Selector('#filter_keyword');
  readonly searchButton = Selector('.button-in-search');
  readonly loginLink = Selector('a').withText('Login or register');
  readonly cartLink = Selector('#cart');
  readonly searchResults = Selector('.thumbnails .thumbnail');
  readonly noResultsMessage = Selector('.contentpanel').withText('There is no product that matches the search criteria');

  // ===== Методы =====

  /** Открыть главную страницу */
  async openHome(): Promise<void> {
    await this.open();
  }

  /** Найти товар по названию */
  async searchProduct(query: string): Promise<void> {
    await t
      .typeText(this.searchInput, query)
      .click(this.searchButton);
  }

  /** Перейти на страницу входа */
  async goToLogin(): Promise<void> {
    await t.click(this.loginLink);
  }

  /** Открыть корзину */
  async goToCart(): Promise<void> {
    await t.click(this.cartLink);
  }
}