import { AuthenticationInterface } from '../interfaces/authentication.interface'
import jwt from 'jsonwebtoken'
import { environment } from '../../../environments/environment'
import debug from 'debug'

const log: debug.IDebugger = debug('app:authentication-service')

class AuthenticationService implements AuthenticationInterface {
  async extractJwt(bearerToken: string) {
    return bearerToken
  }
  async getBearerToken(authenticationHeader: string) {
    return authenticationHeader
  }

  async checkJwt(bearerToken: string) {
    try {
      return jwt.verify(bearerToken, environment.JWT_SECRET, {
        algorithms: ['HS512'],
      })
    } catch (error) {
      log(`ERROR: ${error}`)
      return { errors: error }
    }
  }

  async checkJwtDownload(jwtToken) {
    try {
      return jwt.verify(jwtToken, environment.JWT_SECRET_DOWNLOAD, {
        algorithms: ['HS512'],
      })
    } catch (error) {
      log(`ERROR: ${error}`)
      return { errors: error }
    }
  }
}

export default new AuthenticationService()
