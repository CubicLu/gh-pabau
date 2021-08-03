import express from 'express'
import deleteService from '../services/delete.service'
import { DeleteDto } from '../dto/delete.dto'
import debug from 'debug'

const log: debug.IDebugger = debug('app:delete-controller')
class DeleteMiddleware {
  async validateRequiredDeleteBodyFields(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    if (req.body.fileName && req.body.fileType && req.body.filePath) {
      next()
    } else {
      log('Error: Missing Fields')
      res.status(400).send({
        error: `Missing required fields fileName, fileType and filePath`,
      })
    }
  }

  async checkIfFileExist(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const resources: DeleteDto = {
      fileName: req.body.fileName,
      fileType: req.body.fileType,
      filePath: req.body.filePath,
    }

    const file = await deleteService.checkFile(resources)
    if (file) {
      next()
    } else {
      res.status(400).send({ error: `Invalid file` })
    }
  }
}

export default new DeleteMiddleware()
