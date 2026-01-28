# Система управления закупками

REST API для управления контрагентами и лотами на основе Spring Boot и PostgreSQL.

## Что реализовано

- REST API для работы с контрагентами (создание, чтение, обновление, удаление)
- REST API для работы с лотами (создание, чтение, обновление, удаление)
- База данных PostgreSQL с двумя таблицами: customer и lot
- Связь между таблицами через внешние ключи
- Валидация данных (проверка валют и ставок НДС)

## Требования

- PostgreSQL 16
- Java 17
- Gradle 8.14

## Установка и настройка

### 1. Установить PostgreSQL

Скачать с https://www.postgresql.org/download/windows/
При установке запомнить пароль для пользователя postgres.

### 2. Создать базу данных

Открыть командную строку и выполнить:
```bash
psql -U postgres -d postgres
```

Ввести пароль, затем выполнить SQL команды:
```sql
DROP SCHEMA IF EXISTS purchase CASCADE;
CREATE SCHEMA purchase;

CREATE TABLE purchase.customer (
    customer_code VARCHAR(50) PRIMARY KEY,
    customer_name VARCHAR(255) NOT NULL,
    customer_inn VARCHAR(12),
    customer_kpp VARCHAR(9),
    customer_legal_address VARCHAR(500),
    customer_postal_address VARCHAR(500),
    customer_email VARCHAR(100),
    customer_code_main VARCHAR(50),
    is_organization BOOLEAN DEFAULT false,
    is_person BOOLEAN DEFAULT false,
    FOREIGN KEY (customer_code_main) REFERENCES purchase.customer(customer_code)
);

CREATE TABLE purchase.lot (
    lot_id SERIAL PRIMARY KEY,
    lot_name VARCHAR(255) NOT NULL,
    customer_code VARCHAR(50) NOT NULL,
    price NUMERIC(15,2),
    currency_code VARCHAR(3) CHECK (currency_code IN ('RUB', 'USD', 'EUR')),
    nds_rate VARCHAR(20) CHECK (nds_rate IN ('Без НДС', '18%', '20%')),
    place_delivery VARCHAR(255),
    date_delivery TIMESTAMP,
    FOREIGN KEY (customer_code) REFERENCES purchase.customer(customer_code)
);
```

Для выхода ввести: `\q`

### 3. Настроить подключение

Открыть файл `src/main/resources/application.properties` и указать пароль от PostgreSQL:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/postgres
spring.datasource.username=postgres
spring.datasource.password=ВАШ_ПАРОЛЬ
```

### 4. Сгенерировать классы JOOQ

В командной строке в папке проекта:
```bash
cd D:\Project\demo
./gradlew clean
./gradlew generateJooq
```

## Запуск приложения

### Через командную строку:
```bash
./gradlew bootRun
```

### Через IntelliJ IDEA:

Открыть файл `src/main/java/com/example/demo/DemoApplication.java`
Нажать правой кнопкой мыши → Run 'DemoApplication'

Приложение запустится на http://localhost:8080

## Проверка работы

### Вариант 1: Через Postman

1. Скачать Postman с https://www.postman.com/downloads/
2. Создать новый запрос POST: `http://localhost:8080/api/customers`
3. Выбрать Body → raw → JSON
4. Вставить JSON:
```json
{
  "customerCode": "CUST001",
  "customerName": "ООО Тестовая компания",
  "customerInn": "1234567890",
  "customerKpp": "123456789",
  "customerLegalAddress": "Москва, ул. Ленина, 1",
  "customerPostalAddress": "Москва, ул. Ленина, 1",
  "customerEmail": "test@example.com",
  "isOrganization": true,
  "isPerson": false
}
```

5. Нажать Send
6. Создать GET запрос: `http://localhost:8080/api/customers`
7. Нажать Send - должен вернуться список контрагентов

### Вариант 2: Через браузер

Открыть в браузере: `http://localhost:8080/api/customers`
Должен показаться пустой массив `[]` или список контрагентов.

### Вариант 3: Через командную строку (curl)
```bash
curl http://localhost:8080/api/customers
```

## API эндпоинты

### Контрагенты (Customers)

- `GET /api/customers` - получить всех контрагентов
- `GET /api/customers/{code}` - получить контрагента по коду
- `POST /api/customers` - создать контрагента
- `PUT /api/customers/{code}` - обновить контрагента
- `DELETE /api/customers/{code}` - удалить контрагента

### Лоты (Lots)

- `GET /api/lots` - получить все лоты
- `GET /api/lots/{id}` - получить лот по ID
- `POST /api/lots` - создать лот
- `PUT /api/lots/{id}` - обновить лот
- `DELETE /api/lots/{id}` - удалить лот

## Структура проекта
```
demo/
├── src/main/java/com/example/demo/
│   ├── controller/          # REST контроллеры
│   │   ├── CustomerController.java
│   │   └── LotController.java
│   ├── service/             # Бизнес-логика
│   │   ├── CustomerService.java
│   │   └── LotService.java
│   ├── dto/                 # Объекты для передачи данных
│   │   ├── CustomerDTO.java
│   │   └── LotDTO.java
│   └── DemoApplication.java # Главный класс
├── src/main/resources/
│   └── application.properties # Настройки подключения к БД
└── build.gradle             # Конфигурация сборки
```

## Решение проблем

### Ошибка "Cannot resolve symbol 'jooqdata'"

Выполнить:
```bash
./gradlew generateJooq
```

### Ошибка "Connection refused"

Проверить что PostgreSQL запущен и доступен на порту 5432.

### Ошибка "Schema purchase does not exist"

Выполнить SQL команды создания схемы и таблиц из раздела "Установка".

## Технологии

- Spring Boot 3.3.1
- JOOQ 3.17.18
- PostgreSQL 16
- Java 17
- Gradle 8.14