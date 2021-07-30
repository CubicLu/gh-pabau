import express from 'express'
import { environment } from '../../../../environments/environment'
import * as fs from 'fs'

import debug from 'debug'

const log: debug.IDebugger = debug('app:download-controller')
class DownloadController {
  async downloadFile(req: express.Request, res: express.Response) {
    log(`Downloading file...`)

    const file = environment.PRIVATE_PATH + req.params.filePath
    if (fs.existsSync(file)) {
      res.status(200).sendFile(file)
    } else {
      res.status(404).send({
        errors: [
          {
            message: `File does not exist.`,
            path: file,
          },
        ],
      })
    }
  }
}

export default new DownloadController()
