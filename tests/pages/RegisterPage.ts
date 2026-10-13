import { Selector, t } from 'testcafe';
import BasePage from './BasePage';

/**
 * Страница регистрации нового пользователя.
 */
export default class RegisterPage extends BasePage {
  constructor() {
    super('https://automationteststore.com/');
  }

  // ===== Селекторы =====
  readonly firstNameInput = Selector('#AccountFrm_firstname');
  readonly lastNameInput = Selector('#AccountFrm_lastname');
  readonly emailInput = Selector('#AccountFrm_email');
  readonly telephoneInput = Selector('#AccountFrm_telephone');
  readonly address1Input = Selector('#AccountFrm_address_1');
  readonly cityInput = Selector('#AccountFrm_city');
  readonly postcodeInput = Selector('#AccountFrm_postcode');
  readonly countrySelect = Selector('#AccountFrm_country_id');
  readonly regionSelect = Selector('#AccountFrm_zone_id');
  readonly loginNameInput = Selector('#AccountFrm_loginname');
  readonly passwordInput = Selector('#AccountFrm_password');
  readonly passwordConfirmInput = Selector('#AccountFrm_confirm');
  readonly privacyCheckbox = Selector('#AccountFrm_agree');
  readonly submitButton = Selector('button[title="Continue"]');
  readonly successMessage = Selector('.maintext, h1, .contentpanel').withText(/Account Has Been Created/i);
  // ===== Методы =====

  /** Открыть страницу регистрации */
  async openRegister(): Promise<void> {
    await this.open('index.php?rt=account/create');
  }

  /**
   * Заполнить и отправить форму регистрации.
   * @param user — объект с данными пользователя
   */
  async register(user: {
    firstName: string;
    lastName: string;
    email: string;
    telephone: string;
    address1: string;
    city: string;
    postcode: string;
    loginName: string;
    password: string;
  }): Promise<void> {
    await t
      .typeText(this.firstNameInput, user.firstName)
      .typeText(this.lastNameInput, user.lastName)
      .typeText(this.emailInput, user.email)
      .typeText(this.telephoneInput, user.telephone)
      .typeText(this.address1Input, user.address1)
      .typeText(this.cityInput, user.city)
      .typeText(this.postcodeInput, user.postcode)
      .click(this.countrySelect)
      .click(this.countrySelect.find('option').withText('United Kingdom'))
      .typeText(this.loginNameInput, user.loginName)
      .click(this.regionSelect)
      .click(this.regionSelect.find('option').withText('Greater London'))
      .typeText(this.passwordInput, user.password)
      .typeText(this.passwordConfirmInput, user.password)
      .click(this.privacyCheckbox)
      .click(this.submitButton);
  }

  /** Проверить, что регистрация успешна */
  async isRegistrationSuccessful(): Promise<boolean> {
  return this.successMessage.exists;
}
}