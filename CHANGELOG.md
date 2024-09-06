# Changelog

## Template

### 🚀 Features

### ✨ Improvements

### 🐞 Bugfixes

### 🔧 Others

- 💫 **DX**:
- 💻 **Backend**:
- 🎨 **Frontend**:
- 🚂 **Deploy**:

## [v3.0.0] - TBD

### 🚀 Features

- 💻 **Backend**: Added `celery` to replace the `django scheduler` to run tasks
- 💻 **Backend**: Updated `health` API to check for `rabbitmq, celery, meilisearch`
- 🎨 **Frontend**: Migrated the entire app to **TypeScript**
- 🎨 **Frontend**: Replaced frontend API implementation with **React Query**
- 🎨 **Frontend**: Added **Vitest** and **MSW**
- 🎨 **Frontend**: Added **Tailwind CSS** and reworked all components to use it
- 🎨 **Frontend**: Added `millionjs` for better performance
- 🎨 **Frontend**: Added metadata to pages (lang, title, description, etc.)
- 🎨 **Frontend**: Displays app version in the footer

### ✨ Improvements

- 💻 **Backend**: Conditional handling of the `FLY_VOLUME` in settings
- 💻 **Backend**: Removed the `wait_for_db.py` script
- 💻 **Backend**: Updated `.env` and `settings/*` to handle `celery`, `rabbitmq`, and `meilisearch`
- 💫 **DX**: Added `.markdownlint.json` for linter custom configuration
- 💫 **DX**: Split `Dockerfile` into 2 files, one for dev and one for prod
- 💫 **DX**: Updated the `fly.example.toml` for deployment
- 💫 **DX**: Improved backend's `makefile`
- 🎨 **Frontend**: Increased `authCheck` interval to 5 minutes
- 🎨 **Frontend**: Updated store calls with `useShallow()`
- 🎨 **Frontend**: Setup both unit tests and integration tests for the entire frontend
- 🎨 **Frontend**: Added coverage for frontend testing
- 🎨 **Frontend**: Updated design and theme colors

### 🐞 Bugfixes

- 💻 **Backend**: Fixed catch-all route in `urls.py`
- 🚂 **Deploy**: Fixed Dockerfile not copying correctly the frontend build
- 💫 **DX**: Added `.githooks` to run `biome, tsc, ruff, mypy` on commit
- 💫 **DX**: Improved CI/CD pipeline with re-usable workflows
- 🎨 **Frontend**: Correctly fetches app config after login

### 🔧 Others

- 💻 **Backend**: Added example indexer `UserIndexer` with tasks and scheduled CRON on celery
- 🚂 **Deploy**: Updated sentry tracing to only trace the `api` app
- 💫 **DX**: Added `rabbitmq, meilisearch, meilisearch_ui` into the `docker-compose` configuration
- 💫 **DX**: Added VSCode settings and tasks for easier development
- 💫 **DX**: Added `.tool-versions` for `asdf`
- 💫 **DX**: Updated `README.example.md`
- 🎨 **Frontend**: Replaced `prettier` and `eslint` with `biome`

## [v2.0.1] - 2024-02-23

### ✨ Improvements

- 💻 **Backend**: Updated `coverage` config

### 🐞 Bugfixes

- 💻 **Backend**: Fixed deprecated `ping` route import in `urls.py`

### 🔧 Others

- 💻 **Backend**: Moved `scheduler` into its own app, rather than being part of the `core` app

## [v2.0.0] - 2024-02-18

### 🚀 Features

- 💻 **Backend**: Postgres (with postgis) as default database
- 💻 **Backend**: Added `coverage` to the dev dependencies and the `coverage` command to the `makefile`
- 💻 **Backend**: Added `dj-database-url` to the dependencies for easier database configuration in production
- 💻 **Backend**: Updated Sentry configuration with profiler, traces, release, and GDPR settings
- 💻 **Backend**: Added prometheus metrics inside the Django app so that fly.io can scrape them
- 💻 **Backend**: Added healthchecks for the app and the database
- 🚂 **Deploy**: Use new healthchecks through fly.io
- 🚂 **Deploy**: Scrapes prometheus metrics from the app on fly.io
- 🚂 **Deploy**: Added and implemented script that checks if the database is up before running the app
- 💫 **DX**: `docker-compose.yml` now runs the frontend as well

