.ONESHELL:
SHELL:= /bin/bash
.SHELLFLAGS +=

# Args
cmd=
env_file='.env'
opts=

run:
	@docker exec -it django_react_starter_api bash -c "\
		cd backend && \
		source $(env_file) && \
		python manage.py $(cmd) \
		$(opts)"

test:
	@$(MAKE) -s run cmd=test env_file='.env.test'

migrate:
	@$(MAKE) -s run cmd=migrate

makemigrations:
	@$(MAKE) -s run cmd=makemigrations

shell:
	@$(MAKE) -s run cmd=shell

coverage:
	@docker exec -it django_react_starter_api bash -c "\
		cd backend && \
		source .env.test && \
		coverage run --source='.' manage.py test && \
		coverage report && \
		coverage html"

help:
	@echo "Available commands: help, run"
	@echo ""
	@echo "help:"
	@echo "Shows this text in the terminal"
	@echo ""
	@echo "run:"
	@echo "Runs a Django command within the running docker container with the given settings and options"
	@echo "  cmd       ->   (required) The django command"
	@echo "  env_file  ->   (optional) The env file to use. Defaults to .env"
	@echo "  opts      ->   (optional) Additional command-line options for your command"
	@echo "Examples:"
	@echo "  make run cmd=makemigrations"
	@echo "  make run cmd=test env_file=.env.test opts=\"--verbosity 0\""
	@echo ""
	@echo "test | migrate | makemigrations | shell:"
	@echo "Shortcuts for the run command with the right cmd and env_file args"
	@echo ""
	@echo "coverage:"
	@echo "Runs the test command with coverage and generates a report"
