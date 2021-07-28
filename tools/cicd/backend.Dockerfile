FROM node:16-buster
WORKDIR /usr/app
ENV HUSKY_SKIP_INSTALL=1
ENV HUSKY=0
COPY [ "package.json", "./" ]
RUN yarn install
COPY . .

EXPOSE 3333
ENTRYPOINT [ "node", "main.js" ]
