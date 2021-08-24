import { RoutesConfig } from '../routes.config'
import DefaultController from './controllers/default.controller'
import express from 'express'

export class DefaultRoutes extends RoutesConfig {
  constructor(app: express.Application) {
    super(app, 'DefaultRoutes')
  }

  setRoutes() {
    this.app.route(`/*`).all(DefaultController.returnDefaultResponse)

    return this.app
  }
}
