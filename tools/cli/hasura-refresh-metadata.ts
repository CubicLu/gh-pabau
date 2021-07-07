import fetch from 'node-fetch';
import {config} from 'dotenv-flow'

config({path: 'hasura', default_node_env: 'development'})
console.table({
  cwd: process.cwd(),
  HASURA_GRAPHQL_ENDPOINT: process.env.HASURA_GRAPHQL_ENDPOINT,
  HASURA_GRAPHQL_ADMIN_SECRET: process.env.HASURA_GRAPHQL_ADMIN_SECRET,
  NODE_ENV: process.env.NODE_ENV,
})

const HASURA_GRAPHQL_ENDPOINT = process.env.HASURA_GRAPHQL_ENDPOINT || "http://localhost:8080"

const url = new URL("/v1/query", process.argv[2] || HASURA_GRAPHQL_ENDPOINT);
console.log(`fetching from ${url}`)

fetch(url.toString(), {
  headers: {'Content-Type': 'application/json', 'X-Hasura-Admin-Secret': process.env.HASURA_GRAPHQL_ADMIN_SECRET},
  method: 'post',
  body: JSON.stringify({
    "type": "reload_remote_schema",
    "args": {
      "name": "CRM"
    }
  })
})
  .then(e => e.json())
  .then(e => {
    if (e.message === "success") {
      console.log("success:", e)
      process.exit(0)
    }
    else {
      console.error("error:", e)
      process.exit(1)
    }
  })
  .catch((e) => {
    console.error(e)
    process.exit(2)
  })


