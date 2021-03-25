FROM node:alpine
WORKDIR /usr/app
COPY [ "package.json", "yarn.lock", "./" ]
RUN yarn --pure-lockfile
COPY . .
EXPOSE 3333
ENTRYPOINT [ "node", "main.js" ]
