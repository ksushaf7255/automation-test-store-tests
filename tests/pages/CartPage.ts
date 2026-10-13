import { Selector, t } from 'testcafe';
import BasePage from './BasePage';

/**
 * Страница корзины.
 */
export default class CartPage extends BasePage {
  constructor() {
    super('https://automationteststore.com/');
  }

  // Селекторы
  readonly cartTable = Selector('.cart-info');
  readonly cartRows = Selector('.cart-info tbody tr');
  readonly quantityInput = Selector('input[name^="quantity"]');
  readonly updateButton = Selector('button[title="Update"]');
  readonly removeButton = Selector('a[href*="remove"]');
  readonly checkoutButton = Selector('#cart_checkout1');
  readonly emptyCartMessage = Selector('.contentpanel').withText('Your shopping cart is empty');

  // Методы

  /** Открыть корзину */
  async openCart(): Promise<void> {
    await this.open('index.php?rt=checkout/cart');
  }

  /** Получить количество товаров в корзине */
  async getItemsCount(): Promise<number> {
    return await this.cartRows.count;
  }

  /** Изменить количество первого товара */
  async changeQuantity(value: string): Promise<void> {
    await t
      .click(this.quantityInput)
      .pressKey('ctrl+a delete')
      .typeText(this.quantityInput, value)
      .click(this.updateButton);
  }

  /** Удалить первый товар */
  async removeFirstItem(): Promise<void> {
    await t.click(this.removeButton);
  }

  /** Перейти к оформлению */
  async goToCheckout(): Promise<void> {
    await t.click(this.checkoutButton);
  }
  /** Проверить, что корзина пуста */
async isEmpty(): Promise<boolean> {
  return this.emptyCartMessage.exists;
}

/** Получить название первого товара в корзине */
async getFirstProductName(): Promise<string> {
  const firstRow = this.cartRows.nth(0);
  const nameCell = firstRow.find('td').nth(1);
  return nameCell.innerText;
}
}

