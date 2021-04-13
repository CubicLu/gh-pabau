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
#cp "apps/${APP_NAME}/prisma/.env" "dist/apps/${APP_NAME}/prisma/.env"
echo "Done"

echo "Docker build..."
docker build --no-cache "dist/apps/${APP_NAME}" -t "${APP_NAME}" -f tools/cicd/bridge.Dockerfile
echo "Docker tag..."
docker image tag "${APP_NAME}:latest" "${DOCKER_HOSTNAME}/monorepo/${APP_NAME}"
echo "Docker login..."
docker login -u "${DOCKER_USERNAME}" -p "${DOCKER_PASSWORD}" "${DOCKER_HOSTNAME}"
echo "Docker push..."
docker image push "${DOCKER_HOSTNAME}/monorepo/${APP_NAME}"

echo "EOF"
