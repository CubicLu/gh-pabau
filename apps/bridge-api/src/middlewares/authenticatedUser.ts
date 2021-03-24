import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { JwtPayloadDto } from '../app/authentication/dto'

const authenticatedUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.header('authorization')) {
      req.header('authorization').replace(/^Bearer /, '')
      req.authenticatedUser = jwt.verify(
        req.header('authorization').replace(/^Bearer /, ''),
        process.env.JWT_SECRET,
        { algorithms: ['HS512'] }
      ) as JwtPayloadDto
    }
  } catch (error) {
    console.error(error)
  } finally {
    next()
  }
}
export default authenticatedUser