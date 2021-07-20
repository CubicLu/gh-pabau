import {
  assertEnvVarsExist,
  stringToBoolean,
  truthyToMaskedString,
} from './utils'
import { config } from 'dotenv-flow'
import { version } from '../../../package.json'
import { createApp } from './app'

console.log(`Starting bridge-api v${version}`)

const LOGGING = !!stringToBoolean(process.env['LOGGING'])
const TRACING = !!stringToBoolean(process.env['TRACING'])
const DEBUG_APOLLO = !!stringToBoolean(process.env['DEBUG_APOLLO'])
const PORT = process.env['PORT'] || 4000

createApp({
  tracing: TRACING,
  logging: LOGGING,
  debugApollo: DEBUG_APOLLO,
}).listen(PORT, () => {
  config({
    default_node_env: 'development',
    purge_dotenv: true,
  })

  console.table({
    __dirname,
    cwd: process.cwd(),
    NODE_ENV: process.env.NODE_ENV,
    LOGGING,
    TRACING,
    DEBUG_APOLLO,
    PORT,
    'Database URL': truthyToMaskedString(process.env.DATABASE_URL),
    'JWT Secret': truthyToMaskedString(process.env.JWT_SECRET),
    'Database URL[]': truthyToMaskedString(process.env['DATABASE_URL']),
    'JWT Secret[]': truthyToMaskedString(process.env['JWT_SECRET']),
  })

  assertEnvVarsExist(['DATABASE_URL', 'JWT_SECRET'])

  console.log(`Server running on http://localhost:${PORT}`)
})
