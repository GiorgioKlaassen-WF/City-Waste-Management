# Readme

## docker compose
Mocht je docker compose willen gebruiken als dev omgeving gebruik dan:

```bash
docker-compose build
docker-compose up
```
dit zorgt er voor dat je database en webserver / andere projecten in een keer gebuild en gestart worden binnen docker.


## API 
Als je de api draait via nodemon check dan of de database string in de app.js `mongodb://localhost:27017/waste` bevat.
Als je de api draait via docker-compose zorg dan dat er `mongodb://mongo:27017/waste` staat
er zijn nog aanpassingen nodig in de docker compose file om dit netjes te krijgen!