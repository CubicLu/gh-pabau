import React, { useState, FC, useContext } from 'react'
import {
  QuestionCircleOutlined,
  ClockCircleOutlined,
  MedicineBoxOutlined,
  LaptopOutlined,
  DownOutlined,
  UpOutlined,
  CheckOutlined,
  InfoCircleFilled,
  CheckCircleFilled,
  ArrowRightOutlined,
  MoreOutlined,
} from '@ant-design/icons'
import { useMedia } from 'react-use'
import { Button } from '@pabau/ui'

import { Rate, Modal, Badge, Popover, Tooltip, Image } from 'antd'
import { data, voucherData } from '../../../web/mocks/connect/ScreenTwoMock'
import styles from './ServiceSelector.module.less'
import ClassNames from 'classnames'
import { Category, Service } from '../../types/services'
import { useTranslationI18 } from '../../hooks/useTranslationI18'
import { useSelectedDataStore } from '../../store/selectedData'

import { ReactComponent as SelectAllIcon } from '../../assets/images/SelectAll.svg'
import { ReactComponent as Promocode } from '../../assets/images/coupenCode.svg'
import { ReactComponent as SkinHealth } from '../../assets/images/skin-health-logo.svg'
import { ReactComponent as LogoSvg } from '../../../../libs/ui/src/lib/logo/logo.svg'
import { useCompanyServicesCategorisedQuery } from '@pabau/graphql'
import { SettingsContext } from '../../context/settings-context'
export interface P {
  onSelected: () => void
}

