FROM php:8.4-fpm

RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    git \
    git-secrets \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    libpq-dev \
    && curl -sL https://deb.nodesource.com/setup_23.x | bash - \
    && apt-get install -y nodejs \
    && npm install -g npm@latest \
    && rm -rf /var/lib/apt/lists/*

RUN docker-php-ext-install \
    pdo \
    pdo_pgsql \
    pgsql \
    mbstring \
    exif \
    pcntl \
    bcmath \
    gd \
    && pecl install redis \
    && docker-php-ext-enable redis

COPY --from=composer:2.8 /usr/bin/composer /usr/bin/composer

COPY ./zzz-www.conf /usr/local/etc/php-fpm.d/zzz-www.conf
COPY ./php.ini /usr/local/etc/php/php.ini
