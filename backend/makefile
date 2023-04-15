.ONESHELL:
SHELL:= /bin/bash
.SHELLFLAGS += -e


CONTAINER_NAME="django_react_starter_django_tmp"
SERVICE_NAME="django"
SETTINGS_DEVELOPMENT="django_react_starter.settings.development"
SETTINGS_TEST="django_react_starter.settings.test"

# run_docker_command(command: str)
define run_docker_command
	docker-compose run --rm --name ${CONTAINER_NAME} ${SERVICE_NAME} ${1}
endef

# run_django_command(command: str)
define run_django_command
	docker-compose run --rm --name ${CONTAINER_NAME} ${SERVICE_NAME} bash -c "cd backend && python manage.py ${1} --settings=${SETTINGS_DEVELOPMENT}"
endef

# run_django_command_test(command: str)
define run_django_command_test
	docker-compose run --rm --name ${CONTAINER_NAME} ${SERVICE_NAME} bash -c "cd backend && python manage.py ${1} --settings=${SETTINGS_TEST}"
endef

bash:
	$(call run_docker_command, 'bash')

collectstatic:
	$(call run_django_command, 'collectstatic')

makemigrations:
	$(call run_django_command, 'makemigrations')

migrate:
	$(call run_django_command, 'migrate')

shell:
	$(call run_django_command, 'shell')

test:
	$(call run_django_command_test, 'test')
