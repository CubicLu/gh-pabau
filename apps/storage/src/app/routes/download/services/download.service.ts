import DownloadDao from '../dao/download.dao'
import { DownloadInterface } from '../interfaces/download.interface'
import { DownloadDto } from '../dto/download.dto'

class DownloadService implements DownloadInterface {
  async downloadFile(resource: DownloadDto) {
    return DownloadDao.downloadFile(resource)
  }
  async checkFile(resource: DownloadDto) {
    return DownloadDao.downloadFile(resource)
  }
}

export default new DownloadService()
