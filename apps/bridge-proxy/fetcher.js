/* eslint-disable @typescript-eslint/no-var-requires */

const podFetcher = require('cross-fetch')
const jwt = require('jsonwebtoken')
const { version } = require('./package.json')

console.log(`Starting custom fetcher for mesh v${version}`, {
  hasJwtSecret: !!process.env['JWT_SECRET'],
})

//TODO: change the fallback here to "api-crm.pabau.com"
const LEGACY_SERVER_URL_OR_HOSTNAME =
  process.env['LEGACY_SERVER_URL_OR_HOSTNAME'] || 'https://toshe.pabau.me'

function getPodApiUrl(urlOrHostname) {
  if (!urlOrHostname) urlOrHostname = LEGACY_SERVER_URL_OR_HOSTNAME
  let url
  try {
    url = new URL(urlOrHostname)
  } catch {
    try {
      url = new URL(`https://${urlOrHostname}`)
    } catch {
      console.log('bad urlOrHostname:', urlOrHostname)
    }
  }

  return `https://api-${url.hostname}/graphql`
}

module.exports = function (url, options) {
  console.log('PDS Starting fetch.', {
    version,
    LEGACY_SERVER_URL_OR_HOSTNAME,
    url,
    options,
  })

  let endpoint

  if (options?.headers?.authorization) {
    console.log('found a authorization header')

    try {
      const jwtDecoded = jwt.verify(
        options.headers.authorization.replace(/^Bearer /, ''),
        process.env['JWT_SECRET'],
        { algorithms: ['HS512'] }
      )
      console.log('got jwt decoded', jwtDecoded)
      endpoint = getPodApiUrl(jwtDecoded.remote_url)
    } catch {
      console.error('jwt verify failed')
    }
  }

  if (!endpoint) endpoint = getPodApiUrl()
  console.log('PDS Resolved fetch.', { endpoint, options })

  return podFetcher(endpoint, options)
}
