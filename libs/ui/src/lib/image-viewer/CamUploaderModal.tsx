import React, { FC, useEffect, useState, useRef, ReactNode } from 'react'
import { BasicModal as Modal, Button } from '@pabau/ui'
import {
  CloseOutlined,
  LeftOutlined,
  CloudUploadOutlined,
  LoadingOutlined,
  CloseCircleFilled,
  PlayCircleFilled,
} from '@ant-design/icons'
import { CancelTokenSource } from 'axios'
import { Progress, Spin, Tooltip } from 'antd'
import { isMobile as mobile } from 'react-device-detect'
import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo'
import { ReactComponent as ImagesIcon } from '../../assets//images/image-viewer/image-gallery.svg'
import { ReactComponent as CameraCircleFilled } from '../../assets/images/image-viewer/camera-circle-filled.svg'
import { ReactComponent as PhotoCircleFilled } from '../../assets/images/image-viewer/photo-circle-filled.svg'
import { ReactComponent as CameraFlip } from '../../assets/images/camra-flip.svg'
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
    '012345678901234567890123456789012345678901234567890123456789'
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return Number(result)
}
export interface UploadingImageProps {
  id: number
  albumId: number
  preview: string
  file?: File
  size?: number
  uploadedPath?: string
  isUploadStarted?: boolean
  isUploadCompleted?: boolean
  uploadPercentage?: number
  cancelToken?: CancelTokenSource
  loading?: boolean
  isFailed?: boolean
  isCancelled?: boolean
}

interface ImageThumbnailProps {
  data: UploadingImageProps
  uploadImage?: (image: UploadingImageProps) => void
  cancelUpload?: (image: UploadingImageProps) => void
  removeFile?: (id: number) => void
}

const ImageThumbnail: FC<ImageThumbnailProps> = ({
  data,
  uploadImage,
  cancelUpload,
  removeFile,
}) => {
  const [showCancelIcon, setShowCancelIcon] = useState(false)

  useEffect(() => {
    if (!data?.isUploadStarted && !data?.isUploadCompleted) {
      uploadImage?.(data)
    }
  }, [data, uploadImage])

  useEffect(() => {
    setShowCancelIcon(() => false)
  }, [data?.isFailed])

  return (
    <div key={data?.id} style={{ backgroundImage: `url(${data?.preview})` }}>
      {data?.isUploadStarted && !data?.loading && !showCancelIcon && (
        <div className={styles.imgLoading}>
          <span
            className={styles.progressIndicator}
            onMouseEnter={() => {
              if (!data?.isUploadCompleted) setShowCancelIcon(() => true)
            }}
          >
            <Tooltip
              placement="top"
              className="tooltip-custom"
              title={
                data?.isFailed
                  ? 'Failed!'
                  : (data?.uploadPercentage || 0) < 100
                  ? `${data?.uploadPercentage}% completed`
                  : 'Uploaded!'
              }
            >
              <Progress
                type="circle"
                percent={!data?.loading ? data?.uploadPercentage || 0 : 0}
                showInfo={
                  data?.isFailed
                    ? true
                    : data?.isUploadCompleted && !data.loading
                    ? true
                    : false
                }
                strokeColor={data?.isFailed ? '#f5222d' : '#65CD98'}
                trailColor="#9292A3"
                strokeWidth={10}
                width={25}
                status={
                  data?.isFailed
                    ? 'exception'
                    : data?.isUploadCompleted && !data.loading
                    ? 'success'
                    : 'normal'
                }
              />
            </Tooltip>
          </span>
        </div>
      )}
      {data?.isUploadCompleted && !data?.loading && (
        <Tooltip placement="top" title="Delete">
          <Button
            type="default"
            ghost
            size="small"
            className={styles.deleteImageIcon}
            onClick={() => {
              if (data?.uploadedPath) removeFile?.(data.id)
            }}
          >
            <CloseOutlined />
          </Button>
        </Tooltip>
      )}
      {data?.loading && (
        <div className={styles.imgLoading}>
          <Tooltip placement="top" title="Uploading...">
            <Spin
              spinning
              className={styles.spinner}
              indicator={<LoadingOutlined />}
            />
          </Tooltip>
        </div>
      )}
      {showCancelIcon && data?.isUploadStarted && !data?.isUploadCompleted && (
        <div className={styles.imgLoading}>
          <span
            className={styles.cancelIcon}
            onMouseLeave={() => setShowCancelIcon(() => false)}
            onClick={() => {
              if (!data?.isFailed) cancelUpload?.(data)
              if (data?.isFailed) uploadImage?.(data)
            }}
          >
            {!data?.isFailed && <CloseCircleFilled />}
            {data?.isFailed && <PlayCircleFilled />}
          </span>
        </div>
      )}
    </div>
  )
}

