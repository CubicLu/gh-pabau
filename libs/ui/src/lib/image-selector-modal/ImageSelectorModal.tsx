import React, { FC, useState, useEffect, useRef } from 'react'
import { Input, Row, Col } from 'antd'
import {
  PlusOutlined,
  CheckCircleFilled,
  PictureOutlined,
} from '@ant-design/icons'
import { BasicModal } from '@pabau/ui'
import classNames from 'classnames'
import styles from './ImageSelectorModal.module.less'
import { useTranslation } from 'react-i18next'
import imgList, { ImgBlock } from './ImageList'

type Timeout = NodeJS.Timeout

export interface ImageSelectorModalProps {
  visible?: boolean
  onOk?: (image, file?: File) => void
  onCancel?: () => void
  title?: string
  modalWidth?: number
  initialSearch?: string
  attachButtonText?: string
  chooseButtonText?: string
  selectedImage?: string
  allowCustomImage?: boolean
}

export const ImageSelectorModal: FC<ImageSelectorModalProps> = (props) => {
  const {
    visible,
    onOk,
    onCancel,
    title,
    initialSearch = '',
    selectedImage = '',
    allowCustomImage = true,
  } = props
  const { t } = useTranslation('common')
  const [imageList, setImageList] = useState(imgList.slice(0, 20))
  const [search, setSearch] = useState('')
  const [selectedImg, setSelectedImg] = useState<ImgBlock | undefined>(
    undefined
  )
  const [uploadImg, setUploadImg] = useState('')
  const [fileObject, setFileObject] = useState<File>()

  const searchTimer = useRef<Timeout | null>(null)

  useEffect(() => setSearch(initialSearch), [initialSearch])

  // pre-load all the images after 1.5 sec of component load
  useEffect(() => {
    setTimeout(
      () => imgList.map((image) => (new Image().src = image.source)),
      1500
    )
  }, [])

  useEffect(() => {
    searchTimer.current && clearTimeout(searchTimer.current)
    searchTimer.current = ((setTimeout(() => {
      onSearch(search)
    }, 300) as unknown) as number | null) as never
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search])

  useEffect(() => {
    if (selectedImage) {
      const img = imgList.find((i) => i.url === selectedImage)
      !!img && setSelectedImg(img)
    }
  }, [selectedImage])

  const onSelect = () => {
    if (!selectedImg) return
    if (selectedImg.key === 0) {
      onOk?.(selectedImg, fileObject)
    } else {
      onOk?.(selectedImg)
    }
  }

  const onSearch = (searchTerm = '') => {
    const terms = searchTerm.toLowerCase().split(' ')
    let list = imgList.filter(
      ({ tags }) =>
        tags.findIndex((t) => {
          return terms.findIndex((term) => t.toLowerCase().includes(term)) > -1
        }) > -1
    )
    if (!searchTerm && uploadImg) {
      list = [
        {
          key: 0,
          source: uploadImg,
          url: uploadImg,
          tags: ['new'],
        },
        ...list,
      ]
    }
    setImageList(searchTerm ? list : list.slice(0, 15))
  }

  const setUploadImage = (url: string) => {
    const data = imageList.filter((item) => item.key !== 0)
    const tempObject = {
      key: 0,
      source: url,
      url: url,
      tags: ['new'],
    }
    const temp = [tempObject, ...data]
    setImageList(temp)
    setUploadImg(url)
    setSelectedImg(tempObject)
  }

  return (
    <BasicModal
      visible={visible}
      footer
      onOk={onSelect}
      onCancel={onCancel}
      title={title || t('ui.imageselectormodal.title')}
      modalWidth={props.modalWidth || 1000}
      isValidate
      newButtonText={
        props.attachButtonText || t('ui.imageselectormodal.attach')
      }
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
                <PictureOutlined style={{ fontSize: 28, color: '#9292A3' }} />
                <label htmlFor="file-upload" className={styles.chooseFileBtn}>
                  <PlusOutlined />
                  {props.chooseButtonText || t('ui.imageselectormodal.choose')}
                </label>
                <input
                  id="file-upload"
                  type="file"
                  accept="image/png, image/jpeg"
                  style={{ height: 0, width: 0, visibility: 'hidden' }}
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    setFileObject(file)
                    setUploadImage(file ? URL.createObjectURL(file) : '') //TODO: instead of double-setting like this, move this 2nd one to a useMemo
                  }}
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
                <img src={img.source} alt={''} className={styles.listImg} />
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
