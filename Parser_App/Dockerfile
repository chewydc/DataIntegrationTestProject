FROM node:12-slim

RUN mkdir -p /parserApp/

WORKDIR /parserApp/

COPY . .

ENV API_URL='http://ingestionendpoint:8080/ftp'

RUN npm install

CMD ["npm", "start"]