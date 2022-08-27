#!/bin/sh
echo "FACEIT_API_KEY: $FACEIT_API_KEY"

envsubst < dist/faceit-tools/browser/assets/env.template.json > dist/faceit-tools/browser/assets/env.json

node -v

npm run serve:ssr
