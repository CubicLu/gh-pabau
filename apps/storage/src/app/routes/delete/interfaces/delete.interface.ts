import { DeleteDto } from '../dto/delete.dto'

export interface DeleteInterface {
  deleteFile: (resource: DeleteDto) => Promise<DeleteDto>
}
