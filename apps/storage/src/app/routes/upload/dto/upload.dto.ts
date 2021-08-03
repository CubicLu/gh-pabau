import multer from 'multer'
import express from 'express'
import { v4 as uuidv4 } from 'uuid'
import { environment } from '../../../../environments/environment'
import fs from 'fs'
import mime from 'mime-types'
import debug from 'debug'
const log: debug.IDebugger = debug('app:upload-dto')

export interface UploadDto {
  fileName: string
  fileType: string
  filePath: string
}

export const editFileName = (
  req: express.Request,
  file,
  callback: CallableFunction
) => {
  log(file)
  const fileExtName = mime.extension(file.mimetype)
  const fileId = uuidv4()

  callback(null, `${fileId}.${fileExtName}`)
}

export const editDestination = (req, file, callback) => {
  const isPrivate: boolean = req.query.private
  const section: string = req.query.section
  const company: number = req.query.company

  log(req.body)
  const rootPath = isPrivate
    ? environment.PRIVATE_PATH
    : environment.PUBLIC_PATH

  const randomName = Array.from({ length: 7 })
    .fill(null)
    .map(() => Math.round(Math.random() * 32).toString(36))
    .join('/')

  const destPath = rootPath + '/' + company + '/' + section + '/' + randomName
  try {
    if (!fs.existsSync(destPath)) {
      fs.mkdirSync(destPath, { recursive: true })
    }
    callback(null, destPath)
  } catch (error) {
    callback(error, null)
  }
}

export const generateFilenameSize = (
  file: Express.Multer.File,
  size: number
) => {
  const name = file.filename.split('.')[0]
  const ext = file.filename.split('.')[1]

  return `${file.destination}/${name}-${size}.${ext}`
}

export const generateFilenameCrop = (file: Express.Multer.File) => {
  const name = file.filename.split('.')[0]
  const ext = file.filename.split('.')[1]

  return `${file.destination}/${name}-cropped.${ext}`
}

export const fileFilter = (
  req: express.Request,
  file: Express.Multer.File,
  callback
) => {
  console.log(req.body.test)
  console.log(req.body.test2)
  if (!/\.(jpg|jpeg|png|gif)$/.test(file.originalname)) {
    //return callback(new Error('Only image files are allowed!'), false)
  }
  callback(null, true)
}

export const Storage = {
  storage: multer.diskStorage({
    destination: editDestination,
    filename: editFileName,
  }),
  fileFilter: fileFilter,
}
