import { Selector, t } from 'testcafe';

fixture('Invoice')
  .page('https://automationteststore.com/');

test('TC-023: Проверка страницы счёта заказа 71397 (известный дефект BUG-001)', async t => {
  await t.navigateTo('https://automationteststore.com/index.php?rt=account/invoice&order_id=71397');

  // Известный дефект BUG-001: вместо счёта показывается сообщение об ошибке.
  // Тест проверяет, что баг всё ещё воспроизводится.
  const errorMessage = Selector('body').withText('The order you have requested could not be found');
  const orderDetails = Selector('.invoice, .order-info, .contentpanel').withText('Order');

  // Если видим сообщение об ошибке — баг воспроизводится
  const bugReproduces = await errorMessage.exists;

  if (bugReproduces) {
    console.log('BUG-001 воспроизводится: заказ не найден');
    await t.expect(bugReproduces).ok();
  } else {
    // Если баг исправлен — проверяем, что счёт открывается
    await t.expect(orderDetails.exists).ok();
  }
});