import {config} from 'dotenv-flow'
import {execSync} from 'child_process'

// Load all the .env files (including .env.production etc from the ./hasura/ directory)
config({path:'hasura', default_node_env:'development'})
console.table({
  cwd: process.cwd(),
  HASURA_GRAPHQL_ENDPOINT: process.env.HASURA_GRAPHQL_ENDPOINT,
  HASURA_GRAPHQL_ADMIN_SECRET: process.env.HASURA_GRAPHQL_ADMIN_SECRET,
  NODE_ENV: process.env.NODE_ENV,
})

const commandLineHead = 'npx -p hasura-cli@v2.0.0-beta.1 hasura --project hasura'

const commandLine = commandLineHead + " " + process.argv.splice(2).join(' ')

execSync(commandLine, {stdio: 'inherit'})
