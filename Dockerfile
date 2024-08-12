# STAGE 1: Build
FROM --platform=$TARGETPLATFORM node:20 as build

WORKDIR /app

RUN npm install -g @angular/cli@18

COPY ./package.json ./package-lock.json /app/
RUN npm ci

ADD . .

RUN npm run build

FROM nginx:latest

COPY --from=build app/dist/faceit-tools /usr/share/nginx/html

EXPOSE 80
