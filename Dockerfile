# STAGE 1: Build
FROM --platform=$TARGETPLATFORM node:20-slim
RUN \
  apt-get update \
  && apt-get -y install gettext-base \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY ./package.json ./package-lock.json /app/

RUN npm install
RUN npm install --save-dev webpack
RUN npm install -g @angular/cli@18

ADD . .

RUN envsubst < .env.example > .env

RUN npm run build:ssr

EXPOSE 4000

RUN chmod +x docker-entrypoint.sh

# ENTRYPOINT docker-entrypoint.sh
CMD ["./docker-entrypoint.sh"]
