# Django React Starter

Django-React application starter template.
Simply fork this repository and start building your application.

## Get started

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
- Deployment:
  - Create your own **fly.toml** file using `fly launch` (see [Fly.io](https://fly.io) for more information)
  - Update the GitHub action `deploy.yml` to be triggered on release
- Start coding!

## Features

- Django backend with DRF with existing pre-configured routes, including:
- React frontend with functional UI and pages
- `docker-compose` for local development
- `Dockerfile` to build the entire application
- CI/CD pipeline using GitHub Actions for QA, build, and deployment
- `pre-commit` hooks for linting and formatting
- `fly.toml` for deployment to [Fly.io](https://fly.io)
