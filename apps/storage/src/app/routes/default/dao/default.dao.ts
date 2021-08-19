import { DefaultDto } from '../dto/default.dto'
import debug from 'debug'

const log: debug.IDebugger = debug('app:default-dao')

class DefaultDao {
  files: Array<DefaultDto> = []

  constructor() {
    log('Created new instance of DefaultDao')
  }

  async defaultResponse(file: DefaultDto) {
    // TODO: download file
    return file
  }
}

export default new DefaultDao()
