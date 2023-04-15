# Django React Starter

Django-React application starter template.
Simply fork this repository and start building your application.

## Get started
Simply follow these steps to get started:
- Fork this repository
- Clone your fork
- Create your own README, CHANGELOG, and LICENCE files
- Create your own **fly.toml** file using `fly launch` (see [Fly.io](https://fly.io) for more information)
- Replace all occurrences of:
  - `django_react_starter` with your project name
  - `django-react-starter` with your project name
  - `Django React Starter` with your project name
- Start coding!


## Base README for your project

----------

## Installation

This project is made of 3 parts:

- A shared base with pre-commit hooks and the main Dockerfile
- The frontend, which is a React application
- The backend, which is a Django application

Do note that the application, when built using the Dockerfile,
will result in only one app, as the React app will be nested
within the Django app.

### Setting up the base

You'll simply need to install a virtual environment and pre-commit
hooks. To do so, run the following commands:

```bash
python3 -m venv venv
source venv/bin/activate
pip install pre-commit
pre-commit install
```

### Setting up the frontend
The frontend is a React application, so you'll need to install
its dependencies and build it. To do so, run the following commands:

```bash
cd frontend
yarn install
```

Then simply run `yarn start` to start the app in development mode.

### Setting up the backend

The backend is a Django application which uses either PostgreSQL or SQLite as its
database. We've provided a few tools to help you along the way:
- A `docker-compose.yml` file to run a both Django and the Postgres database
- A `makefile` to provide shortcuts to common commands (it also preloads the .env file)
- A `.env.sample` that lists the expected environment variables

```bash
cd backend
cp .env.sample .env  # then edit the file to match your environment
docker-compose up
```

_Note that postgres is optional, and the default setup will use SQLite.
To use postgres, simply uncomment the lines in the `docker-compose.yml` and `settings/base.py` files._


## QA and CI/CD
We use GitHub actions to build and deploy the application. We currently have 2 main pipelines:
- [QA](.github/workflows/qa.yml): Checks linters/formatters and run tests for both frontend and backend
- [deploy](.github/workflows/deploy.yml): Builds the application and deploys it to the production server

## Made by JKDev

<img alt="JKDev logo" src="https://jordan-kowal.github.io/assets/jkdev/logo.png" width="100" />
