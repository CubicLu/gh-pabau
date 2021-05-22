import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'
import { ExpressContext } from 'apollo-server-express'
import { version } from '../../../package.json'
import { JwtPayloadDto } from './app/authentication/dto'
import { ContextFunction } from 'apollo-server-core'

//TODO: [PABAU2-433] move this from here, it's violating ES Module spec and creating side-effects from hoisted import statements.
console.log('Creating a PrismaClient instance.')
const prisma = new PrismaClient()

export interface Context {
  /**
   * The Prisma Client
   */
  prisma: PrismaClient

  /**
   * The currently logged in user
   */
  user?: JwtPayloadDto

  /**
   * The package.json version for this app
   */
  version: string
}

export const createContext: ContextFunction<ExpressContext, Context> = (
  req
) => {
  console.log('creating context!', req.req.headers)
  const ret = {
    prisma,
    version,
  } as Context
  const authorizationRaw = req.req.header('authorization')
  if (authorizationRaw) {
    try {
      ret.user = jwt.verify(
        authorizationRaw.replace(/^Bearer /, ''),
        process.env.JWT_SECRET,
        { algorithms: ['HS512'] }
      ) as JwtPayloadDto
      // eslint-disable-next-line no-empty
    } catch {}
  }
  return ret
}
