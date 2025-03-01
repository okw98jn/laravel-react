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
	docker-compose -f docker/docker-compose.yml exec laravel-app php artisan migrate

fresh:
	docker-compose -f docker/docker-compose.yml exec laravel-app php artisan migrate:fresh

seed:
	docker-compose -f docker/docker-compose.yml exec laravel-app php artisan db:seed