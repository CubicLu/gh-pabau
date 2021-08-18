import jwt from 'jsonwebtoken'
import { prisma } from './prisma'
import { ExpressContext } from 'apollo-server-express'
import { version } from '../../../package.json'
import { JwtPayloadDto } from './app/authentication/dto'
import { ContextFunction } from 'apollo-server-core'
import { PrismaClient } from '@prisma/client'

export interface Context {
  /**
   * The Prisma Client
   */
  prisma: PrismaClient

  /**
   * For Authentication module to resolve pod user.id, we have this emergency hatch that returns a PrismaClient instance
   * for the specified pod.
   *
   * @param remote_url - The `remote_url` from the database
   */
  prismaArray(remote_url: string): PrismaClient

  /**
   * The currently logged in user
   */
  authenticated?: JwtPayloadDto

  /**
   * The package.json version for this app
   */
  version: string

  /**
   * Required for PrismaSelect plugin to operate
   */
  select: any
}

export const createContext: ContextFunction<ExpressContext, Context> = (
  req
) => {
  const ret = {
    version,
    select: {},
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
  ret.prisma = prisma(ret.authenticated?.remote_url || undefined)
  ret.prismaArray = (remote_url) => prisma(remote_url)

  return ret
}
