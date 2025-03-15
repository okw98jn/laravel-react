.PHONY: build up down restart logs ps shell db-shell redis-shell migrate fresh seed

build:
	docker-compose -f docker/docker-compose.yml build --no-cache

up:
	docker-compose -f docker/docker-compose.yml up -d

down:
	docker-compose -f docker/docker-compose.yml down

logs:
	docker-compose -f docker/docker-compose.yml logs -f

shell:
	docker-compose -f docker/docker-compose.yml exec laravel-app bash

db-shell:
	docker-compose -f docker/docker-compose.yml exec laravel-db bash

redis-shell:
	docker-compose -f docker/docker-compose.yml exec laravel-redis sh

migrate:
	docker-compose -f docker/docker-compose.yml exec laravel-app php src/artisan migrate

fresh:
	docker-compose -f docker/docker-compose.yml exec laravel-app php src/artisan migrate:fresh

seed:
	docker-compose -f docker/docker-compose.yml exec laravel-app php src/artisan db:seed

tinker:
	docker-compose -f docker/docker-compose.yml exec laravel-app php src/artisan tinker

stan:
	docker-compose -f docker/docker-compose.yml exec laravel-app src/vendor/bin/phpstan analyse src/app --memory-limit=2G -c src/phpstan.neon

fixer:
	docker-compose -f docker/docker-compose.yml exec laravel-app src/vendor/bin/php-cs-fixer fix --config=src/.php-cs-fixer.dist.php
