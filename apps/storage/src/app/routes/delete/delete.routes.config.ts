import { RoutesConfig } from '../routes.config'
import DeleteController from './controllers/delete.controller'
import DeleteMiddleware from './middleware/delete.middleware'
import express from 'express'

export class DeleteRoutes extends RoutesConfig {
  constructor(app: express.Application) {
    super(app, 'DeleteRoutes')
  }

  setRoutes() {
    this.app
      .route(`/delete`)
      .post(
        DeleteMiddleware.validateRequiredDeleteBodyFields,
        DeleteController.deleteFile
      )

    return this.app
  }
}
