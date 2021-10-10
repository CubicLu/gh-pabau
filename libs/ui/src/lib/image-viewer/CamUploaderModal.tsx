import React, { FC, useEffect, useState, useRef, ReactNode } from 'react'
import axios from 'axios'
import { BasicModal as Modal, Button } from '@pabau/ui'
import {
  CloseOutlined,
  LeftOutlined,
  CloudUploadOutlined,
} from '@ant-design/icons'
import { Progress, Tooltip } from 'antd'
import { useMedia } from 'react-use'
import { browserName, isMobile, osName } from 'react-device-detect'
import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo'
import { ReactComponent as ImagesIcon } from '../../assets//images/image-viewer/image-gallery.svg'
import { ReactComponent as CameraCircleFilled } from '../../assets//images/image-viewer/camera-circle-filled.svg'
import { ReactComponent as PhotoCircleFilled } from '../../assets//images/image-viewer/photo-circle-filled.svg'
import styles from './CamUploaderModal.module.less'
import 'react-html5-camera-photo/build/css/index.css'
import classNames from 'classnames'

const validTypes = ['image/jpeg', 'image/jpg', 'image/png']

const dataURLtoFile = (dataurl, filename) => {
  const arr = dataurl.split(','),
    mime = arr?.[0]?.match(/:(.*?);/)?.[1],
    bstr = atob(arr?.[1])

  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }

  return new File([u8arr], filename, { type: mime })
}

const makeId = (length) => {
  let result = ''
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}
export interface UploadingImageProps {
  id: string
  preview: string
  file?: File
  size?: number
  isUploadStarted?: boolean
  isUploadCompleted?: boolean
  uploadPercentage?: number
}

interface ImageThumbnailProps {
  data: UploadingImageProps
  isUploadStarted?: boolean
  setUploadStarted?: (id) => void
  isUploadCompleted?: boolean
  setUploadCompleted?: (id) => void
  uploadPercentage?: number
  setUploadPercentage?: (id, percent) => void
  removeFile?: (id) => void
}

const ImageThumbnail: FC<ImageThumbnailProps> = ({
  data,
  isUploadStarted,
  setUploadStarted,
  isUploadCompleted,
  setUploadCompleted,
  uploadPercentage = 0,
  setUploadPercentage,
  removeFile,
}) => {
  const api = axios.create({
    baseURL: 'http://localhost:5000/',
    headers: {},
  })

  const [thumbnail, setThumbnail] = useState<UploadingImageProps>(data)
  const [uploadedPath, setUploadedPath] = useState<string>('')

  useEffect(() => {
    if (!isUploadStarted) {
      const upload = async (fileData) => {
        setUploadStarted?.(fileData?.id)
        const config = {
          onUploadProgress: function (progressEvent) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            )
            setUploadPercentage?.(fileData?.id, percentCompleted)
          },
        }
        const data = new FormData()
        data.append('File', fileData?.file)
        data.append('id', fileData?.id)

        await api
          .post('upload', data, config)
          .then((res) => {
            setUploadCompleted?.(fileData?.id)
            console.log('RES:', res)
          })
          .catch((error) => console.log(error?.message))
      }
      setThumbnail(data)
      upload?.(data)
    }
  }, [
    api,
    data,
    isUploadStarted,
    setUploadCompleted,
    setUploadPercentage,
    setUploadStarted,
  ])

  return (
    <div
      key={thumbnail?.id}
      style={{ backgroundImage: `url(${thumbnail?.preview})` }}
    >
      {isUploadStarted && (
        <div className={styles.imgLoading}>
          <Tooltip
            placement="top"
            title={
              uploadPercentage < 100
                ? `${uploadPercentage}% completed`
                : 'Uploaded!'
            }
          >
            <Progress
              type="circle"
              percent={uploadPercentage}
              showInfo={isUploadCompleted ? true : false}
              strokeColor="#65CD98"
              trailColor="#9292A3"
              strokeWidth={10}
              width={25}
              status={isUploadCompleted ? 'success' : 'normal'}
            />
          </Tooltip>
        </div>
      )}
      {isUploadCompleted && (
        <Tooltip placement="top" title="Delete">
          <Button
            type="default"
            ghost
            size="small"
            className={styles.deleteImageIcon}
            onClick={() => removeFile?.(thumbnail?.id)}
          >
            <CloseOutlined />
          </Button>
        </Tooltip>
      )}
    </div>
  )
}

interface DropzoneProps {
  multiple?: boolean
  descTitle?: string
  descSubtitle?: string
  beforeIcon?: ReactNode
  afterIcon?: ReactNode
  fileTypes?: string[]
  maxFileSize?: number
  minFileSize?: number
  errorMessage?: string
  onChange: (files: File[]) => void
}

