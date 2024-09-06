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
    - [Summary](#summary)
    - [Deploying for the first time](#deploying-for-the-first-time)
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

This application is build using `docker` and `docker-compose`. Make sure to install them:

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
docker-compose up
```

_While the entire project runs with `docker-compose`, you might want to_
_install a python virtual environment and the node modules locally_
_for a better IDE experience._

## Running the app

### How it works

Regarding the way we boot the Django app:

- `docker-compose up` will built and boot all of our **containers**
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
make api_makemigrations
make front_test
make setup_githooks
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
make setup_githooks
```

### GitHub Actions

We use GitHub actions to verify, build, and deploy the application. We currently have 4 main jobs:

- [qa-backend](.github/workflows/qa-backend.yml): runs ruff, mypy, and tests
- [qa-frontend](.github/workflows/qa-frontend.yml): runs biome and frontend tests
- [rebase-check](.github/workflows/rebase-check.yml): checks if the current branch can be rebased on `main`
- [deploy](.github/workflows/deploy.yml): deploys the application on **fly.io**

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

Deployment is done through [fly.io](https://fly.io/):

### Summary

|                  | Production                                    |
|------------------|-----------------------------------------------|
| **App**          | django_react_starter                          |
| **Config file**  | [fly.toml](fly.toml)                          |
| **Environment**  | `production`                                  |
| **URL**          | <https://django_react_starter.jkdev.app/>     |
| **Deploy**       | Manual/Automatic GitHub action                |
| **Availability** | Public                                        |
| **Sleep mode**   | No                                            |

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
