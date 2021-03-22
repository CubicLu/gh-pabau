import { Request } from 'express'
import { JwtPayloadDto } from './app/authentication/dto'
import jwt from 'jsonwebtoken'

export interface Context {
  req: Request
  user?: JwtPayloadDto
}

export const createContext = ({ req }: { req: Request }) => {
  const authHeader = req.header('authorization')

  const user =
    authHeader &&
    (jwt.verify(authHeader.replace(/^Bearer /, ''), process.env.JWT_SECRET, {
      algorithms: ['HS512'],
    }) as JwtPayloadDto)

  return {
    req,
    user,
  } as Context
}
