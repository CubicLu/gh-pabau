FROM node:14-buster
WORKDIR /usr/app
ENV HUSKY_SKIP_INSTALL=1
ENV HUSKY=0
COPY . .
RUN mv ./package.production.json ./package.json
RUN yarn install # TODO: --frozen-lockfile
RUN node_modules/.bin/prisma generate
EXPOSE 4000
ENTRYPOINT [ "node", "./main.js" ]