const Dropzone: FC<DropzoneProps> = ({
  multiple = false,
  descTitle,
  descSubtitle,
  beforeIcon,
  afterIcon,
  fileTypes = [],
  maxFileSize,
  minFileSize,
  errorMessage,
  onChange,
}) => {
  const dropzoneRef = useRef<HTMLDivElement>(null)
  const [errMsg, setErrMsg] = useState(errorMessage || '')

  const validateFile = (file) => {
    if (fileTypes.indexOf(file.type) === -1) return false
    if (minFileSize && file.size < minFileSize) return false
    if (maxFileSize && file.size > maxFileSize) return false
    return true
  }

  const dragEnter = (e) => {
    dropzoneRef?.current?.classList?.add('dragOver')
    dropzoneRef?.current?.classList?.remove('invalid')
    e.preventDefault()
  }

  const dragOver = (e) => {
    dropzoneRef?.current?.classList?.add('dragOver')
    dropzoneRef?.current?.classList?.remove('invalid')
    e.preventDefault()
  }

  const dragLeave = (e) => {
    dropzoneRef?.current?.classList?.remove('dragOver')
    e.preventDefault()
  }

  const fileDrop = (e) => {
    e.preventDefault()
    dropzoneRef?.current?.classList?.remove('dragOver')
    const files = e.dataTransfer.files
    let error = false
    const permittedFiles: File[] = []
    const notPermittedFiles: File[] = []
    for (const file of files) {
      if (!validateFile(file)) {
        error = true
        notPermittedFiles.push(file)
      } else {
        permittedFiles.push(file)
      }
    }
    if (error) {
      setErrMsg(
        errorMessage ||
          `${
            notPermittedFiles?.length > 1 &&
            files?.length === notPermittedFiles?.length
              ? 'These files are not permitted!'
              : notPermittedFiles?.length > 1 &&
                files?.length !== notPermittedFiles?.length
              ? 'Some file is not permitted!'
              : notPermittedFiles?.length === 1 &&
                files?.length === notPermittedFiles?.length
              ? 'This file is not permitted!'
              : 'One file is not permitted!'
          } `
      )
      dropzoneRef?.current?.classList?.add('invalid')
    } else {
      dropzoneRef?.current?.classList?.remove('invalid')
    }
    if (permittedFiles?.length > 0) {
      if (multiple) {
        onChange(permittedFiles)
      } else {
        onChange([permittedFiles?.[0]])
      }
    }
  }
  return (
    <div
      className="dropzone"
      onDragEnter={dragEnter}
      onDragOver={dragOver}
      onDragLeave={dragLeave}
      onDrop={fileDrop}
      ref={dropzoneRef}
    >
      <div className="dropzoneOverlay">
        <div>
          {descTitle || 'Drag & drop files here'}
          {afterIcon &&
            dropzoneRef?.current?.classList?.contains('dragOver') &&
            afterIcon}
          {beforeIcon &&
            !dropzoneRef?.current?.classList?.contains('dragOver') &&
            beforeIcon}
          {!afterIcon && !beforeIcon && <CloudUploadOutlined />}
        </div>
        {descSubtitle && <div>{descSubtitle}</div>}
        {dropzoneRef?.current?.classList?.contains('invalid') && (
          <div className="hasError">{errMsg}</div>
        )}
      </div>
    </div>
  )
}
export interface CamUploaderProps {
  visible: boolean
  onClose: () => void
  showCamera?: boolean
  uploadingImages: UploadingImageProps[]
  setUploadingImages: (images: UploadingImageProps[]) => void
}

