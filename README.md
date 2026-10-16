# Automation Test Store — Test Automation Project

Учебный проект по тестированию интернет-магазина Automation Test Store с использованием TestCafe и TypeScript.

Проект включает ручное тестирование (тест-план, 25 тест-кейсов, баг-репорты) и автоматизированные тесты (24 теста).

---

## Требования

- Node.js 20+
- npm
- Браузер Microsoft Edge

## Установка и настройка

1. Клонировать репозиторий:
git clone https://github.com/ksushaf7255/automation-test-store-tests.git
cd automation-test-store-tests

2. Установить зависимости:
npm install

3. Создать файл `.env` на основе `.env.example`:
cp .env.example .env


## Запуск тестов

| Команда | Что делает |
|---------|-----------|
| `npm run test:edge` | Запуск всех тестов в Microsoft Edge |
| `npm run test:headless` | Запуск без графического окна (быстрее) |
| `npm run lint` | Проверка кода линтером ESLint |

**Ожидаемый результат:** `24 passed`

## Что сделано

**Ручное тестирование:**
- Составлен тест-план (`manual/test-plan.md`)
- Написано 25 тест-кейсов (`manual/test-cases.md`)
- Проведено ручное тестирование на живом сайте
- Оформлен баг-репорт BUG-001 (`manual/bug-reports.md`)

**Автотестирование:**
- Настроен проект: TestCafe + TypeScript + ESLint
- Создано 7 Page Objects (`tests/pages/`)
- Написано 24 автотеста (`tests/specs/`) — все проходят
- Реализованы: Roles, RequestMock, RequestLogger (кэширование), изоляция тестов

**Покрытие автотестами:**
- Регистрация и авторизация (6 тестов, включая негативные)
- Поиск товаров (2 теста)
- Корзина (4 теста)
- Оформление заказа (1 тест)
- Личный кабинет и выход (2 теста)
- Специальные проверки: Invoice, кэширование, мок ошибки 500 (3 теста)
- Roles и изоляция (6 тестов)
- Smoke test (1 тест)

## Возникшие трудности и их решения

**1. Promise в t.expect**
- Проблема: `t.expect(method())` падало с ошибкой `Attempted to run assertions on a Promise object`.
- Решение: перед `t.expect` дожидаемся результата метода через `await`:
const result = await page.method();
await t.expect(result).ok();

**2. Динамический список регионов при регистрации**
- Проблема: сайт требует выбрать регион (State/Region), который появляется только после выбора страны.
- Решение: после выбора страны добавили клик по региону (Greater London).

**3. Скрытая ссылка Logoff**
- Проблема: ссылка Logoff спрятана в выпадающем меню (`display: none`), TestCafe не может кликнуть.
- Решение: используем серверный logout по прямому URL `index.php?rt=account/logout`.

**4. HttpOnly cookies**
- Проблема: cookies сессии невозможно удалить через JavaScript.
- Решение: используем серверный logout — сайт сам удаляет свои cookies.

## Найденные дефекты

**BUG-001 — Невозможно открыть Invoice заказа №71397**

При переходе на страницу счёта заказа №71397 система отображает сообщение:
> «The order you have requested could not be found!»

Информация о заказе недоступна. Дефект зафиксирован в `manual/bug-reports.md`.

## Структура проекта

```
automation-test-store-tests/
├── manual/           # Ручное тестирование
│   ├── test-plan.md
│   ├── test-cases.md
│   └── bug-reports.md
├── tests/            # Автотесты
│   ├── helpers/      # Вспомогательные функции
│   ├── pages/        # Page Objects
│   └── specs/        # Тесты
├── .env.example
├── .eslintrc.js
├── .testcaferc.json
├── tsconfig.json
├── package.json
└── README.md
```

## Автор

ksushaf7255 — учебный проект по тестированию ПО
