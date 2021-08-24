import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { Button, Input } from '@pabau/ui'
import { Col, Modal, Row, Upload } from 'antd'
import classNames from 'classnames'
import React, { FC, useEffect, useState } from 'react'
import { useTranslationI18 } from '../../hooks/useTranslationI18'
import { InitialLocationProps, Position } from './LocationsLayout'
import styles from './LocationsLayout.module.less'
import Map from './Map'
import { getImage } from '../Uploaders/UploadHelpers/UploadHelpers'

export interface LocationDetails {
  street?: string
  postcode?: string
  position: Position
  address: string
  city: string
  region: string
  country: string
  location: string
  create: boolean
  subLocality?: string
  imageUrl?: string
  imageData?: string
}

interface LocationDetailsProps {
  values: InitialLocationProps
  setFieldValue(
    field: keyof LocationDetails,
    values: string | string[] | boolean | number | Position
  ): void
}

const LocationDetails: FC<LocationDetailsProps> = ({
  setFieldValue,
  values,
}) => {
  const { t } = useTranslationI18()

  const defaultLocationDetail = {
    street: '',
    postcode: '',
    position: {
      lat: 33.5181342,
      lng: -86.81952369999999,
    },
    address: '',
    city: t('setup.locations.city'),
    region: t('setup.locations.region'),
    country: t('setup.locations.country'),
    location: t('setup.locations.location'),
    create: true,
    imageUrl: '',
  }
  const [locationDetail, setLocationDetail] = useState<LocationDetails>(
    defaultLocationDetail
  )
  const [showModal, setShowModal] = useState(false)
  const [detailForModal, setDetailForModal] = useState<LocationDetails>()

  const [file, setFile] = useState<string>()
  const [isNewFile, setNewFile] = useState(false)
  useEffect(() => {
    if (locationDetail) {
      setFieldValue('street', locationDetail.street)
      setFieldValue('postcode', locationDetail.postcode)
      setFieldValue('address', locationDetail.address)
      setFieldValue('position', locationDetail.position)
      setFieldValue('city', locationDetail.city)
      setFieldValue('region', locationDetail.region)
      setFieldValue('country', locationDetail.country)
      setFieldValue('location', locationDetail.location)
      setFieldValue('imageUrl', locationDetail.imageUrl)
      setFile(locationDetail.imageUrl)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationDetail])

  useEffect(() => {
    if (values.id) {
      setLocationDetail({
        street: values.street,
        address: values.address,
        position:
          values.position.lat === 0 && values.position.lng === 0
            ? defaultLocationDetail.position
            : values.position,
        postcode: values.postcode,
        city: values.city,
        region: values.region,
        country: values.country,
        location: values.location,
        create: false,
        imageUrl: values.imageUrl,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const hanldeAdd = () => {
    setShowModal((e) => !e)
    setDetailForModal(locationDetail)
  }

  const handleFileChange = (file) => {
    const { originFileObj } = file.file
    const filePath = URL.createObjectURL(originFileObj)
    setFile(filePath)
    setNewFile(true)
    const reader = new FileReader()
    if (originFileObj?.type?.match('image.*')) {
      reader.readAsDataURL(originFileObj)
    }
    reader.onloadend = async () => {
      setFieldValue('imageData', reader.result.toString())
    }
  }

  const EditIcon = () => {
    return (
      <p className={styles.editIcon}>
        <EditOutlined />
      </p>
    )
  }

  const onDeleteImage = () => {
    setFile(null)
    setFieldValue('imageUrl', '')
    setFieldValue('imageData', null)
    setNewFile(false)
  }

  return (
    <div className={styles.modalWrapper}>
      <div className={styles.contentBox}>
        <h2>{t('setup.locations.title.short')}</h2>
        <h4>{t('setup.locations.location.desc.text')}</h4>
        <div className={styles.mapContainer}>
          <Map
            locationDetail={locationDetail}
            setLocationDetail={setLocationDetail}
          />
        </div>
        <Row className={styles.locationDetailContainer}>
          <Col lg={24} sm={24} xs={24}>
            <div className={styles.locationItem}>
              <p className={styles.locationItemTitle}>
                {t('setup.locationsdetail.address')}
              </p>
              {locationDetail?.location && (
                <p className={styles.locationItemValue} onClick={hanldeAdd}>
                  {locationDetail?.location}
                  <EditIcon />
                </p>
              )}
              {!locationDetail?.location && (
                <p className={styles.locationItemAdd} onClick={hanldeAdd}>
                  + {t('common-label-add')}
                </p>
              )}
            </div>
          </Col>
          <Col lg={24} sm={24} xs={24}>
            <div className={styles.locationItem}>
              <p className={styles.locationItemTitle}>
                {t('setup.locations.location.apt.suite')}
              </p>
              {locationDetail?.street && (
                <p className={styles.locationItemValue} onClick={hanldeAdd}>
                  {locationDetail?.street}
                  <EditIcon />
                </p>
              )}
              {!locationDetail?.street && (
                <p className={styles.locationItemAdd} onClick={hanldeAdd}>
                  + {t('common-label-add')}
                </p>
              )}
            </div>
          </Col>
          <Col lg={24} sm={24} xs={24}>
            <div
              className={classNames(styles.locationItem, styles.locationAlign)}
            >
              <p className={styles.locationItemTitle}>
                {t('setup.locations.location.postcode')}
              </p>
              {locationDetail?.postcode && (
                <p className={styles.locationItemValue} onClick={hanldeAdd}>
                  {locationDetail?.postcode}
                  <EditIcon />
                </p>
              )}
              {!locationDetail?.postcode && (
                <p className={styles.locationItemAdd} onClick={hanldeAdd}>
                  + {t('common-label-add')}
                </p>
              )}
            </div>
          </Col>
          <Col lg={24} sm={24} xs={24}>
            <div className={styles.locationItem}>
              <p className={styles.locationItemTitle}>
                {t('setup.locationdetail.city')}
              </p>
              {locationDetail?.city && (
                <p className={styles.locationItemValue} onClick={hanldeAdd}>
                  {locationDetail?.city}
                  <EditIcon />
                </p>
              )}
              {!locationDetail?.city && (
                <p className={styles.locationItemAdd} onClick={hanldeAdd}>
                  + {t('common-label-add')}
                </p>
              )}
            </div>
          </Col>
          <Col lg={24} sm={24} xs={24}>
            <div className={styles.locationItem}>
              <p className={styles.locationItemTitle}>
                {t('setup.locationdetail.region')}
              </p>
              {locationDetail?.region && (
                <p className={styles.locationItemValue} onClick={hanldeAdd}>
                  {locationDetail?.region}
                  <EditIcon />
                </p>
              )}
              {!locationDetail?.region && (
                <p className={styles.locationItemAdd} onClick={hanldeAdd}>
                  + {t('common-label-add')}
                </p>
              )}
            </div>
          </Col>
          <Col lg={24} sm={24} xs={24}>
            <div className={styles.locationItem}>
              <p className={styles.locationItemTitle}>
                {t('setup.locationdetail.country')}
              </p>
              {locationDetail?.country && (
                <p className={styles.locationItemValue} onClick={hanldeAdd}>
                  {locationDetail?.country}
                  <EditIcon />
                </p>
              )}
              {!locationDetail?.country && (
                <p className={styles.locationItemAdd} onClick={hanldeAdd}>
                  + {t('common-label-add')}
                </p>
              )}
            </div>
          </Col>
          <Col lg={24} sm={24} xs={24}>
            <div className={styles.locationItem}>
              <p
                className={classNames(
                  styles.locationItemTitle,
                  styles.locationAlign
                )}
              >
                {`${t('setup.locations.location.image')} – ${t(
                  'setup.locations.location.optional'
                )}`}
              </p>
              {file && (
                <img
                  alt="location"
                  src={
                    locationDetail.imageUrl && !isNewFile
                      ? getImage(file)
                      : file
                  }
                />
              )}
              <div>
                {file && (
                  <Button
                    onClick={onDeleteImage}
                    className={styles.imgDeleteBtn}
                    icon={<DeleteOutlined />}
                  >
                    {'Delete'}
                  </Button>
                )}
                <Upload
                  multiple={false}
                  onChange={handleFileChange}
                  showUploadList={false}
                >
                  <Button className={styles.uploadBtn} icon={<PlusOutlined />}>
                    {t('setup.locations.location.choose.file')}
                  </Button>
                </Upload>
              </div>
            </div>
          </Col>
        </Row>
        {showModal && (
          <Modal
            title={t('setup.locations.edit.modal.title')}
            visible={showModal}
            onOk={() => {
              setLocationDetail(detailForModal)
              setShowModal(false)
            }}
            okText={
              <span style={{ textTransform: 'uppercase' }}>
                {t('setup.locations.edit.modal.ok')}
              </span>
            }
            cancelText={t('setup.locations.cancel.button')}
            onCancel={() => {
              setShowModal(false)
            }}
          >
            <Row gutter={[24, 24]}>
              <Col className="gutter-row" xs={24} sm={12}>
                <Input
                  label={t('setup.locationsdetail.address')}
                  text={detailForModal.location}
                  onChange={(value_) =>
                    setDetailForModal({ ...detailForModal, location: value_ })
                  }
                />
              </Col>
              <Col className="gutter-row" xs={24} sm={12}>
                <Input
                  label={t('setup.locations.location.apt.suite')}
                  text={detailForModal.street}
                  onChange={(value_) =>
                    setDetailForModal({ ...detailForModal, street: value_ })
                  }
                />
              </Col>
              <Col className="gutter-row" xs={24} sm={12}>
                <Input
                  label={t('setup.locations.location.postcode')}
                  text={detailForModal.postcode}
                  maxLength={10}
                  onChange={(value_) =>
                    setDetailForModal({ ...detailForModal, postcode: value_ })
                  }
                />
              </Col>
              <Col className="gutter-row" xs={24} sm={12}>
                <Input
                  label={t('setup.locationdetail.city')}
                  text={detailForModal.city}
                  onChange={(value_) =>
                    setDetailForModal({ ...detailForModal, city: value_ })
                  }
                />
              </Col>
              <Col className="gutter-row" xs={24} sm={12}>
                <Input
                  label={t('setup.locationdetail.region')}
                  text={detailForModal.region}
                  onChange={(value_) =>
                    setDetailForModal({ ...detailForModal, region: value_ })
                  }
                />
              </Col>
              <Col className="gutter-row" xs={24} sm={12}>
                <Input
                  label={t('setup.locationdetail.country')}
                  text={detailForModal.country}
                  onChange={(value_) =>
                    setDetailForModal({ ...detailForModal, country: value_ })
                  }
                />
              </Col>
            </Row>
          </Modal>
        )}
      </div>
    </div>
  )
}

export default LocationDetails
