/* eslint-disable @typescript-eslint/no-var-requires */

const podFetcher = require('cross-fetch')

const POD_NAME = 'toshe.pabau.me'

module.exports = function (a, b, c) {
  console.log(`YEYEYYEYYE typescript to ${POD_NAME}`, a, b, c)
  return podFetcher(`https://api-${POD_NAME}/graphql`, b)
}
