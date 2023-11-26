.ONESHELL:
SHELL:= /bin/bash
.SHELLFLAGS += -e

# Args
cmd=
settings=development
opts=

run:
	@docker exec -it django_react_starter_api bash -c "\
		cd backend && \
		python manage.py $(cmd) \
		--settings=django_react_starter.settings.$(settings) \
		$(opts)"

help:
	@echo "Available commands: help, run"
	@echo ""
	@echo "help:"
	@echo "Shows this text in the terminal"
	@echo ""
	@echo "run:"
	@echo "Runs a Django command within the running docker container with the given settings and options"
	@echo "  cmd       ->   (required) The django command"
	@echo "  settings  ->   (optional) The settings to use. Defaults to development"
	@echo "  opts      ->   (optional) Additional command-line options for your command"
	@echo "Examples:"
	@echo "  make run cmd=makemigrations"
	@echo "  make run cmd=test settings=test opts=\"--verbosity 0\""
