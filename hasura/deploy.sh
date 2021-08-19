#!/usr/bin/env bash
set -e

echo "Testing Hasura database..."
docker-compose -f tools/pabau1/docker-compose.yml up -d && wait-on -t 60000 tcp:127.0.0.1:3307
yarn nx serve bridge-api &
yarn wait-on -t 160000 http-get://localhost:4000
docker-compose -f hasura/docker-compose.yml -f hasura/docker-compose.ci.yml up -d postgres && wait-on -t 60000 tcp:127.0.0.1:5432
docker-compose -f hasura/docker-compose.yml -f hasura/docker-compose.ci.yml up -d && wait-on -t 60000 http-get://localhost:8080/console
yarn hasura:cli metadata inconsistency status

echo "Deploying to Hasura database..."
echo "Destination: ${HASURA_GRAPHQL_ENDPOINT}"
echo "pwd: $(pwd)"
mkdir -p dist
cp -r hasura/ dist/
cp -f hasura/remote_schemas.production.yaml dist/hasura/metadata/remote_schemas.yaml
docker run --rm \
  -v "${BITBUCKET_CLONE_DIR}/dist/hasura/:/hasura/:ro" \
  -e HASURA_GRAPHQL_ENDPOINT="${HASURA_GRAPHQL_ENDPOINT}" \
  -e HASURA_GRAPHQL_ADMIN_SECRET="${HASURA_STAGING_GRAPHQL_ADMIN_SECRET}" \
  golang:buster \
  bash -c "curl -LO https://github.com/hasura/graphql-engine/releases/download/v2.0.1/cli-hasura-linux-amd64 && chmod +x cli-hasura-linux-amd64 && mv ./cli-hasura-linux-amd64 /usr/local/bin/hasura && hasura version && hasura --project /hasura migrate apply --database-name default && hasura --project /hasura metadata apply" \
  || echo "FAILED"
