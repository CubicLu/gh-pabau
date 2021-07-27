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

apt update -y
apt install -y jq
APP_VERSION=$(jq -r '.version' package.json)

echo "----- DEBUG -----"
echo "(pwd)=$(pwd)"
echo "DOCKER_HOSTNAME=${DOCKER_HOSTNAME}"
echo "DOCKER_USERNAME=${DOCKER_USERNAME}"
echo "NODE_OPTIONS=${NODE_OPTIONS}"
echo "APP_NAME=${APP_NAME}"
echo "APP_VERSION=${APP_VERSION}"
echo "APP_TYPE=${APP_TYPE}"
echo "VERCEL_JSON_LOCATION=${VERCEL_JSON_LOCATION}"
echo "BITBUCKET_COMMIT=${BITBUCKET_COMMIT}"
echo "BITBUCKET_PR_ID=${BITBUCKET_PR_ID}"
echo "-----------------"

#echo "ABORTING UNTIL https://github.com/prisma/prisma/issues/5304 IS FIXED!!!!"
#exit;

echo "Copying assets..."
ls -al "dist/apps/${APP_NAME}/"
cp "apps/${APP_NAME}/package.production.json" "dist/apps/${APP_NAME}/"
echo "Done"

echo "Docker build..."
docker build "dist/apps/${APP_NAME}" -t "${APP_NAME}" -f "tools/cicd/${APP_NAME}.Dockerfile"

if [ -z "${BITBUCKET_PR_ID}" ] && [ -n "${BITBUCKET_BRANCH}" ]; then

  echo "Pushing to Rancher2..."
  echo "Docker tag..."
  docker image tag "${APP_NAME}:latest" "${DOCKER2_HOSTNAME}/monorepo/${APP_NAME}"
  docker image tag "${APP_NAME}:latest" "${DOCKER2_HOSTNAME}/monorepo/${APP_NAME}:v${APP_VERSION}"
  docker image tag "${APP_NAME}:latest" "${DOCKER2_HOSTNAME}/monorepo/${APP_NAME}:commit-${BITBUCKET_COMMIT}"
  echo "Docker login..."
  docker login -u "${DOCKER2_USERNAME}" -p "${DOCKER2_PASSWORD}" "${DOCKER2_HOSTNAME}"
  echo "Docker push..."
  docker image push "${DOCKER2_HOSTNAME}/monorepo/${APP_NAME}"
  echo "Rancher deploy..."
  curl -u "${RANCHER2_ACCESS_KEY}:${RANCHER2_SECRET_KEY}" \
    -X POST \
    -H 'Accept: application/json' \
    -H 'Content-Type: application/json' \
    'https://rancher.pabau.com/v3/project/c-j8bb9:p-jrqrz/workloads/deployment:pabau2:api-v2-prisma?action=redeploy'
  echo "Deployed!"

  echo "${APP_NAME}: https://api-v2-prisma.pabau.com/graphql" >> /tmp/bot_message.txt

fi

echo "EOF"
