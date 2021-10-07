import React, { FC, useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { BasicModal as UppyModal, Button } from '@pabau/ui'
import { CloseOutlined, LeftOutlined } from '@ant-design/icons'
import { Progress } from 'antd'
import { useMedia } from 'react-use'
import Uppy from '@uppy/core'
import Webcam from '@uppy/webcam'
import ThumbnailGenerator from '@uppy/thumbnail-generator'
import { Dashboard } from '@uppy/react'
import { ReactComponent as ImagesIcon } from '../../assets//images/image-viewer/image-gallery.svg'
import { ReactComponent as CameraCircleFilled } from '../../assets//images/image-viewer/camera-circle-filled.svg'
import { ReactComponent as PhotoCircleFilled } from '../../assets//images/image-viewer/photo-circle-filled.svg'
import styles from './UppyUploaderModal.module.less'
import '@uppy/core/dist/style.css'
import '@uppy/dashboard/dist/style.css'
import '@uppy/webcam/dist/style.css'
import classNames from 'classnames'

let uppy: Uppy
export interface UploadingImageProps {
  id: string | number
  preview: string
  file?: File
  size?: number
}

export interface UppyUploaderProps {
  visible: boolean
  onClose: () => void
  isCamera?: boolean
  uploadingImages?: UploadingImageProps[]
  setUploadingImages?: (images: UploadingImageProps[]) => void
}

const ImageThumbnail = ({ data }: { data: UploadingImageProps }) => {
  const api = axios.create({
    baseURL: 'https://cdn.pabau.com/v2/api/contact/',
    headers: {
      Authorization: `Bearer ${localStorage?.getItem('token')}`,
    },
  })

  const [thumbnail, setThumbnail] = useState<UploadingImageProps>()
  const [uploadedPath, setUploadedPath] = useState<string>('')
  const [uploadingPercentage, setUploadingPercentage] = useState<number>(0)
  const [isUploadStarted, setIsUploadStarted] = useState<boolean>(false)
  const [isUploadCompleted, setIsUploadCompleted] = useState<boolean>(false)

  useEffect(() => {
    if (!thumbnail) {
      const upload = async (fileData) => {
        setIsUploadStarted(true)

        const config = {
          onUploadProgress: function (progressEvent) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            )
            setUploadingPercentage(percentCompleted)
            console.log(fileData?.id, ':', percentCompleted)
          },
        }

        const data = new FormData()
        data.append('File', fileData?.file)

        await api
          .post('upload-photo', data, config)
          .then((res) => {
            setIsUploadCompleted(true)
            console.log('RES:', res)
          })
          .catch((error) => console.log(error?.message))
      }
      setThumbnail(data)
      upload?.(data)
    }
  }, [api, data, thumbnail])

  return (
    <div
      key={thumbnail?.id}
      style={{ backgroundImage: `url(${thumbnail?.preview})` }}
    >
      {isUploadStarted && (
        <div className={styles.imgLoading}>
          <Progress
            type="circle"
            percent={uploadingPercentage}
            showInfo={false}
            strokeColor="#65CD98"
            trailColor="#9292A3"
            strokeWidth={10}
            width={25}
          />
        </div>
      )}
      {isUploadCompleted && (
        <Button
          type="default"
          ghost
          size="small"
          className={styles.deleteImageIcon}
        >
          <CloseOutlined />
        </Button>
      )}
    </div>
  )
}

