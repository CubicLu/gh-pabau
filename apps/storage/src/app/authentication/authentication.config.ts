import { RoutesConfig } from '../routes/routes.config'
import AuthenticationMiddleware from './middleware/authentication.middleware'
import AuthenticationController from './controllers/authentication.controller'
import express from 'express'

export class Authentication extends RoutesConfig {
  constructor(app: express.Application) {
    super(app, 'Authentication')
  }

  setRoutes() {
    this.app
      .route(`/private/*`)
      .get(
        AuthenticationMiddleware.checkTokenParameter,
        AuthenticationController.checkJwtDownload
      )

    this.app
      .route(`/*`)
      .post(
        AuthenticationMiddleware.checkAuthHeader,
        AuthenticationMiddleware.checkBearerToken,
        AuthenticationController.checkJwt
      )

    return this.app
  }
}
