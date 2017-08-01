FROM node:slim
MAINTAINER nooldey<nooldey@gmail.com>

RUN apt-get update && apt-get install -y git ssh-client ca-certificates -no-install-recommends && rm -r /var/lib/apt/lists/*

RUN echo "Asia/Shanghai" > /etc/timezone && dpkg-reconfigure -f noninteractive tzdata

EXPOSE 4000