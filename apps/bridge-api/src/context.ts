import jwt from 'jsonwebtoken'
import { prisma } from './prisma'
import { ExpressContext } from 'apollo-server-express'
import { version } from '../../../package.json'
import { JwtPayloadDto } from './app/authentication/dto'
import { ContextFunction } from 'apollo-server-core'

export interface Context {
  /**
   * The Prisma Client
   */
  prisma: typeof prisma

  /**
   * The currently logged in user
   */
  authenticated?: JwtPayloadDto

  /**
   * The package.json version for this app
   */
  version: string
}

export const createContext: ContextFunction<ExpressContext, Context> = (
  req
) => {
  const ret = {
    prisma,
    version,
  } as Context
  const authorizationRaw = req.req.header('authorization')
  if (authorizationRaw) {
    try {
      ret.authenticated = jwt.verify(
        authorizationRaw.replace(/^Bearer /, ''),
        process.env.JWT_SECRET,
        { algorithms: ['HS512'] }
      ) as JwtPayloadDto
    } catch {
      console.log('invalid jwt found')
    }
  }
  return ret
}
