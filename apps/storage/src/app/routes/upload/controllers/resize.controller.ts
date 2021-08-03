import { generateFilenameSize } from '../dto/upload.dto'
import debug from 'debug'
import sharp from 'sharp'

const log: debug.IDebugger = debug('app:resize-controller')
class ResizeController {
  async resizeImage(file: Express.Multer.File, sizes: number[]) {
    sizes.map(async (size) => {
      try {
        log(size)
        await sharp(file.path)
          .resize({ width: size })
          .toFile(generateFilenameSize(file, size))
      } catch (error) {
        log(error)
      }
    })
  }
}

export default new ResizeController()
