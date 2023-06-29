# Django React Starter

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

## Deploying for the first time

To deploy to fly, we'll need to:

- Create a fly app
- Create a fly volume
- Set the secrets

```shell
cp fly.example.toml fly.toml
fly secrets set --app='django-react-starter' \
  DJANGO_SUPERUSER_EMAIL='[Your email]' \
  DJANGO_SUPERUSER_PASSWORD='[Your password]' \
  SECRET_KEY='[Your secret key]' \
  SENTRY_INGESTION_FQDN='[Your sentry FQDN].ingest.sentry.io' \
  SENTRY_PROJECT='[Your project ID]' \
  SENTRY_SDK_SECRET_KEY='[Your sentry key]'
fly volumes create django_react_starter_data --region cdg --no-encryption --size 1

# You might need to scale the app:
fly scale show
fly scale memory 512
```

Don't forget to set the `FLY_ACCESS_TOKEN` secret in the GitHub repository.

## Made by JKDev

<img alt="JKDev logo" src="https://jordan-kowal.github.io/assets/jkdev/logo.png" width="100" />
