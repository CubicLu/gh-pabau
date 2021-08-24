import { generateFilenameCrop } from '../dto/upload.dto'

import sharp from 'sharp'
import { CropParams } from '../interfaces/upload.interface'

class CropController {
  async cropImage(file: Express.Multer.File, cropParams: CropParams) {
    await sharp(file.path)
      .extract(cropParams)
      .toFile(generateFilenameCrop(file))
  }
}

export default new CropController()
