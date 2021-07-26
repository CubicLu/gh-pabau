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
echo "NODE_OPTIONS=${NODE_OPTIONS}"
echo "APP_NAME=${APP_NAME}"
echo "APP_VERSION=${APP_VERSION}"
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
  OUTPUT=$(cd "${build_output_path}" && vercel -c -C --token "${VERCEL_TOKEN}" --scope pabau2 -A "${VERCEL_JSON_LOCATION}/vercel.json")
  echo "errorlevel: $?"
  echo "output: ${OUTPUT}"
  yarn vercel --token "${VERCEL_TOKEN}" --scope pabau2 alias ${OUTPUT} prelive-crm.new.pabau.com
  echo "errorlevel: $?"
  echo "<https://mgmt.new.pabau.com/deploy/${APP_VERSION}?deployment=${OUTPUT}|Deploy to prod>" >> /tmp/bot_message.txt
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

echo "${APP_NAME}: ${LAST_LINE}" >> /tmp/bot_message.txt
