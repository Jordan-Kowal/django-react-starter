# Changelog

## [v?] - ???

- Frontend
  - Flagged frontend as web-resource for idea projects
  - Added `global.less` and imported it in `App`
  - Renamed `IconButton`'s prop `isTextButton` to `isText`
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
