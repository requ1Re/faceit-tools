#!/bin/sh
envsubst < .env.example > .env
envsubst < dist/faceit-map-picker/browser/assets/env.template.js > dist/faceit-map-picker/browser/assets/env.js
node dist/faceit-map-picker/server/main.js
