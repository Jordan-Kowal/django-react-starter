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
	@$(MAKE) -s run cmd=test env_file='.env.test' opts="--exclude-tag=integration"

integration:
	@$(MAKE) -s run cmd=test env_file='.env.test' opts="--tag=integration"

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
	@echo "Usage: make [TARGET] [cmd=''] [env_file='.env'] [opts='']"
	@echo "All commands are run in the django container"
	@echo ""
	@echo "The `run` target is used to run any custom django command"
	@echo "While other targets are shortcuts to common commands"
	@echo ""
	@echo "Targets:"
	@echo "  run                       Run a custom django command"
	@echo "  test                      Run all tests except integration tests"
	@echo "  integration               Run integration tests"
	@echo "  migrate                   Run migrations"
	@echo "  makemigrations            Make migrations"
	@echo "  shell                     Open a django shell"
	@echo "  coverage                  Run tests and generate coverage report"
	@echo "  help                      Prints this help message"
