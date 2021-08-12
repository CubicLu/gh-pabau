FROM node:16-buster

RUN apt update && apt install -y jq

WORKDIR /usr/app
ENV HUSKY_SKIP_INSTALL=1
ENV HUSKY=0
COPY [ "package.json", "./" ]
RUN yarn install
COPY . .

EXPOSE 4000
ENTRYPOINT [ "node", "main.js" ]
