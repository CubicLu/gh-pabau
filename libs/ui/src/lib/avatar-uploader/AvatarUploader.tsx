import React, {
  FC,
  useEffect,
  useState,
  useRef,
  useCallback,
  ComponentPropsWithoutRef,
} from 'react'
import ReactCrop from 'react-image-crop'
import { BasicModal } from '../modal/BasicModal'
import Avatar from '../avatar/Avatar'
import Button from '../button/Button'
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons'
import ClassNames from 'classnames'
import styles from './AvatarUploader.module.less'

export interface AvatarUploaderProps {
  visible: boolean
  title: string
  onCancel?: () => void
  onCreate?: (image: string) => void
  imageURL: string
  shape?: string
}

export interface BlobType extends Blob {
  name: string
}

export const AvatarUploader: FC<AvatarUploaderProps> = ({
  visible,
  title,
  onCancel,
  onCreate,
  imageURL,
  shape,
}) => {
  const imageRef = useRef(null)
  const [image, setImage] = useState(imageURL)
  const [croppedImage, setCroppedImage] = useState(image)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [crop, setCrop] = useState({
    unit: 'px',
    x: 50,
    y: 25,
    width: 221,
    height: 221,
  } as ComponentPropsWithoutRef<typeof ReactCrop>['crop'])

  const onImageLoaded = useCallback((img) => {
    imageRef.current = img
  }, [])

  const getCroppedImg = (image, crop, fileName): Promise<string> => {
    const canvas = document.createElement('canvas')
    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height
    canvas.width = crop.width
    canvas.height = crop.height
    const ctx = canvas.getContext('2d')

    ctx?.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    )

    return new Promise((resolve, reject) => {
      try {
        canvas?.toBlob((blob: BlobType) => {
          if (!blob) {
            reject('Canvas is empty')
            return
          }
          blob.name = fileName
          resolve(URL.createObjectURL(blob))
        }, 'image/jpeg')
      } catch {
        setCroppedImage('')
        setImage('')
      }
    })
  }

  const handleComplete = async (crop) => {
    if (imageRef && crop.width && crop.height) {
      const image: string = await getCroppedImg(
        imageRef.current,
        crop,
        `${new Date()}-image`
      )
      setCroppedImage(image)
    }
  }

  useEffect(() => {
    setImage(imageURL)
    setCroppedImage(imageURL)
  }, [imageURL])

  const selectFile = () => {
    if (fileInputRef?.current) {
      fileInputRef.current.click()
    }
  }

  const handleImageChange = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]))
    e.target.value = ''
  }

  const handleDelete = () => {
    setImage('')
    setCroppedImage('')
  }

  const handleClose = () => {
    setImage(imageURL)
    setCroppedImage(croppedImage)
    onCancel?.()
  }

  const handleCreate = () => {
    onCreate?.(croppedImage)
    onCancel?.()
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
            <ReactCrop
              src={image}
              crop={crop}
              circularCrop={shape !== 'rectangle'}
              onImageLoaded={onImageLoaded}
              className={styles.customCrop}
              style={{ height: '100%', width: '100%' }}
              onChange={(newCrop) =>
                shape === 'rectangle'
                  ? setCrop({ ...newCrop, width: 230, height: 100 })
                  : setCrop({ ...newCrop, width: 221, height: 221 })
              }
              onComplete={(crop) => handleComplete(crop)}
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
                    ? ClassNames(styles.imgRect, styles.rectView)
                    : styles.img
                }
                src={croppedImage}
              />
              <Avatar
                className={
                  shape === 'rectangle'
                    ? ClassNames(styles.imgRect2, styles.rectView)
                    : styles.img2
                }
                src={croppedImage}
              />
              <Avatar
                className={
                  shape === 'rectangle'
                    ? ClassNames(styles.imgRect3, styles.rectView)
                    : styles.img3
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
        <Button type={'primary'} disabled={!image} onClick={handleCreate}>
          Create
        </Button>
      </div>
    </BasicModal>
  )
}

export default AvatarUploader
