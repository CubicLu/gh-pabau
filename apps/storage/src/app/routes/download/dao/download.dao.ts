import { DownloadDto } from '../dto/download.dto'
import debug from 'debug'

const log: debug.IDebugger = debug('app:download-dao')

class DownloadDao {
  files: Array<DownloadDto> = []

  constructor() {
    log('Created new instance of DeleteDao')
  }

  async downloadFile(file: DownloadDto) {
    // TODO: download file
    return file
  }
}

export default new DownloadDao()
