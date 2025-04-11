# Changelog

## Template

### 🚀 Features

### ✨ Improvements

### 🐞 Bugfixes

### 🔧 Others

- 💫 **DX**:
- 🍬 **UX**:
- 💻 **Backend**:
- 🎨 **Frontend**:
- 🚂 **Deploy**:

## TBD

### 🚀 Features

- 🍬 **UX**: Added register form allowing users to create an account
- 🍬 **UX**: Added password reset workflow
- 🍬 **UX**: Added "Danger Zone" in settings page to allow users to delete their account

### 🐞 Bugfixes

- 🎨 **Frontend**: Fixed default font family not being applied to toasts and some texts
- 💻 **Backend**: Fixed user being disconnected after password update

### 🔧 Others

- 💫 **DX**: Added `.github/copilot-instructions.md` file for easier prompting in Cursor
- 💫 **DX**: Added `make start` command to run project in docker
- 💻 **Backend**: Changed Django default language to English
- 💻 **Backend**: Changed DRF's error messages to English
- 💻 **Backend**: Made API tests more reliable and robust
- 💻 **Backend**: Changed `self/` API to use `self/account/` for cleaner routing in viewset
- 💻 **Backend**: Added parallelization to backend tests with the `Makefile`

## [v4.0.0] - 2025-03-28

✨ **Major frontend rework** ✨

In an attempt to have a simpler, faster, and lighter frontend,
I made the following (very opinionated) changes:

- 🎨 **Design rework**: we moved away from `antd` and instead chose the CSS-only `daisyUI` package
- 🗣️ **i18n support**: The starter is fully setup for i18n and already handles both French and English
- 📦 **Smaller**: The bundle size has been reduced by more than half, and now sits at ~150kB gzip
- 🔗 **Deps**: We removed and clean up deps, and replaced some of them with smaller/simpler alternatives

See the full list of changes below

### 🚀 Features

- 🎨 **Frontend**: Added `i18n` management with English and French support
- 🎨 **Frontend**: Major design rework: replaced `antd` with `daisyUI`
- 🎨 **Frontend**: Added `lucide-react` for icon management
- 🎨 **Frontend**: Added `@tailwindcss/typography` for easier typography management
- 🎨 **Frontend**: Replaced `react-router-dom` and `react-helmet-async` with `wouter`
- 🎨 **Frontend**: Added page transitions using custom `FadeIn` component
- 🎨 **Frontend**: Added `react-toastify` for notification management
- 🎨 **Frontend**: Handle forms using `react-hook-form` and `zod`

### ✨ Improvements

- 💫 **DX**: `Makefile` improvement
- 💫 **DX**: Added `rollup-plugin-visualizer` to visualize bundle size (in `bundle-stats.html`)
- 🎨 **Frontend**: Major folder structure rework
- 🎨 **Frontend**: Default font to `Nunito`
- 🎨 **Frontend**: Cleaned up unused dependencies: `classnames`, `react-use`, `zustand`, `react-scan`

### 🔧 Others

- 💻 **Backend**: Upgraded deps
- 🚂 **Deploy**: Upgraded python/node version for docker images (dev/prod)
- 💫 **DX**: Upgraded docker images in both `docker-compose` and CI
- 🎨 **Frontend**: Upgraded deps

## [v3.2.0] - 2025-01-25

### 🔧 Others

- 💻 **Backend**: Upgraded deps
- 🎨 **Frontend**: Upgraded deps
- 🎨 **Frontend**: Migrated to `vite` 6 and `tailwind` 4
- 🎨 **Frontend**: Added `react-scan` in dev mode for easier debugging

## [v3.1.2] - 2024-12-31

### 🔧 Others

- 💻 **Backend**: Upgraded deps
- 🎨 **Frontend**: Upgraded deps
- 💫 **DX**: Removed `.tool-versions`

## [v3.1.1] - 2024-11-15

### 🐞 Bugfixes

- 💻 **Backend**: Correctly handle CSRF protection on `/login` route,
  which was disabled by DRF's `SessionAuthentication`.
  (Impact was strictly limited to this one view)

## [v3.1.0] - 2024-11-15

### 🚀 Features

- 💻 **Backend**: Added `UserIndexer` index creation on app start as an example

### ✨ Improvements

- 💻 **Backend**: Replaced `jklib` with `django-utils-kit` and `django-meilisearch-indexer`
- 💻 **Backend**: Removed most of `UserIndexer` tests to avoid re-testing the library
- 💻 **Backend**: Removed mock of `UserIndexer.index_name` since the celery tasks are mocked

### 🔧 Others

- 💻 **Backend**: Set `django.core.mail.backends.locmem.EmailBackend` as `EMAIL_BACKEND` for the test environment
- 💻 **Backend**: Updated deps
- 🎨 **Frontend**: Updated deps

## [v3.0.2] - 2024-10-04

### ✨ Improvements

- 💫 **DX**: Simplified `dependabot` config

### 🐞 Bugfixes

- 💻 **Backend**: Fixed deps update not working correctly
- 🎨 **Frontend**: Fixed `Spin` component ignoring extra props
- 🎨 **Frontend**: Fixed `biome` scripts in `package.json` that used deprecated args
- 🎨 **Frontend**: Fixed **Tailwind** config file that overwrote colors instead of extending them

### 🔧 Others

- 💻 **Backend**: Updated deps
- 🎨 **Frontend**: Updated deps
- 🎨 **Frontend**: Updated some imports to be absolute rather than relative

## [v3.0.1] - 2024-09-24

### 🐞 Bugfixes

- 💻 **Backend**: GitHub action to update python deps now uses token user in commit

### 🔧 Others

- 💻 **Backend**: Updated deps
- 💫 **DX**: Updated version in both `pyproject.toml` and `package.json`
- 🎨 **Frontend**: Updated deps

## [v3.0.0] - 2024-09-23

### 🚀 Features

- 💻 **Backend**: Added `celery` to replace the `django scheduler` to run tasks
- 💻 **Backend**: Updated `health` API to check for `rabbitmq, celery, meilisearch`
- 💻 **Backend**: Added `uv` as package manager
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
- 💫 **DX**: Improved CI/CD pipeline with re-usable workflows
- 🎨 **Frontend**: Correctly fetches app config after login

### 🔧 Others

- 💻 **Backend**: Added example indexer `UserIndexer` with tasks and scheduled CRON on celery
- 💻 **Backend**: Upgraded to python `3.12.5` and upgraded dependencies
- 💻 **Backend**: Now uses `pyproject.toml` for project, ruff, and mypy config
- 🚂 **Deploy**: Updated `.dockerignore`
- 🚂 **Deploy**: Updated sentry tracing to only trace the `api` app
- 💫 **DX**: Added `rabbitmq, meilisearch, meilisearch_ui` into the `docker-compose` configuration
- 💫 **DX**: Added VSCode settings and tasks for easier development
- 💫 **DX**: Added `.tool-versions` for `asdf`
- 💫 **DX**: Updated `README.example.md`
- 💫 **DX**: Moved `biome.json` at root folder to work with the VSCode extension
- 💫 **DX**: Removed `runOnSave` settings and simplified workspace VSCode settings
- 💫 **DX**: Added `.githooks` to run `biome, tsc, ruff, mypy` on commit
- 💫 **DX**: Added `dependabot` config to the repo for frontend dependencies
- 💫 **DX**: Added a github action to update backend dependencies with UV
- 🎨 **Frontend**: Replaced `prettier` and `eslint` with `biome`
- 🎨 **Frontend**: Upgraded to node `20.17.0` and upgraded dependencies

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
