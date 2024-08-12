# tested on macOS
envsubst < .env
docker buildx build . -t faceit-tools
docker stop faceit-tools
docker rm faceit-tools
docker run -d -p 4200:80 -e FACEIT_API_KEY="${FACEIT_API_KEY}" --name faceit-tools faceit-tools
