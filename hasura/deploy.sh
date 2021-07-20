#!/usr/bin/env bash
set -e

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
