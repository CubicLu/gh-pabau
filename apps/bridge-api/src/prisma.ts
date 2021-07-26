import { PrismaClient } from '@prisma/client'
import { stringToBoolean } from './utils'

const DATABASE_URL = process.env.DATABASE_URL
const PABAU1_MYSQL_USERNAME_PODS = process.env.PABAU1_MYSQL_USERNAME_PODS
const PABAU1_MYSQL_PASSWORD_PODS = process.env.PABAU1_MYSQL_PASSWORD_PODS
const LOGGING = stringToBoolean(process.env.LOGGING)

const instances: Record<string, PrismaClient> = {}

if (!PABAU1_MYSQL_USERNAME_PODS || !PABAU1_MYSQL_PASSWORD_PODS) {
  console.error(
    'To locally access companies with a remote_url, you will need to set the PABAU1_MYSQL_USERNAME_PODS and PABAU1_MYSQL_PASSWORD_PODS env vars.'
  )
}

function getPodDbUrl(urlOrHostname) {
  if (
    !urlOrHostname ||
    urlOrHostname === ('https://toshe.pabau.me' || 'http://localhost')
  )
    return DATABASE_URL

  let url
  try {
    url = new URL(urlOrHostname)
  } catch {
    try {
      url = new URL(`https://${urlOrHostname}`)
    } catch {
      return DATABASE_URL
    }
  }

  if (!url || !url.hostname) {
    console.warn(`Warning: Bad URL found from "${urlOrHostname}"`)
    return DATABASE_URL
  }

  return `mysql://${PABAU1_MYSQL_USERNAME_PODS}:${PABAU1_MYSQL_PASSWORD_PODS}@db.${
    url.hostname.split('.')[0]
  }/pabau`
}

/**
 * Returns a PrismaClient specific for the company. Lazily initialized.
 */
export const prisma = (remote_url: string) => {
  if (remote_url in instances) return instances[remote_url]

  const url = getPodDbUrl(remote_url)
  console.log(
    'Lazily instantiating PrismaClient for',
    remote_url,
    'Logging:',
    LOGGING
  )
  const instance = new PrismaClient({
    datasources: { db: { url } },
    log: LOGGING
      ? [
          {
            emit: 'event',
            level: 'query',
          },
        ]
      : [],
  })

  if (LOGGING)
    instance.$on('query', (e) => {
      console.log(
        '[' +
          remote_url +
          '] Query: ' +
          e.query +
          ' --- Duration: ' +
          e.duration +
          'ms'
      )
    })

  // store this instance into memory cache
  instances[remote_url] = instance

  return securedInstanceProxy
}
