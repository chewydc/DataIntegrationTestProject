FROM node:12-slim

RUN mkdir -p /apiServer/

WORKDIR /apiServer/

COPY . .

ENV PORT=8080

RUN npm install

EXPOSE 8080

CMD ["npm", "start"]