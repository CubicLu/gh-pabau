import express from 'express'
import deleteService from '../services/delete.service'
import { DeleteDto } from '../dto/delete.dto'
import debug from 'debug'

const log: debug.IDebugger = debug('app:delete-controller')
class DeleteController {
  async deleteFile(req: express.Request, res: express.Response) {
    const resources: DeleteDto = {
      fileName: req.body.fileName,
      fileType: req.body.fileType,
      filePath: req.body.filePath,
    }
    const file = await deleteService.deleteFile(resources)
    if (file) {
      log('File deleted')
      res.status(200).send('File Deleted')
    }
  }
}

export default new DeleteController()
