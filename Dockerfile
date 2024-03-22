FROM node:14-alpine as build

RUN apk add python3

WORKDIR /app

COPY .  .

RUN npm install
RUN npm run build 

EXPOSE 8080
CMD ["node", "server.js"]

