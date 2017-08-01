FROM node:8.0.0
MAINTAINER nooldey <nooldey@gmail.com>

ENV HTTP_PORT=8000


RUN mkdir -p /app
COPY . /app
WORKDIR /app

RUN npm install

EXPOSE 8000

CMD ["npm","start"]
