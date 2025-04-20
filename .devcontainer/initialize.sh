#!/bin/bash

cp .devcontainer/default.conf docker/nginx/default.conf
cp .devcontainer/docker-compose.yml docker/docker-compose.yml

ln -s src/biome.json biome.json