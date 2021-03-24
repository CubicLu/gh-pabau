import { JwtPayloadDto } from '../src/app/authentication/dto'

declare global {
  namespace Express {
    interface Request {
      authenticatedUser?: JwtPayloadDto
    }
  }
}
