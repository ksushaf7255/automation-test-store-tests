import { t, RequestLogger } from 'testcafe';

fixture('Кэширование статических ресурсов')
  .page('https://automationteststore.com/');

test('Проверка кэш-заголовков для логотипа', async t => {
  // Логируем запрос за логотипом
  const logger = RequestLogger(
    { url: /logo|banner|\.png|\.jpg|\.svg/i, method: 'GET' },
    {
      logResponseHeaders: true,
      logResponseBody: false,
    }
  );

  await t
    .addRequestHooks(logger)
    .navigateTo('https://automationteststore.com/')
    .wait(3000);

  await t.removeRequestHooks(logger);

  // Проверяем, что хотя бы один статический ресурс был загружен
  await t.expect(logger.requests.length).gt(0);

  // Проверяем наличие заголовков кэширования
  const firstRequest = logger.requests[0];
  if (firstRequest && firstRequest.response) {
    const cacheControl = firstRequest.response.headers['cache-control'] || '';
    const expires = firstRequest.response.headers['expires'] || '';
    const etag = firstRequest.response.headers['etag'] || '';

    console.log('Cache-Control:', cacheControl);
    console.log('Expires:', expires);
    console.log('ETag:', etag);

    // Считаем тест успешным, если есть хоть один из заголовков кэширования
    const hasCaching = !!(cacheControl || expires || etag);
    await t.expect(hasCaching).ok();
  }
});