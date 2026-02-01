# Chevrolet в рассрочку — сайт автосалона

Главная страница: Hero, карточки автомобилей, форма «Связаться с нами», блок «О компании», карта, футер.

## Стек

- **Фронтенд:** Next.js 15, React 19, Tailwind CSS
- **CMS:** Strapi 5 (Community)
- **Деплой:** Railway (рекомендуется)

## Структура репозитория

- `frontend/` — Next.js приложение
- `backend/` — Strapi 5 (контент и медиа)

## Требования

- **Backend:** PostgreSQL (см. ниже — можно не устанавливать, а поднять через Docker).
- **Frontend:** Node.js и npm/yarn.

## PostgreSQL без установки

**Neon (рекомендуется):** бесплатный облачный PostgreSQL. Инициализация и connection string:

```bash
npx neonctl@latest init
```

В `backend/.env` укажите одну переменную:

```env
DATABASE_URL=postgresql://USER:PASSWORD@HOST/neondb?sslmode=require
```

(Connection string можно взять из Neon Console или из вывода `neonctl init`.)

**Docker:** в корне проекта есть `docker-compose.yml`. Запуск: `docker compose up -d`. В `.env` тогда используйте отдельные переменные `DATABASE_HOST`, `DATABASE_NAME`, `DATABASE_USERNAME`, `DATABASE_PASSWORD` (см. `backend/.env.example`).

## Локальный запуск

### План запуска (по шагам)

1. **Backend:** в `backend` есть файл `.env` с `DATABASE_URL` (Neon). Выполните один раз:
   ```bash
   cd backend
   npm install
   ```
2. **Запуск:** из корня проекта `npm run dev` или дважды кликнуть `scripts/start.bat`.
3. При первом старте Strapi в базу подставится мок-контент (настройки сайта + 2 автомобиля). Если база уже была заполнена — сид не перезапишет данные.
4. Админка: http://localhost:1337/admin (при первом заходе создайте админ-аккаунт). В **Settings → Users & Permissions → Public** включите **find** и **findOne** для `car` и `site-setting`.
5. Сайт: http://localhost:3000.

### Запуск одной командой (backend + frontend)

**Вариант А — из корня проекта (один терминал, оба сервера):**

```bash
# Один раз: установить зависимости в backend, frontend и корне
cd backend && npm install && cd ..
cd frontend && npm install && cd ..
npm install

# Запуск обоих серверов
npm run dev
```

Backend: http://localhost:1337/admin · Frontend: http://localhost:3000

**Вариант Б — скрипт (два окна терминала):**

- **Windows:** дважды кликнуть `scripts/start.bat` или в cmd: `scripts\start.bat`
- **PowerShell:** `.\scripts\start.ps1`

Откроются два окна: в одном Strapi, в другом Next.js.

### По отдельности

**Backend (Strapi):** скопируйте `backend/.env.example` в `backend/.env`, для Neon укажите `DATABASE_URL`. Затем:

```bash
cd backend
npm install
npm run develop
```

- Админка: http://localhost:1337/admin  
- При первом запуске создайте учётную запись администратора.
- В **Settings → Users & Permissions → Roles → Public** включите для `car` и `site-setting` права **find** и **findOne**.
- Заполните контент: автомобили (Cars) и одну запись «Настройки сайта» (Site setting).

**Frontend (Next.js):**

```bash
cd frontend
npm install
npm run dev
```

- Сайт: http://localhost:3000  
- Если Strapi не запущен или нет данных, отображаются мок-данные с главной страницы.

### Переменные окружения (frontend)

В `frontend/.env.local`:

```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
```

Для продакшена укажите URL вашего Strapi (например, на Railway).

## Деплой на Railway

1. Создайте проект на [Railway](https://railway.com/).
2. **Backend:** подключите репозиторий, корень сервиса — папка `backend`. Добавьте PostgreSQL (New → Database → PostgreSQL), в переменных окружения backend укажите переменные БД из Railway (`DATABASE_HOST`, `DATABASE_NAME`, `DATABASE_USERNAME`, `DATABASE_PASSWORD`, при необходимости `DATABASE_SSL=true`). Задайте `APP_KEYS`, `ADMIN_JWT_SECRET`, `API_TOKEN_SALT`, `TRANSFER_TOKEN_SALT`.
3. **Frontend:** второй сервис, корень — `frontend`. В переменных задайте `NEXT_PUBLIC_STRAPI_URL=https://your-strapi-url.onrailway.app`.
4. В Strapi **Settings → Users & Permissions → Roles → Public** включите **find** / **findOne** для `car` и `site-setting`. В **Settings → CORS** добавьте домен фронта.

## Контент в Strapi

- **Car (коллекция):** название, slug, описание, цена, подпись к цене, ссылка на документы, фото (1–4), характеристики (JSON), преимущества (JSON), порядок.
- **Site setting (одиночный тип):** заголовок/подзаголовок Hero, преимущества Hero, блок «О компании», адрес, часы работы, телефоны, соцсети, URL карты (iframe).

Форма «Связаться с нами» пока никуда не отправляет данные — только валидация и сообщение об успехе.
