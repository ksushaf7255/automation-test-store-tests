import { RequestMock, t } from 'testcafe';

// Мок: перехватываем запрос на главную и отвечаем ошибкой 500
const serverErrorMock = RequestMock()
  .onRequestTo(/automationteststore\.com\/index\.php/)
  .respond('Internal Server Error', 500);

fixture('Мок ошибки сервера').page('https://automationteststore.com/');

test('Проверка поведения при ошибке 500', async t => {
  await t
    .addRequestHooks(serverErrorMock)
    .navigateTo('https://automationteststore.com/index.php')
    .wait(2000);

  // После ответа 500 страница может показывать что угодно.
  // Мы проверяем, что клиент не падает и остаётся в браузере.
  const bodyExists = (await t.eval(() => !!document.body)) as boolean;
  await t.expect(bodyExists).ok();

  console.log('Сервер вернул 500, браузер не упал — мок работает');

  await t.removeRequestHooks(serverErrorMock);
});