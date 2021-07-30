import UploadDao from '../dao/upload.dao'
import { UploadInterface } from '../interfaces/upload.interface'
import { UploadDto } from '../dto/upload.dto'

class UploadService implements UploadInterface {
  async uploadFile(resource: UploadDto) {
    return UploadDao.uploadFile(resource)
  }
  async checkFile(resource: UploadDto) {
    return UploadDao.uploadFile(resource)
  }
}

export default new UploadService()
