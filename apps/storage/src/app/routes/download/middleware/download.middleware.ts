import express from 'express'
import DownloadService from '../services/download.service'
import { DownloadDto } from '../dto/download.dto'
import debug from 'debug'

const log: debug.IDebugger = debug('app:delete-controller')
class DownloadMiddleware {
  async validateRequiredUploadBodyFields(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    if (req.body.fileName && req.body.fileType && req.body.filePath) {
      next()
    } else {
      log('Error: Missing Fields')
      res.status(400).send({
        error: `Missing required fields ...`,
      })
    }
  }

  async checkIfFileExist(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const resources: DownloadDto = {
      fileName: req.body.fileName,
      fileType: req.body.fileType,
      filePath: req.body.filePath,
    }

    const file = await DownloadService.checkFile(resources)
    if (file) {
      next()
    } else {
      res.status(400).send({ error: `Invalid file` })
    }
  }
}

export default new DownloadMiddleware()
