
import {config} from 'dotenv-flow'
import {execSync} from 'child_process'

// Load all the .env files (including .env.production etc from the ./hasura/ directory)
config({path:'hasura'})

const commandLineHead = 'npx apollo'

const commandLine = commandLineHead + " " + process.argv.splice(2).join(' ')

execSync(commandLine, {stdio: 'inherit'})
