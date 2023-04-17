#!/bin/sh
envsubst < dist/faceit-tools/browser/assets/env.template.json > dist/faceit-tools/browser/assets/env.json
node -v
npm run serve:ssr
