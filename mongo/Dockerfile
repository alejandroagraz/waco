FROM mongo:latest

LABEL "database"="Database-mongodb"
LABEL maintainer="joseagraz29@gmail.com"
LABEL version="1.0"

COPY init.json /init.json

CMD mongoimport --uri "mongodb://root:1234@database:27017/waco?authSource=admin" --collection users --type json --file /init.json --jsonArray

