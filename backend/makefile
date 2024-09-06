.ONESHELL:
SHELL:= /bin/bash
.PHONY: test

DOCKER_EXEC=@docker exec -it django_react_starter_api
BASH_EXEC=$(DOCKER_EXEC) bash -c

# Args
cmd=
env_file='.env'
opts=

# --------------------------------------------------
# Private
# --------------------------------------------------
_manage_py:
	$(BASH_EXEC) "\
		cd backend && \
		source $(env_file) && \
		python manage.py $(cmd) \
		$(opts)"


# --------------------------------------------------
# Utils
# --------------------------------------------------
bash:
	$(DOCKER_EXEC) bash

ruff:
	$(BASH_EXEC) "cd backend \
		&& ruff check --select=I --fix . \
		&& ruff check --fix --unsafe-fixes ."

shell:
	@$(MAKE) -s _manage_py cmd=shell

# --------------------------------------------------
# Database
# --------------------------------------------------
migrate:
	@$(MAKE) -s _manage_py cmd=migrate

makemigrations:
	@$(MAKE) -s _manage_py cmd=makemigrations


# --------------------------------------------------
# Tests
# --------------------------------------------------
test:
	@$(MAKE) -s _manage_py cmd=test env_file='.env.test' opts="--exclude-tag=integration"

test_coverage:
	$(BASH_EXEC) "\
		cd backend && \
		source .env.test && \
		coverage run --source='.' manage.py test && \
		coverage report && \
		coverage html"

test_debug:
	@$(MAKE) -s _manage_py cmd=test env_file='.env.test' opts="--tag=debug"

test_integration:
	@$(MAKE) -s _manage_py cmd=test env_file='.env.test' opts="--tag=integration"

test_migrate:
	@$(MAKE) -s _manage_py cmd=migrate env_file='.env.test'


# --------------------------------------------------
# Others
# --------------------------------------------------
help:
	@echo "Usage: make [TARGET] [cmd=''] [env_file='.env'] [opts='']"
	@echo "All commands are run in the django container"
	@echo ""
	@echo "The `run` target is used to run any custom django command"
	@echo "While other targets are shortcuts to common commands"
	@echo ""
	@echo "Targets:"
	@echo "  run                       Run a custom django command"
	@echo "  test                      Run all tests except integration tests"
	@echo "  test_debug                Run tests with debug tag"
	@echo "  test_integration          Run integration tests"
	@echo "  test_coverage             Run tests and generate coverage report"
	@echo "  migrate                   Run migrations"
	@echo "  makemigrations            Make migrations"
	@echo "  shell                     Open a django shell"
	@echo "  help                      Prints this help message"


help:
	@echo "Usage: make [TARGET]"
	@echo "All commands are run in the 'django_react_starter_api' container."
	@echo ""
	@echo "----- UTILS -------------------------------------------------------------------------"
	@echo "  bash                      Opens a bash session"
	@echo "  ruff                      Runs ruff to fix imports, format, and lint code"
	@echo "  shell                     Opens the Django shell for the running instance"
	@echo ""
	@echo "----- DATABASE ----------------------------------------------------------------------"
	@echo "  makemigrations            Generates new migrations based on models"
	@echo "  migrate                   Runs the migration"
	@echo ""
	@echo "----- TEST --------------------------------------------------------------------------"
	@echo "  test                      Runs all non-integration tests"
	@echo "  test_coverage             Runs all tests and generates coverage report"
	@echo "  test_debug                Runs tests with debug tag"
	@echo "  test_integration          Runs tests with integration tag"
	@echo "  test_migrate              Runs migrations for the test database"
	@echo ""
	@echo "----- OTHERS ------------------------------------------------------------------------"
	@echo "  help                      Prints this help message"
