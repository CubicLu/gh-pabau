import express from 'express'
import uploadService from '../services/upload.service'
import { UploadDto } from '../dto/upload.dto'
import multer from 'multer'
import debug from 'debug'

const log: debug.IDebugger = debug('app:upload-controller')
class UploadMiddleware {
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
    const resources: UploadDto = {
      fileName: req.body.fileName,
      fileType: req.body.fileType,
      filePath: req.body.filePath,
    }

    const file = await uploadService.checkFile(resources)
    if (file) {
      next()
    } else {
      res.status(400).send({ error: `Invalid file` })
    }
  }

  async processFiles(req: express.Request) {
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, 'uploads/')
      },
      filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
      },
    })

    const upload = await multer({ storage })
    upload.array('files', 20)
    console.log(req.files)
    //next()
  }
}

export default new UploadMiddleware()
