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
//import useWindowSize from '../../../hooks/useWindowSize'
import { Rate, Modal, Badge, Popover, Tooltip } from 'antd'
import { data, voucherData } from '../../../web/mocks/connect/ScreenTwoMock'
import styles from './screentwo.module.less'
import ClassNames from 'classnames'
import { ReactComponent as SelectAll } from '../../../web/assets/images/SelectAll.svg'
import { ReactComponent as SkinHealth } from '../../../web/assets/images/skin-health-logo.svg'
import { ReactComponent as LogoSvg } from '../../../../libs/ui/src/lib/logo/logo.svg'
import { MasterCategory, Category, Service } from '../selector/selector'
/* eslint-disable-next-line */
export interface ScreenTwoProps {
  items: MasterCategory[]
  ispro: boolean
  proD: MasterCategory[]
  changescreen: () => void
  catData?: Category
  onSelect: (
    val: string,
    price: number,
    online: boolean,
    range: number,
    services: number,
    vouchers: number,
    proData: MasterCategory[]
  ) => void
  parentid?: number
  translation: (val: string) => string
  isall: boolean
}

const ScreenTwo: FC<ScreenTwoProps> = ({
  items,
  ispro,
  proD,
  changescreen,
  catData,
  onSelect,
  parentid,
  translation,
  isall,
}) => {
  const [showmodal, setshowmodal] = useState(false)
  const [visible, setvisible] = useState(false)
  const [contype, setcontype] = useState(true)
  const [popover, setpopover] = useState(true)
  const [sercount, setsercount] = useState(0)
  const [serprice, setserprice] = useState(0)
  const [Vcount, setVcount] = useState(0)
  const [Vprice, setVprice] = useState(0)
  const [voucher, setvoucher] = useState(false)
  const [VoucherData, setVoucherData] = useState(voucherData)
  const [mbactive, setmbactive] = useState(true)
  const [online, setonline] = useState<boolean>()
  const [id, setid] = useState<number>(isall ? 1 : parentid)
  const [infomodal, setinfomodal] = useState(false)
  const [temname, settempname] = useState<string[]>([])
  const setoldvalue = (): MasterCategory[] => {
    const obj = items.map((item) =>
      isall
        ? { ...item, active: false }
        : item.id === id
        ? { ...item, active: true }
        : { ...item, active: false }
    )
    for (const itm of obj) {
      for (const im of itm.categories) {
        for (const item of im.services) {
          //item.selected = false
        }
      }
    }
    return obj
  }
  const [old, setold] = useState<MasterCategory[]>(
    ispro ? proD : setoldvalue
    // old1.map((item) =>

    // item.id === id
    //   ? isall
    //     ? { ...item, active: false }
    //     : { ...item, active: true }
    //   : item
    //)
  )
  const [secId, setsecId] = useState<number>(isall ? 1 : catData.id)
  const [All, setAll] = useState(isall)
  const allvalue = (all: boolean): Category => {
    const val = (): Category => {
      const obj = old
        .find((item) => item.id === id)
        .categories.find((itm) => itm.id === secId)
      for (const itm of obj.services) {
        itm.selected = false
      }
      return obj
    }
    if (all) {
      const obj = old
        .find((item) => item.id === 1)
        .categories.find((itm) => itm.id === 1)
      return obj
    } else {
      // const obj
      return val()
    }
  }

  const takevalue = (): MasterCategory => {
    // console.log('OLD', old, id)
    // const obj = old.find((item) => item.id === id)
    // obj.categories.map((item) =>
    //   item.id === secId ? (item.active = true) : (item.active = false)
    // )
    // return obj
    return old[0]
  }
  const [one, setone] = useState<MasterCategory>(takevalue)

  const [oldcatdata, setoldcatdata] = useState<Category>(
    isall ? allvalue(true) : catData
  )
  const isMobile = useMedia('(max-width: 768px)', false)
  const catgor = (newid, price) => {
    const charge = Number(price.slice(0, 2))
    const check = (sel, charge, name) => {
      if (!sel) {
        setsercount(sercount + 1)
        setserprice(serprice + charge)
        settempname([...temname, name])
      } else {
        setsercount(sercount - 1)
        setserprice(serprice - charge)

        settempname(temname.filter((itm) => itm !== name))
      }
      console.log(temname)
      // console.log(charge)
      return !sel
    }
    // setTimeout(() => {}, 100)
    old
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      .find((item) => item.id === id)
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      .categories.map((item) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        item.id === secId
          ? // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            item.services.map((itm) => {
              // eslint-disable-next-line @typescript-eslint/no-unused-expressions
              itm.id === newid
                ? // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                  (itm.selected = check(itm.selected, charge, itm.name))
                : itm
              return itm
            })
          : item
        return item
      })
    setold([...old])
  }
  const renderdata = (val: Service) => {
    const fun = (e, val) => {
      catgor(val.id, val.price)
    }
    const fun1 = (e) => {
      e.stopPropagation()
      setshowmodal(true)
    }
    return (
      <div style={{ width: '100%', marginBottom: '16px' }}>
        <div
          className={styles.consultationCard}
          key={val.id}
          onClick={(e) => {
            fun(e, val)
            if (val?.online_only_service) {
              setonline(val.online_only_service)
            } else {
              setonline(false)
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
              {isMobile && val.selected && (
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
            {console.log(val.selected)}
            {!isMobile && val.selected && (
              <div className={styles.serbutton}>
                <Button>
                  <CheckCircleFilled />
                  Selected
                </Button>
              </div>
            )}
          </div>
        </div>
        {val.selected && (
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
  const selectcat = (value: MasterCategory) => {
    setAll(false)
    setone(value)
  }
  const setvalue = (id1) => {
    old.map((item) => {
      item.active = false
      item.categories.map((itm) => (itm.active = false))
      return item
    })
    // setold([...old])
    old.map((item) => (item.id === id1 ? (item.active = true) : item))
    old.map((item) =>
      item.categories.map((itm) =>
        itm.id === 1 ? (itm.active = true) : (itm.active = false)
      )
    )
    // setsecId(1)
    setold([...old])

    const obj = old.find((item) => item.id === id1).category[0]
    setoldcatdata(obj)
    //setsecId(1)
    // setoldcatdata(val)
    setid(id1)
    setsecId(1)
    setserviceactive(1, false)
    //console.log(old1)
  }
  const setserviceactive = (id1, all: boolean, mid?: number) => {
    if (all) {
      old.map((item) => {
        item.active = false
        item.categories.map((itm) => (itm.active = false))
        return item
      })
      setold([...old])
      // setold([...old])
      old.map((item) =>
        item.id === mid
          ? item.categories.map((itm) =>
              itm.id === id1 ? (itm.active = true) : itm
            )
          : item
      )
      setold([...old])
      //setvalue(1)
    } else {
      // one.categories.map((itm) => (itm.active = false))
      // setone(one)
      one.categories.map((itm) =>
        itm.id === id1 ? (itm.active = true) : (itm.active = false)
      )
      setone(one)
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
  const valueRender = () => {
    return (
      <div>
        <div
          className={ClassNames(
            styles.custCard
            // slide ? styles.fadeLeft : styles.fadeRight
          )}
        >
          {!voucher ? (
            oldcatdata.video ? (
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
            ? oldcatdata.services.map((val) => (
                /* eslint-disable-next-line */
              <>
                  {oldcatdata.video
                    ? contype
                      ? !val.online_only_service && renderdata(val)
                      : val.online_only_service && renderdata(val)
                    : renderdata(val)}
                </>
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
  return (
    <>
      <div className={styles.containerWrapper}>
        <div className={styles.container}>
          {/*{setvalue()}*/}
          <div className={styles.serviceheader}>
            <div
              className={ClassNames(
                styles.serviceselectall,
                All && styles.serviceselectallSelect
              )}
              onClick={() => {
                setAll(true)
                setmbactive(true)
                setvoucher(false)
                old.map((item) => {
                  item.active = false
                  item.categories.map((itm) => (itm.active = false))
                  return item
                })
                old[0].categories[0].active = true
                setold([...old])
                //setmbactive(true)
                const obj = old.find((item) => item.id === 1).categories[0]
                setoldcatdata(obj)
              }}
            >
              {/*<CheckCircleFilled className={styles.checkfill} />*/}
              <SelectAll />
              <span>All</span>
            </div>
            {old.map((value) => (
              <div
                className={ClassNames(
                  styles.serviceselectall,
                  value.active && styles.serviceselectallSelect
                )}
                key={value.id}
                onClick={() => {
                  setvalue(value.id)
                  selectcat(value)
                  setvoucher(false)
                  setmbactive(true)
                }}
              >
                {valid(value.id, true) && (
                  <CheckCircleFilled
                    className={styles.checkfill}
                    style={{ color: ' #54B2D3' }}
                  />
                )}

                {value.icon}
                <span>{value.name}</span>
              </div>
            ))}
            <div
              className={ClassNames(
                styles.serviceselectall,
                voucher && styles.serviceselectallSelect
              )}
              onClick={() => {
                old.map((item) => {
                  item.active = false
                  item.categories.map((itm) => (itm.active = false))
                  return item
                })
                setold([...old])
                setAll(false)
                setvoucher(true)
                setmbactive(false)
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
                  All ? (
                    old.map((value) => (
                      <div key={value.id}>
                        {value.categories.map((val) => (
                          <>
                            <div
                              style={{ margin: '12px 0', cursor: 'pointer' }}
                              key={val.id}
                              onClick={() => {
                                if (val.active) {
                                  setmbactive(!mbactive)
                                  //console.log(mbactive)
                                } else {
                                  setmbactive(true)
                                }
                                setoldcatdata(val)
                                setid(value.id)
                                setsecId(val.id)
                                setserviceactive(val.id, true, value.id)
                                console.log(val.id)
                              }}
                            >
                              <span
                                className={ClassNames(
                                  styles.servicename,
                                  val.active && styles.serviceactive
                                )}
                              >
                                {/*{valid(val.id, false) && (*/}
                                {/*  <CheckCircleFilled*/}
                                {/*    style={{*/}
                                {/*      position: 'absolute',*/}
                                {/*      right: '8px',*/}
                                {/*      color: '#54B2D3',*/}
                                {/*    }}*/}
                                {/*  />*/}
                                {/*)}*/}

                                {val.name}
                                {!isMobile && (
                                  <span
                                    style={{
                                      position: 'absolute',
                                      right: '35px',
                                      color: '#65CD98',
                                    }}
                                  >
                                    {val.rdmValue}
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
                                    {val.rdmValue}
                                  </span>
                                )}
                                {isMobile &&
                                  (val.active && mbactive ? (
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
                            {isMobile &&
                              val.active &&
                              mbactive &&
                              valueRender()}
                          </>
                        ))}
                      </div>
                    ))
                  ) : (
                    one.categories.map((val) => (
                      <div key={val.id}>
                        <div
                          style={{ margin: '12px 0', cursor: 'pointer' }}
                          key={val.id}
                          onClick={() => {
                            if (val.active) {
                              setmbactive(!mbactive)
                              //console.log(mbactive)
                            } else {
                              setmbactive(true)
                            }
                            setoldcatdata(val)
                            setid(one.id)
                            setsecId(val.id)
                            setserviceactive(val.id, false)

                            console.log(val.id)
                          }}
                        >
                          <span
                            className={ClassNames(
                              styles.servicename,
                              !isMobile
                                ? val.active && styles.serviceactive
                                : val.active && mbactive && styles.serviceactive
                            )}
                          >
                            {valid(val.id, false) && (
                              <CheckCircleFilled
                                style={{
                                  position: 'absolute',
                                  right: '8px',
                                  color: '#54B2D3',
                                }}
                              />
                            )}
                            {!isMobile && (
                              <span
                                style={{
                                  position: 'absolute',
                                  right: '35px',
                                  color: '#54B2D3',
                                }}
                              >
                                {val.rdmValue}
                              </span>
                            )}
                            {val.name}
                            {isMobile &&
                              (val.active && mbactive ? (
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
                        {isMobile && mbactive && val.active && valueRender()}
                      </div>
                    ))
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
          {!isMobile && valueRender()}
        </div>
      </div>

      <div>
        {/*{Select.map((value) => (*/}
        {/*  <div key={value.id}>*/}
        {/*    <div>*/}
        {/*      {value.icon}*/}
        {/*      {value.name}*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*))}*/}
      </div>
      {(sercount > 0 || Vcount > 0) && (
        <div className={styles.servicefooter}>
          <p>
            {sercount > 0 &&
              (sercount === 1
                ? `1 service £ ${serprice}`
                : `${sercount} services £ ${serprice}`)}
            {Vcount > 0 && sercount > 0 && '  ,'}
            {Vcount > 0 &&
              (Vcount === 1
                ? `1 voucher £ ${Vprice}`
                : `${Vcount} vouchers £ ${Vprice}`)}
            {/*{`${*/}
            {/*  sercount > 0 &&*/}
            {/*  (sercount === 1 ? '1 service' : `${sercount} services`)*/}
            {/*}`}{' '}*/}
            {/*£ {serprice},*/}
            {/*{`${*/}
            {/*  Vcount > 0 &&*/}
            {/*  (sercount === 1 ? '1 voucher' : `${Vcount} vouchers`)*/}
            {/*}`}{' '}*/}
            {/*£ {Vprice}*/}
          </p>
          <Button
            onClick={() => {
              onSelect(
                temname[0],
                serprice + Vprice,
                online,
                40,
                sercount,
                Vcount,
                old
              )
              changescreen()
            }}
          >
            Next
            <ArrowRightOutlined />{' '}
          </Button>
        </div>
      )}
      {/*{!voucher*/}
      {/*  ? sercount > 0 && (*/}
      {/*      <div className={styles.servicefooter}>*/}
      {/*        <p>*/}
      {/*          {sercount} service £ {serprice}{' '}*/}
      {/*        </p>*/}
      {/*        <Button*/}
      {/*          onClick={() => {*/}
      {/*            onSelect(temname[0], serprice + Vprice, online, 40)*/}
      {/*            changescreen()*/}
      {/*          }}*/}
      {/*        >*/}
      {/*          Next*/}
      {/*          <ArrowRightOutlined />{' '}*/}
      {/*        </Button>*/}
      {/*      </div>*/}
      {/*    )*/}
      {/*  : Vcount > 0 && (*/}
      {/*      <div className={styles.servicefooter}>*/}
      {/*        <p>*/}
      {/*          {Vcount} service £ {Vprice}{' '}*/}
      {/*        </p>*/}
      {/*        <Button*/}
      {/*          onClick={() => {*/}
      {/*            onSelect(temname[0], serprice + Vprice, online, 40)*/}
      {/*            changescreen()*/}
      {/*          }}*/}
      {/*        >*/}
      {/*          Next*/}
      {/*          <ArrowRightOutlined />{' '}*/}
      {/*        </Button>*/}
      {/*      </div>*/}
      {/*    )}*/}
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

export default ScreenTwo
