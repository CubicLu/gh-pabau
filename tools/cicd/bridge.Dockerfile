FROM node:14.16.0-buster AS builder
WORKDIR /usr/app
ENV HUSKY_SKIP_INSTALL=1
ENV HUSKY=0
COPY . .
RUN mv ./package.json-prod ./package.json
RUN yarn install --frozen-lockfile
RUN node_modules/.bin/prisma generate
EXPOSE 4000
ENTRYPOINT [ "node", "./main.js" ]
