import { RoutesConfig } from '../routes.config'
import DownloadController from './controllers/download.controller'
import DownloadMiddleware from './middleware/download.middleware'
import express from 'express'

export class DownloadRoutes extends RoutesConfig {
  constructor(app: express.Application) {
    super(app, 'DownloadRoutes')
  }

  setRoutes() {
    this.app
      .route(`/private/:filePath`)
      .get(DownloadMiddleware.checkIfFileExist, DownloadController.downloadFile)

    return this.app
  }
}
