import { Selector, t } from 'testcafe';

/**
 * Содержит общие методы, которые используются на любой странице.
 */
export default class BasePage {
  readonly url: string;

  constructor(url: string) {
    this.url = url;
  }

  /** Открыть страницу */
  async open(path: string = ''): Promise<void> {
    await t.navigateTo(`${this.url}${path}`);
  }

  /** Получить заголовок страницы */
  async getTitle(): Promise<string> {
    return await Selector('title').innerText;
  }

  /** Проверить, что элемент существует на странице */
  async isElementVisible(selector: Selector): Promise<boolean> {
    return await selector.exists;
  }
}