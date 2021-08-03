import express from 'express'
import CommonHelper from '../../../helpers/common/common.helper'
import ResizeController from '../controllers/resize.controller'
import CropController from '../controllers/crop.controller'
import ImageController from '../controllers/image.controller'
import { CropParams } from '../interfaces/upload.interface'
import debug from 'debug'

// Sample Authorization header Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJjb21wYW55IjoiODI1NCIsInNlY3Rpb24iOiJzdGFmZi1hdmF0YXIiLCJjcm9wIjp7ImxlZnQiOjEwLCJ0b3AiOjEwLCJ3aWR0aCI6MTAwLCJoZWlnaHQiOjIwMH0sInNpemVzIjp7ImRhdGEiOlsxMDAsMjAwLDMwMF19LCJpYXQiOjE1MTYyMzkwMjIsImV4cCI6MTcxNjIzOTAyMn0.U2GaW1J_1QonPSrBfM9UWq7C_k5N_XNq7R2kiwAEe1eWYJU32c9z_crm6G_4UDjn_917P82AMNt3M173lXKf7Q

const log: debug.IDebugger = debug('app:upload-controller')
class UploadController {
  async uploadFile(req: express.Request, res: express.Response) {
    log(req.files)
    log(req.query)
    const files = req.files
    const sizes: number[] = req.query.sizes['data']
    const cropParams: CropParams = {
      top: req.query.crop['top'],
      left: req.query.crop['left'],
      width: req.query.crop['width'],
      height: req.query.crop['height'],
    }

    Object.keys(files).map(async (index) => {
      log(await ImageController.imageInfo(files[index]))

      if (sizes.length > 0) {
        await ResizeController.resizeImage(files[index], sizes)
      }

      if (cropParams && req.query.crop.length > 0) {
        await CropController.cropImage(files[index], cropParams)
      }

      log(files[index]['path'])
    })

    log('1')
    await CommonHelper.returnSuccessResponse(req, res, { files: req.files })
  }
}

export default new UploadController()
