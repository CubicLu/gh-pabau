FROM node:16-buster
WORKDIR /usr/app
ENV HUSKY_SKIP_INSTALL=1
ENV HUSKY=0
COPY [ "package.json", "./" ]
RUN yarn install
COPY . .

# Install Prisma here because it's a devDependency, it doesn't get installed.
RUN yarn add -D prisma
RUN node_modules/.bin/prisma generate

EXPOSE 4000
ENTRYPOINT [ "node", "main.js" ]
