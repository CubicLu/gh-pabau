import express from 'express'
import multer from 'multer'
import { Storage } from '../dto/upload.dto'

class MulterController {
  async processFiles(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const upload = multer(Storage)

    const uploader = upload.array('files', 20)
    uploader(req, res, function (err) {
      if (err) {
        res.status(500).send({ error: err })
      } else {
        next()
      }
    })
  }
}

export default new MulterController()
