# STAGE 1: Build
FROM --platform=$TARGETPLATFORM node:20 as build

WORKDIR /app

RUN npm install -g @angular/cli@18

COPY ./package.json ./package-lock.json ./nginx.conf /app/
RUN npm ci

ADD . .

RUN npm run build

FROM nginx:latest

COPY --from=build app/nginx.conf /etc/nginx/nginx.conf
COPY --from=build app/dist/faceit-tools /usr/share/nginx/html

EXPOSE 80
