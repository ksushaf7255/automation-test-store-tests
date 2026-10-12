import { Selector, t } from 'testcafe';
import BasePage from './BasePage';

/**
 * Страница входа в аккаунт.
 */
export default class LoginPage extends BasePage {
  constructor() {
    super('https://automationteststore.com/');
  }

  // ===== Селекторы =====
  readonly emailInput = Selector('#loginFrm_loginname');
  readonly passwordInput = Selector('#loginFrm_password');
  readonly loginButton = Selector('button[title="Login"]');
  readonly errorMessage = Selector('.alert-error');
  readonly forgotPasswordLink = Selector('a').withText('Forgot your password?');

  // ===== Методы =====

  /** Открыть страницу входа */
  async openLogin(): Promise<void> {
    await this.open('index.php?rt=account/login');
  }

  /**
   * Выполнить вход.
   * @param email — логин
   * @param password — пароль
   */
  async login(email: string, password: string): Promise<void> {
    await t
      .typeText(this.emailInput, email)
      .typeText(this.passwordInput, password)
      .click(this.loginButton);
  }

  /** Проверить, что отображается ошибка */
  async hasError(): Promise<boolean> {
    return await this.errorMessage.exists;
  }
}