FROM node:8.0.0
MAINTAINER nooldey <nooldey@gmail.com>

RUN mkdir -p /app
WORKDIR /app

COPY package.json /app/

RUN npm install

COPY . /app

RUN npm start