# Django React Starter

- [Structure](#structure)
- [Getting started](#getting-started)
  - [Pre-requisites](#pre-requisites)
  - [Installation](#installation)
- [Running the app](#running-the-app)
  - [How it works](#how-it-works)
  - [Running Django commands](#running-django-commands)
- [QA](#qa)
  - [Using pre-commit hooks](#using-pre-commit-hooks)
  - [GitHub Actions](#github-actions)
- [Available URLs](#available-urls)
- [Deployment](#deployment)
  - [Summary](#summary)
  - [Deploying for the first time](#deploying-for-the-first-time)
- [Made by JKDev](#made-by-jkdev)

## Structure

This project contains both the frontend and backend of the application:

- `/backend`: Django application
- `/frontend`: React application

Note that when building and deploying the application, the frontend is built
and served by the backend directly, meaning we only deploy 1 application.

## Getting started

### Pre-requisites

This application is build using `docker` and `docker-compose`. Make sure to install them:

- [Docker](https://docs.docker.com/install/)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Installation

Before starting the application, you will need to create the `.env` and `.env.test` files:

```shell
cp backend/.env.example backend/.env
cp backend/.env.test.example backend/.env.test
# Fill-in the .env files
docker-compose up
```

## Running the app

### How it works

Regarding the way we boot the Django app:

- `docker-compose up` will built and boot our **container**
- The **container** will call `supervisord` to boot the Django app
- The `supervisord.conf` will call both `run-app.sh` and `run-scheduler.sh`
- `run-app.sh` will run a few commands and start the app

Note that in development mode, the scheduler is not started.

Also, when building the production image, the frontend is built and served by the backend directly.

### Running Django commands

Because the app runs inside a docker container,
commands also need to be run inside the container.
To make things simpler, a `Makefile` is provided
to bridge the gap between the host and the container.

```shell
make run cmd=makemigrations
make run cmd=migrate
make run cmd=test settings=test opts="--verbosity 0"
# There are also shortcuts for the most common commands
make makemigrations
make migrate
make test
```

## QA

### Using pre-commit hooks

```shell
pip install -r requirements.txt -r requirements-dev.txt
pre-commit install
pre-commit run --all-files
```

### GitHub Actions

We use GitHub actions to verify, build, and deploy the application. We currently have 5 main jobs:

- [pre-commits](.github/workflows/pre-commits.yml): runs the pre-commit hooks for both backend and frontend
- [test-backend](.github/workflows/test-backend.yml): runs the backend tests
- [test-frontend](.github/workflows/test-frontend.yml): runs the frontend tests
- [rebase-check](.github/workflows/rebase-check.yml): checks if the current branch can be rebased on `main`
- [deploy](.github/workflows/deploy.yml): deploys the application on **fly.io**

## Available URLs

| Name     | URL                                |
|----------|------------------------------------|
| Frontend | http://localhost:3000/             |
| Backend  | http://localhost:8000/             |
| Admin    | http://localhost:8000/admin/       |
| Swagger  | http://localhost:8000/api/swagger/ |
| API      | http://localhost:8000/api/v1/      |

## Deployment

Deployment is done through [fly.io](https://fly.io/):

### Summary

|                  | Production                              |
|------------------|-----------------------------------------|
| **App**          | django-react-starter                    |
| **Config file**  | [fly.toml](fly.toml)                    |
| **Environment**  | `production`                            |
| **URL**          | https://django-react-starter.jkdev.app/ |
| **Deploy**       | Manual/Automatic GitHub action          |
| **Availability** | Public                                  |
| **Sleep mode**   | Yes (to be changed)                     |

### Deploying for the first time

To deploy the application, you will need to:

- Create an account on [fly.io](https://fly.io)
- Install the `flyctl` CLI
- Run `fly launch` to create a new application
- Configure it however you want
- Make sure to set the `FLY_ACCESS_TOKEN` secret in the GitHub repository
- Then create a new release to trigger the deploy github action

## Made by JKDev

<img alt="JKDev logo" src="https://jordan-kowal.github.io/assets/jkdev/logo.png" width="100" />
