/* eslint-disable @typescript-eslint/no-var-requires */

const podFetcher = require('cross-fetch')
const jwt = require('jsonwebtoken')
const { version } = require('./package.json')

console.log(`Starting custom fetcher for mesh v${version}`, {
  hasJwtSecret: !!process.env['JWT_SECRET'],
})

//TODO: change the fallback here to "api-crm.pabau.com"
const LEGACY_SERVER_HOSTNAME =
  process.env['LEGACY_SERVER_HOSTNAME'] || 'toshe.pabau.me'

function getPodApiUrl(hostname) {
  //TODO
  return 'https://api-toshe.pabau.me/graphql'
}

module.exports = function (url, options) {
  console.log('PDS Starting fetch.', {
    LEGACY_SERVER_HOSTNAME,
    url,
    options,
  })

  if (options?.headers?.authorization) {
    const jwtDecoded = jwt.verify(
      options.headers.authorization.replace(/^Bearer /, ''),
      process.env['JWT_SECRET'],
      { algorithms: ['HS512'] }
    )

    console.log('got jwt decoded', jwtDecoded)
  }

  const endpoint = getPodApiUrl()

  console.log('PDS Resolved fetch.', { endpoint })

  return podFetcher(endpoint, options)
}
