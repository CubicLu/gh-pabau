import {request as graphqlRequest} from "graphql-request"
import {queries} from "./queries"
import * as pMap from "p-map"
import {cpus, platform} from 'os'

const jwtObject = {
  "user": 83064,
  "username": "pabau@local.com",
  "company": 8119,
  "admin": true,
  "owner": false,
  "language": {
    "user": "EN-GB",
    "company": ""
  },
  "remote_url": "",
  "remote_connect": "",
  "https://hasura.io/jwt/claims": {
    "x-hasura-allowed-roles": [
      "public",
      "user"
    ],
    "x-hasura-default-role": "user",
    "x-hasura-user-id": "83064",
    "x-hasura-org-id": "8119",
    "x-hasura-pabau": "test"
  },
  "iat": 1629061411
}
const jwt = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjo4MzA2NCwidXNlcm5hbWUiOiJwYWJhdUBsb2NhbC5jb20iLCJjb21wYW55Ijo4MTE5LCJhZG1pbiI6dHJ1ZSwib3duZXIiOmZhbHNlLCJsYW5ndWFnZSI6eyJ1c2VyIjoiRU4tR0IiLCJjb21wYW55IjoiIn0sInJlbW90ZV91cmwiOiIiLCJyZW1vdGVfY29ubmVjdCI6IiIsImh0dHBzOi8vaGFzdXJhLmlvL2p3dC9jbGFpbXMiOnsieC1oYXN1cmEtYWxsb3dlZC1yb2xlcyI6WyJwdWJsaWMiLCJ1c2VyIl0sIngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6InVzZXIiLCJ4LWhhc3VyYS11c2VyLWlkIjoiODMwNjQiLCJ4LWhhc3VyYS1vcmctaWQiOiI4MTE5IiwieC1oYXN1cmEtcGFiYXUiOiJ0ZXN0In0sImlhdCI6MTYyOTA2MTQxMX0.aJ80LZn4SOEL7InIw2W7g_HDFmJcC1Q9OX6k8V3vMh3EvS9HXOjvBRbUdIk_kI2nSrUIQNPL67KZ_WjmAt3N5A'
const isPlatformReliable = platform() === 'linux'
const TOTAL_ITERATIONS = 1000
const MAX_THREADS = isPlatformReliable ? 64 : 50

console.log(`Starting Load Test with ${TOTAL_ITERATIONS} iterations (1-${MAX_THREADS} threads)...`)
console.log(`This machine has ${cpus()?.length} cpus`)

async function doTest(endpointUrl: string, jwt: string, query: keyof typeof queries) {
  console.log("===== STARTING TEST", query, "@", endpointUrl, "=====")
  const headers = {
    "Authorization": `Bearer ${jwt}`,
  }
  const mapper = async () => {
    const started = new Date()
    const {query: gqlQueryString, validate} = queries[query]
    await graphqlRequest(endpointUrl, gqlQueryString, null, headers).then(validate)
    return endTime(started)
  }
  for (let c = 1; c <= MAX_THREADS; c = c + (c === 1 ? 1 : 4)) {
    if (!isPlatformReliable) await new Promise(resolve => setTimeout(resolve, 10000))
    const started = new Date()
    const results = await pMap(Array(TOTAL_ITERATIONS).fill(null), mapper, {concurrency: c})
    const timeTaken = endTime(started)
    const avgTime = Math.round((results.reduce((a, c) => a + c, 0) / results.length) * 1000)
    console.log(`threads=${c} qps=${Math.round(TOTAL_ITERATIONS / timeTaken)} total_time=${timeTaken}secs avg_response_time=${avgTime}ms`)
  }
}

const endTime = (startedTime: Date | number) => {
    if (!startedTime) throw new Error("Can't end before we started")
    const startedTimeValue = startedTime instanceof Date ? startedTime.valueOf() : startedTime
    return (Date.now() - startedTimeValue) / 1000
  }

;(async () => {
  await doTest('http://localhost:4000/graphql', jwt, "PRISMA_SIMPLE")
  await doTest('http://localhost:4000/graphql', jwt, "PRISMA_COMPLEX")
  await doTest('http://localhost:8080/v1/graphql', jwt, "PRISMA_SIMPLE")
  await doTest('http://localhost:8080/v1/graphql', jwt, "PRISMA_COMPLEX")
  await doTest('http://localhost:8080/v1/graphql', jwt, "HASURA_SIMPLE")
  await doTest('http://localhost:8080/v1/graphql', jwt, "HASURA_COMPLEX")
})()
