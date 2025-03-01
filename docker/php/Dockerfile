FROM php:8.4-fpm

RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    libpq-dev \
    && docker-php-ext-install \
    pdo \
    pdo_pgsql \
    pgsql \
    mbstring \
    exif \
    pcntl \
    bcmath \
    gd

RUN pecl install redis && \
    docker-php-ext-enable redis

COPY --from=composer:2.8 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

COPY ./php.ini /usr/local/etc/php/php.ini

COPY ./zzz-www.conf /usr/local/etc/php-fpm.d/zzz-www.conf

RUN curl -sL https://deb.nodesource.com/setup_23.x | bash - \
    && apt-get install -y nodejs \
    && npm install -g npm@latest