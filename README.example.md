# Django React Starter

## Summary

TBD

## Structure

This project contains both the frontend and backend of the application:

- `/backend`: Django application
- `/frontend`: React application

Note that when building and deploying the application, the frontend is built
and served by the backend directly, meaning we only deploy 1 application.

## Getting started

The application can be entirely run using the `docker-compose.yml` file located at the root.

- Copy the `.env.sample` file to `.env` and update the values
- Run `docker-compose up` to start the application

If you don't want to use docker, you can run the application manually:

- First, copy the `.env.sample` file to `.env` and update the values.
- Then, start your postgres server
- Finally, run the following commands to setup your backend AND your frontend:

```bash
# Backend
cd backend
python3 -m venv venv
pip install -r requirements.txt -r requirements-dev.txt
python manage.py migrate
python manage.py runserver
```

```bash
# Frontend
cd frontend
yarn install
yarn start
```

## QA and CI/CD

We use GitHub actions to verify, build, and deploy the application. We currently have 5 main jobs:

- [pre-commits](.github/workflows/pre-commits.yml): runs the pre-commit hooks for both backend and frontend
- [test-backend](.github/workflows/test-backend.yml): runs the backend tests
- [test-frontend](.github/workflows/test-frontend.yml): runs the frontend tests
- [rebase-check](.github/workflows/rebase-check.yml): checks if the current branch can be rebased on `main`
- [deploy](.github/workflows/deploy.yml): deploys the application on **fly.io**

## Deploying for the first time

To deploy the application, you will need to:
- Create an account on [fly.io](https://fly.io)
- Install the `flyctl` CLI
- Run `fly launch` to create a new application
- Configure it however you want
- Make sure to set the `FLY_ACCESS_TOKEN` secret in the GitHub repository
- Then create a new release to trigger the deploy github action

## Made by JKDev

<img alt="JKDev logo" src="https://jordan-kowal.github.io/assets/jkdev/logo.png" width="100" />