export const UppyUploaderModal: FC<UppyUploaderProps> = ({
  visible,
  onClose,
  isCamera = true,
  uploadingImages = null,
  setUploadingImages,
}) => {
  const modalBodyRef = useRef<HTMLDivElement>(null)
  const isMobile = useMedia('(max-width: 767px)', false)
  const [isCamVisible, setIsCamVisible] = useState(false)
  const [addedFiles, setAddedFiles] = useState<UploadingImageProps[]>([])

  const captureImage = () => {
    const elem = document.querySelector(
      '.uppy-Webcam-button--picture'
    ) as HTMLElement
    elem?.click()
  }

  const uppBtnsClick = (isCamera: boolean, isFile = true) => {
    if (isCamera) {
      setIsCamVisible(false)
      const elem = document.querySelector(
        '[data-uppy-acquirer-id="Webcam"] > button'
      ) as HTMLElement
      if (elem) {
        elem?.click()
      } else {
        setTimeout(() => {
          const elem = document.querySelector(
            '[data-uppy-acquirer-id="Webcam"] > button'
          ) as HTMLElement

          elem?.click()
        }, 100)
      }
    }
    if (!isCamera && isFile) {
      setIsCamVisible(true)
      const elem = document.querySelector(
        '[data-uppy-acquirer-id="MyDevice"] > button'
      ) as HTMLElement
      if (elem) {
        elem?.click()
      } else {
        setTimeout(() => {
          const elem = document.querySelector(
            '[data-uppy-acquirer-id="MyDevice"] > button'
          ) as HTMLElement
          elem?.click()
        }, 100)
      }
    }
  }

  const closeUppy = () => {
    const elem = document.querySelector(
      '.uppy-DashboardContent-back'
    ) as HTMLElement
    elem?.click()
  }

  useEffect(() => {
    uppy = new Uppy({
      id: 'uploader',
      autoProceed: false,
      allowMultipleUploads: true,
      debug: false,
      restrictions: {
        maxFileSize: null,
        minNumberOfFiles: 1,
        maxNumberOfFiles: 8,
        allowedFileTypes: ['image/*', '.jpg', '.jpeg', '.png', '.gif'],
      },
    })
      .use(ThumbnailGenerator, {
        id: 'ThumbnailGenerator',
        thumbnailType: 'image/jpeg',
        thumbnailWidth: modalBodyRef?.current?.clientWidth || 980,
        thumbnailHeight: modalBodyRef?.current?.clientHeight || 550,
        waitForThumbnailsBeforeUpload: false,
      })
      .use(Webcam)
      .use(Webcam, {
        countdown: true,
        mirror: true,
        modes: ['picture'],
        id: 'webcam',
      })
  }, [])

  useEffect(() => {
    uppy?.on('thumbnail:generated', (file, preview) => {
      if (isCamera) {
        uppBtnsClick?.(isCamera)
      }
      if (!isCamera) {
        setIsCamVisible(false)
      }
      const cAddedFiles = [...addedFiles]
      if (!cAddedFiles?.find((el) => el?.id === file?.id)) {
        const newImageData: UploadingImageProps = {
          id: file?.id,
          preview: preview,
          size: file?.size,
          file: file?.data as File,
        }
        const reader = new FileReader()
        reader.readAsDataURL(file?.data)
        reader.onloadend = function () {
          const base64data = reader.result
          if (base64data && isCamera)
            newImageData.file = new File([file?.data], file?.name, {
              type: file.type,
            })
        }
        console.log('FILE:', newImageData)
        cAddedFiles.push(newImageData)
        setAddedFiles(cAddedFiles)
        setUploadingImages?.(cAddedFiles)
      }
    })
  }, [addedFiles, isCamera, setUploadingImages])

  useEffect(() => {
    if (visible) {
      uppBtnsClick?.(isCamera)
    }
  }, [isCamera, visible])

  useEffect(() => {
    if (uploadingImages) setAddedFiles(uploadingImages)
  }, [uploadingImages])

  const onCloseModal = () => {
    onClose?.()
    closeUppy?.()
  }

  return (
    <UppyModal
      visible={visible}
      onCancel={onCloseModal}
      width="980px"
      className={styles.uppyModal}
      closable={false}
      footer={false}
    >
      <div className={styles.uppyModalHeader}>
        {isMobile && (
          <span>
            <LeftOutlined onClick={onCloseModal} />
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
            <CloseOutlined onClick={onCloseModal} />{' '}
          </div>
        )}
      </div>
      <div
        className={classNames(
          styles.uppyModalBody,
          isCamera && styles.allowCamera,
          isCamera && isCamVisible && styles.cameraDiv,
          !isCamera && isCamVisible && styles.uploadDiv
        )}
      >
        <Dashboard
          uppy={uppy}
          width="100%"
          target={'body'}
          hideRetryButton
          hideUploadButton
          hidePauseResumeButton
          showSelectedFiles={false}
          theme="light"
          plugins={['Webcam']}
        />
        {!isCamVisible && (
          <div ref={modalBodyRef} className={styles.addedImagesDiv}>
            <div className={styles.addedImagesDivInner}>
              {addedFiles?.length > 0 && (
                <div className={styles.addedImagesFixer}>
                  {addedFiles?.map((el) => (
                    <ImageThumbnail data={el} key={el?.id} />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <div className={styles.uppyModalFooter}>
        <div>
          {addedFiles?.length || 0} photo{addedFiles?.length > 0 && 's'}
        </div>
        <div>
          {isCamera && (
            <CameraCircleFilled
              className={styles.camIcon}
              onClick={captureImage}
            />
          )}
          {!isCamera && (
            <PhotoCircleFilled
              className={styles.photoIcon}
              onClick={() =>
                uppBtnsClick(isCamera, addedFiles?.length > 0 ? false : true)
              }
            />
          )}
        </div>
        <div>
          <Button type="default" ghost>
            Done
          </Button>
        </div>
      </div>
    </UppyModal>
  )
}

export default UppyUploaderModal
