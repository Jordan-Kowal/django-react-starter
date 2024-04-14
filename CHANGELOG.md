# Changelog

## [v2.2.0] - TBD

- **DX**
  - Simplified `Dockerfile`
  - Update `Makefile` documentation and test commands
- **Frontend**
  - Fixed prettier config with plugins
  - Updated store calls with `useShallow()`
  - Increased `authCheck` interval to 5 minutes
  - Reworked imports for components and pages
- **Backend**
  - Fix catch-all route in `urls.py`

## [v2.0.1] - 2024-02-23

- Updated `coverage` config
- Moved `scheduler` into its own app, rather than being part of the `core` app
- Fixed deprecated `ping` route import in `urls.py`

## [v2.0.0] - 2024-02-18

- **Deploy:**
    - Updated the `fly.example.toml` file to use the new `flyctl` CLI
    - Added and implemented script that checks if the database is up before running the app
    - Scrapes prometheus metrics from the app on fly.io
    - Use new healthchecks through fly.io
- **DX**:
    - `docker-compose.yml` has been moved to the root folder
    - `docker-compose.yml` now runs the frontend as well
    - Added `.tool-versions` for `asdf` compatibility
    - Updated `README.example.md` to provide a step-by-step guide to use the app
- **Backend**:
    - Updated dependencies
    - Postgres (with postgis) as default database
    - Added `coverage` to the dev dependencies and the `coverage` command to the `makefile`
    - Added `dj-database-url` to the dependencies for easier database configuration in production
    - New `.env.test.example` file for test settings
    - Added `DEFAULT_FROM_EMAIL` env variable
    - `User` model now overrides `save` instead of using signals to create the `Profile` instance
    - Changed router to `SimpleRouter` and swagger/schemas routes are no longer included in production
    - **MAJOR**: Updated Sentry configuration with profiler, traces, release, and GDPR settings
    - **MAJOR**: Added prometheus metrics inside the Django app so that fly.io can scrape them
    - **MAJOR**: Added healthchecks for the app and the database
- **Frontend**:
    - Updated node to `20.11.1`
    - Updated all dependencies
    - `docker-compose.yml` now runs the frontend as well
    - Updated `prettier, eslint, stylelint` configs
- **CI/CD**:
    - Updated jobs to match the new configuration (python 3.12, postgres, etc.)
    - Backend test now run with `coverage`
    - Updated pre-commit hooks configuration

## [v1.3.0] - 2023-11-26

- **Deploy:**
    - Fixed `deploy.yml` indentation for triggers
    - Updated `README.example.md` to provide a step-by-step guide to deploy the app with `fly`
    - QA improvements with separate jobs
- **Backend:**
    - Improved Postgres integration:
        - `depends_on` postgres in `docker-compose.yml`
        - `wait_for_db.py` and its usage in `run-app.sh` and `run-scheduler.sh`
    - Improved `makefile` to better for with `docker-compose`
    - Moved logs to a sub-folder
    - Handles and serves media files:
        - Updated `MEDIA_ROOT`, `MEDIA_URL` and `urls.py`
        - Updated **production** settings to store media files on the **fly** volume
        - Updated **test** settings to use a different folder and delete it after tests
    - New `AppViewSet` to provide app-wide information
        - Added `config` endpoint to provide app settings data to frontend
    - Updated API tests to use `reverse` urls
    - Updated all dependencies and pre-commits
    - Updated `robots.txt` route pattern and the catch-all route as well
    - `UserSerializer` now provides more fields like `is_staff` and `is_superuser` as read-only
- **Frontend:**
    - Handles the new `AppViewSet.config` endpoint:
        - New API endpoints to fetch the app settings
        - New store `useAppConfig` to share the app settings across the app
        - Automatically fetched after login
    - Updated `vite` config to proxy **media** and **static** files as well
    - Updated all dependencies
    - Removed Cascadia Code font

## [v1.2.1] - 2023-06-22

- Fixed theme in django admin
- Fixed theme in email templates

## [v1.2.0] - 2023-06-21

- Frontend
    - Changed theme to `dark` and updated theme colors
    - Flagged frontend as web-resource for idea projects
    - Added `global.less` and imported it in `App`
    - Renamed `IconButton`'s prop `isTextButton` to `isText`
    - Fixed user proptypes and serialization
- JetBrains
    - Removed ` Run backend server locally` from the available run configurations
    - Renamed run configurations

## [v1.1.0] - 2023-05-01

- Dependencies
    - Updated python `requirements.txt` and `requirements-dev.txt`
- QA
    - Updated linters and formatters settings
    - Updated pre-commits (specifically mypy)
    - Fixed JS types
- JetBrains
    - Added `.idea/` folder to the project, with proper `.gitignore` file
    - Added **run** configuration for jetbrains IDE:
        - Run frontend tests
        - Run frontend server normally
        - Run backend tests
        - Run backend server normally
        - Run backend server through `docker-compose`

## [v1.0.0] - 2023-04-25

Fully functional starter kit.
