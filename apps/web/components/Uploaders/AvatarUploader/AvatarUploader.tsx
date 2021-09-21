import React, { FC, useState, useRef, useEffect } from 'react'
import Cropper, { ReactCropperElement } from 'react-cropper'
import { message } from 'antd'
import { BasicModal, Avatar, Button } from '@pabau/ui'
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons'
import ClassNames from 'classnames'
import styles from './AvatarUploader.module.less'
import { useTranslationI18 } from '../../../hooks/useTranslationI18'
import postData, { ImgBlock } from '../UploadHelpers/UploadHelpers'
import { cdnURL } from '../../../baseUrl'
import crypto from 'crypto'

export interface AvatarUploaderProps {
  visible: boolean
  title: string
  onCancel?: () => void
  imageURL: string
  shape?: string
  width: number
  height: number
  section: string
  type: string
  successHandler?: (imageData: ImgBlock) => void
}

export interface BlobType extends Blob {
  name: string
}

export const AvatarUploader: FC<AvatarUploaderProps> = ({
  visible,
  title,
  onCancel,
  imageURL,
  shape,
  width,
  height,
  section,
  type,
  successHandler,
}) => {
  const { t } = useTranslationI18()

  const [image, setImage] = useState<string>()
  const [croppedImage, setCroppedImage] = useState<string>(imageURL)
  const fileInputRef = useRef<HTMLInputElement>(null)

  let zoomTo = 0

  // const [disabled, setDisabled] = useState(true)
  const [loading, setLoading] = useState(false)

  const cropperRef = useRef<ReactCropperElement>()

  useEffect(() => {
    if (imageURL) {
      setImage(imageURL)
      setCroppedImage(imageURL)
    }
  }, [imageURL])

  const selectFile = () => {
    if (fileInputRef?.current) {
      fileInputRef.current.click()
    }
  }

  const handleImageChange = async (e) => {
    setImage(URL.createObjectURL(e.target.files[0]))
    // setDisabled(false)
    e.target.value = ''
  }

  const handleDelete = () => {
    setImage('')
    setCroppedImage('')
  }

  const handleClose = () => {
    setImage(image)
    setCroppedImage(image)
    onCancel?.()
  }

  const initReady = () => {
    const cropper: Cropper = cropperRef?.current?.cropper
    const imageData = cropper.getImageData()
    const zoomToWidth = imageData.width / imageData.naturalWidth
    const zoomToHeight = imageData.naturalHeight / imageData.naturalWidth

    if (imageData.naturalHeight > imageData.naturalWidth) {
      zoomTo = zoomToHeight - imageData.aspectRatio
    } else {
      zoomTo = zoomToWidth
    }

    cropper.zoom(zoomTo)
  }

  const handleCreate = async () => {
    setLoading(true)
    const cropper: Cropper = cropperRef?.current?.cropper

    postData(
      cdnURL + '/api/upload.php',
      {
        mode: 'upload-cropped-photo',
        imageData: await cropper
          .getCroppedCanvas({ width: width, height: height })
          .toDataURL(),
        section: section,
        type: type,
      },
      null
    ).then((data) => {
      if (data.error) {
        message.error(t(data.code))
        setLoading(false)
        return
      } else {
        const keyHash = crypto.createHash('md5').update(data.path).digest('hex')
        const newImg: ImgBlock = {
          key: keyHash,
          path: data.path,
          url: cdnURL + data.path,
          tags: [''],
        }

        handleDelete()
        setLoading(false)
        // setDisabled(true)
        successHandler(newImg)
        onCancel?.()
      }
    })
  }

  return (
    <BasicModal
      className={styles.modalPreview}
      visible={visible}
      title={title}
      footer={false}
      onCancel={handleClose}
    >
      <div className={styles.imageWrapper}>
        <div className={styles.cropWrapper}>
          {image && (
            <Cropper
              ready={initReady}
              ref={cropperRef}
              className={
                shape === 'rectangle'
                  ? ClassNames('cropper-wrapper', 'cropper-rectangle')
                  : ClassNames('cropper-wrapper', 'cropper-circle')
              }
              initialAspectRatio={width / height}
              aspectRatio={width / height}
              preview=".cropperPreview"
              src={image}
              viewMode={2}
              dragMode={'none'}
              guides={false}
              minCropBoxHeight={100}
              minCropBoxWidth={100}
              background={true}
              movable={true}
              autoCropArea={0.75}
              checkOrientation={false}
            />
          )}
        </div>
        <div className={styles.previewWrap}>
          <p>Preview</p>
          {croppedImage && (
            <div className={styles.avatarMap}>
              <Avatar
                className={
                  shape === 'rectangle'
                    ? ClassNames(
                        styles.imgRect,
                        styles.rectView,
                        'cropperPreview'
                      )
                    : ClassNames(styles.img, 'cropperPreview')
                }
                src={croppedImage}
              />
              <Avatar
                className={
                  shape === 'rectangle'
                    ? ClassNames(
                        styles.imgRect2,
                        styles.rectView,
                        'cropperPreview'
                      )
                    : ClassNames(styles.img2, 'cropperPreview')
                }
                src={croppedImage}
              />
              <Avatar
                className={
                  shape === 'rectangle'
                    ? ClassNames(
                        styles.imgRect3,
                        styles.rectView,
                        'cropperPreview'
                      )
                    : ClassNames(styles.img3, 'cropperPreview')
                }
                src={croppedImage}
              />
            </div>
          )}
        </div>
      </div>
      <div className={styles.uploadImg}>
        <Button onClick={selectFile}>
          <input
            type={'file'}
            style={{ display: 'none' }}
            accept={'.jpg, .jpeg, .png'}
            ref={fileInputRef}
            onChange={handleImageChange}
          />
          <PlusOutlined />
          Upload file
        </Button>
        <Button onClick={handleDelete}>
          <DeleteOutlined />
        </Button>
      </div>
      <div className={styles.btnPreviewWrapper}>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          type={'primary'}
          // disabled={disabled}
          loading={loading}
          onClick={handleCreate}
        >
          Create
        </Button>
      </div>
    </BasicModal>
  )
}

export default AvatarUploader