### ✨ Improvements

- 💻 **Backend**: Updated dependencies
- 💻 **Backend**: Updated pre-commit hooks configuration
- 💻 **Backend**: Backend test now run with `coverage`
- 💻 **Backend**: New `.env.test.example` file for test settings
- 💻 **Backend**: Added `DEFAULT_FROM_EMAIL` env variable
- 💻 **Backend**: `User` model now overrides `save` instead of using signals
- 💫 **DX**: Added `.tool-versions` for `asdf` compatibility
- 💫 **DX**: Updated `README.example.md` to provide a step-by-step guide to use the app
- 💫 **DX**: Updated jobs to match the new configuration (python 3.12, postgres, node, etc.)
- 🎨 **Frontend**: Updated node to `20.11.1`
- 🎨 **Frontend**: Updated all dependencies
- 🎨 **Frontend**: Updated `prettier, eslint, stylelint` configs

### 🐞 Bugfixes

- 💻 **Backend**: Now uses `SimpleRouter` and swagger/schemas routes are no longer visible in production

### 🔧 Others

- 🚂 **Deploy**: Updated the `fly.example.toml` file to use the new `flyctl` CLI
- 💫 **DX**: `docker-compose.yml` has been moved to the root folder

## [v1.3.0] - 2023-11-26

### 🚀 Features

- 💻 **Backend**: Handles and serves media files:
  - Updated `MEDIA_ROOT`, `MEDIA_URL` and `urls.py`
  - Updated **production** settings to store media files on the **fly** volume
  - Updated **test** settings to use a different folder and delete it after tests
  - Updated `vite` config to proxy **media** and **static** files as well
- 💻 **Backend**: New `AppViewSet` to provide app-wide information

### ✨ Improvements

- 💻 **Backend**: Moved logs to a sub-folder
- 💻 **Backend**: Updated API tests to use `reverse` urls
- 💻 **Backend**: `UserSerializer` now provides more fields like `is_staff` and `is_superuser` as read-only
- 💫 **DX**:Improved Postgres integration:
  - `depends_on` postgres in `docker-compose.yml`
  - `wait_for_db.py` and its usage in `run-app.sh` and `run-scheduler.sh`
- 💫 **DX**: Improved `makefile` to better for with `docker-compose`
- 💫 **DX**:Updated `README.example.md` to provide a step-by-step guide to deploy the app with `fly`
- 💫 **DX**:QA improvements with separate jobs

### 🐞 Bugfixes

- 💻 **Backend**: Updated `robots.txt` route pattern and the catch-all route as well

### 🔧 Others

- 🚂 **Deploy**: Fixed `deploy.yml` indentation for triggers
- 💫 **DX**: Updated all dependencies and pre-commits
- 🎨 **Frontend**: Removed Cascadia Code font

## [v1.2.1] - 2023-06-22

### 🐞 Bugfixes

- 💻 **Backend**: Fixed theme in django admin
- 💻 **Backend**: Fixed theme in email templates

## [v1.2.0] - 2023-06-21

### ✨ Improvements

- 🎨 **Frontend**: Added `global.less` and imported it in `App`
- 🎨 **Frontend**: Changed theme to `dark` and updated theme colors

### 🐞 Bugfixes

- 🎨 **Frontend**: Fixed user proptypes and serialization

### 🔧 Others

- 💫 **DX**: Renamed `JetBrains` run configurations
- 💫 **DX**: Flagged frontend as web-resource for idea projects
- 🎨 **Frontend**: Renamed `IconButton`'s prop `isTextButton` to `isText`

## [v1.1.0] - 2023-05-01

### ✨ Improvements

- 💫 **DX**: Added `.idea/` folder to the project, with proper `.gitignore` file
- 💫 **DX**: Added **run** configuration for `JetBrains` IDE
- 💫 **DX**: Updated pre-commits (specifically mypy)
- 💫 **DX**: Updated linters and formatters settings

### 🐞 Bugfixes

- 🎨 **Frontend**: Fixed JS types

### 🔧 Others

- 💻 **Backend**: Updated python `requirements.txt` and `requirements-dev.txt`

## [v1.0.0] - 2023-04-25

Fully functional starter kit.
