> ⚠️ Project is currently in an active refactoring and rework phase. This includes an update to support CS2. Usage is currently not recommended.
# FACEIT Tools

Stats, Map Picker and Account Finder for FACEIT.com (CS2)


## Features
- Angular SSR Application
- Stats
- Map Picker (Matchroom or Custom Teams)
- Account Finder (Steam to FACEIT) (⚠️ Currently broken)


## Deployment

To deploy this project using `docker run`

```bash
  docker run -d -p 4000:4000 --restart=always -e FACEIT_API_KEY="<FACEIT (CLIENT) API KEY>" -e STEAM_WEB_API_KEY="<STEAM WEB API KEY>" --name faceit-tools ghcr.io/requ1re/faceit-tools
```
To get the required API keys, visit the following pages:
- FACEIT: https://developers.faceit.com/
- STEAM: https://steamcommunity.com/dev/apikey

## Authors
- [@requ1Re](https://www.github.com/requ1Re)

