DOCKER_COMPOSE := docker-compose -f docker/docker-compose.yml

.PHONY: build up down restart logs ps shell db-shell redis-shell migrate fresh seed

build:
	$(DOCKER_COMPOSE) build --no-cache

up:
	$(DOCKER_COMPOSE) up -d

down:
	$(DOCKER_COMPOSE) down

logs:
	$(DOCKER_COMPOSE) logs -f

shell:
	$(DOCKER_COMPOSE) exec laravel-app bash

db-shell:
	$(DOCKER_COMPOSE) exec laravel-db bash

migrate:
	$(DOCKER_COMPOSE) exec laravel-app php src/artisan migrate

fresh:
	$(DOCKER_COMPOSE) exec laravel-app php src/artisan migrate:fresh

seed:
	$(DOCKER_COMPOSE) exec laravel-app php src/artisan db:seed

tinker:
	$(DOCKER_COMPOSE) exec laravel-app php src/artisan tinker

stan:
	$(DOCKER_COMPOSE) exec laravel-app src/vendor/bin/phpstan analyse src/app --memory-limit=2G -c src/phpstan.neon

fixer:
	$(DOCKER_COMPOSE) exec laravel-app src/vendor/bin/php-cs-fixer fix --config=src/.php-cs-fixer.dist.php

ide:
	$(DOCKER_COMPOSE) exec laravel-app php src/artisan ide-helper:generate src/_ide_helper.php
	$(DOCKER_COMPOSE) exec laravel-app php src/artisan ide-helper:models --nowrite
	$(DOCKER_COMPOSE) exec laravel-app mv _ide_helper_models.php src/_ide_helper_models.php

setup:
	$(DOCKER_COMPOSE) build --no-cache
	$(DOCKER_COMPOSE) up -d
	$(DOCKER_COMPOSE) exec laravel-app composer install
	$(DOCKER_COMPOSE) exec laravel-app cp src/.env.example src/.env
	$(DOCKER_COMPOSE) exec laravel-app php src/artisan key:generate
	$(DOCKER_COMPOSE) exec laravel-app php src/artisan migrate:fresh
	$(DOCKER_COMPOSE) exec laravel-app php src/artisan db:seed
	$(DOCKER_COMPOSE) exec laravel-app php src/artisan ide-helper:generate
	$(DOCKER_COMPOSE) exec laravel-app npm install
	$(DOCKER_COMPOSE) exec laravel-app npm run dev
