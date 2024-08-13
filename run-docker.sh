# tested on macOS
envsubst < .env
docker buildx build . -t faceit-tools
docker stop faceit-tools
docker rm faceit-tools
docker run -d -p 8080:8080 --name faceit-tools faceit-tools
