# 🚀 Космический Туризм 2077

Лендинг космического туристического агентства с интеграцией Supabase для хранения данных и email-рассылки.

## 📋 Возможности

- ✅ 12 направлений космических путешествий
- ✅ Хранение данных в Supabase (PostgreSQL)
- ✅ Страница каталога с фильтрацией и поиском
- ✅ Форма бронирования с сохранением в БД
- ✅ Email-рассылка подтверждений через Resend
- ✅ Форма обратной связи (Google Forms)
- ✅ Адаптивный дизайн с анимациями

## 🛠️ Технологии

- **Frontend:** React + TypeScript + Tailwind CSS
- **Сборка:** Vite
- **База данных:** Supabase (PostgreSQL)
- **Email:** Resend API через Supabase Edge Functions
- **Роутинг:** React Router

## 🚀 Установка и запуск

### 1. Установка зависимостей

```bash
npm install
```

### 2. Настройка Supabase

#### 2.1. Создайте проект в Supabase

1. Перейдите на [supabase.com](https://supabase.com)
2. Создайте новый проект
3. Скопируйте URL и Anon Key из Settings → API

#### 2.2. Создайте таблицы в БД

1. Откройте SQL Editor в Supabase Dashboard
2. Выполните SQL из файла `supabase/schema.sql`
3. Это создаст таблицы `destinations` и `bookings` с данными

#### 2.3. Настройте переменные окружения

Создайте файл `.env` в корне проекта:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 3. Настройка Email-рассылки (опционально)

#### 3.1. Получите API ключ Resend

1. Зарегистрируйтесь на [resend.com](https://resend.com)
2. Получите API ключ
3. Добавьте домен и верифицируйте его

#### 3.2. Разверните Edge Function

```bash
# Установите Supabase CLI
npm install -g supabase

# Войдите в аккаунт
supabase login

# Свяжите с проектом
supabase link --project-ref your-project-ref

# Установите секрет
supabase secrets set RESEND_API_KEY=re_your_api_key_here

# Разверните функцию
supabase functions deploy send-booking-email
```

### 4. Запуск проекта

```bash
# Режим разработки
npm run dev

# Production сборка
npm run build
```

## 📁 Структура проекта

```
project/
├── src/
│   ├── App.tsx              # Главный компонент с роутингом
│   ├── main.tsx             # Точка входа
│   ├── index.css            # Стили и анимации
│   ├── vite-env.d.ts        # TypeScript типы для Vite
│   ├── lib/
│   │   └── supabase.ts      # Клиент Supabase и API функции
│   ├── data/
│   │   └── destinations.ts  # Локальные данные (fallback)
│   └── pages/
│       └── CatalogPage.tsx  # Страница каталога
├── supabase/
│   ├── schema.sql           # SQL миграции для БД
│   └── functions/
│       └── send-booking-email/
│           └── index.ts     # Edge Function для email
├── index.html               # HTML точка входа
├── vite.config.js           # Конфигурация Vite
└── package.json             # Зависимости
```

## 🗄️ Структура базы данных

### Таблица `destinations`

| Поле | Тип | Описание |
|------|-----|----------|
| id | UUID | Уникальный идентификатор |
| name | TEXT | Название направления |
| emoji | TEXT | Эмодзи для визуализации |
| duration | TEXT | Длительность путешествия |
| price | INTEGER | Цена в космических кредитах |
| description | TEXT | Описание направления |
| image_url | TEXT | URL изображения |
| gradient | TEXT | CSS градиент для карточки |
| category | TEXT | Категория направления |
| available | BOOLEAN | Доступность для бронирования |
| created_at | TIMESTAMP | Дата создания |

### Таблица `bookings`

| Поле | Тип | Описание |
|------|-----|----------|
| id | UUID | Уникальный идентификатор |
| name | TEXT | Имя клиента |
| email | TEXT | Email клиента |
| phone | TEXT | Телефон клиента |
| destination_id | TEXT | ID направления |
| destination_name | TEXT | Название направления |
| travel_date | DATE | Дата вылета |
| travelers | INTEGER | Количество путешественников |
| preparation | BOOLEAN | Подготовка космонавтов |
| insurance | BOOLEAN | Расширенная страховка |
| photo_session | BOOLEAN | Фотосессия в космосе |
| total_price | INTEGER | Итоговая цена |
| status | TEXT | Статус (pending/confirmed/cancelled) |
| created_at | TIMESTAMP | Дата создания |

## 📧 Email-рассылка

При создании бронирования автоматически отправляется email клиенту с:
- Подтверждением бронирования
- Детали поездки
- Контактной информацией
- Красивым HTML-шаблоном

## 🔒 Безопасность

- RLS (Row Level Security) включен для всех таблиц
- Анонимный доступ только для чтения направлений
- Создание бронирований доступно всем
- Email API ключ хранится в Supabase Secrets

## 🎨 Кастомизация

### Изменение данных направлений

Отредактируйте файл `src/data/destinations.ts` или обновите данные в Supabase через Dashboard.

### Изменение email шаблона

Отредактируйте HTML в файле `supabase/functions/send-booking-email/index.ts`

### Изменение стилей

Основные стили находятся в `src/index.css` и компонентах через Tailwind CSS.

## 📝 Лицензия

MIT

## 👨‍🚀 Автор

Космический Туризм 2077 - Концептуальный проект 2077 года

---

**Примечание:** Это учебный проект. Все данные и цены вымышлены.
