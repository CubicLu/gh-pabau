import React, { FC } from 'react'
import {
  TabMenu,
  PabauPlus,
  Switch,
  FormikInput,
  Slider,
  Checkbox,
  TimeInput,
} from '@pabau/ui'
import {
  CheckCircleFilled,
  ClockCircleOutlined,
  EditOutlined,
  InfoCircleFilled,
  InfoCircleOutlined,
  PercentageOutlined,
} from '@ant-design/icons'
import {
  Input as AntInput,
  Collapse,
  InputNumber,
  Row,
  Radio,
  Slider as AntSlider,
  Rate,
  Skeleton,
} from 'antd'
import classNames from 'classnames'
import moment from 'moment'
import { useTranslationI18 } from '../../../hooks/useTranslationI18'
import AppointmentUser from '../../../assets/images/appointment-user.svg'
import Treatment from '../../../assets/images/form-type/treatment.svg'
import AddProduct from '../../../assets/images/add-product-sell.svg'
import {
  onlineBookingTabs,
  nameSkeleton,
  rateSkeleton,
} from '../../../mocks/Services'
import {
  CreateServiceType,
  BodyImagesType,
  CustomIconComponentProps,
} from '../CreateService'
import { ProductListDataProps, RecommendedListProps } from './OnlineBookingTab'
import stringToCurrencySignConverter from '../../../helper/stringToCurrencySignConverter'
import OnlineBookingSell from '../OnlineBookingSell'
import SellContent from '../SellContent'
import DiscountTimeChart from '../DiscountTimeChart'
import FormWrapper from '../FormWrapper'
import styles from '../CreateService.module.less'

const { Panel } = Collapse
interface PatientBookingType {
  title: string
  type: string
  selected: boolean
}

export interface CourseUpsellImagesProps {
  course: React.ComponentType<
    CustomIconComponentProps | React.SVGProps<SVGSVGElement>
  >
}

export interface RecommendedProductListProps {
  id: number
  name: string
  src: React.ComponentType<
    CustomIconComponentProps | React.SVGProps<SVGSVGElement>
  >
  originalPrice?: string
  price?: string
  rate?: number
}

interface OnlineBookingProps {
  patientBookings: PatientBookingType[]
  handleSelectPatientBookings: (e, setFieldValue) => void
  handleChangeAvailableOn: (option, e, value, setFieldValue) => void
  handleBookingTime: (index, time, value, type, setFieldValue) => void
  productListData: ProductListDataProps[]
  handleAddProduct: () => void
  recommendedList: RecommendedListProps[]
  courseUpsellImages: CourseUpsellImagesProps[]
  recommendedCourseList: RecommendedProductListProps[]
  serviceListData: ProductListDataProps[]
  handleAddServices: () => void
  recommendedService: RecommendedListProps[]
  values: CreateServiceType
  setFieldValue(
    field: keyof CreateServiceType,
    value: string | string[] | boolean | number | BodyImagesType[]
  ): void
}

