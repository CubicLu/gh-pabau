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
  loading?: boolean
  uploadStarted?: boolean
  uploadCompleted?: boolean
  percentage?: number
}

export interface UppyUploaderProps {
  visible: boolean
  onClose: () => void
  isCamera?: boolean
  uploadingImages?: UploadingImageProps[]
  setUploadingImages?: (images: UploadingImageProps[]) => void
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
  const [selectedImage, setSelectedImage] = useState<UploadingImageProps>()

  const captureImage = () => {
    const elem = document.querySelector(
      '.uppy-Webcam-button--picture'
    ) as HTMLElement
    elem?.click()
  }

  const uppBtnsClick = (isCamera: boolean, isFile = true) => {
    setIsCamVisible(true)
    if (isCamera) {
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
    setIsCamVisible(false)
    if (isCamera) {
      const elem = document.querySelector(
        '.uppy-DashboardContent-back'
      ) as HTMLElement
      elem?.click()
    }
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
    const upload = (fileData) => {
      const cFileData = { ...fileData }
      //   const cAddedFiles = [...addedFiles]
      //   const index = cAddedFiles?.findIndex(
      //     (el) => el?.id === cFileData?.id && el?.loading === false
      //   )
      //   if (index !== -1) {
      cFileData.loading = true
      cFileData.uploadStarted = true
      //   cAddedFiles?.splice(index, 1, cFileData)
      //   setAddedFiles(cAddedFiles)
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage
            .getItem('token')
            ?.replaceAll('"', '')}`,
        },
        onUploadProgress: function (progressEvent) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          )
          console.log(cFileData?.id, ':', percentCompleted)
        },
        mode: 'cors',
      }

      const data = new FormData()
      data.append('File', cFileData?.file)

      axios
        .post('https://cdn.pabau.com/v2/api/contact/upload-photo', data, config)
        .then((res) => console.log(res))
        .catch((error) => console.log(error?.message))
      //   }
    }

    uppy?.on('thumbnail:generated', (file, preview) => {
      uppBtnsClick?.(isCamera)
      const cAddedFiles = [...addedFiles]
      if (!cAddedFiles?.find((el) => el?.id === file?.id)) {
        const newImageData: UploadingImageProps = {
          id: file?.id,
          preview: preview,
          loading: false,
          percentage: 0,
          uploadCompleted: false,
          uploadStarted: false,
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
        // upload?.(newImageData)
        console.log('FILE:', newImageData)
        cAddedFiles.push(newImageData)
        setSelectedImage(newImageData)
        setAddedFiles(cAddedFiles)
        setUploadingImages?.(cAddedFiles)
        setIsCamVisible(false)
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
        {/* {!isCamVisible && ( */}
        <div
          ref={modalBodyRef}
          className={styles.addedImagesDiv}
          //   style={
          //     selectedImage
          //       ? { backgroundImage: `url(${selectedImage?.preview})` }
          //       : {}
          //   }
        >
          <div className={styles.addedImagesDivInner}>
            {addedFiles?.length > 0 && (
              <div className={styles.addedImagesFixer}>
                {addedFiles?.map((el) => (
                  <div
                    onClick={() => setSelectedImage(el)}
                    key={el?.id}
                    style={{ backgroundImage: `url(${el?.preview})` }}
                  >
                    {el?.loading && el?.uploadStarted && (
                      <div className={styles.imgLoading}>
                        <Progress
                          type="circle"
                          percent={el?.percentage}
                          showInfo={false}
                          strokeColor="#65CD98"
                          trailColor="#9292A3"
                          strokeWidth={10}
                          width={25}
                        />
                      </div>
                    )}
                    {el?.uploadCompleted && (
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
                ))}
              </div>
            )}
          </div>
        </div>
        {/* )} */}
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
          {!isCamera &&
            (isCamVisible && addedFiles?.length > 0 ? (
              <Button
                type="default"
                className={styles.closeCamBtn}
                onClick={() => closeUppy()}
              >
                <CloseOutlined />
              </Button>
            ) : (
              <PhotoCircleFilled
                className={styles.photoIcon}
                onClick={() =>
                  uppBtnsClick(isCamera, addedFiles?.length > 0 ? false : true)
                }
              />
            ))}
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
