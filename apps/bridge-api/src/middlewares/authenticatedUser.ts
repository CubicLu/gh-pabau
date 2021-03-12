import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { JwtPayloadDto } from '../app/authentication/dto'

declare global {
  namespace Express {
    interface Request {
      authenticatedUser?: JwtPayloadDto;
    }
  }
}

const authenticatedUser = (req: Request, res: Response, next: NextFunction) => {
  try{
    if (!req.session?.jwt){
      console.error('Token not found')
    } else{
      req.authenticatedUser = jwt.verify(req.session?.jwt, process.env.JWT_SECRET) as JwtPayloadDto
    }
  } catch(error) {
    console.error(error)
  } finally {
    next();
  }
};
export default authenticatedUser;
