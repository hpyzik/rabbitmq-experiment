FROM node:8

RUN mkdir /home/node/app
WORKDIR /home/node/app

RUN yarn install

CMD node scripts/keep-me-alive.js