export interface DropzoneProps {
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

export const Dropzone: FC<DropzoneProps> = ({
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
    </div>
  )
}
export interface CamUploaderProps {
  visible: boolean
  onClose: (done?: boolean) => void
  showCamera?: boolean
  uploadingImages: UploadingImageProps[]
  setUploadingImages: (images: UploadingImageProps[]) => void
  uploadImage?: (image: UploadingImageProps) => void
  removeImage?: (imageId: number) => void
  onCancelUpload?: (image: UploadingImageProps) => void
  albumId?: number
}

export const CamUploaderModal: FC<CamUploaderProps> = ({
  visible,
  onClose,
  showCamera = false,
  uploadingImages = [],
  setUploadingImages,
  uploadImage,
  removeImage,
  onCancelUpload,
  albumId = 0,
}) => {
  const facingModes = [FACING_MODES.ENVIRONMENT, FACING_MODES.USER]
  const inputFileRef = useRef<HTMLInputElement>(null)
  const [facingMode, setFacingMode] = useState(facingModes[1])

  const captureImage = () => {
    const elem = document.querySelector('#outer-circle') as HTMLElement
    elem?.click()
  }

  const handleTakePhoto = (dataUri) => {
    const cAddedFiles = [...uploadingImages]
    const file = dataURLtoFile(dataUri, `${makeId(12)}.jpg`)
    const newFile: UploadingImageProps = {
      id: makeId(20),
      preview: URL.createObjectURL(file),
      file: file,
      size: file?.size,
      albumId: albumId || 0,
    }
    cAddedFiles.push(newFile)
    setUploadingImages(cAddedFiles)
    scrollToEnd()
  }

  const handleAddFiles = (files: File[]) => {
    if (files?.length > 0) {
      const cFiles: UploadingImageProps[] = files.map((file) => {
        return {
          id: makeId(12),
          preview: URL.createObjectURL(file),
          file,
          size: file?.size,
          albumId: albumId || 0,
        }
      })
      const cAddedFiles = [...uploadingImages, ...cFiles]
      setUploadingImages(cAddedFiles)
      scrollToEnd()
    }
  }

  const scrollToEnd = () => {
    setTimeout(() => {
      const elem = document.querySelector('#addedImagesFixer') as HTMLElement
      if (elem) elem.scrollLeft = elem?.scrollWidth || 0
    }, 100)
  }

  return (
    <div>
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
      <Modal
        visible={visible}
        onCancel={() => onClose?.(false)}
        width={mobile ? '100vw' : '980px'}
        className={classNames(styles.uppyModal, mobile && styles.fullScreen)}
        closable={false}
        footer={false}
      >
        <div className={styles.uppyModalHeader}>
          {mobile && (
            <span>
              <LeftOutlined onClick={() => onClose?.(false)} />
            </span>
          )}
          <div className={styles.title}>
            <span>
              <ImagesIcon />
            </span>
            <span>Take a photo</span>
          </div>
          {!mobile && (
            <div>
              <CloseOutlined onClick={() => onClose?.(false)} />{' '}
            </div>
          )}
          {mobile && showCamera && (
            <div className={styles.cameraFlip}>
              <CameraFlip
                onClick={() => {
                  if (facingMode === facingModes[0])
                    setFacingMode(facingModes[1])
                  if (facingMode === facingModes[1])
                    setFacingMode(facingModes[0])
                }}
              />
            </div>
          )}
        </div>
        <div
          className={classNames(
            styles.uppyModalBody,
            showCamera && styles.blackbg
          )}
        >
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
              isImageMirror={facingMode === facingModes[0] ? false : true}
              idealFacingMode={facingMode}
              imageType={IMAGE_TYPES.JPG}
              sizeFactor={1}
              isMaxResolution
              onTakePhoto={(dataUri) => {
                handleTakePhoto(dataUri)
              }}
            />
          )}
          {uploadingImages && uploadingImages?.length > 0 && (
            <div className={styles.addedImagesDiv} id="addedImagesFixer">
              {uploadingImages?.map((el) => (
                <ImageThumbnail
                  data={el}
                  key={el?.id}
                  uploadImage={uploadImage}
                  removeFile={removeImage}
                  cancelUpload={onCancelUpload}
                />
              ))}
            </div>
          )}
        </div>
        <div className={styles.uppyModalFooter}>
          <div>
            <span>
              {uploadingImages?.length || 0} photo
              {uploadingImages?.length === 0 ||
                (uploadingImages?.length > 1 && 's')}
            </span>
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
                onClick={() => inputFileRef?.current?.click()}
              />
            )}
          </div>
          <div>
            <Button type="default" ghost onClick={() => onClose?.(true)}>
              Done
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default CamUploaderModal
