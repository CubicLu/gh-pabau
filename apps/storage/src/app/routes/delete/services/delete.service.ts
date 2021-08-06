import DeleteDao from '../dao/delete.dao'
import { DeleteInterface } from '../interfaces/delete.interface'
import { DeleteDto } from '../dto/delete.dto'

class DeleteService implements DeleteInterface {
  async deleteFile(resource: DeleteDto) {
    return DeleteDao.deleteFile(resource)
  }
  async checkFile(resource: DeleteDto) {
    return DeleteDao.deleteFile(resource)
  }
}

export default new DeleteService()
