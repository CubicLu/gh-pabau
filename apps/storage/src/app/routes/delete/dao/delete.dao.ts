import { DeleteDto } from '../dto/delete.dto'
import debug from 'debug'

const log: debug.IDebugger = debug('app:delete-dao')

class DeleteDao {
  files: Array<DeleteDto> = []

  constructor() {
    log('Created new instance of DeleteDao')
  }

  async deleteFile(file: DeleteDto) {
    // TODO: Delete file
    return file
  }
}

export default new DeleteDao()
