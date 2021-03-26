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
pwd
ls -al
echo "-----------------"

yarn nx build backend
build_output_path="dist/apps/backend"
cp "${VERCEL_JSON_LOCATION}/package.prod.json" "${build_output_path}/package.json"
cp "${build_output_path}/main.js" "${build_output_path}/server.js"
rm "${build_output_path}/main.js.map"
cp "apps/${APP_NAME}/package.prod.json" "${build_output_path}/package.json"

# now we need a yarn.lock file really.
# crazy idea but let's try the root one
cp "yarn.lock" "${build_output_path}"

echo "Docker build..."
docker build --no-cache "dist/apps/${APP_NAME}" -t "${APP_NAME}" -f "tools/cicd/${APP_NAME}.Dockerfile"
echo "Docker tag..."
docker image tag "${APP_NAME}:latest" "${DOCKER_HOSTNAME}/monorepo/${APP_NAME}"
echo "Docker login..."
docker login -u "${DOCKER_USERNAME}" -p "${DOCKER_PASSWORD}" "${DOCKER_HOSTNAME}"
echo "Docker push..."
docker image push "${DOCKER_HOSTNAME}/monorepo/${APP_NAME}"
echo "Rancher deploy..."
#apt-get update -y && apt-get install git && git clone -b v1.6 --recursive https://github.com/rancher/cli.git rancher-cli && cd rancher-cli && make
#docker run -v "$PWD:/files:ro" --rm -it --entrypoint rancher tagip/rancher-cli --url http://pods.pabau.com:8888 --access-key xxx --secret-key xxx --file /files/docker-compose.yml --rancher-file /files/rancher-compose.yml up -d --upgrade --stack pabau2-backend production
echo "FOR NOW, ASK JAMES/MARTIN TO 'UPGRADE' THE 'PABAU2-BACKEND/PRODUCTION' CONTAINER IN RANCHER!"



if [ -z "${BITBUCKET_PR_ID}" ]; then
  message_body=''
  read_heredoc message_body <<HEREDOC
${APP_NAME}: https://backend.pabau.com
HEREDOC
  echo "${message_body}" >> /tmp/bot_message.txt
fi

echo "EOF"
