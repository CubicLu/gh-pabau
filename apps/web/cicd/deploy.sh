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
echo "NODE_OPTIONS=${NODE_OPTIONS}"
echo "APP_NAME=${APP_NAME}"
echo "APP_TYPE=${APP_TYPE}"
echo "VERCEL_JSON_LOCATION=${VERCEL_JSON_LOCATION}"
echo "BITBUCKET_COMMIT=${BITBUCKET_COMMIT}"
echo "BITBUCKET_PR_ID=${BITBUCKET_PR_ID}"
pwd
ls -al
echo "-----------------"

if [ "${APP_TYPE}" = "apps" ]; then
  build_output_path="dist/apps/${APP_NAME}/exported/"
elif [ "${APP_TYPE}" = "libs" ]; then
  build_output_path="dist/storybook/${APP_NAME}/"
else
  echo "ERROR: unknown app type '${APP_TYPE}'"; exit 1
fi

if [ -z "${BITBUCKET_PR_ID}" ]; then
  echo "===== Processing type COMMIT ====="
  OUTPUT=$(cd "${build_output_path}" && vercel -c -C --token "${VERCEL_TOKEN}" --scope pabau2 -A "${VERCEL_JSON_LOCATION}/vercel.json" --prod)
  echo "errorlevel: $?"
else
  echo "===== Processing type PR ====="
  OUTPUT=$(cd "${build_output_path}" && vercel -c -C --token "${VERCEL_TOKEN}" --scope pabau2 -A "${VERCEL_JSON_LOCATION}/vercel.json")
  echo "errorlevel: $?"
fi

echo "Output from vercel:"
echo "${OUTPUT}"
echo "--"
LAST_LINE=$(echo "${OUTPUT}" | tail -n1)
echo "last line: ${LAST_LINE}"
echo "${LAST_LINE}" > "/tmp/bot_url_${APP_NAME}.txt"

message_body=''
read_heredoc message_body <<HEREDOC
${APP_NAME}: ${LAST_LINE}
HEREDOC
echo "${message_body}" >> /tmp/bot_message.txt

echo "---- Deploying DB to Hasura Staging (api-v2-staging.pabau.com) ----"
pwd
curl -LO https://github.com/hasura/graphql-engine/releases/download/v2.0.1/cli-hasura-linux-amd64
chmod +x cli-hasura-linux-amd64
mv ./cli-hasura-linux-amd64 /usr/local/bin/hasura
cp -r hasura/ dist/
cp -f hasura/remote_schemas.production.yaml dist/hasura/remote_schemas.yaml
HASURA_GRAPHQL_ENDPOINT='https://api-v2-staging.pabau.com/' HASURA_GRAPHQL_ADMIN_SECRET="${HASURA_STAGING_GRAPHQL_ADMIN_SECRET}" hasura --project dist/hasura migrate apply --database-name default || echo "SILENTLY FAILED"
sleep 1
HASURA_GRAPHQL_ENDPOINT='https://api-v2-staging.pabau.com/' HASURA_GRAPHQL_ADMIN_SECRET="${HASURA_STAGING_GRAPHQL_ADMIN_SECRET}" hasura --project dist/hasura metadata apply || echo "SILENTLY FAILED"
