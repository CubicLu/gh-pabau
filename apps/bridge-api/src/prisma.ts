import { PrismaClient } from '@prisma/client'

const DATABASE_URL = process.env.DATABASE_URL
const PABAU1_MYSQL_USERNAME_PODS = process.env.PABAU1_MYSQL_USERNAME_PODS
const PABAU1_MYSQL_PASSWORD_PODS = process.env.PABAU1_MYSQL_PASSWORD_PODS

const instances: Record<string, PrismaClient> = {}

function getPodDbUrl(urlOrHostname) {
  if (!urlOrHostname) return DATABASE_URL

  let url
  try {
    url = new URL(urlOrHostname)
  } catch {
    url = new URL(`https://${urlOrHostname}`)
  }

  return `mysql://${PABAU1_MYSQL_USERNAME_PODS}:${PABAU1_MYSQL_PASSWORD_PODS}@db.${
    url.hostname.split('.')[0]
  }/pabau?connection_limit=32`
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
    ],
  })

  /**
   * Here we use es2015's Proxy object to extend the class at runtime.
   *
   * I tried the FP approach using
   * ```
   * const securedInstance = {
   *   ...instance,
   *   user: {
   *     ...instance.user,
   *     findUnique: (e) => instance.user.findFirst(e),
   *   },
   * }
   * ```
   * But TS doesn't like it.
   *
   */
  const securedInstanceProxy = new Proxy(instance, {
    get(target, property) {
      return new Proxy(target[property], {
        get(target, property) {
          if (property === 'findUnique') {
            return target.findFirst // switcharooy
          }
          return target[property]
        },
      })
    },
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

  // store this instance into memory cache
  instances[remote_url] = securedInstanceProxy

  return securedInstanceProxy
}
