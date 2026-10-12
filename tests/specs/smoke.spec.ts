import { Selector } from 'testcafe';

fixture('Smoke test')
  .page('https://automationteststore.com/');

test('Главная страница открывается', async t => {
  await t.expect(Selector('body').exists).ok();
});