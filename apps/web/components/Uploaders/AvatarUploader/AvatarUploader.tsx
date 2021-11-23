import React, { FC, useState, useRef, useEffect } from 'react'
import Cropper, { ReactCropperElement } from 'react-cropper'
import { message, Tooltip } from 'antd'
import { BasicModal, Avatar, Button } from '@pabau/ui'
import {
  PlusOutlined,
  DeleteOutlined,
  VerticalAlignBottomOutlined,
  UserOutlined,
} from '@ant-design/icons'
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
  onDelete?: () => void
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
  onDelete,
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
    setCroppedImage(URL.createObjectURL(e.target.files[0]))
    // setDisabled(false)
    e.target.value = ''
  }

  const handleDelete = () => {
    setImage('')
    setCroppedImage('')
    onDelete?.()
    onCancel?.()
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
        <div
          className={ClassNames(
            styles.cropWrapper,
            !image && styles.cropEmptyWrap
          )}
        >
          {image ? (
            <div className={styles.uploadPhoto}>
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
                viewMode={1}
                dragMode={'none'}
                guides={false}
                minCropBoxHeight={100}
                minCropBoxWidth={100}
                background={true}
                movable={true}
                autoCropArea={0.75}
                checkOrientation={false}
              />
            </div>
          ) : (
            <div className={styles.uploadPhoto}>
              <VerticalAlignBottomOutlined />
              <span className={styles.uploadTitle}>
                {t('team.user.personal.details.avtar.upload.text')}
              </span>
            </div>
          )}
        </div>
        <div className={styles.previewWrap}>
          <p>{t('team.user.personal.details.avtar.Preview.title')}</p>
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
              icon={<UserOutlined />}
              size={80}
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
              icon={<UserOutlined />}
              size={56}
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
              icon={<UserOutlined />}
              size={32}
            />
          </div>
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
          {t('team.user.personal.details.avtar.upload.button')}
        </Button>
        <Tooltip title={t('team.user.personal.details.avtar.remove.button')}>
          <Button onClick={handleDelete}>
            <DeleteOutlined />
          </Button>
        </Tooltip>
      </div>
      <div className={styles.btnPreviewWrapper}>
        <Button onClick={handleClose}>
          {t('team.user.personal.details.avtar.cancel.button')}
        </Button>
        <Button
          type={'primary'}
          // disabled={disabled}
          loading={loading}
          onClick={handleCreate}
        >
          {t('team.user.personal.details.avtar.save.button')}
        </Button>
      </div>
    </BasicModal>
  )
}

export default AvatarUploader