const ServiceSelector: FC<P> = ({ onSelected }) => {
  // CRAP
  const [showmodal, setshowmodal] = useState(false)
  const [visible, setvisible] = useState(false)
  const [popover, setpopover] = useState(true)
  const [Vcount, setVcount] = useState(0)
  const [Vprice, setVprice] = useState(0)
  const [VoucherData, setVoucherData] = useState(voucherData)
  const [mbactive, setmbactive] = useState(true)
  const [infomodal, setinfomodal] = useState(false)
  const isMobile = useMedia('(max-width: 768px)', false)

  //HOOKS
  const [selectedData, setSelectedData] = useSelectedDataStore()
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

  // EVENT HANDLERS

  // RENDER HELPERS
  const renderService = (val: Service) => {
    if (
      (virtualServicesOnly && val.online_only_service !== 1) ||
      (!virtualServicesOnly && val.online_only_service === 1)
    ) {
      return null
    }
    const isSelected =
      selectedData.services.findIndex((service) => service.id === val.id) > -1
        ? true
        : false
    return (
      <div style={{ width: '100%', marginBottom: '16px' }}>
        <div
          className={styles.consultationCard}
          key={val.id}
          onClick={(e) => {
            let newSelectedServices = []
            if (isSelected) {
              newSelectedServices = selectedData.services.filter(
                (el) => el !== val.id
              )
              setTotalEstimate(totalEstimate - Number.parseFloat(val.price))
            } else {
              newSelectedServices = [...selectedData.services, val]
              setTotalEstimate(totalEstimate + Number.parseFloat(val.price))
            }
            setSelectedData('SET_SELECTED_SERVICES', newSelectedServices)
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
            <span className={styles.consultationPrice}>£ {val.price}</span>{' '}
          </div>
          <div className={styles.mobiledata}>
            <span style={{ display: 'flex', alignItems: 'center' }}>
              <span className={styles.consultationTime}>
                {val.duration} {t('connect.onlinebooking.selector.mini')}
              </span>
              <ClockCircleOutlined />{' '}
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
            {!isMobile && (
              <div style={{ height: '40px' }}>
                <Rate
                  disabled
                  className={styles.consultatioRate}
                  defaultValue={val.online_only_service ? 0 : 5}
                />

                <span className={styles.consultationReview} onClick={(e) => {}}>
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
            <p onClick={() => setinfomodal(true)}>more info</p>
          </div>
        )}
      </div>
    )
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
  const renderServices = (category: Category | undefined) => {
    if (typeof category === 'undefined') {
      category = servicesCategorised.Public_MasterCategories.find(
        (item) =>
          item.id === selectedData.masterCategoryID ||
          !selectedData.masterCategoryID
      )?.Public_ServiceCategories.find(
        (item) => item.id === selectedData.categoryID
      )
    }

    if (!category) {
      return null
    }

    const hasOnlineConsultations =
      typeof category?.Public_Services.find(
        (s) => s.online_only_service === 1
      ) !== 'undefined'
        ? true
        : false
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
            <span>&nbsp;045787498450</span>
          </div>
        )}
      </div>
    )
  }
  const renderCategoryItem = (category: Category) => {
    const isCurrentCategory = category.id === selectedData.categoryID
    return (
      <>
        <div
          style={{ margin: '12px 0', cursor: 'pointer' }}
          key={category.id}
          onClick={() => {
            setSelectedData('SET_CATEGORY_ID', category.id)
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
                setSelectedData('SET_MASTER_CATEGORY_ID', null)
                setViewVouchers(false)
              }}
            >
              <SelectAllIcon />
              <span>All</span>
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
                  setSelectedData('SET_MASTER_CATEGORY_ID', item.id)
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
                setSelectedData('SET_MASTER_CATEGORY_ID', null)
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
              <span>Voucher</span>
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
                  !selectedData.masterCategoryID ? (
                    servicesCategorised.Public_MasterCategories.map(
                      (masterCategory) => (
                        <div key={masterCategory.id}>
                          {masterCategory.Public_ServiceCategories.map(
                            (val) => {
                              return renderCategoryItem(val)
                            }
                          )}
                        </div>
                      )
                    )
                  ) : (
                    servicesCategorised.Public_MasterCategories.find(
                      (item) => item.id === selectedData.masterCategoryID
                    ).Public_ServiceCategories.map((val) => {
                      return renderCategoryItem(val)
                    })
                  )
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
                          <span>&nbsp;045787498450</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
          {!isMobile && renderServices()}
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
      <Modal
        className={styles.mainmodal}
        visible={infomodal}
        onCancel={() => {
          setinfomodal(false)
        }}
        footer={null}
      >
        <div className={styles.iconDiv}></div>
        <span className={styles.headerText}>Patch test</span>
        <p className={styles.bodyText}>
          To make sure your skin doesen’t react to the products used in your
          treatment, please book a patch test for at least 48 hours before your
          appointment.
        </p>
        <p className={styles.bodyText}>
          To make sure your skin doesen’t react to the products used in your
          treatment, please book a patch test for at least 48 hours before your
          appointment.
        </p>
        <Button
          className={styles.footerBtn}
          type={'primary'}
          onClick={() => {
            setinfomodal(false)
          }}
        >
          I understand
        </Button>
      </Modal>
      <Modal
        className={styles.consultationModal}
        visible={showmodal}
        footer={null}
        width={682}
        onCancel={() => {
          setvisible(false)
          setTimeout(() => {
            setshowmodal(false)
          }, 1)
        }}
      >
        <>
          <div className={styles.logoHeader}> {isMobile && <SkinHealth />}</div>
          <h5 className={styles.modalHeader}>Botox Area 1 reviews</h5>
          <div className={styles.modalSubHeader}>
            <h5>1 {t('connect.onlinebooking.selector.modal.review')}</h5>
            <div className={styles.rightBar}>
              <p>{t('connect.onlinebooking.selector.modal.sort')}:</p>
              <Popover
                overlayClassName={styles.dropMenu}
                content={
                  <div
                    className={styles.menu}
                    onClick={() => setvisible(!visible)}
                  >
                    <span
                      onClick={() => setpopover(true)}
                      className={ClassNames(
                        styles.list,
                        popover && styles.active
                      )}
                    >
                      <CheckOutlined />{' '}
                      <p>
                        {t(
                          'connect.onlinebooking.selector.modal.relevent.first'
                        )}
                      </p>
                    </span>
                    <span
                      onClick={() => setpopover(false)}
                      className={ClassNames(
                        styles.list,
                        !popover && styles.active
                      )}
                    >
                      <CheckOutlined />{' '}
                      <p>
                        {t(
                          'connect.onlinebooking.selector.modal.relevent.second'
                        )}
                      </p>
                    </span>
                  </div>
                }
                placement="bottomRight"
                trigger="click"
                visible={visible}
              >
                <h6 onClick={() => setvisible(!visible)}>
                  {t('connect.onlinebooking.selector.modal.relevent.first')}
                  {visible ? <UpOutlined /> : <DownOutlined />}
                </h6>
              </Popover>
            </div>
          </div>

          <div className={styles.modalBody}>
            {data.map((val) => (
              <div className={styles.cardReview} key={val.id}>
                <div className={styles.reviewHeader}>
                  <img
                    src={val.source}
                    className={styles.reviewImg}
                    alt={'nothing'}
                  />
                  <span className={styles.reviewName}>{val.name}</span>
                  <div className={styles.reviewRate}>
                    <Badge dot className={styles.dot} />
                    <span
                      className={
                        val.rating === 5
                          ? styles.reviewRateName
                          : val.rating < 2
                          ? styles.reviewRateValue
                          : styles.reviewRatePrice
                      }
                    >
                      {val.rating}/5
                    </span>
                    <Badge dot className={styles.dot} />
                  </div>
                  <span className={styles.reviewRateMonth}>
                    {val.month}{' '}
                    {t('connect.onlinebooking.selector.modal.month')}
                  </span>
                </div>
                <p className={styles.reviewDescption}>{val.description}</p>
              </div>
            ))}
          </div>
          {isMobile && (
            <div className={styles.footerModal}>
              <p>{t('connect.onlinebooking.footer.data')}</p>
              <LogoSvg style={{ height: '15px', width: '60px' }} />
            </div>
          )}
        </>
      </Modal>
    </>
  )
}

export default ServiceSelector
