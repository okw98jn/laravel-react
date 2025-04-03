DOCKER_COMPOSE := docker-compose -f docker/docker-compose.yml
APP_CONTAINER := laravel-app

build:
	$(DOCKER_COMPOSE) build --no-cache

up:
	$(DOCKER_COMPOSE) up -d

down:
	$(DOCKER_COMPOSE) down

logs:
	$(DOCKER_COMPOSE) logs -f

bash:
	$(DOCKER_COMPOSE) exec $(APP_CONTAINER) bash

migrate:
	$(DOCKER_COMPOSE) exec $(APP_CONTAINER) bash -c "cd src && php artisan migrate"

fresh:
	$(DOCKER_COMPOSE) exec $(APP_CONTAINER) bash -c "cd src && php artisan migrate:fresh"

seed:
	$(DOCKER_COMPOSE) exec $(APP_CONTAINER) bash -c "cd src && php artisan db:seed"

tinker:
	$(DOCKER_COMPOSE) exec $(APP_CONTAINER) bash -c "cd src && php artisan tinker"

stan:
	$(DOCKER_COMPOSE) exec $(APP_CONTAINER) bash -c "cd src && vendor/bin/phpstan analyse app --memory-limit=2G -c phpstan.neon"

fixer:
	$(DOCKER_COMPOSE) exec $(APP_CONTAINER) bash -c "cd src && vendor/bin/php-cs-fixer fix --config=.php-cs-fixer.dist.php"

ide:
	$(DOCKER_COMPOSE) exec $(APP_CONTAINER) bash -c "cd src && php artisan ide-helper:generate"
	$(DOCKER_COMPOSE) exec $(APP_CONTAINER) bash -c "cd src && php artisan ide-helper:models --nowrite"

test:
	$(DOCKER_COMPOSE) exec $(APP_CONTAINER) bash -c "cd src && php artisan test"

setup:
	$(DOCKER_COMPOSE) build --no-cache
	$(DOCKER_COMPOSE) up -d
	$(DOCKER_COMPOSE) exec $(APP_CONTAINER) bash -c "cd src && composer install"
	$(DOCKER_COMPOSE) exec $(APP_CONTAINER) bash -c "cd src && cp .env.example .env"
	$(DOCKER_COMPOSE) exec $(APP_CONTAINER) bash -c "cd src && php artisan key:generate"
	$(DOCKER_COMPOSE) exec $(APP_CONTAINER) bash -c "cd src && php artisan migrate:fresh"
	$(DOCKER_COMPOSE) exec $(APP_CONTAINER) bash -c "cd src && php artisan db:seed"
	$(DOCKER_COMPOSE) exec $(APP_CONTAINER) bash -c "cd src && php artisan ide-helper:generate"
	$(DOCKER_COMPOSE) exec $(APP_CONTAINER) bash -c "cd src && php artisan ide-helper:models --nowrite"
	$(DOCKER_COMPOSE) exec $(APP_CONTAINER) bash -c "cd src && npm ci"
	$(DOCKER_COMPOSE) exec $(APP_CONTAINER) bash -c "cd src && npm run dev"