const OnlineBooking: FC<OnlineBookingProps> = ({
  patientBookings,
  handleSelectPatientBookings,
  handleChangeAvailableOn,
  handleBookingTime,
  productListData,
  handleAddProduct,
  recommendedList,
  courseUpsellImages,
  recommendedCourseList,
  serviceListData,
  handleAddServices,
  recommendedService,
  values,
  setFieldValue,
}) => {
  const { t } = useTranslationI18()
  return (
    <TabMenu
      menuItems={onlineBookingTabs.map((tab, index) => {
        return (
          <div key={index} className={styles.labeledTab}>
            {t(`setup.services.servicestab.createmodal.onlinebooking.${tab}`)}{' '}
            {index !== 0 && (
              <span className={styles.plusLabel}>
                <PabauPlus modalType="Marketing" />
              </span>
            )}
          </div>
        )
      })}
      tabPosition="top"
      minHeight="1px"
    >
      <div className={styles.createServiceOnlineBooking}>
        <div className={styles.createServiceSection}>
          <h2 className={styles.createServiceSectionTitle}>
            {t('setup.services.servicestab.createmodal.submenu.general')}
          </h2>
          <div className={styles.createServiceSectionItem}>
            <div className={styles.enableServiceOnline}>
              <Switch
                size="small"
                defaultChecked={values.enableOnlineService}
                style={{ marginRight: '8px' }}
                onChange={(val) => setFieldValue('enableOnlineService', val)}
              />{' '}
              {t(
                'setup.services.servicestab.createmodal.onlinebooking.general.onlineservice'
              )}
            </div>
          </div>
          <div className={styles.createServiceSectionItem}>
            <FormWrapper
              label={t(
                'setup.services.servicestab.createmodal.onlinebooking.general.friendly'
              )}
              tooltip={t(
                'setup.services.servicestab.createmodal.onlinebooking.general.friendly.tooltip'
              )}
            >
              <FormikInput
                name="friendlyName"
                placeholder={t(
                  'setup.services.servicestab.createmodal.onlinebooking.general.friendly.placeholder'
                )}
                value={values.friendlyName}
                onChange={(e) => setFieldValue('friendlyName', e.target.value)}
              />
            </FormWrapper>
          </div>
          <div
            className={styles.createServiceSectionItem}
            style={{ margin: 0 }}
          >
            <FormWrapper
              label={t(
                'setup.services.servicestab.createmodal.onlinebooking.general.description'
              )}
            >
              <AntInput.TextArea
                rows={4}
                placeholder={t(
                  'setup.services.servicestab.createmodal.onlinebooking.general.description.placeholder'
                )}
                value={values.bookingDescription}
                onChange={(e) =>
                  setFieldValue('bookingDescription', e.target.value)
                }
              />
            </FormWrapper>
          </div>
        </div>
        <div className={styles.addServiceNotice}>
          <Collapse ghost>
            <Panel
              header={t(
                'setup.services.servicestab.createmodal.onlinebooking.addservicenotice'
              )}
              key="add-service-notice"
            >
              <div className={styles.createServiceSection}>
                <h2 className={styles.createServiceSectionTitle}>
                  {t('setup.services.servicestab.createmodal.submenu.general')}
                </h2>
                <div className={styles.createServiceSectionItem}>
                  <FormWrapper
                    label={t(
                      'setup.services.servicestab.createmodal.onlinebooking.addservicenotice.noticeshort'
                    )}
                  >
                    <FormikInput
                      name="serviceNotice"
                      placeholder={t(
                        'setup.services.servicestab.createmodal.onlinebooking.addservicenotice.noticeshort.placeholder'
                      )}
                      value={values.noticeShort}
                      onChange={(e) =>
                        setFieldValue('noticeShort', e.target.value)
                      }
                    />
                  </FormWrapper>
                </div>
                <div className={styles.createServiceSectionItem}>
                  <FormWrapper
                    label={t(
                      'setup.services.servicestab.createmodal.onlinebooking.addservicenotice.noticelong'
                    )}
                  >
                    <AntInput.TextArea
                      rows={4}
                      placeholder={t(
                        'setup.services.servicestab.createmodal.onlinebooking.addservicenotice.noticelong.placeholder'
                      )}
                      value={values.noticeLong}
                      onChange={(e) =>
                        setFieldValue('noticeLong', e.target.value)
                      }
                    />
                  </FormWrapper>
                </div>
                <div className={styles.createServiceSectionItem}>
                  <h2 className={styles.createServiceSectionSubTitle}>
                    {t(
                      'setup.services.servicestab.createmodal.onlinebooking.addservicenotice.noticeexample'
                    )}
                  </h2>
                  <div className={styles.noticeExampleWrapper}>
                    <div>
                      <span>
                        <InfoCircleFilled style={{ color: '#20BAB1' }} />
                      </span>
                      <span className={styles.textExample}>
                        {values.noticeShort
                          ? values.noticeShort
                          : t(
                              'setup.services.servicestab.createmodal.onlinebooking.addservicenotice.noticeexampletext'
                            )}
                      </span>
                    </div>
                    <div>
                      <span className={styles.moreInfo}>
                        {t(
                          'setup.services.servicestab.createmodal.onlinebooking.addservicenotice.noticeexamplemoreinfo'
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Panel>
          </Collapse>
        </div>
        <div className={styles.advancedSettings}>
          <Collapse ghost>
            <Panel
              header={t(
                'setup.services.servicestab.createmodal.general.advancedsettings'
              )}
              key="advanced-settings"
            >
              <div className={styles.createServiceSection}>
                <h2 className={styles.createServiceSectionTitle}>
                  {t(
                    'setup.services.servicestab.createmodal.onlinebooking.restrictpatient'
                  )}
                </h2>
                <div className={styles.patientBookings}>
                  {patientBookings.map((option) => (
                    <div
                      key={option.type}
                      className={
                        option.type === values.patientBooking
                          ? styles.patientBookingsSelected
                          : ''
                      }
                      onClick={() =>
                        handleSelectPatientBookings(option, setFieldValue)
                      }
                    >
                      <div className={styles.patientBookingsChecked}>
                        <CheckCircleFilled />
                      </div>
                      <div className={styles.patientBookingsTitle}>
                        {option.title}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className={styles.createServiceSection}>
                <h4 className={styles.createServiceSectionTitle}>
                  {t(
                    'setup.services.servicestab.createmodal.onlinebooking.daysbeforebookingstart'
                  )}{' '}
                  <InputNumber
                    min={0}
                    defaultValue={0}
                    value={values.daysBeforeBooking}
                    onChange={(val) => setFieldValue('daysBeforeBooking', val)}
                  />{' '}
                  {t(
                    'setup.services.servicestab.createmodal.onlinebooking.daysbeforebookingend'
                  )}
                </h4>
                <div className={styles.createServiceSectionItem}>
                  <h2 className={styles.createServiceSectionTitle}>
                    {t(
                      'setup.services.servicestab.createmodal.onlinebooking.minimumattendees.title'
                    )}
                  </h2>
                  <h4 className={styles.createServiceSectionSubTitle}>
                    {t(
                      'setup.services.servicestab.createmodal.onlinebooking.minimumattendees.subtitle'
                    )}
                  </h4>
                  <Slider
                    title={''}
                    value={values.minAttendees ? values.minAttendees : 2}
                    onChange={(e) => setFieldValue('minAttendees', e)}
                    calculatedValue={values?.minAttendees?.toString() || '2'}
                    min={2}
                    max={15}
                  />
                </div>
              </div>
              <div className={styles.createServiceSection}>
                <h2 className={styles.createServiceSectionTitle}>
                  {t(
                    'setup.services.servicestab.createmodal.onlinebooking.timingrules'
                  )}
                </h2>
                <h4 className={styles.createServiceSectionSubTitle}>
                  {t(
                    'setup.services.servicestab.createmodal.onlinebooking.timingrules.subtitlestart',
                    {
                      what: values.name
                        ? values.name
                        : t(
                            'setup.services.servicestab.createmodal.onlinebooking.timingrules.servicename.placeholder'
                          ),
                    }
                  )}
                </h4>
                <div className={styles.availableOn}>
                  {values.availableOnData &&
                    values.availableOnData.length > 0 &&
                    values.availableOnData.map((option) => (
                      <div
                        className={styles.availableOnItem}
                        key={option.weekDay}
                      >
                        <Checkbox
                          defaultChecked={option.isAvailable}
                          onChange={(e) =>
                            handleChangeAvailableOn(
                              option.weekDay,
                              e.target.checked,
                              values.bookingDays,
                              setFieldValue
                            )
                          }
                        />
                        <span>
                          {t(
                            `setup.services.servicestab.createmodal.onlinebooking.timingrules.${option.weekDay}`
                          )}
                        </span>
                      </div>
                    ))}
                </div>
                {values?.bookingDays &&
                  Array.isArray(values?.bookingDays) &&
                  values.bookingDays.map((item, index) => (
                    <div key={index} className={styles.bookingDaysWrapper}>
                      <span>
                        {t(
                          `setup.services.servicestab.createmodal.onlinebooking.timingrules.${item?.day}`
                        )}
                        :
                      </span>
                      <div className={styles.bookingDays}>
                        <div className={styles.inputWrap}>
                          <TimeInput
                            value={
                              item.openTime
                                ? moment(item.openTime, 'HH:mm')
                                : null
                            }
                            onChange={(time, timeString) =>
                              handleBookingTime(
                                index,
                                timeString,
                                values.bookingDays,
                                'openTime',
                                setFieldValue
                              )
                            }
                          />
                        </div>
                        <div className={styles.inputWrap}>
                          <TimeInput
                            value={
                              item.closeTime
                                ? moment(item.closeTime, 'HH:mm')
                                : null
                            }
                            onChange={(time, timeString) => {
                              handleBookingTime(
                                index,
                                timeString,
                                values.bookingDays,
                                'closeTime',
                                setFieldValue
                              )
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </Panel>
          </Collapse>
        </div>
      </div>
      <div>
        <OnlineBookingSell
          builderContent={
            <div className={styles.productUpsellBuilderContainer}>
              <div className={styles.productUpsellHeaderWrapper}>
                <div className={styles.productUpsellHeaderTitle}>
                  <h3>
                    {t(
                      'setup.services.servicestab.createmodal.onlinebooking.productupsell.title'
                    )}
                  </h3>
                  <div className={styles.enableSwitch}>
                    {t(
                      'setup.services.servicestab.createmodal.onlinebooking.productupsell.switchlabel'
                    )}
                    <Switch size="small" style={{ marginLeft: '12px' }} />
                  </div>
                </div>
                <span className={styles.productSubTitle}>
                  {t(
                    'setup.services.servicestab.createmodal.onlinebooking.productupsell.subtitle'
                  )}
                </span>
              </div>
              <div className={styles.ProductUpsellAddWrapper}>
                <div>
                  {!values?.showProductSellMessage ? (
                    <div
                      className={styles.createServiceSectionItem}
                      style={{ marginTop: '20px' }}
                    >
                      <FormWrapper
                        label={t(
                          'setup.services.servicestab.createmodal.onlinebooking.servicecrosssell.sellmessagelabel'
                        )}
                      >
                        <AntInput.TextArea
                          className={styles.promotionMessageText}
                          rows={4}
                          value={values.sellProductMessage}
                          autoFocus={true}
                          onBlur={() =>
                            setFieldValue(
                              'showProductSellMessage',
                              !values?.showProductSellMessage
                            )
                          }
                          onChange={(e) => {
                            setFieldValue('sellProductMessage', e.target.value)
                          }}
                        />
                      </FormWrapper>
                    </div>
                  ) : (
                    <div className={styles.promotionMessageContent}>
                      <InfoCircleFilled className={styles.iconText} />
                      <h4>{values.sellProductMessage}</h4>
                      <div className={styles.editIcon}>
                        <EditOutlined
                          onClick={() =>
                            setFieldValue(
                              'showProductSellMessage',
                              !values?.showProductSellMessage
                            )
                          }
                        />
                      </div>
                    </div>
                  )}
                </div>
                <h4 className={styles.productTitleQuestion}>
                  {t(
                    'setup.services.servicestab.createmodal.onlinebooking.productupsell.recommendquestion',
                    {
                      what: values.name
                        ? values.name
                        : t(
                            'setup.services.servicestab.createmodal.onlinebooking.services'
                          ),
                    }
                  )}
                </h4>
                <div className={styles.productContentWrapper}>
                  <div className={styles.productWrapper}>
                    {productListData.map((product, index) => {
                      return (
                        product.verified && (
                          <div key={index} className={styles.productImg}>
                            {product.image &&
                              React.createElement(product.image)}
                          </div>
                        )
                      )
                    })}

                    <div
                      className={classNames(
                        styles.productImg,
                        styles.addProduct
                      )}
                      onClick={handleAddProduct}
                    >
                      <span>
                        <img src={AddProduct} alt="add product" />
                        <h5>
                          {t(
                            'setup.services.servicestab.createmodal.onlinebooking.productupsell.addproduct'
                          )}
                        </h5>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }
          previewContent={
            <div className={styles.productUpsellPreviewContainer}>
              <div className={styles.previewTitle}>
                <InfoCircleOutlined className={styles.infoIcon} />
                <h4 className={styles.titleContent}>
                  {t(
                    'setup.services.servicestab.createmodal.onlinebooking.productupsell.infocontent'
                  )}
                </h4>
              </div>
              <SellContent
                contentType="product"
                appointmentDetails={{
                  type: t(
                    'setup.services.servicestab.createmodal.onlinebooking.appointmenttype'
                  ),
                  clinic: t(
                    'setup.services.servicestab.createmodal.onlinebooking.appointmentclinic'
                  ),
                  address: t(
                    'setup.services.servicestab.createmodal.onlinebooking.appointmentaddress'
                  ),
                  seeingImg: AppointmentUser,
                  seeingName: t(
                    'setup.services.servicestab.createmodal.onlinebooking.appointmentseeing'
                  ),
                  time: t(
                    'setup.services.servicestab.createmodal.onlinebooking.appointmenttime'
                  ),
                  price: t(
                    'setup.services.servicestab.createmodal.onlinebooking.appointmentprice'
                  ),
                  date: t(
                    'setup.services.servicestab.createmodal.onlinebooking.appointmentdate'
                  ),
                }}
                recommendTitle={
                  values?.sellProductMessage
                    ? values?.sellProductMessage
                    : t(
                        'setup.services.servicestab.createmodal.onlinebooking.productupsellrecommendproducttitle'
                      )
                }
                productList={recommendedList}
                recommendFooterText={t(
                  'setup.services.servicestab.createmodal.onlinebooking.productupsellrecommendproductfootertitle'
                )}
              />
            </div>
          }
        />
      </div>
      <div>
        <OnlineBookingSell
          builderContent={
            <div className={styles.courseUpsellBuilderContainer}>
              <div className={styles.courseUpsellHeaderWrapper}>
                <div className={styles.courseUpsellHeaderContainer}>
                  <h3>
                    {t(
                      'setup.services.servicestab.createmodal.onlinebooking.courseupsell.title'
                    )}
                  </h3>
                  <div className={styles.enableSwitch}>
                    {t(
                      'setup.services.servicestab.createmodal.onlinebooking.courseupsell.switchlabel'
                    )}
                    <Switch size="small" style={{ marginLeft: '12px' }} />
                  </div>
                </div>
                <span className={styles.courseSubTitle}>
                  {t(
                    'setup.services.servicestab.createmodal.onlinebooking.courseupsell.subtitle'
                  )}
                </span>
              </div>
              <div className={styles.courseUpsellBuilderMessageWrapper}>
                <div>
                  {!values?.showCoursePromotionMessage ? (
                    <div
                      className={styles.createServiceSectionItem}
                      style={{ marginTop: '20px' }}
                    >
                      <FormWrapper
                        label={t(
                          'setup.services.servicestab.createmodal.onlinebooking.courseupsell.promotionmessagelabel'
                        )}
                      >
                        <AntInput.TextArea
                          className={styles.promotionMessageText}
                          rows={4}
                          value={values?.coursePromotionMessage}
                          autoFocus={true}
                          onBlur={() =>
                            setFieldValue(
                              'showCoursePromotionMessage',
                              !values?.showCoursePromotionMessage
                            )
                          }
                          onChange={(e) => {
                            setFieldValue(
                              'coursePromotionMessage',
                              e.target.value
                            )
                          }}
                        />
                      </FormWrapper>
                    </div>
                  ) : (
                    <div className={styles.promotionMessageContent}>
                      <InfoCircleFilled className={styles.iconText} />
                      <h4>{values?.coursePromotionMessage}</h4>
                      <div className={styles.editIcon}>
                        <EditOutlined
                          onClick={() =>
                            setFieldValue(
                              'showCoursePromotionMessage',
                              !values?.showCoursePromotionMessage
                            )
                          }
                        />
                      </div>
                    </div>
                  )}
                </div>
                <div className={styles.courseContentWrapper}>
                  <div className={styles.courseWrapper}>
                    {courseUpsellImages.map((item, index) => (
                      <div key={index} className={styles.courseImg}>
                        {item.course && React.createElement(item.course)}
                      </div>
                    ))}
                  </div>
                  <div className={styles.createCourseText}>
                    <InfoCircleOutlined className={styles.createInfo} />
                    <h4>
                      {' '}
                      {t(
                        'setup.services.servicestab.createmodal.onlinebooking.courseupsell.createinfomessage'
                      )}
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          }
          previewContent={
            <div className={styles.courseUpsellPreviewContainer}>
              <SellContent
                contentType="course"
                appointmentDetails={{
                  type: t(
                    'setup.services.servicestab.createmodal.onlinebooking.appointmenttype'
                  ),
                  clinic: t(
                    'setup.services.servicestab.createmodal.onlinebooking.appointmentclinic'
                  ),
                  address: t(
                    'setup.services.servicestab.createmodal.onlinebooking.appointmentaddress'
                  ),
                  seeingImg: AppointmentUser,
                  seeingName: t(
                    'setup.services.servicestab.createmodal.onlinebooking.appointmentseeing'
                  ),
                  time: t(
                    'setup.services.servicestab.createmodal.onlinebooking.appointmenttime'
                  ),
                  price: t(
                    'setup.services.servicestab.createmodal.onlinebooking.appointmentprice'
                  ),
                  date: t(
                    'setup.services.servicestab.createmodal.onlinebooking.appointmentdate'
                  ),
                }}
                recommendTitle={
                  values?.coursePromotionMessage
                    ? values?.coursePromotionMessage
                    : t(
                        'setup.services.servicestab.createmodal.onlinebooking.courseupsellrecommendtitle'
                      )
                }
                productList={recommendedCourseList}
              />
            </div>
          }
        />
      </div>
      <div>
        <OnlineBookingSell
          builderContent={
            <div className={styles.serviceCrossSellBuilderContainer}>
              <div className={styles.serviceCrossSellHeaderWrapper}>
                <div className={styles.serviceCrossSellHeaderContainer}>
                  <div className={styles.serviceCrossSellTitle}>
                    <h3>
                      {t(
                        'setup.services.servicestab.createmodal.onlinebooking.servicecrosssell.title'
                      )}
                    </h3>
                    <div className={styles.enableSwitch}>
                      {t(
                        'setup.services.servicestab.createmodal.onlinebooking.photouploading.switchlabel'
                      )}
                      <Switch size="small" style={{ marginLeft: '12px' }} />
                    </div>
                  </div>
                </div>
                <span className={styles.serviceCrossSellSubTitle}>
                  {`${t(
                    'setup.services.servicestab.createmodal.onlinebooking.servicecrosssell.subtitlestart'
                  )} ${
                    values.name ||
                    t(
                      'setup.services.servicestab.createmodal.onlinebooking.timingrules.servicename.placeholder'
                    )
                  }${t(
                    'setup.services.servicestab.createmodal.onlinebooking.servicecrosssell.subtitleend'
                  )}`}
                </span>
              </div>
              <div
                className={styles.createServiceSectionItem}
                style={{ marginTop: '24px' }}
              >
                <div>
                  {!values?.showServiceSellMessage ? (
                    <div
                      className={styles.createServiceSectionItem}
                      style={{ marginTop: '20px' }}
                    >
                      <FormWrapper
                        label={t(
                          'setup.services.servicestab.createmodal.onlinebooking.servicecrosssell.sellmessagelabel'
                        )}
                      >
                        <AntInput.TextArea
                          className={styles.promotionMessageText}
                          rows={4}
                          value={values.sellMessage}
                          autoFocus={true}
                          onBlur={() =>
                            setFieldValue(
                              'showServiceSellMessage',
                              !values?.showServiceSellMessage
                            )
                          }
                          onChange={(e) => {
                            setFieldValue('sellMessage', e.target.value)
                          }}
                        />
                      </FormWrapper>
                    </div>
                  ) : (
                    <div className={styles.promotionMessageContent}>
                      <InfoCircleFilled className={styles.iconText} />
                      <h4>{values.sellMessage}</h4>
                      <div className={styles.editIcon}>
                        <EditOutlined
                          onClick={() =>
                            setFieldValue(
                              'showServiceSellMessage',
                              !values?.showServiceSellMessage
                            )
                          }
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className={styles.serviceCrossSellAddWrapper}>
                <h4 className={styles.servicesTitleQuestion}>
                  {t(
                    'setup.services.servicestab.createmodal.onlinebooking.servicecrosssell.recommendquestion',
                    {
                      what: values.name
                        ? values.name
                        : t(
                            'setup.services.servicestab.createmodal.onlinebooking.services'
                          ),
                    }
                  )}
                </h4>
                <div className={styles.serviceContentWrapper}>
                  <div className={styles.serviceWrapper}>
                    {serviceListData?.map((services, index) => {
                      return (
                        services.verified && (
                          <div key={index} className={styles.serviceImg}>
                            {services.image &&
                              React.createElement(services.image)}
                          </div>
                        )
                      )
                    })}

                    <div
                      className={classNames(
                        styles.serviceImg,
                        styles.addService
                      )}
                      onClick={handleAddServices}
                    >
                      <span>
                        <img src={Treatment} alt="add service" />
                        <h5>
                          {t(
                            'setup.services.servicestab.createmodal.onlinebooking.productupsell.addproduct'
                          )}
                        </h5>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }
          previewContent={
            <div className={styles.serviceCrossSellPreviewContainer}>
              <SellContent
                contentType="service"
                appointmentDetails={{
                  type: t(
                    'setup.services.servicestab.createmodal.onlinebooking.appointmenttype'
                  ),
                  clinic: t(
                    'setup.services.servicestab.createmodal.onlinebooking.appointmentclinic'
                  ),
                  address: t(
                    'setup.services.servicestab.createmodal.onlinebooking.appointmentaddress'
                  ),
                  seeingImg: AppointmentUser,
                  seeingName: t(
                    'setup.services.servicestab.createmodal.onlinebooking.appointmentseeing'
                  ),
                  time: t(
                    'setup.services.servicestab.createmodal.onlinebooking.appointmenttime'
                  ),
                  price: t(
                    'setup.services.servicestab.createmodal.onlinebooking.appointmentprice'
                  ),
                  date: t(
                    'setup.services.servicestab.createmodal.onlinebooking.appointmentdate'
                  ),
                }}
                recommendTitle={
                  values?.sellMessage
                    ? values?.sellMessage
                    : t(
                        'setup.services.servicestab.createmodal.onlinebooking.servicecrosssell.sellmessage'
                      )
                }
                productList={recommendedService}
              />
            </div>
          }
        />
      </div>
      <div className={styles.photoUploadingTabWrapper}>
        <div className={styles.photoUploadingInfoContent}>
          <InfoCircleOutlined className={styles.infoIcon} />
          <h4>
            {t(
              'setup.services.servicestab.createmodal.onlinebooking.photouploading.infocontent'
            )}
          </h4>
        </div>
        <div className={styles.photoUploadingContent}>
          <div className={styles.photoUploadingSectionTitle}>
            <h2 className={styles.createServiceSectionTitle}>
              {t(
                'setup.services.servicestab.createmodal.onlinebooking.photouploading.title'
              )}
            </h2>

            <div className={styles.enableSwitch}>
              {t(
                'setup.services.servicestab.createmodal.onlinebooking.photouploading.enabledswitchlabel'
              )}
              <Switch
                size="small"
                style={{ marginLeft: '12px' }}
                defaultChecked={true}
              />
            </div>
          </div>

          <div className={styles.createServiceSectionItem}>
            <FormWrapper
              label={t(
                'setup.services.servicestab.createmodal.onlinebooking.photouploading.uploadinstructionslabel'
              )}
            >
              <FormikInput
                name="photoUploadInstructions"
                placeholder={t(
                  'setup.services.servicestab.createmodal.onlinebooking.photouploading.uploadplaceholder'
                )}
                value={t(
                  'setup.services.servicestab.createmodal.onlinebooking.photouploading.uploadplaceholder'
                ).toString()}
              />
            </FormWrapper>
          </div>
          <div className={styles.createServiceSectionItem}>
            <FormWrapper
              label={t(
                'setup.services.servicestab.createmodal.onlinebooking.photouploading.noofpictureslabel'
              )}
            >
              <InputNumber min={1} max={10} defaultValue={1} />
            </FormWrapper>
          </div>
          <div className={styles.photoMandatoryCheck}>
            <Checkbox defaultChecked={false}>
              {t(
                'setup.services.servicestab.createmodal.onlinebooking.photouploading.makeuploadphotomandatory'
              )}
            </Checkbox>
          </div>
        </div>
        <div className={styles.photoUploadingContent}>
          <h2 className={styles.createServiceSectionTitle}>
            {t(
              'setup.services.servicestab.createmodal.onlinebooking.photouploading.categories'
            )}
          </h2>
          <div className={styles.headAndNeckImagesWrapper}>
            <h3>
              {t(
                'setup.services.servicestab.createmodal.onlinebooking.photouploading.headandneck'
              )}
            </h3>
            <div className={styles.headAndNeckImageList}>
              {values?.headAndNeckList?.length > 0 &&
                values?.headAndNeckList.map((body, index) => (
                  <div
                    key={index}
                    className={
                      body.selected
                        ? classNames(styles.bodyImg, styles.active)
                        : styles.bodyImg
                    }
                    onClick={() => {
                      const data = [...values?.headAndNeckList]
                      data[index]['selected'] = !data[index]['selected']
                      setFieldValue('headAndNeckList', data)
                    }}
                  >
                    <img src={body.src} alt={body.name} />
                    <h3>{body.name}</h3>
                    <CheckCircleFilled className={styles.checkedIcon} />
                  </div>
                ))}
            </div>
          </div>
          <div className={styles.headAndNeckImagesWrapper}>
            <h3 className={styles.bodyTitle}>
              {t(
                'setup.services.servicestab.createmodal.onlinebooking.photouploading.body'
              )}
            </h3>
            <div className={styles.headAndNeckImageList}>
              {values?.bodyPartList?.length > 0 &&
                values?.bodyPartList.map((body, index) => (
                  <div
                    key={index}
                    className={
                      body.selected
                        ? classNames(styles.bodyImg, styles.active)
                        : styles.bodyImg
                    }
                    onClick={() => {
                      const data = [...values?.bodyPartList]
                      data[index]['selected'] = !data[index]['selected']
                      setFieldValue('bodyPartList', data)
                    }}
                  >
                    <img src={body.src} alt={body.name} />
                    <h3>{body.name}</h3>
                    <CheckCircleFilled className={styles.checkedIcon} />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.promotionTabWrapper}>
        <Row justify="center" className={styles.promotionButtonGroup}>
          <Radio.Group defaultValue="Builder" buttonStyle="solid">
            <Radio.Button
              className={styles.radioBuilderButton}
              value="Builder"
              onClick={() => setFieldValue('promotionView', 'Builder')}
            >
              {t(
                'setup.services.servicestab.createmodal.onlinebooking.promotion.builder'
              )}
            </Radio.Button>
            <Radio.Button
              className={styles.radioPreviewButton}
              value="Preview"
              onClick={() => setFieldValue('promotionView', 'Preview')}
            >
              {t(
                'setup.services.servicestab.createmodal.onlinebooking.promotion.preview'
              )}
            </Radio.Button>
          </Radio.Group>
        </Row>
        {values.promotionView === 'Builder' ? (
          <div className={styles.promotionContentWrapper}>
            <h2 className={styles.promotionTitle}>
              {t(
                'setup.services.servicestab.createmodal.onlinebooking.promotion.title'
              )}
            </h2>
            <h3>
              {t(
                'setup.services.servicestab.createmodal.onlinebooking.promotion.subtitle'
              )}
            </h3>
            <div className={styles.stepProgress}>
              <AntSlider
                marks={{
                  0: {
                    style: {
                      color: '#9292A3',
                      transform: 'translateX(-2%)',
                    },
                    label: (
                      <>
                        {t(
                          'setup.services.servicestab.createmodal.onlinebooking.promotion.nodiscount'
                        )}
                      </>
                    ),
                  },
                  33: {
                    style: {
                      color: '#9292A3',
                    },
                    label: (
                      <>
                        {t(
                          'setup.services.servicestab.createmodal.onlinebooking.promotion.lastbooking'
                        )}
                      </>
                    ),
                  },
                  66: {
                    style: {
                      color: '#9292A3',
                    },
                    label: (
                      <>
                        {t(
                          'setup.services.servicestab.createmodal.onlinebooking.promotion.strict'
                        )}
                      </>
                    ),
                  },
                  100: {
                    style: {
                      color: '#9292A3',
                      transform: 'translateX(-95%)',
                    },
                    label: (
                      <>
                        {t(
                          'setup.services.servicestab.createmodal.onlinebooking.promotion.kind'
                        )}
                      </>
                    ),
                  },
                }}
                handleStyle={{
                  backgroundColor: 'var(--primary-color)',
                  borderColor: 'var(--primary-color)',
                  width: '16px',
                  height: '16px',
                  marginTop: '-6px',
                }}
                trackStyle={{
                  backgroundColor: 'var(--primary-color)',
                  boxShadow: '0px 0px 4px rgba(23, 27, 28, 0.4)',
                }}
                defaultValue={66}
                tooltipVisible={false}
                className={styles.sliderStepDiscount}
                step={null}
              />
            </div>
            <div className={styles.percentageDicountWrapper}>
              <FormWrapper
                label={t(
                  'setup.services.servicestab.createmodal.onlinebooking.promotion.percentagediscountlabel'
                )}
              >
                <FormikInput
                  width={132}
                  name="percentageDiscount"
                  value={values.discount}
                  suffix={<PercentageOutlined />}
                  onChange={(e) => setFieldValue('discount', e.target.value)}
                />
              </FormWrapper>
            </div>
            <div className={styles.discountTimeChartWrapper}>
              <div className={styles.chartContainer}>
                <DiscountTimeChart />
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.promotionPreviewContentWrapper}>
            <div className={styles.discountText}>
              <PercentageOutlined />
              <h3>
                {t(
                  'setup.services.servicestab.createmodal.onlinebooking.promotion.preview.discountinfocontent'
                )}
              </h3>
            </div>
            <div className={styles.previewConsultationMain}>
              <div className={styles.previewConsultationWrapper}>
                <div className={styles.consultationNameContent}>
                  <div className={styles.nameWrapper}>
                    <h3>
                      {values?.name
                        ? values.name
                        : t(
                            'setup.services.servicestab.createmodal.onlinebooking.promotion.preview.acneconsultation'
                          )}
                    </h3>
                    <InfoCircleOutlined style={{ color: '#3D3D46' }} />
                  </div>
                  <div className={styles.nameWrapper}>
                    <h4>
                      {t(
                        'setup.services.servicestab.createmodal.onlinebooking.promotion.preview.40min'
                      )}
                    </h4>
                    <ClockCircleOutlined style={{ color: '#737387' }} />
                  </div>
                </div>
                <div className={styles.infoContentWrapper}>
                  <div className={styles.ratingWrapper}>
                    <Rate
                      value={5}
                      style={{ color: '#FAAD14', fontSize: '12px' }}
                    />
                    <h4>
                      {t(
                        'setup.services.servicestab.createmodal.onlinebooking.promotion.preview.reviews'
                      )}
                    </h4>
                  </div>
                  <div className={styles.priceWrapper}>
                    <h4>
                      {t(
                        'setup.services.servicestab.createmodal.onlinebooking.promotion.preview.saveupto',
                        {
                          what: values.discount,
                        }
                      )}
                    </h4>
                    <h3>
                      {stringToCurrencySignConverter('GBP')}{' '}
                      {values.servicePrice
                        ? (
                            Number.parseInt(values.servicePrice) -
                            (Number.parseInt(values.servicePrice) *
                              values.discount) /
                              100
                          ).toFixed(2)
                        : values.previewPrice}
                    </h3>
                  </div>
                </div>
              </div>
              <div className={styles.previewConsultationWrapper}>
                <div className={styles.nameSkeletonWrapper}>
                  {nameSkeleton.map((item, index) => (
                    <Skeleton.Input
                      key={index}
                      size="small"
                      className={styles[item]}
                    />
                  ))}
                </div>
                <div className={styles.ratingSkeletonWrapper}>
                  <div>
                    {rateSkeleton.map((item, index) => (
                      <Skeleton.Input
                        key={index}
                        size="small"
                        className={styles[item]}
                      />
                    ))}
                  </div>
                  <Skeleton.Input
                    size="small"
                    className={styles.priceSkeleton}
                  />
                </div>
              </div>
              <div className={styles.previewConsultationWrapper}>
                <div className={styles.nameSkeletonWrapper}>
                  {nameSkeleton.map((item, index) => (
                    <Skeleton.Input
                      key={index}
                      size="small"
                      className={styles[item]}
                    />
                  ))}
                </div>
                <div className={styles.ratingSkeletonWrapper}>
                  <div>
                    {rateSkeleton.map((item, index) => (
                      <Skeleton.Input
                        key={index}
                        size="small"
                        className={styles[item]}
                      />
                    ))}
                  </div>
                  <Skeleton.Input
                    size="small"
                    className={styles.priceSkeleton}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </TabMenu>
  )
}

export default OnlineBooking
