import React, { useState, FC } from 'react'
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
import { ReactComponent as Promocode } from '../../../web/assets/images/coupenCode.svg'
import { Rate, Modal, Badge, Popover, Tooltip } from 'antd'
import { data, voucherData } from '../../../web/mocks/connect/ScreenTwoMock'
import styles from './ServiceSelector.module.less'
import ClassNames from 'classnames'
import { ReactComponent as SelectAll } from '../../../web/assets/images/SelectAll.svg'
import { ReactComponent as SkinHealth } from '../../../web/assets/images/skin-health-logo.svg'
import { ReactComponent as LogoSvg } from '../../../../libs/ui/src/lib/logo/logo.svg'
import { MasterCategory, Category, Service } from '../../types/services'

export interface P {
  catID: number
  mCatID: number
  items: MasterCategory[]
  onStepCompleted: (services: number[]) => void
  translation: (val: string) => string
}

const ServiceSelector: FC<P> = ({
  catID,
  mCatID,
  items,
  onStepCompleted,
  translation,
}) => {
  // CRAP
  const [showmodal, setshowmodal] = useState(false)
  const [visible, setvisible] = useState(false)
  const [contype, setcontype] = useState(true)
  const [popover, setpopover] = useState(true)
  const [Vcount, setVcount] = useState(0)
  const [Vprice, setVprice] = useState(0)
  const [voucher, setvoucher] = useState(false)
  const [VoucherData, setVoucherData] = useState(voucherData)
  const [mbactive, setmbactive] = useState(true)
  const [infomodal, setinfomodal] = useState(false)
  const isMobile = useMedia('(max-width: 768px)', false)

  //FIXED
  const [categoryID, setCategoryID] = useState(catID)
  const [masterCategoryID, setMasterCategoryID] = useState(mCatID)
  const [selectedServices, setSelectedServices] = useState<number[]>([])

  const renderdata = (val: Service) => {
    const isSelected = selectedServices.includes(val.id)
    return (
      <div style={{ width: '100%', marginBottom: '16px' }}>
        <div
          className={styles.consultationCard}
          key={val.id}
          onClick={(e) => {
            if (isSelected) {
              setSelectedServices(
                selectedServices.filter((el) => el !== val.id)
              )
            } else {
              setSelectedServices([...selectedServices, val.id])
            }
          }}
        >
          <div className={styles.consultationLine}>
            <span>
              <span className={styles.consultationTitle}>{val.name}</span>{' '}
              <QuestionCircleOutlined style={{ marginRight: '8px' }} />
              {val.online_only_service && (
                <Tooltip
                  title={`${translation(
                    'connect.onlinebooking.selector.tooltip'
                  )}`}
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
                {val.duration}{' '}
                {translation('connect.onlinebooking.selector.mini')}
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

                <span
                  className={styles.consultationReview}
                  onClick={(e) => {
                    fun1(e)
                  }}
                >
                  {val.online_only_service ? 0 : val.review}
                  &nbsp;
                  {translation('connect.onlinebooking.selector.review')}
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
  const selectcat = (value: MasterCategory) => {}

  const setserviceactive = (id1, all: boolean, mid?: number) => {}
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
  const valid = (id1, group): boolean => {
    // if (group) {
    //   const obj = old.find((im) => im.id === id1)
    //   for (const im of obj.categories) {
    //     for (const itme of im.services) {
    //       if (itme.selected) {
    //         return true
    //       }
    //     }
    //   }

    //   return false
    // } else {
    //   const obj = old.find((im) => im.id === id)
    //   const obj1 = obj.categories.find((imt) => imt.id === id1)
    //   for (const im of obj1.services) {
    //     if (im.selected) {
    //       return true
    //     }
    //   }

    //   //setold([...old])
    //   return false
    // }
    return false
  }
  const renderServices = (category: Category | undefined) => {
    if (typeof category === 'undefined') {
      category = items
        .find((item) => item.id === masterCategoryID)
        ?.categories.find((item) => item.id === categoryID)
    }

    if (!category) {
      return null
    }
    return (
      <div>
        <div className={styles.custCard}>
          {!voucher ? (
            category?.video ? (
              <div className={styles.treatmentTabWrapper}>
                <div
                  onClick={() => setcontype(true)}
                  className={ClassNames(
                    styles.treatmentTab,
                    contype && styles.active
                  )}
                >
                  <MedicineBoxOutlined />
                  {translation('connect.onlinebooking.selector.offline')}
                </div>
                <div
                  onClick={() => setcontype(false)}
                  className={ClassNames(
                    styles.treatmentTab,
                    !contype && styles.active
                  )}
                >
                  <LaptopOutlined />
                  {translation('connect.onlinebooking.selector.online')}
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
          {!voucher
            ? category.services.map((val) => (
                <div>
                  {category.video
                    ? contype
                      ? !val.online_only_service && renderdata(val)
                      : val.online_only_service && renderdata(val)
                    : renderdata(val)}
                </div>
              ))
            : !isMobile &&
              VoucherData.map((item) => (
                <div key={item.id}>{rendervoucher(item)}</div>
              ))}
        </div>
        {!isMobile && (
          <div className={styles.servicedata}>
            {translation('connect.onlinebooking.first.description')}
            <span>&nbsp;045787498450</span>
          </div>
        )}
      </div>
    )
  }

  const renderCategoryItem = (category: Category) => {
    return (
      <>
        <div
          style={{ margin: '12px 0', cursor: 'pointer' }}
          key={category.id}
          onClick={() => {
            setCategoryID(category.id)
          }}
        >
          <span
            className={ClassNames(
              styles.servicename,
              categoryID === category.id && styles.serviceactive
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
                {category.rdmValue}
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
                {category.rdmValue}
              </span>
            )}
            {isMobile &&
              (category.id === categoryID && mbactive ? (
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
        {isMobile && category.active && mbactive && renderServices(category)}
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
                masterCategoryID === 0 && styles.serviceselectallSelect
              )}
              onClick={() => {
                setMasterCategoryID(0)
              }}
            >
              <SelectAll />
              <span>All</span>
            </div>
            {items.map((item) => (
              <div
                className={ClassNames(
                  styles.serviceselectall,
                  item.id === masterCategoryID && styles.serviceselectallSelect
                )}
                key={item.id}
                onClick={() => {
                  setMasterCategoryID(item.id)
                }}
              >
                {valid(item.id, true) && (
                  <CheckCircleFilled
                    className={styles.checkfill}
                    style={{ color: ' #54B2D3' }}
                  />
                )}

                {item.icon}
                <span>{item.name}</span>
              </div>
            ))}
            <div
              className={ClassNames(
                styles.serviceselectall,
                voucher && styles.serviceselectallSelect
              )}
              onClick={() => {
                // old.map((item) => {
                //   item.active = false
                //   item.categories.map((itm) => (itm.active = false))
                //   return item
                // })
                // setold([...old])
                // setvoucher(true)
                // setmbactive(false)
              }}
            >
              {Vcount > 0 && (
                <CheckCircleFilled
                  className={styles.checkfill}
                  style={{
                    position: 'absolute',
                    right: '8px',
                    color: '#54B2D3',
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
                {!voucher ? (
                  masterCategoryID === 0 ? (
                    items.map((masterCategory) => (
                      <div key={masterCategory.id}>
                        {masterCategory.categories.map((val) => {
                          return renderCategoryItem(val)
                        })}
                      </div>
                    ))
                  ) : (
                    items
                      .find((item) => item.id === masterCategoryID)
                      .categories.map((val) => {
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
                          {translation(
                            'connect.onlinebooking.first.description'
                          )}
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
      {(selectedServices.length > 0 || Vcount > 0) && (
        <div className={styles.servicefooter}>
          <p>
            {selectedServices.length === 1
              ? `1 service £ ${0}`
              : `${selectedServices.length} services £ ${0}`}

            {Vcount > 0 && selectedServices.length > 0 && '  ,'}
            {Vcount > 0 &&
              (Vcount === 1
                ? `1 voucher £ ${Vprice}`
                : `${Vcount} vouchers £ ${Vprice}`)}
          </p>
          <Button
            onClick={() => {
              onStepCompleted(selectedServices)
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
          console.log('---------------')
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
            <h5>
              1 {translation('connect.onlinebooking.selector.modal.review')}
            </h5>
            <div className={styles.rightBar}>
              <p>{translation('connect.onlinebooking.selector.modal.sort')}:</p>
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
                        {translation(
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
                        {translation(
                          'connect.onlinebooking.selector.modal.relevent.second'
                        )}
                      </p>
                    </span>
                  </div>
                }
                placement="bottomRight"
                trigger="click"
                visible={visible}
                //onVisibleChange={this.handleVisibleChange}
              >
                <h6 onClick={() => setvisible(!visible)}>
                  {translation(
                    'connect.onlinebooking.selector.modal.relevent.first'
                  )}
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
                    {translation('connect.onlinebooking.selector.modal.month')}
                  </span>
                </div>
                <p className={styles.reviewDescption}>{val.description}</p>
              </div>
            ))}
          </div>
          {isMobile && (
            <div className={styles.footerModal}>
              <p>{translation('connect.onlinebooking.footer.data')}</p>
              <LogoSvg style={{ height: '15px', width: '60px' }} />
            </div>
          )}
        </>
      </Modal>
    </>
  )
}

export default ServiceSelector
