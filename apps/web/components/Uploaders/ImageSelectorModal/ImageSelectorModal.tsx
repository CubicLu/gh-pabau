import React, { FC, useState, useEffect, useRef } from 'react'
import { Input, Row, Col, message } from 'antd'
import { cdnURL } from '../../../baseUrl'
import {
  PlusOutlined,
  CheckCircleFilled,
  PictureOutlined,
  LoadingOutlined,
} from '@ant-design/icons'
import { BasicModal } from '@pabau/ui'
import classNames from 'classnames'
import styles from './ImageSelectorModal.module.less'
import postData, { ImgBlock } from '../UploadHelpers/UploadHelpers'
import { useTranslationI18 } from '../../../hooks/useTranslationI18'
import crypto from 'crypto'

type Timeout = NodeJS.Timeout

export interface ImageSelectorModalProps {
  visible?: boolean
  onOk?: (image) => void
  onCancel: () => void
  title?: string
  modalWidth?: number
  initialSearch?: string
  attachButtonText?: string
  chooseButtonText?: string
  selectedImage?: string
  allowCustomImage?: boolean
  section: string
  type: string
  imgList?: ImgBlock[]
  successHandler?: (imageData) => void
}

export const ImageSelectorModal: FC<ImageSelectorModalProps> = (props) => {
  const {
    visible,
    onOk,
    onCancel,
    title,
    modalWidth,
    initialSearch = '',
    attachButtonText,
    chooseButtonText,
    selectedImage = '',
    allowCustomImage = true,
    section,
    type,
    imgList,
    successHandler,
  } = props

  const { t } = useTranslationI18()

  const [imageList, setImageList] = useState(imgList)
  const [search, setSearch] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const [selectedImg, setSelectedImg] = useState<ImgBlock | undefined>(
    undefined
  )

  const searchTimer = useRef<Timeout | null>(null)

  useEffect(() => setSearch(initialSearch), [initialSearch])

  useEffect(() => {
    setTimeout(() => imgList.map((image) => (new Image().src = image.url)), 500)
  }, [imgList])

  useEffect(() => {
    if (selectedImage) {
      const img = imgList.find((i) => i.url === selectedImage)
      !!img && setSelectedImg(img)
    }
  }, [imgList, selectedImage])

  const onSelect = () => {
    if (!selectedImg) return
    onOk?.(selectedImg)
  }

  const onSearch = (searchTerm = '') => {
    const terms = searchTerm.toLowerCase().split(' ')
    const list = imgList.filter(
      ({ tags }) =>
        tags.findIndex((t) => {
          return terms.findIndex((term) => t.toLowerCase().includes(term)) > -1
        }) > -1
    )
    setImageList(searchTerm ? list : list.slice(0, 50))
  }

  useEffect(() => {
    searchTimer.current && clearTimeout(searchTimer.current)
    searchTimer.current = setTimeout(() => {
      onSearch(search)
    }, 300)
  })

  const handleChange = async (e) => {
    setIsUploading(true)

    await postData(
      cdnURL + '/api/upload.php',
      {
        mode: 'upload-modal-photo',
        section: section,
        type: type,
      },
      e.target.files[0]
    ).then((data) => {
      if (data.error) {
        message.error(t(data.code))
        setIsUploading(false)
        return
      } else {
        message.success(t(data.code))
        const keyHash = crypto.createHash('md5').update(data.path).digest('hex')
        const newImg: ImgBlock = {
          key: keyHash,
          path: data.path,
          url: cdnURL + data.path,
          tags: [''],
        }
        imgList.unshift(newImg)
        setImageList(imgList)
        setSelectedImg(newImg)
        setIsUploading(false)
        successHandler(newImg)
      }
    })
  }

  return (
    <BasicModal
      visible={visible}
      footer
      onOk={onSelect}
      onCancel={onCancel}
      title={title || 'Assign an image'}
      modalWidth={modalWidth || 1000}
      isValidate
      newButtonText={attachButtonText || 'Attach'}
      newButtonDisable={!selectedImg}
      wrapClassName={styles.modalContainer}
    >
      <Input.Search
        defaultValue={initialSearch}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={styles.searchBar}
      />
      <div className={styles.listContainer} style={{ margin: '20px 0' }}>
        <Row gutter={[16, 16]}>
          {allowCustomImage && (
            <Col xs={{ span: 12 }} sm={{ span: 8 }} lg={{ span: 6 }}>
              <div className={styles.imgContainer}>
                {!isUploading ? (
                  <PictureOutlined style={{ fontSize: 28, color: '#9292A3' }} />
                ) : (
                  <LoadingOutlined style={{ fontSize: 28, color: '#9292A3' }} />
                )}

                <label htmlFor="file-upload" className={styles.chooseFileBtn}>
                  <PlusOutlined /> {chooseButtonText}
                </label>
                <input
                  id="file-upload"
                  type="file"
                  accept="image/png, image/jpeg"
                  style={{ height: 0, width: 0, visibility: 'hidden' }}
                  onChange={handleChange}
                />
              </div>
            </Col>
          )}
          {imageList.map((img) => (
            <Col
              xs={{ span: 12 }}
              sm={{ span: 8 }}
              lg={{ span: 6 }}
              key={img.key}
              onClick={() => setSelectedImg(img)}
            >
              <div
                className={classNames(
                  styles.imgContainer,
                  selectedImg?.key === img.key && styles.selectedImg
                )}
              >
                <img src={img.url} alt={''} className={styles.listImg} />
                {selectedImg?.key === img.key && (
                  <CheckCircleFilled className={styles.checked} />
                )}
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </BasicModal>
  )
}

export default ImageSelectorModal
