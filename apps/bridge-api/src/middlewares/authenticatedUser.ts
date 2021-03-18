import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { JwtPayloadDto } from '../app/authentication/dto'

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      authenticatedUser?: JwtPayloadDto
    }
  }
}

const authenticatedUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.session?.jwt) {
      // console.log('verifying session jwt..')
      req.authenticatedUser = jwt.verify(
        req.session?.jwt,
        process.env.JWT_SECRET,
        { algorithms: ['HS512'] }
      ) as JwtPayloadDto
    } else if (req.header('authorization')) {
      req.header('authorization').replace(/^Bearer /, '')
      req.authenticatedUser = jwt.verify(
        req.header('authorization').replace(/^Bearer /, ''),
        process.env.JWT_SECRET,
        { algorithms: ['HS512'] }
      ) as JwtPayloadDto
    }
  } catch {
    // console.error(error)
  } finally {
    next()
  }
}
export default authenticatedUser
