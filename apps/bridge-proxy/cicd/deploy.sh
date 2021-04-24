#!/bin/sh

#
# Deploys to vercel pro
#

# Stop on error
set -e

NEWLINE="
"

read_heredoc() {
  read_heredoc_result=""
  while IFS="${NEWLINE}" read -r read_heredoc_line; do
    read_heredoc_result="${read_heredoc_result}${read_heredoc_line}${NEWLINE}"
  done
  eval $1'=${read_heredoc_result}'
}

APP_NAME="$(basename "$(dirname "$(
  cd "$(dirname "${0}")"
  pwd
)")")"
APP_TYPE="$(basename "$(dirname "$(
  cd "$(dirname "${0}")/.."
  pwd
)")")"
VERCEL_JSON_LOCATION=$(cd "${APP_TYPE}/${APP_NAME}" && pwd)

echo "----- DEBUG -----"
echo "(pwd)=$(pwd)"
echo "DOCKER_HOSTNAME=${DOCKER_HOSTNAME}"
echo "DOCKER_USERNAME=${DOCKER_USERNAME}"
echo "NODE_OPTIONS=${NODE_OPTIONS}"
echo "APP_NAME=${APP_NAME}"
echo "APP_TYPE=${APP_TYPE}"
echo "VERCEL_JSON_LOCATION=${VERCEL_JSON_LOCATION}"
echo "BITBUCKET_COMMIT=${BITBUCKET_COMMIT}"
echo "BITBUCKET_PR_ID=${BITBUCKET_PR_ID}"
echo "-----------------"

echo "Docker build..."
#TODO: change apps/ to dist/apps/ (enabling ts compilation)
docker build "apps/${APP_NAME}" -t "${APP_NAME}" -f "tools/cicd/${APP_NAME}.Dockerfile"
echo "Docker tag..."
docker image tag "${APP_NAME}:latest" "${DOCKER_HOSTNAME}/monorepo/${APP_NAME}"
echo "Docker login..."
docker login -u "${DOCKER_USERNAME}" -p "${DOCKER_PASSWORD}" "${DOCKER_HOSTNAME}"
echo "Docker push..."
docker image push "${DOCKER_HOSTNAME}/monorepo/${APP_NAME}"
echo "Rancher deploy..."
#docker run -v "${VERCEL_JSON_LOCATION}/cicd:/files:ro" --rm --entrypoint rancher tagip/rancher-cli --url "${RANCHER_URL}" --access-key "${RANCHER_ACCESS_KEY}" --secret-key "${RANCHER_SECRET_KEY}" --file /files/docker-compose.yml --rancher-file /files/rancher-compose.yml up -d --upgrade --confirm-upgrade --pull --stack pabau2-backend pds-production
echo "FOR NOW, ASK JAMES TO 'UPGRADE' THE 'PABAU2-BACKEND/PDS-PRODUCTION' CONTAINER IN RANCHER!"

if [ -z "${BITBUCKET_PR_ID}" ]; then
  message_body=''
  read_heredoc message_body <<HEREDOC
${APP_NAME}: https://pds.pabau.com
HEREDOC
  echo "${message_body}" >> /tmp/bot_message.txt
fi

echo "EOF"
