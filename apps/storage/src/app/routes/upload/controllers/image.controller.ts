import sharp from 'sharp'

class ImageController {
  async imageInfo(file: Express.Multer.File) {
    try {
      return await sharp(file.path).metadata()
    } catch (error) {
      return error
    }
  }
}

export default new ImageController()
