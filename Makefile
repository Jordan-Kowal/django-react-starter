.ONESHELL:
SHELL:= /bin/bash
.PHONY: test

BACKEND_DOCKER_EXEC=@docker exec -it django_react_starter_api
BACKEND_BASH_EXEC=$(BACKEND_DOCKER_EXEC) bash -c
FRONTEND_DOCKER_EXEC=@docker exec -it django_react_starter_front
FRONTEND_BASH_EXEC=$(FRONTEND_DOCKER_EXEC) bash -c

# Args
cmd=
env_file='.env'
opts=

# --------------------------------------------------
# Private
# --------------------------------------------------
_manage_py:
	$(BACKEND_BASH_EXEC) "\
		cd backend && \
		source $(env_file) && \
		python manage.py $(cmd) \
		$(opts)"

# --------------------------------------------------
# Backend
# --------------------------------------------------
backend.bash:
	$(BACKEND_DOCKER_EXEC) bash

backend.makemigrations:
	@$(MAKE) -s _manage_py cmd=makemigrations

backend.migrate:
	@$(MAKE) -s _manage_py cmd=migrate
	@$(MAKE) -s _manage_py cmd=migrate env_file='.env.test'

backend.quality:
	$(BACKEND_BASH_EXEC) "cd backend \
		&& ruff check --select I . \
		&& ruff check . \
		&& ruff format --check . \
		&& ty check . --error-on-warning \

backend.shell:
	@$(MAKE) -s _manage_py cmd=shell

backend.test:
	@$(MAKE) -s _manage_py cmd=test env_file='.env.test' opts="--parallel"

backend.test.coverage:
	$(BACKEND_BASH_EXEC) "\
		cd backend && \
		source .env.test && \
		coverage run --source='.' manage.py test --parallel && \
		coverage report && \
		coverage html"


# --------------------------------------------------
# Frontend
# --------------------------------------------------
frontend.bash:
	$(FRONTEND_DOCKER_EXEC) bash

frontend.i18n:
	$(FRONTEND_BASH_EXEC) "yarn i18n"

frontend.quality:
	$(FRONTEND_BASH_EXEC) "yarn quality"

frontend.test:
	$(FRONTEND_BASH_EXEC) "yarn test"

frontend.test.coverage:
	$(FRONTEND_BASH_EXEC) "yarn test:coverage"


# --------------------------------------------------
# Docker
# --------------------------------------------------
start:
	@docker compose --profile=all up --build

start.lite:
	@docker compose --profile=lite up --build

stop:
	@docker compose down


# --------------------------------------------------
# Others
# --------------------------------------------------
setup_hooks:
	@git config core.hooksPath .githooks

# Outputs is not aligned in IDE but will be in terminal
help:
	@echo "Usage: make [TARGET]"
	@echo ""
	@echo "----- BACKEND -------------------------------------------------------------------------"
	@echo "backend.bash:				Opens a bash session in the api container"
	@echo "backend.makemigrations:			Generates new migrations based on models"
	@echo "backend.migrate:			Runs the migration"
	@echo "backend.quality:			Runs ruff and ty"
	@echo "backend.shell: 				Opens the Django shell for the running instance"
	@echo "backend.test:				Runs tests"
	@echo "backend.test.coverage:			Runs tests and generates coverage report"
	@echo "----- FRONTEND ------------------------------------------------------------------------"
	@echo "frontend.bash: 				Opens a bash session in the frontend container"
	@echo "frontend.i18n: 				Runs i18n to generate translations"
	@echo "frontend.quality: 			Runs biome, tsc, and translation checks"
	@echo "frontend.test: 				Runs tests"
	@echo "frontend.test.coverage:			Runs tests and generates coverage report"
	@echo "----- DOCKER --------------------------------------------------------------------------"
	@echo "start: 					Starts all containers using docker compose"
	@echo "start.lite: 				Starts only dependencies containers using docker compose"
	@echo "					(postgres, rabbitmq, meilisearch, ...)"
	@echo "stop: 					Stops the containers using docker compose"
	@echo "----- OTHERS --------------------------------------------------------------------------"
	@echo "setup_hooks: 				Setups the git pre-commit hooks"
	@echo "help: 					Prints this help message"
