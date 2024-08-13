# STAGE 1: Build
FROM node:20 AS build

COPY . /app/
WORKDIR /app

RUN npm install -g @angular/cli@18
RUN npm ci
RUN npm run build

# STAGE 2: Deploy
FROM trafex/php-nginx:latest AS deploy

COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/.env /usr/share/nginx/.env
COPY --from=build /app/dist/faceit-tools /usr/share/nginx/html
COPY --from=build /app/public/api /usr/share/nginx/html/api

EXPOSE 8080
