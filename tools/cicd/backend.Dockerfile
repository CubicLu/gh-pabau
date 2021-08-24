FROM node:16-buster
WORKDIR /usr/app

COPY [ "package.json", "./" ]
RUN yarn install
COPY . .

EXPOSE 3333
ENTRYPOINT [ "node", "main.js" ]
