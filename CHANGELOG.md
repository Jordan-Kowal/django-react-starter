# Changelog

## [v1.3.0] - TBD

- Backend:
  - Handles and serves media files:
    - Updated `MEDIA_ROOT`, `MEDIA_URL` and `urls.py`
    - Updated **production** settings to store media files on the **fly** volume
    - Updated **test** settings to use a different folder and delete it after tests
  - New `AppViewSet` to provide app-wide information
    - Added `config` endpoint to provide app settings data to frontend
  - Updated API tests to use `reverse` urls
  - Updated all dependencies
- Frontend:
  - Handles the new `AppViewSet.config` endpoint:
    - New API endpoints to fetch the app settings
    - New store `useAppConfig` to share the app settings across the app
    - Automatically fetched after login
  - Updated `vite` config to proxy **media** and **static** files as well
  - Updated all dependencies 

## [v1.2.1] - 2023-22-06

- Fixed theme in django admin
- Fixed theme in email templates

## [v1.2.0] - 2023-21-06

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
