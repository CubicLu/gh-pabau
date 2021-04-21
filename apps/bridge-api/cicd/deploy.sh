#!/usr/bin/env bash
set -e
APP_NAME="$(basename "$(dirname "$(cd "$(dirname "${0}")"; pwd)")")"

echo "DEBUG: pwd=$(pwd)"
echo "DEBUG: app_name=${APP_NAME}"

#echo "ABORTING UNTIL https://github.com/prisma/prisma/issues/5304 IS FIXED!!!!"
#exit;

echo "Copying assets..."
mkdir -p "dist/apps/${APP_NAME}/prisma"
cp "apps/${APP_NAME}/package.json-prod" "dist/apps/${APP_NAME}/"
cp "apps/${APP_NAME}/prisma/schema.prisma" "dist/apps/${APP_NAME}/prisma/schema.prisma"
echo "Done"

echo "Docker build..."
docker build "dist/apps/${APP_NAME}" -t "${APP_NAME}" -f "tools/cicd/${APP_NAME}.Dockerfile"
echo "Docker tag..."
docker image tag "${APP_NAME}:latest" "${DOCKER_HOSTNAME}/monorepo/${APP_NAME}"
echo "Docker login..."
docker login -u "${DOCKER_USERNAME}" -p "${DOCKER_PASSWORD}" "${DOCKER_HOSTNAME}"
echo "Docker push..."
docker image push "${DOCKER_HOSTNAME}/monorepo/${APP_NAME}"
echo "Rancher deploy..."
echo "FOR NOW, ASK JAMES TO 'UPGRADE' THE 'TOSHE/API' CONTAINER IN RANCHER!"

if [ -z "${BITBUCKET_PR_ID}" ]; then
  message_body=''
  read_heredoc message_body <<HEREDOC
${APP_NAME}: https://api-toshe.pabau.me/graphql
HEREDOC
  echo "${message_body}" >> /tmp/bot_message.txt
fi

echo "EOF"
