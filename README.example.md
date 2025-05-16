# Django React Starter

- [Django React Starter](#django-react-starter)
  - [Structure](#structure)
  - [Getting started](#getting-started)
    - [Pre-requisites](#pre-requisites)
    - [Installation](#installation)
  - [Running the app](#running-the-app)
    - [How it works](#how-it-works)
    - [Running commands](#running-commands)
  - [QA](#qa)
    - [Using git hooks](#using-git-hooks)
    - [GitHub Actions](#github-actions)
  - [Available URLs](#available-urls)
  - [Deployment](#deployment)
  - [Made by JKDev](#made-by-jkdev)

## Structure

This project contains both the frontend and backend of the application:

- `/backend`: Django application which uses:
  - `Postgres` for the database
  - `RabbitMQ` for the message broker
  - `Celery` for background tasks
  - `MeiliSearch` for search
- `/frontend`: React application

Note that when building and deploying the application, the frontend is built
and served by the backend directly, meaning we only deploy 1 application.

## Getting started

### Pre-requisites

This application is build using `docker` and `docker compose`. Make sure to install them:

- [Docker](https://docs.docker.com/install/)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Installation

Before starting the application, you will need to create the `.env` and `.env.test` files

```shell
cp backend/.env.example backend/.env
cp backend/.env.test.example backend/.env.test
```

Then you can start the application:

```shell
docker compose up
# or
make start
# or
make start.lite
```

You might need to update the frontend's `vite.config.ts` **server** options based on
whether the backend is running locally or within docker.

_Also, while the entire project runs with `docker compose`, you might want to_
_install a python virtual environment and the node modules locally_
_for a better IDE experience._

## Running the app

### How it works

Regarding the way we boot the Django app:

- `docker compose up` will built and boot all of our **containers**
- The **django container** will call `supervisord` to boot the Django app
- The `supervisord.conf` will call both `run-app.sh` and `run-celery-worker.sh`
- `run-app.sh` will run a few commands and start the app

Also, when building the production image, the frontend is built and served by the backend directly.

### Running commands

Because everything runs in docker containers,
commands also need to be run inside the container.
To make things simpler, a `Makefile` is provided
for frequent/common commands.

```shell
make backend.makemigrations
make frontend.test
make setup_hooks
```

Run `make help` for more info.

## QA

### Using git hooks

Git hooks are set in the [.githooks](.githooks) folder
_(as `.git/hooks` is not tracked in `.git`)_

Run the following command to tell `git` to look for hooks in this folder:

```shell
git config core.hooksPath .githooks
```

or you can run the `Makefile` action

```shell
make setup_hooks
```

### GitHub Actions

We use GitHub actions to verify, build, and deploy the application. We currently have:

- [dependabot](.github/dependabot.yml): Dependabot configuration for frontend/backend dependencies
- [qa-backend](.github/workflows/qa-backend.yml): runs ruff, ty, and tests
- [qa-frontend](.github/workflows/qa-frontend.yml): runs biome, tsc, translations, and frontend tests
- [deploy-staging](.github/workflows/deploy-staging.yml): deploys the application on staging using **fly.io**
- [deploy-production](.github/workflows/deploy-production.yml): deploys the application on production using **fly.io**

## Available URLs

| Name             | URL                                  |
|------------------|--------------------------------------|
| Frontend         | <http://localhost:3000/>             |
| Backend          |                                      |
| -- Home          | <http://localhost:8000/>             |
| -- Admin         | <http://localhost:8000/admin/>       |
| -- Swagger       | <http://localhost:8000/api/swagger/> |
| -- API           | <http://localhost:8000/api/v1/>      |
| Meilisearch      |                                      |
| -- Default UI    | <http://localhost:7700/>             |
| -- Advanced UI   | <http://localhost:24900/>            |
| RabbitMQ         |                                      |
| -- Connection    | <http://localhost:5672/>             |
| -- Management UI | <http://localhost:15672/>            |

## Deployment

Deployment is done through [fly.io](https://fly.io/).
When deploying the application **for the first time**, you will need to:

- Create an account on [fly.io](https://fly.io)
- Install the `flyctl` CLI
- Run `fly launch` to create a new application
- Configure it however you want
- Make sure to set the `FLY_ACCESS_TOKEN` secret in the GitHub repository
- Then create a new release to trigger the deploy github action

## Made by JKDev

<img alt="JKDev logo" src="https://jordan-kowal.github.io/assets/jkdev/logo.png" width="100" />
