import React, { useState, useEffect, FC, useContext } from 'react'
import {
  QuestionCircleOutlined,
  ClockCircleOutlined,
  MedicineBoxOutlined,
  LaptopOutlined,
  DownOutlined,
  UpOutlined,
  InfoCircleFilled,
  CheckCircleFilled,
  ArrowRightOutlined,
  MoreOutlined,
} from '@ant-design/icons'
import { useMedia } from 'react-use'
import { Button } from '@pabau/ui'

import { Rate, Badge, Tooltip, Image } from 'antd'
import { voucherData } from '../../mocks/ScreenTwoMock'
import styles from './ServiceSelector.module.less'
import ClassNames from 'classnames'
import { Category, Service } from '../../types/services'
import { useTranslationI18 } from '../../hooks/useTranslationI18'
import { useSelectedDataStore } from '../../store/selectedData'

import { ReactComponent as SelectAllIcon } from '../../assets/images/SelectAll.svg'
import { ReactComponent as Promocode } from '../../assets/images/coupenCode.svg'
import {
  useCompanyServicesCategorisedQuery,
  useCompanyServicesByCategoryQuery,
} from '@pabau/graphql'
import { SettingsContext } from '../../context/settings-context'
import ServiceReviewsModal from '../Modals/ServiceReviewsModal'
import ServiceInfoModal from '../Modals/ServiceInfoModal'
export interface P {
  onSelected: () => void
  hasMasterCategories: boolean
}

