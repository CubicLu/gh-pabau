import {
  assertEnvVarsExist,
  stringToBoolean,
  truthyToMaskedString,
} from './utils'
import { config } from 'dotenv-flow'
import { version } from '../../../package.json'
import { createApp } from './app'

console.log(`Starting bridge-api v${version}`)
assertEnvVarsExist(['DATABASE_URL', 'JWT_SECRET'])

const PORT = process.env['PORT'] || 4000

createApp().listen(PORT, () => {
  config({
    default_node_env: 'development',
    purge_dotenv: true,
  })
  console.log(`Server running on http://localhost:${PORT}`)
})
