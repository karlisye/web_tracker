FROM php:8.4.17-fpm-alpine

RUN apk add --no-cache \
  git \
  curl \
  zip \
  unzip \
  libpng-dev \
  oniguruma-dev \
  libxml2-dev

RUN docker-php-ext-install \
  pdo_mysql \
  mbstring \
  bcmath \
  gd

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

COPY . .

RUN composer install --no-dev --optimize-autoloader

RUN chown -R www-data:www-data \
  storage bootstrap/cache

EXPOSE 9000

CMD [ "php-fpm" ]