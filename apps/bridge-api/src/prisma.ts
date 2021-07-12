import { PrismaClient } from '@prisma/client'

const DATABASE_URL = process.env.DATABASE_URL
const PABAU1_MYSQL_USERNAME_PODS = process.env.PABAU1_MYSQL_USERNAME_PODS
const PABAU1_MYSQL_PASSWORD_PODS = process.env.PABAU1_MYSQL_PASSWORD_PODS

const instances: Record<string, PrismaClient> = {}

function getPodDbUrl(urlOrHostname) {
  if (!urlOrHostname || urlOrHostname === 'https://toshe.pabau.me')
    return DATABASE_URL

  let url
  try {
    url = new URL(urlOrHostname)
  } catch {
    url = new URL(`https://${urlOrHostname}`)
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
    'to',
    Boolean(url)
  )
  const instance = new PrismaClient({
    datasources: { db: { url } },
    log: [
      {
        emit: 'event',
        level: 'query',
      },
      {
        emit: 'stdout',
        level: 'error',
      },
      {
        emit: 'stdout',
        level: 'info',
      },
      {
        emit: 'stdout',
        level: 'warn',
      },
    ],
  })

  if (process.env.LOGGING && process.env.LOGGING !== '0')
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

  instances[remote_url] = instance

  return instance
}
