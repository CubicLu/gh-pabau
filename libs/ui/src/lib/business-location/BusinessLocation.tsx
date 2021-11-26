import { Input } from '@pabau/ui'
import { Col, Modal, Row, Skeleton } from 'antd'
import fetch from 'node-fetch'
import React, { FC, useEffect, useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import styles from './BusinessLocation.module.less'
import { useTranslation } from 'react-i18next'

export interface AddressDetails {
  FullAddress?: string
  address?: string
  apt?: string
  postcode?: string
  city?: string
  region?: string
  country?: string
}

export interface BusinessLocationProps {
  data?: AddressDetails
  apiKey: string
  loading?: boolean
  value?: string
  AddressDetails?: AddressDetails
  onChange?(address, detailedAddress): void
}

export const BusinessLocation: FC<BusinessLocationProps> = ({
  apiKey,
  loading,
  value,
  onChange,
  AddressDetails,
}) => {
  const { t } = useTranslation('common')
  const [showModal, setShowModal] = useState(false)
  const [detail, setDetail] = useState(AddressDetails)
  const [detailForModal, setDetailForModal] = useState(AddressDetails)
  const [data, setData] = useState('')
  const [fullAddress, setFullAddress] = useState(data)
  const [active, setActive] = useState(false)
  const [addActive, setAddActive] = useState(false)
  const [add, setAdd] = useState({
    label: '',
    value: {},
  })

  useEffect(() => {
    if (value !== undefined) {
      setData(value)
      setDetailForModal(AddressDetails)
      setDetail(AddressDetails)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  useEffect(() => {
    if (AddressDetails && active === false) {
      setDetailForModal(AddressDetails)
      setDetail(AddressDetails)
      setActive(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [AddressDetails])

  let detailedAddress: AddressDetails = {
    address: '',
    postcode: '',
    city: '',
    region: '',
    country: '',
    apt: '',
  }

  const handleChange = (address) => {
    if (!address) {
      const data = {
        address: '',
        postcode: '',
        city: '',
        region: '',
        country: '',
        apt: '',
      }
      setDetail(data)
      setDetailForModal(data)
      return data
    } else {
      fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${address.replace(
          /\s/g,
          '+'
        )}&key=${apiKey}`
      )
        .then((response) => response.json())
        .then((res) => {
          if (res.status === 'OK') {
            const addressComponents = res.results[0].address_components
            const streetNumber = addressComponents.find((item) =>
              item.types.includes('street_number')
            )
            const route = addressComponents.find((item) =>
              item.types.includes('route')
            )
            const locality = addressComponents.find((item) =>
              item.types.includes('locality')
            )
            const area1 = addressComponents.find((item) =>
              item.types.includes('administrative_area_level_1')
            )
            const area2 = addressComponents.find((item) =>
              item.types.includes('administrative_area_level_2')
            )
            const country = addressComponents.find((item) =>
              item.types.includes('country')
            )
            const postcode = addressComponents.find((item) =>
              item.types.includes('postal_code')
            )
            detailedAddress = {
              address: route ? route.long_name : '',
              postcode: postcode ? postcode.long_name : '',
              city: locality
                ? locality.long_name
                : area2
                ? area2.long_name
                : '',
              region: [
                area1 ? area1.long_name : '',
                area2 ? area2.long_name : '',
              ].join(', '),
              country: country ? country.long_name : '',
              apt: streetNumber ? streetNumber.long_name : '',
            }
            setDetail(detailedAddress)
            setDetailForModal(detailedAddress)
            onChange?.(address, detailedAddress)
          }
        })
        .catch((error) => {
          throw new Error(error)
        })
      return detailedAddress
    }
  }

  useEffect(() => {
    if (add !== undefined && addActive) {
      handleChange(add?.label)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [add])

  useEffect(() => {
    if (data !== '') {
      setFullAddress(data)
    }
    if (data !== '' && addActive === false) {
      setAdd({ label: data, value: {} })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  useEffect(() => {
    if (add !== undefined && !showModal && detailForModal !== {}) {
      onChange?.(add?.label, { ...detailForModal, FullAddress: fullAddress })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showModal, add])
  return (
    <div className={styles.businessLocationContainer}>
      <p>Where is your business located?</p>
      {!loading && apiKey ? (
        <GooglePlacesAutocomplete
          apiKey={apiKey}
          selectProps={{
            defaultInputValue: data !== null ? data : fullAddress,
            value: data !== '' ? { label: fullAddress, value: {} } : add,
            isClearable: true,
            onInputChange: (val) => {
              setData(val)
              setDetailForModal({
                ...detailForModal,
                FullAddress: val,
              })
            },
            onChange: (val) => {
              setAddActive(true)
              setAdd(val)
            },
            onMenuOpen: () => {
              setData(add?.label)
            },
            noOptionsMessage: () => null,
          }}
        />
      ) : (
        <Skeleton.Input active={true} size={'small'} />
      )}
      <div className={styles.businessLocationDetails}>
        <p
          className={styles.locationItemEdit}
          onClick={() => {
            setShowModal(true)
            setDetailForModal(detail)
          }}
        >
          {!loading ? (
            t('business.details.business.edit.btn')
          ) : (
            <Skeleton.Input active={true} size={'small'} />
          )}
        </p>
        <Row gutter={[24, 24]} style={{ marginBottom: 0 }}>
          <Col className="gutter-row" lg={6} sm={12} xs={12}>
            <div className={styles.locationItem}>
              <p className={styles.locationItemTitle}>
                {t('business.details.business.address')}
              </p>
              {!loading ? (
                (detail?.address && (
                  <p className={styles.locationItemValue}>{detail.address}</p>
                )) ||
                (!detail?.address && (
                  <p
                    className={styles.locationItemAdd}
                    onClick={() => {
                      setShowModal(true)
                      setDetailForModal(detail)
                    }}
                  >
                    {t('business.details.business.add.btn')}
                  </p>
                ))
              ) : (
                <Skeleton.Input active={true} size={'small'} />
              )}
            </div>
          </Col>
          <Col className="gutter-row" lg={6} sm={12} xs={12}>
            <div className={styles.locationItem}>
              <p className={styles.locationItemTitle}>
                {t('business.details.business.apt')}
              </p>
              {!loading ? (
                (detail?.apt && (
                  <p className={styles.locationItemValue}>{detail.apt}</p>
                )) ||
                (!detail?.apt && (
                  <p
                    className={styles.locationItemAdd}
                    onClick={() => {
                      setShowModal(true)
                      setDetailForModal(detail)
                    }}
                  >
                    {t('business.details.business.add.btn')}
                  </p>
                ))
              ) : (
                <Skeleton.Input active={true} size={'small'} />
              )}
            </div>
          </Col>
          <Col className="gutter-row" lg={6} sm={12} xs={12}>
            <div className={styles.locationItem}>
              <p className={styles.locationItemTitle}>
                {t('setup.issuing.form.field.postcode')}
              </p>
              {!loading ? (
                (detail?.postcode && (
                  <p className={styles.locationItemValue}>{detail.postcode}</p>
                )) ||
                (!detail?.postcode && (
                  <p
                    className={styles.locationItemAdd}
                    onClick={() => {
                      setShowModal(true)
                      setDetailForModal(detail)
                    }}
                  >
                    {t('business.details.business.add.btn')}
                  </p>
                ))
              ) : (
                <Skeleton.Input active={true} size={'small'} />
              )}
            </div>
          </Col>
          <Col className="gutter-row" lg={6} sm={12} xs={12}>
            <div className={styles.locationItem}>
              <p className={styles.locationItemTitle}>
                {t('setup.issuing.form.field.city')}
              </p>
              {!loading ? (
                (detail?.city && (
                  <p className={styles.locationItemValue}>{detail.city}</p>
                )) ||
                (!detail?.city && (
                  <p
                    className={styles.locationItemAdd}
                    onClick={() => {
                      setShowModal(true)
                      setDetailForModal(detail)
                    }}
                  >
                    {t('business.details.business.add.btn')}
                  </p>
                ))
              ) : (
                <Skeleton.Input active={true} size={'small'} />
              )}
            </div>
          </Col>
          <Col className="gutter-row" lg={6} sm={12} xs={12}>
            <div className={styles.locationItem}>
              <p className={styles.locationItemTitle}>
                {t('setup.issuing.form.field.Region')}
              </p>
              {!loading ? (
                (detail?.region && (
                  <p className={styles.locationItemValue}>{detail.region}</p>
                )) ||
                (!detail?.region && (
                  <p
                    className={styles.locationItemAdd}
                    onClick={() => {
                      setShowModal(true)
                      setDetailForModal(detail)
                    }}
                  >
                    {t('business.details.business.add.btn')}
                  </p>
                ))
              ) : (
                <Skeleton.Input active={true} size={'small'} />
              )}
            </div>
          </Col>
          <Col className="gutter-row" lg={6} sm={12} xs={12}>
            <div className={styles.locationItem}>
              <p className={styles.locationItemTitle}>
                {t('setup.issuing.form.field.country')}
              </p>
              {!loading ? (
                (detail?.country && (
                  <p className={styles.locationItemValue}>{detail.country}</p>
                )) ||
                (!detail?.country && (
                  <p
                    className={styles.locationItemAdd}
                    onClick={() => {
                      setShowModal(true)
                      setDetailForModal(detail)
                    }}
                  >
                    {t('business.details.business.add.btn')}
                  </p>
                ))
              ) : (
                <Skeleton.Input active={true} size={'small'} />
              )}
            </div>
          </Col>
        </Row>
        {showModal && (
          <Modal
            title={t('business.details.edit.business.location')}
            visible={showModal}
            onOk={() => {
              setDetail(detailForModal)
              setShowModal(false)
            }}
            onCancel={() => {
              setDetailForModal(detail)
              setShowModal(false)
            }}
          >
            <Row gutter={[24, 24]}>
              <Col className="gutter-row" xs={24} sm={12}>
                <Input
                  label={t('business.details.business.address')}
                  text={detailForModal?.address}
                  onChange={(value_) =>
                    setDetailForModal({ ...detailForModal, address: value_ })
                  }
                />
              </Col>
              <Col className="gutter-row" xs={24} sm={12}>
                <Input
                  label={t('business.details.business.apt')}
                  text={detailForModal?.apt}
                  onChange={(value_) =>
                    setDetailForModal({ ...detailForModal, apt: value_ })
                  }
                />
              </Col>
              <Col className="gutter-row" xs={24} sm={12}>
                <Input
                  label={t('setup.issuing.form.field.postcode')}
                  text={detailForModal?.postcode}
                  onChange={(value_) =>
                    setDetailForModal({ ...detailForModal, postcode: value_ })
                  }
                />
              </Col>
              <Col className="gutter-row" xs={24} sm={12}>
                <Input
                  label={t('setup.issuing.form.field.city')}
                  text={detailForModal?.city}
                  onChange={(value_) =>
                    setDetailForModal({ ...detailForModal, city: value_ })
                  }
                />
              </Col>
              <Col className="gutter-row" xs={24} sm={12}>
                <Input
                  label={t('setup.issuing.form.field.Region')}
                  text={detailForModal?.region}
                  onChange={(value_) =>
                    setDetailForModal({ ...detailForModal, region: value_ })
                  }
                />
              </Col>
              <Col className="gutter-row" xs={24} sm={12}>
                <Input
                  label={t('setup.issuing.form.field.country')}
                  text={detailForModal?.country}
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

export default BusinessLocation
