import { Selector, t } from 'testcafe';
import BasePage from './BasePage';

/**
 * Страница одного товара.
 */
export default class ProductPage extends BasePage {
  constructor() {
    super('https://automationteststore.com/');
  }

  // Селекторы
  readonly productName = Selector('.productname');
  readonly productPrice = Selector('.productfilneprice');
  readonly addToCartButton = Selector('.cart');
  readonly quantityInput = Selector('#product_quantity');

  // Методы

  /** Добавить товар в корзину */
  async addToCart(): Promise<void> {
    await t.click(this.addToCartButton);
  }

  /** Получить название товара */
  async getProductName(): Promise<string> {
    return await this.productName.innerText;
  }
}