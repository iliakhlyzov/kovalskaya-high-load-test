# Kovalskaya High Load Test

Простое веб-приложение на базе Node.js и PostgreSQL, проверяющее параллельное обновление баланса без возможности ухода в минус. Тестируется отправкой большого количества одновременных запросов (например, 10 000).

## Запуск через Docker

1. Скопируйте файл `.env.example` в `.env` и заполните нужными значениями (порт, настройки БД и т. д.).
2. Выполните:
   ```bash
   docker-compose build
   docker-compose up
   ```
После сборки приложение станет доступно на порту **3000**.

## Структура проекта

```
kovalskaya-high-load-test/
├── docker-compose.yml        # Запуск приложения и PostgreSQL
├── Dockerfile                # Сборка образа приложения
├── .env.example              # Пример переменных окружения
├── migrations/               # Миграции (Umzug)
├── scripts/                  # Скрипты (CLI для миграций, Lua-файлы для wrk)
├── tests/                    # Тесты (при необходимости)
└── src/
    ├── controllers/
    │   └── userBalanceController.js
    ├── database/
    │   └── index.js
    ├── errors/
    │   ├── ApiError.js
    │   └── ExtendedError.js
    ├── middlewares/
    │   ├── errorHandler.js
    │   └── validateSchema.js
    ├── models/
    │   └── UserBalance.js
    ├── services/
    │   └── userBalanceService.js
    ├── validation/
    │   └── schemas/
    │       └── userBalanceSchemas.js
    └── index.js
```

### Краткое описание модулей

- **controllers/**: Обработка HTTP-запросов (контроллеры).
- **database/**: Подключение к базе (Sequelize).
- **errors/**: Классы ошибок (`ApiError`, `ExtendedError`) и их статусы.
- **middlewares/**: Глобальные и вспомогательные middleware (обработка ошибок, валидация).
- **models/**: Определения таблиц (Sequelize).
- **services/**: Бизнес-логика, работа с моделями и атомарные обновления баланса.
- **validation/**: Схемы валидации (например, с помощью Joi или express-validator).
- **index.js**: Точка входа, инициализация приложения.

## Краткое описание функционала

1. **Миграции** создают таблицу `userBalance` с полем `balance`, изначально равным 10000.
2. **PUT `/user-balance/:id`** — эндпоинт для изменения баланса (принимает `delta`). Если новое значение уходит в минус, возвращается ошибка (статус 400).
3. **Высоконагрузочный тест**: отправка 10 000 одновременных запросов по уменьшению баланса на 2 единицы. Ожидается, что 5000 запросов пройдут успешно (баланс дойдёт до 0), а остальные получат ошибку о недостатке средств.

Запуск приложения через Docker обеспечивает автоматическое создание/применение миграций (при старте), что упрощает развёртывание и тестирование.