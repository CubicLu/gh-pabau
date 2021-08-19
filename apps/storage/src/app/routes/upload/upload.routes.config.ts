import { RoutesConfig } from '../routes.config'
import UploadController from './controllers/upload.controller'
import MulterController from './controllers/multer.controller'
import express from 'express'

export class UploadRoutes extends RoutesConfig {
  constructor(app: express.Application) {
    super(app, 'UploadRoutes')
  }

  setRoutes() {
    this.app
      .route(`/upload`)
      .post(MulterController.processFiles, UploadController.uploadFile)

    return this.app
  }
}