export const CamUploaderModal: FC<CamUploaderProps> = ({
  visible,
  onClose,
  showCamera = false,
  uploadingImages = [],
  setUploadingImages,
}) => {
  const inputFileRef = useRef<HTMLInputElement>(null)
  const isMobile = useMedia('(max-width: 767px)', false)
  const [addedFiles, setAddedFiles] = useState<UploadingImageProps[]>([])

  const captureImage = () => {
    const elem = document.querySelector('#outer-circle') as HTMLElement
    elem?.click()
  }

  const chooseFile = () => {
    if (inputFileRef?.current) inputFileRef?.current?.click()
  }

  useEffect(() => {
    if (uploadingImages?.length > 0 && addedFiles?.length <= 0) {
      setAddedFiles(uploadingImages)
    }
  }, [addedFiles, uploadingImages])

  const handleTakePhoto = (dataUri) => {
    const cAddedFiles = [...addedFiles]
    const file = dataURLtoFile(dataUri, `${makeId(12)}.jpg`)
    const newFile: UploadingImageProps = {
      id: makeId(20),
      preview: URL.createObjectURL(file),
      file: file,
      size: file?.size,
    }
    cAddedFiles.push(newFile)
    setAddedFiles(cAddedFiles)
  }

  const handleAddFiles = (files: File[]) => {
    if (files?.length > 0) {
      const cFiles: UploadingImageProps[] = files.map((file) => {
        return {
          id: makeId(12),
          preview: URL.createObjectURL(file),
          file,
          size: file?.size,
        }
      })
      const cAddedFiles = [...addedFiles, ...cFiles]
      setAddedFiles(cAddedFiles)
    }
  }

  const onModalClose = () => {
    onClose?.()
    setUploadingImages(addedFiles)
  }

  return (
    <Modal
      visible={visible}
      onCancel={onModalClose}
      width="980px"
      className={styles.uppyModal}
      closable={false}
      footer={false}
    >
      <div className={styles.uppyModalHeader}>
        {isMobile && (
          <span>
            <LeftOutlined onClick={onModalClose} />
          </span>
        )}
        <div className={styles.title}>
          <span>
            <ImagesIcon />
          </span>
          <span>Take a photo</span>
        </div>
        {!isMobile && (
          <div>
            <CloseOutlined onClick={onModalClose} />{' '}
          </div>
        )}
      </div>
      <div className={classNames(styles.uppyModalBody)}>
        {!showCamera && (
          <Dropzone
            multiple
            fileTypes={validTypes}
            descSubtitle="Only Images are acceptable"
            onChange={handleAddFiles}
          />
        )}
        {showCamera && (
          <Camera
            isImageMirror
            isMaxResolution
            idealFacingMode={
              isMobile ? FACING_MODES.ENVIRONMENT : FACING_MODES.USER
            }
            imageType={IMAGE_TYPES.JPG}
            sizeFactor={1}
            onTakePhoto={(dataUri) => {
              handleTakePhoto(dataUri)
            }}
          />
        )}
        <div className={styles.addedImagesDiv}>
          <div className={styles.addedImagesDivInner}>
            {addedFiles?.length > 0 && (
              <div className={styles.addedImagesFixer}>
                {addedFiles?.map((el, index) => (
                  <ImageThumbnail
                    data={el}
                    key={el?.id}
                    isUploadStarted={
                      addedFiles?.find((e) => e?.id === el?.id)
                        ?.isUploadStarted || false
                    }
                    isUploadCompleted={
                      addedFiles?.find((e) => e?.id === el?.id)
                        ?.isUploadCompleted || false
                    }
                    uploadPercentage={
                      addedFiles?.find((e) => e?.id === el?.id)
                        ?.uploadPercentage || 0
                    }
                    setUploadStarted={(id: string) => {
                      const cAddedFiles = [...addedFiles]
                      const idx = cAddedFiles?.findIndex((el) => el?.id === id)
                      if (idx !== -1) {
                        const cFile = cAddedFiles[idx]
                        cFile.isUploadStarted = true
                        cAddedFiles.splice(idx, 1, cFile)
                        setAddedFiles(cAddedFiles)
                      }
                    }}
                    setUploadCompleted={(id: string) => {
                      const cAddedFiles = [...addedFiles]
                      const idx = cAddedFiles?.findIndex((el) => el?.id === id)
                      if (idx !== -1) {
                        const cFile = cAddedFiles[idx]
                        cFile.isUploadCompleted = true
                        cAddedFiles.splice(idx, 1, cFile)
                        setAddedFiles(cAddedFiles)
                      }
                    }}
                    setUploadPercentage={(id: string, percent: number) => {
                      const cAddedFiles = [...addedFiles]
                      const idx = cAddedFiles?.findIndex((el) => el?.id === id)
                      if (idx !== -1) {
                        const cFile = cAddedFiles[idx]
                        cFile.uploadPercentage = percent
                        cAddedFiles.splice(idx, 1, cFile)
                        setAddedFiles(cAddedFiles)
                      }
                    }}
                    removeFile={(id) => {
                      const cAddedFiles = [...addedFiles]
                      const idx = cAddedFiles?.findIndex((el) => el?.id === id)
                      if (idx !== -1) {
                        cAddedFiles.splice(idx, 1)
                        setAddedFiles(cAddedFiles)
                        setUploadingImages(cAddedFiles)
                      }
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className={styles.uppyModalFooter}>
        <div>
          {addedFiles?.length || 0} photo{addedFiles?.length > 0 && 's'}
        </div>
        <div>
          {showCamera && (
            <CameraCircleFilled
              className={styles.camIcon}
              onClick={captureImage}
            />
          )}
          {!showCamera && (
            <PhotoCircleFilled
              className={styles.photoIcon}
              onClick={chooseFile}
            />
          )}
        </div>
        <div>
          <Button type="default" ghost>
            Done
          </Button>
        </div>
      </div>
      <input
        ref={inputFileRef}
        type="file"
        name="File"
        multiple
        accept={validTypes?.join(', ')}
        className={styles.fileInput}
        onChange={(e) => {
          const cFiles = (e.target.files as unknown) as File[]
          handleAddFiles([...cFiles])
        }}
      />
    </Modal>
  )
}

export default CamUploaderModal