const ServiceSelector: FC<P> = ({ onSelected, hasMasterCategories }) => {
  const [showReviewsModal, setShowReviewsModal] = useState(false)
  const [showServiceInfoModal, setShowServiceInfoModal] = useState(false)
  const [previewService, setPreviewService] = useState(null)

  // CRAP
  const [Vcount, setVcount] = useState(0)
  const [Vprice, setVprice] = useState(0)
  const [VoucherData, setVoucherData] = useState(voucherData)
  const [mbactive, setmbactive] = useState(true)
  const isMobile = useMedia('(max-width: 768px)', false)

  //HOOKS
  const { selectedData, setSelectedData, actionTypes } = useSelectedDataStore()
  const [virtualServicesOnly, setVirtualServicesOnly] = useState<boolean>(false)
  const [totalEstimate, setTotalEstimate] = useState<number>(0)
  const [viewVouchers, setViewVouchers] = useState<boolean>(false)
  const settings = useContext(SettingsContext)
  const { t } = useTranslationI18()

  const {
    loading: loadingServices,
    error: errorServices,
    data: servicesCategorised,
  } = useCompanyServicesCategorisedQuery({
    variables: {
      company_id: settings?.id,
    },
  })

  const {
    loading: loadingServicesByCategory,
    error: errorServicesByCategory,
    data: servicesByCategory,
  } = useCompanyServicesByCategoryQuery({
    variables: {
      company_id: settings?.id,
    },
    skip: hasMasterCategories,
  })

  useEffect(() => {
    if (!loadingServicesByCategory && !hasMasterCategories) {
      setSelectedData(
        actionTypes.SET_CATEGORY_ID,
        servicesByCategory.Public_ServiceCategories[0].id
      )
    }
  }, [
    loadingServicesByCategory,
    servicesByCategory,
    hasMasterCategories,
    actionTypes.SET_CATEGORY_ID,
    setSelectedData,
  ])

  if (errorServices || errorServicesByCategory) return <div>Error!</div>
  if (loadingServices || loadingServicesByCategory) return <div>Loading...</div>

  // EVENT HANDLERS

  // RENDER HELPERS
  const getServicePriceRange = (service) => {
    let lowPrice = service.price
    let highPrice = service.price
    for (const tier of service.Public_ServiceUserTier) {
      if (tier.price < lowPrice) {
        lowPrice = tier.price
      } else if (tier.price > highPrice) {
        highPrice = tier.price
      }
    }

    return {
      low: lowPrice,
      high: highPrice,
    }
  }

  const rendervoucher = (voucherd) => {
    return (
      <div
        className={styles.vocherList}
        onClick={() => {
          VoucherData.map((item) =>
            item.id === voucherd.id ? (item.active = !item.active) : item
          )
          setVoucherData(VoucherData)
          if (voucherd.active) {
            setVcount(Vcount + 1)
            setVprice(Vprice + voucherd.price)
          } else {
            setVcount(Vcount - 1)
            setVprice(Vprice - voucherd.price)
          }
        }}
      >
        <div className={styles.voucherContainer}>
          <div className={styles.voucherMain}>
            <img src={voucherd.image} alt={'nothing'} />
            <div className={styles.voucherTicket}>
              <div className={styles.voucherVerticalMenu}>
                <MoreOutlined />
              </div>
              <div className={styles.vouchervalue}>
                <span className={styles.Vvalue}>£{voucherd.value}</span> <br />
                <span className={styles.Vdes}>{voucherd.valueDescription}</span>
              </div>
              <div className={styles.voucherType}>
                <div>
                  <span className={styles.Vtype}>{voucherd.type}</span> <br />
                  <span className={styles.VfamiDes}>
                    {voucherd.description}
                  </span>
                </div>
                <div>
                  <span>£{voucherd.size}</span> <br />
                  <span>{voucherd.sizeDescription}</span>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.voucherbtn}>
            <div>
              <span style={{ color: '#65CD98', fontSize: '16px' }}>
                £{voucherd.price}
              </span>
            </div>
            {voucherd.active && (
              <div className={styles.servicebutton}>
                <Button>
                  <CheckCircleFilled />
                  Selected
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
  const renderServices = (category: Category | null) => {
    if (!category) {
      if (hasMasterCategories) {
        category = servicesCategorised.Public_MasterCategories.find(
          (item) =>
            item.id === selectedData.masterCategoryID ||
            !selectedData.masterCategoryID
        )?.Public_ServiceCategories.find(
          (item) => item.id === selectedData.categoryID
        )
      } else {
        category = servicesByCategory.Public_ServiceCategories.find(
          (item) => item.id === selectedData.categoryID
        )
      }
    }

    if (!category) {
      return null
    }

    const hasOnlineConsultations =
      typeof category?.Public_Services.find(
        (s) => s.online_only_service === 1
      ) !== 'undefined'

    return (
      <div>
        <div className={styles.custCard}>
          {!viewVouchers ? (
            hasOnlineConsultations ? (
              <div className={styles.treatmentTabWrapper}>
                <div
                  onClick={() => setVirtualServicesOnly(false)}
                  className={ClassNames(
                    styles.treatmentTab,
                    !virtualServicesOnly && styles.active
                  )}
                >
                  <MedicineBoxOutlined />
                  {t('connect.onlinebooking.selector.offline')}
                </div>
                <div
                  onClick={() => setVirtualServicesOnly(true)}
                  className={ClassNames(
                    styles.treatmentTab,
                    virtualServicesOnly && styles.active
                  )}
                >
                  <LaptopOutlined />
                  {t('connect.onlinebooking.selector.online')}
                </div>
              </div>
            ) : (
              <div className={styles.treatmentTabWrapper}>
                <div className={ClassNames(styles.treatmentTab, styles.active)}>
                  <MedicineBoxOutlined />
                  <span>In Clinic</span>
                </div>
              </div>
            )
          ) : null}
          {!viewVouchers
            ? category.Public_Services.map((val) => renderService(val))
            : !isMobile &&
              VoucherData.map((item) => (
                <div key={item.id}>{rendervoucher(item)}</div>
              ))}
        </div>
        {!isMobile && (
          <div className={styles.servicedata}>
            {t('connect.onlinebooking.first.description')}
            <span>&nbsp;{settings.details.phone}</span>
          </div>
        )}
      </div>
    )
  }
  const renderService = (val: Service) => {
    if (
      (virtualServicesOnly && val.online_only_service !== 1) ||
      (!virtualServicesOnly && val.online_only_service === 1)
    ) {
      return null
    }

    let priceRange = {
      low: 0,
      high: 0,
    }
    if (settings.BookitProGeneral.show_prices !== 'No') {
      priceRange = getServicePriceRange(val)
    }

    const isSelected =
      selectedData.services.findIndex((service) => service.id === val.id) > -1
    return (
      <div style={{ width: '100%', marginBottom: '16px' }}>
        <div
          className={styles.consultationCard}
          key={val.id}
          onClick={() => {
            let newSelectedServices
            if (isSelected) {
              newSelectedServices = selectedData.services.filter(
                (el) => el.id !== val.id
              )
              setTotalEstimate(totalEstimate - val.price)
            } else {
              newSelectedServices = [...selectedData.services, val]
              setTotalEstimate(totalEstimate + val.price)
            }
            setSelectedData(
              actionTypes.SET_SELECTED_SERVICES,
              newSelectedServices
            )
          }}
        >
          <div className={styles.consultationLine}>
            <span>
              <span className={styles.consultationTitle}>{val.name}</span>{' '}
              <QuestionCircleOutlined style={{ marginRight: '8px' }} />
              {val.online_only_service === 1 && (
                <Tooltip
                  title={`${t('connect.onlinebooking.selector.tooltip')}`}
                >
                  {' '}
                  <LaptopOutlined />
                </Tooltip>
              )}
            </span>
            {settings.BookitProGeneral.show_prices !== 'No' && (
              <span className={styles.consultationPrice}>
                £{' '}
                {priceRange.low !== priceRange.high
                  ? priceRange.low + '-' + priceRange.high
                  : priceRange.low}
              </span>
            )}
          </div>
          <div className={styles.mobiledata}>
            <span style={{ display: 'flex', alignItems: 'center' }}>
              {settings.BookitProGeneral.show_duration !== 'No' && (
                <>
                  <span className={styles.consultationTime}>
                    {val.duration} {t('connect.onlinebooking.selector.mini')}
                  </span>
                  <ClockCircleOutlined />{' '}
                </>
              )}

              {!isMobile && val.is_bundle && (
                <div style={{ display: 'flex', marginLeft: '5px' }}>
                  <Badge color="gray" />{' '}
                  <p style={{ margin: '0' }}>2 Services</p>
                </div>
              )}
            </span>
            <div>
              {isMobile && isSelected && (
                <div className={styles.serbutton}>
                  <Button>
                    <CheckCircleFilled />
                    Selected
                  </Button>
                </div>
              )}
            </div>
          </div>
          <div
            className={styles.consultationLine}
            style={{ marginBottom: '0' }}
          >
            {!isMobile && settings.BookitProGeneral.allow_rating && (
              <div style={{ height: '40px' }}>
                <Rate
                  disabled
                  className={styles.consultatioRate}
                  defaultValue={val.online_only_service ? 0 : val.rating}
                />

                <span
                  className={styles.consultationReview}
                  onClick={() => {
                    setPreviewService(val)
                    setShowReviewsModal(true)
                  }}
                >
                  {val.online_only_service
                    ? 0
                    : val.Public_SocialSurveyFeedback.length}
                  &nbsp;
                  {t('connect.onlinebooking.selector.review')}
                </span>
              </div>
            )}
            {!isMobile && isSelected && (
              <div className={styles.serbutton}>
                <Button>
                  <CheckCircleFilled />
                  Selected
                </Button>
              </div>
            )}
          </div>
        </div>
        {isSelected && (
          <div className={styles.moreinfo}>
            <div className={styles.moreinfoinner}>
              <InfoCircleFilled style={{ color: '#20BAB1' }} />
              <p>You may need a patch test</p>
            </div>
            <p onClick={() => setShowServiceInfoModal(true)}>more info</p>
          </div>
        )}
      </div>
    )
  }

  const renderCategories = () => {
    return !hasMasterCategories
      ? servicesByCategory.Public_ServiceCategories.map((val) => {
          return renderCategoryItem(val)
        })
      : !selectedData.masterCategoryID
      ? servicesCategorised.Public_MasterCategories.map((masterCategory) => (
          <div key={masterCategory.id}>
            {masterCategory.Public_ServiceCategories.map((val) => {
              return renderCategoryItem(val)
            })}
          </div>
        ))
      : servicesCategorised.Public_MasterCategories.find(
          (item) => item.id === selectedData.masterCategoryID
        ).Public_ServiceCategories.map((val) => {
          return renderCategoryItem(val)
        })
  }
  const renderCategoryItem = (category: Category) => {
    const isCurrentCategory = category.id === selectedData.categoryID
    return (
      <>
        <div
          style={{ margin: '12px 0', cursor: 'pointer' }}
          key={category.id}
          onClick={() => {
            setSelectedData(actionTypes.SET_CATEGORY_ID, category.id)
          }}
        >
          <span
            className={ClassNames(
              styles.servicename,
              isCurrentCategory && styles.serviceactive
            )}
          >
            {category.name}
            {!isMobile && (
              <span
                style={{
                  position: 'absolute',
                  right: '35px',
                  color: '#65CD98',
                }}
              >
                {category.Public_Services.length}
              </span>
            )}
            {!isMobile && (
              <span
                style={{
                  position: 'absolute',
                  right: '35px',
                  color: '#54B2D3',
                }}
              >
                {category.Public_Services.length}
              </span>
            )}
            {isMobile &&
              (isCurrentCategory && mbactive ? (
                <UpOutlined
                  style={{
                    position: 'absolute',
                    right: '8px',
                  }}
                />
              ) : (
                <DownOutlined
                  style={{
                    position: 'absolute',
                    right: '8px',
                  }}
                />
              ))}
          </span>
        </div>
        {isMobile && isCurrentCategory && mbactive && renderServices(category)}
      </>
    )
  }

  return (
    <>
      <div className={styles.containerWrapper}>
        <div className={styles.container}>
          <div className={styles.serviceheader}>
            <div
              className={ClassNames(
                styles.serviceselectall,
                !selectedData.masterCategoryID &&
                  !viewVouchers &&
                  styles.serviceselectallSelect
              )}
              onClick={() => {
                setSelectedData(actionTypes.SET_MASTER_CATEGORY_ID, null)
                setViewVouchers(false)
              }}
            >
              <SelectAllIcon />
              <span>{hasMasterCategories ? 'All' : 'Services'}</span>
            </div>
            {servicesCategorised.Public_MasterCategories.map((item) => (
              <div
                className={ClassNames(
                  styles.serviceselectall,
                  item.id === selectedData.masterCategoryID &&
                    styles.serviceselectallSelect
                )}
                key={item.id}
                onClick={() => {
                  setSelectedData(actionTypes.SET_MASTER_CATEGORY_ID, item.id)
                  setViewVouchers(false)
                }}
              >
                {item.id === selectedData.masterCategoryID && (
                  <CheckCircleFilled className={styles.checkfill} />
                )}

                <Image
                  preview={false}
                  height={'40px'}
                  width={'40px'}
                  src={'https://crm.pabau.com' + item.image}
                  alt={item.name}
                />
                <span>{item.name}</span>
              </div>
            ))}
            <div
              className={ClassNames(
                styles.serviceselectall,
                viewVouchers && styles.serviceselectallSelect
              )}
              onClick={() => {
                setViewVouchers(true)
                setSelectedData(actionTypes.SET_MASTER_CATEGORY_ID, null)
              }}
            >
              {Vcount > 0 && (
                <CheckCircleFilled
                  className={styles.checkfill}
                  style={{
                    right: '8px',
                  }}
                />
              )}

              <Promocode />
              <span>Vouchers</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.cardservice}>
        <div className={styles.innercontainer}>
          <div>
            <div className={styles.serlist}>
              <div className={styles.servicelist}>
                {!viewVouchers ? (
                  renderCategories()
                ) : (
                  <div>
                    <div
                      style={{ position: 'relative' }}
                      onClick={() => {
                        setmbactive(!mbactive)
                      }}
                    >
                      <span
                        className={ClassNames(
                          styles.servicename,
                          mbactive && styles.serviceactive
                        )}
                      >
                        All Vouchers
                      </span>
                      {mbactive ? (
                        <UpOutlined
                          style={{
                            position: 'absolute',
                            top: '16px',
                            right: '15px',
                          }}
                        />
                      ) : (
                        <DownOutlined
                          style={{
                            position: 'absolute',
                            top: '16px',
                            right: '15px',
                          }}
                        />
                      )}
                    </div>
                    {isMobile && mbactive && (
                      <div>
                        {VoucherData.map((item) => (
                          <div key={item.id}>{rendervoucher(item)}</div>
                        ))}
                        <div className={styles.servicedata}>
                          {t('connect.onlinebooking.first.description')}
                          <span>&nbsp;{settings.details.phone}</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
          {!isMobile && renderServices(null)}
        </div>
      </div>
      {(selectedData.services.length > 0 || Vcount > 0) && (
        <div className={styles.servicefooter}>
          <p>
            {selectedData.services.length === 1
              ? `1 service £ ${totalEstimate}`
              : `${selectedData.services.length} services £ ${totalEstimate}`}

            {Vcount > 0 && selectedData.services.length > 0 && '  ,'}
            {Vcount > 0 &&
              (Vcount === 1
                ? `1 voucher £ ${Vprice}`
                : `${Vcount} vouchers £ ${Vprice}`)}
          </p>
          <Button
            onClick={() => {
              onSelected()
            }}
          >
            Next
            <ArrowRightOutlined />{' '}
          </Button>
        </div>
      )}
      {showServiceInfoModal && (
        <ServiceInfoModal
          closeModalHandler={() => {
            setShowServiceInfoModal(false)
          }}
        />
      )}
      {showReviewsModal && (
        <ServiceReviewsModal
          service={previewService}
          closeModalHandler={() => {
            setShowReviewsModal(false)
          }}
        />
      )}
    </>
  )
}

export default ServiceSelector
