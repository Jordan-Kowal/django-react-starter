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
# Backend Utils
# --------------------------------------------------
api_bash:
	$(BACKEND_DOCKER_EXEC) bash

api_ruff:
	$(BACKEND_BASH_EXEC) "cd backend \
		&& ruff check --select=I --fix . \
		&& ruff check --fix --unsafe-fixes ."

api_shell:
	@$(MAKE) -s _manage_py cmd=shell


# --------------------------------------------------
# Backend Database
# --------------------------------------------------
api_migrate:
	@$(MAKE) -s _manage_py cmd=migrate
	@$(MAKE) -s _manage_py cmd=migrate env_file='.env.test'

api_makemigrations:
	@$(MAKE) -s _manage_py cmd=makemigrations

# --------------------------------------------------
# Backend Tests
# --------------------------------------------------
api_test:
	@$(MAKE) -s _manage_py cmd=test env_file='.env.test' opts="--exclude-tag=integration"

api_coverage:
	$(BACKEND_BASH_EXEC) "\
		cd backend && \
		source .env.test && \
		coverage run --source='.' manage.py test && \
		coverage report && \
		coverage html"

api_test_debug:
	@$(MAKE) -s _manage_py cmd=test env_file='.env.test' opts="--tag=debug"

api_test_integration:
	@$(MAKE) -s _manage_py cmd=test env_file='.env.test' opts="--tag=integration"


# --------------------------------------------------
# Frontend
# --------------------------------------------------
front_bash:
	$(FRONTEND_DOCKER_EXEC) bash

front_biome:
	$(FRONTEND_BASH_EXEC) "yarn biome:check:apply-unsafe"

front_tsc:
	$(FRONTEND_BASH_EXEC) "yarn tsc"

front_test:
	$(FRONTEND_BASH_EXEC) "yarn test"

front_coverage:
	$(FRONTEND_BASH_EXEC) "yarn test:coverage"

# --------------------------------------------------
# Others
# --------------------------------------------------
setup_hooks:
	@git config core.hooksPath .githooks

help:
	@echo "Usage: make [TARGET]"
	@echo ""
	@echo "----- BACKEND UTILS -------------------------------------------------------------------------"
	@echo "  api_bash                      Opens a bash session in the api container"
	@echo "  api_ruff                      Runs ruff to fix imports, format, and lint code"
	@echo "  api_shell                     Opens the Django shell for the running instance"
	@echo ""
	@echo "----- BACKEND DATABASE ----------------------------------------------------------------------"
	@echo "  api_migrate                   Generates new migrations based on models"
	@echo "  api_makemigrations            Runs the migration"
	@echo ""
	@echo "----- BACKEND TEST --------------------------------------------------------------------------"
	@echo "  api_test                      Runs all non-integration tests"
	@echo "  api_coverage                  Runs tests and generates coverage report"
	@echo "  api_test_debug                Runs tests with debug tag"
	@echo "  api_test_integration          Runs tests with integration tag"
	@echo ""
	@echo "----- FRONTEND ------------------------------------------------------------------------------"
	@echo "  front_bash                    Opens a bash session in the frontend container"
	@echo "  front_biome                   Runs biome checks and fixes"
	@echo "  front_tsc                     Runs tsc"
	@echo "  front_test                    Runs tests"
	@echo "  front_coverage                Runs tests and generates coverage report"
	@echo ""
	@echo "----- OTHERS --------------------------------------------------------------------------------"
	@echo "  setup_hooks                   Setups the git pre-commit hooks"
	@echo "  help                          Prints this help message"
