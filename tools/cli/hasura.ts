import {config} from 'dotenv-flow'
import {execSync} from 'child_process'

// Load all the .env files (including .env.production etc from the ./hasura/ directory)
config({path:'hasura'})

const commandLineHead = 'npx -p hasura-cli@v2.0.0-alpha.10 hasura --project hasura'

const commandLine = commandLineHead + " " + process.argv.splice(2).join(' ')

execSync(commandLine, {stdio: 'inherit'})
