FROM node:16-buster

RUN apt update && apt install -y jq

WORKDIR /usr/app
ENV HUSKY_SKIP_INSTALL=1
ENV HUSKY=0
COPY [ "package.json", "./" ]
RUN yarn install
COPY . .

# Install Prisma here because it's a devDependency, it doesn't get installed.
RUN yarn add -D prisma@3.5.0
RUN node_modules/.bin/prisma generate
RUN yarn add dayjs
RUN yarn add form-data

EXPOSE 4000
ENTRYPOINT [ "node", "main.js" ]
