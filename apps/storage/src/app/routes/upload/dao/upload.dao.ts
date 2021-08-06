import { UploadDto } from '../dto/upload.dto'
import debug from 'debug'

const log: debug.IDebugger = debug('app:upload-dao')

class UploadDao {
  files: Array<UploadDto> = []

  constructor() {
    log('Created new instance of DeleteDao')
  }

  async uploadFile(file: UploadDto) {
    // TODO: upload file
    log(file)
    return 'file'
  }
}

export default new UploadDao()
