FROM node:alpine

WORKDIR /usr/app

COPY [ "package.json", "./" ]
RUN yarn --pure-lockfile
COPY . .

EXPOSE 5006

ENTRYPOINT [ "yarn", "mesh", "serve" ]
