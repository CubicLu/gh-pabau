import { assertEnvVarsExist, stringToBoolean } from './utils'
import { config } from 'dotenv-flow'
import { version } from '../../../package.json'
import { createApp } from './app'

console.log(`Starting bridge-api v${version}`)

config({
  default_node_env: 'development',
  path: __dirname + '/prisma',
  purge_dotenv: true,
})

const LOGGING = !!stringToBoolean(process.env['LOGGING'])
const TRACING = !!stringToBoolean(process.env['TRACING'])
const DEBUG_APOLLO = !!stringToBoolean(process.env['DEBUG_APOLLO'])
const PORT = process.env['PORT'] || 4000

console.table({
  __dirname,
  cwd: process.cwd(),
  NODE_ENV: process.env.NODE_ENV,
  LOGGING,
  TRACING,
  DEBUG_APOLLO,
  PORT,
  'Database URL': process.env.DATABASE_URL,
  'JWT Secret': process.env.JWT_SECRET,
})

assertEnvVarsExist(['DATABASE_URL', 'JWT_SECRET'])

createApp({
  tracing: TRACING,
  logging: LOGGING,
  debugApollo: DEBUG_APOLLO,
}).listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))
