import express from 'express'
import debug from 'debug'

const log: debug.IDebugger = debug('app:default-controller')
class DefaultMiddleware {
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
}

export default new DefaultMiddleware()
