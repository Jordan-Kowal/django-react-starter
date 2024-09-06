# Django React Starter

Django-React starter with Docker support for fast and easy web development.

- [Django React Starter](#django-react-starter)
  - [Getting started](#getting-started)
  - [Features](#features)

## Getting started

Simply follow these steps to get started:

- Fork this repository
- Clone your fork
- Update documentation:
  - Use the `README.example.md` file as a template for your own `README.md` file
  - Use the `CHANGELOG.example.md` file as a template for your own `CHANGELOG.md` file
  - Update the `LICENSE` file
  - Remove `yarn.lock` file
- Update the code:
  - Replace all occurrences of `django_react_starter` with `your_project_name`
  - Replace all occurrences of `django-react-starter` with `your-project-name`
  - Replace all occurrences of `Django React Starter` with `Your Project Name`
  - Update whatever you see fit
  - Use `docker-compose up` to run the application locally
- Deployment:
  - Create your own **fly.toml** file using `fly launch` (see [Fly.io](https://fly.io) for more information)
- Start coding!

## Features

This starter delivers a fully-working and deployment-ready application with:

- Backend: Django + DRF + Celery
- Frontend: Vite + React + Antd
- Database: Postgres
- Search engine: Meilisearch and its UI
- Messaging: RabbitMQ

**Tools for local development:**

- `Dockerfile` to build the final Django image that includes the React frontend
- `docker-compose` to run the application locally (frontend + backend + database)
- `pre-commit` hooks for both backend and frontend

**CI/CD ready to go:**

Provides 4 different jobs:

- [qa-backend](.github/workflows/qa-backend.yml): runs ruff, mypy, and tests
- [qa-frontend](.github/workflows/qa-frontend.yml): runs biome and frontend tests
- [rebase-check](.github/workflows/rebase-check.yml): checks if the branch can be rebased on `main`
- [deploy](.github/workflows/deploy.yml): deploys the application on **fly.io**
