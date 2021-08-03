import { UploadDto } from '../dto/upload.dto'

export interface UploadInterface {
  uploadFile: (resource: UploadDto) => Promise<string>
}

export interface CropParams {
  left: number
  top: number
  width: number
  height: number
}

export interface UploadResponse {
  data?: ResponseData[]
  errors?: ResponseError[]
}

export interface ResponseData {
  fullPath: string
  sizes?: ImageSize[]
}

export interface ResponseError {
  message: string
}
export interface ImageSize {
  [width: number]: string
}

export interface File {
  name: string
  size: number
  type: string
  extension: string
  content: ArrayBuffer
}

export interface UploadedFile {
  path: string
}

export interface FileUpload {
  upload: (files: File[]) => Promise<UploadedFile[]>
}

export interface FileUploader {
  upload: (
    files: File | File[]
  ) => Promise<UploadedFile | UploadedFile[] | undefined>
}
