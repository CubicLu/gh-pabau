FROM node:lts

WORKDIR /app

COPY package.json ./
RUN yarn --pure-lockfile

COPY . .

ENTRYPOINT [ "yarn", "mesh", "serve" ]
