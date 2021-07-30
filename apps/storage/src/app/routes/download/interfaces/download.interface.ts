import { DownloadDto } from '../dto/download.dto'

export interface DownloadInterface {
  downloadFile: (resource: DownloadDto) => Promise<DownloadDto>
}
