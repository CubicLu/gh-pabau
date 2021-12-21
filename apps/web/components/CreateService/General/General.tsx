import React, { FC } from 'react'
import {
  FormikInput,
  Slider,
  Button,
  ImageSelectorModal,
  Checkbox,
} from '@pabau/ui'
import {
  CalendarOutlined,
  DeleteOutlined,
  MenuOutlined,
  PictureOutlined,
  PlusCircleOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
  TeamOutlined,
  VideoCameraOutlined,
  CloseCircleFilled,
} from '@ant-design/icons'
import { Collapse, Select, Popover, Tooltip, Divider, InputNumber } from 'antd'
import { useTranslationI18 } from '../../../hooks/useTranslationI18'
import classNames from 'classnames'
import FormWrapper from '../FormWrapper'
import { CreateServiceType } from '../CreateService'
import styles from '../CreateService.module.less'

const { Panel } = Collapse
const { Option, OptGroup } = Select

interface CategoriesProps {
  groupTitle: string
  groupItems: Array<string>
}

interface DurationProps {
  title: string
  value: string
}

interface GeneralProps {
  categories: CategoriesProps[]
  addColorsContent: (setFieldValue, value) => React.ReactNode
  visibleColors: boolean
  setVisibleColors: (e) => void
  showImageSelector: boolean
  setShowImageSelector: (e) => void
  durations: DurationProps[]
  handleRemoveBundleItem: (
    e,
    bundleItems,
    bundleItemsAmount,
    bundleItemsDuration,
    bundleList,
    setFieldValue
  ) => void
  handleAddBundleItem: (
    e,
    bundleItems,
    bundleItemsAmount,
    bundleItemsDuration,
    bundleList,
    setFieldValue
  ) => void
  values: CreateServiceType
  setFieldValue(
    field: keyof CreateServiceType,
    value: string | string[] | boolean | number
  ): void
}

const General: FC<GeneralProps> = ({
  categories,
  addColorsContent,
  visibleColors,
  setVisibleColors,
  showImageSelector,
  setShowImageSelector,
  durations,
  handleRemoveBundleItem,
  handleAddBundleItem,
  values,
  setFieldValue,
}) => {
  const { t } = useTranslationI18()
  return (
    <div className={styles.createServiceGeneral}>
      <div className={styles.createServiceSection}>
        <h2 className={styles.createServiceSectionTitle}>
          {t('setup.services.servicestab.createmodal.general.servicedetails')}
        </h2>
        <div className={styles.createServiceSectionItem}>
          <FormWrapper
            label={t(
              'setup.services.servicestab.createmodal.general.servicename'
            )}
          >
            <FormikInput
              name="serviceName"
              placeholder={t(
                'setup.services.servicestab.createmodal.general.servicename.placeholder'
              )}
              value={values.name}
              onChange={(e) => setFieldValue('name', e.target.value)}
            />
          </FormWrapper>
        </div>
        {values.type !== 'Service' && (
          <div className={styles.createServiceSectionItem}>
            <FormWrapper
              label={t(
                'setup.services.servicestab.createmodal.general.maxclients'
              )}
            >
              <Slider
                title={''}
                value={values?.clients ? values?.clients : 1}
                onChange={(e) => setFieldValue('clients', e)}
                calculatedValue={`${values.clients}`}
                min={1}
                max={50}
              />
            </FormWrapper>
          </div>
        )}
        <div className={styles.createServiceSectionItem}>
          <FormWrapper
            label={t(
              'setup.services.servicestab.createmodal.general.servicecode'
            )}
          >
            <FormikInput
              name="serviceCode"
              placeholder={t(
                'setup.services.servicestab.createmodal.general.servicecode.placeholder'
              )}
              value={values.code}
              onChange={(e) => setFieldValue('code', e.target.value)}
            />
          </FormWrapper>
        </div>
        <div className={styles.createServiceSectionItem}>
          <FormWrapper
            label={t('setup.services.servicestab.createmodal.general.category')}
          >
            <Select
              style={{ width: '100%' }}
              placeholder={t(
                'setup.services.servicestab.createmodal.general.category.placeholder'
              )}
              value={values.category}
              onSelect={(val: string) => setFieldValue('category', val)}
            >
              {categories.map((item) => (
                <OptGroup
                  label={
                    <span
                      style={{
                        color: 'var(--grey-text-color)',
                        fontSize: '14px',
                      }}
                    >
                      {item?.groupTitle}
                    </span>
                  }
                  key={item?.groupTitle}
                >
                  {item?.groupItems?.map((subItem) => (
                    <Option key={subItem} value={subItem}>
                      {subItem}
                    </Option>
                  ))}
                </OptGroup>
              ))}
            </Select>
          </FormWrapper>
        </div>
        <div className={styles.appointmentColor}>
          <p className={styles.appointmentColorTitle}>
            {t(
              'setup.services.servicestab.createmodal.general.appointmentcolour'
            )}
          </p>
          <div className={styles.appointmentColorItems}>
            {values.apColors &&
              values.apColors.length > 0 &&
              values.apColors.map((color) => (
                <div
                  key={color}
                  className={
                    color === values.color
                      ? classNames(
                          styles.appointmentColorItem,
                          styles.appointmentColorSelected
                        )
                      : styles.appointmentColorItem
                  }
                  onClick={() => setFieldValue('color', color)}
                >
                  <div
                    style={{
                      backgroundColor: color,
                    }}
                  />
                </div>
              ))}
            <Popover
              content={addColorsContent(setFieldValue, values.color)}
              trigger="click"
              overlayClassName={styles.customColorPiker}
              visible={visibleColors}
              onVisibleChange={(val) => setVisibleColors(val)}
            >
              <div className={styles.addCustomColor}>
                <PlusCircleOutlined
                  style={
                    visibleColors ? { color: '#54b2d3' } : { color: '#9292A3' }
                  }
                />
              </div>
            </Popover>
          </div>
          <div>
            <p className={styles.createServiceSectionItemTitle}>
              {t('setup.services.servicestab.createmodal.general.image')}
            </p>
            <div
              className={styles.createServiceImageContainer}
              style={{ backgroundImage: `url(${values.image})` }}
            >
              {values.image && (
                <span
                  className={styles.serviceCloseIcon}
                  onClick={() => setFieldValue('image', '')}
                >
                  <CloseCircleFilled />
                </span>
              )}
              {!values.image && (
                <PictureOutlined
                  style={{
                    color: 'var(--light-grey-color)',
                    fontSize: '32px',
                  }}
                />
              )}
            </div>
            <Button
              icon={<PlusOutlined />}
              onClick={() => setShowImageSelector(true)}
            >
              {t(
                'setup.services.servicestab.createmodal.general.choosefromlibrary'
              )}
            </Button>
            <ImageSelectorModal
              visible={showImageSelector}
              initialSearch={values.name}
              onOk={(image) => {
                setFieldValue('image', image.source)
                setShowImageSelector(false)
              }}
              onCancel={() => {
                setShowImageSelector(false)
              }}
            />
          </div>
        </div>
      </div>
      <div className={styles.bundleServices}>
        <Collapse ghost>
          <Panel
            header={t(
              'setup.services.servicestab.createmodal.general.bundleservices'
            )}
            key="bundle-services-together"
          >
            <div className={styles.createServiceSection}>
              <h2
                className={styles.createServiceSectionTitle}
                style={{ margin: 0 }}
              >
                {t(
                  'setup.services.servicestab.createmodal.general.bundling.create'
                )}{' '}
                <Tooltip
                  title={t(
                    'setup.services.servicestab.createmodal.general.bundling.tooltip'
                  )}
                >
                  <QuestionCircleOutlined
                    style={{
                      color: 'var(--light-grey-color)',
                      marginLeft: '5px',
                    }}
                  />
                </Tooltip>
              </h2>
              <h3
                className={styles.createServiceSectionSubTitle}
                style={{ marginBottom: '1rem' }}
              >
                {t(
                  'setup.services.servicestab.createmodal.general.bundling.subtitle',
                  {
                    what: values.name
                      ? values.name
                      : t(
                          'setup.services.servicestab.createmodal.general.bundling.subtitle.value'
                        ),
                  }
                )}
              </h3>
              <div className={styles.createServiceBundlingWrapper}>
                <div className={styles.bundleListWrapper}>
                  {values?.bundleItems?.length > 0 &&
                    values?.bundleItems?.map((item, index) => (
                      <div key={index} className={styles.createServiceBundling}>
                        <div className={styles.menuIcon}>
                          <MenuOutlined />
                        </div>
                        <div className={styles.serviceName}>
                          <span
                            className={styles.dot}
                            style={{
                              backgroundColor: `${item?.color}`,
                              borderColor: `${item?.color}`,
                            }}
                          />
                          <span>
                            {item.type === 'Service' ? (
                              <CalendarOutlined />
                            ) : item.type === 'Virtual' ? (
                              <VideoCameraOutlined />
                            ) : item.type === 'Class' ? (
                              <TeamOutlined />
                            ) : null}
                          </span>
                          <span>{item?.service_name}</span>
                        </div>
                        <div className={styles.time}>
                          {
                            durations.find((t) => t.value === item.duration)
                              ?.title
                          }
                        </div>
                        <div className={styles.price}>
                          £{item.service_price}
                        </div>
                        <div className={styles.removeItem}>
                          <DeleteOutlined
                            onClick={() => {
                              handleRemoveBundleItem(
                                index,
                                values.bundleItems,
                                values.bundleItemsAmount,
                                values.bundleItemsDuration,
                                values.bundleList,
                                setFieldValue
                              )
                            }}
                          />
                        </div>
                      </div>
                    ))}
                </div>
                <div className={styles.addServiceAmountWrapper}>
                  <Select
                    style={{ width: '180px' }}
                    placeholder={t(
                      'setup.services.servicestab.createmodal.general.bundling.addserviceitem'
                    )}
                    onSelect={(val: string) => {
                      handleAddBundleItem(
                        val,
                        values.bundleItems,
                        values.bundleItemsAmount,
                        values.bundleItemsDuration,
                        values.bundleList,
                        setFieldValue
                      )
                    }}
                  >
                    {values?.bundleList?.length > 0 &&
                      values?.bundleList.map((item) => (
                        <Option key={item.id} value={item.service_name}>
                          {item.service_name}
                        </Option>
                      ))}
                  </Select>
                  <div className={styles.amountContent}>
                    <h4 className={styles.grandTotal}>
                      {t(
                        'setup.services.servicestab.createmodal.general.bundling.grandtotal'
                      )}
                    </h4>
                    <h3 className={styles.amount}>
                      {values.bundleItemsAmount && values.bundleItemsDuration
                        ? `£ ${values.bundleItemsAmount} (${
                            values.bundleItemsDuration.split(':')[0]
                          } ${t(
                            'setup.services.servicestab.createmodal.general.bundling.hrtime'
                          )}, ${values.bundleItemsDuration.split(':')[1]} ${t(
                            'setup.services.servicestab.createmodal.general.bundling.minstime'
                          )})`
                        : `£ 0.00 (00 hr, 00mins )`}
                    </h3>
                    <h4 className={styles.totalAmount}>
                      {t(
                        'setup.services.servicestab.createmodal.general.bundling.totalamount'
                      )}
                    </h4>
                  </div>
                </div>
                <div>
                  <h4 className={styles.extraOptions}>
                    {t(
                      'setup.services.servicestab.createmodal.general.bundling.extraoptions'
                    )}
                  </h4>
                  <div className={styles.createServiceSectionItem}>
                    <FormWrapper
                      label={t(
                        'setup.services.servicestab.createmodal.general.bundling.schedulettype'
                      )}
                    >
                      <Select
                        style={{ width: '100%' }}
                        placeholder={t(
                          'setup.services.servicestab.createmodal.general.bundling.schedulettypeplaceholder'
                        )}
                      >
                        <Option key={'subItem'} value={'subItem'}>
                          {t(
                            'setup.services.servicestab.createmodal.general.bundling.schedulettypeplaceholder'
                          )}
                        </Option>
                      </Select>
                    </FormWrapper>
                  </div>
                  <div className={styles.createServiceSectionItem}>
                    <span>
                      {t(
                        'setup.services.servicestab.createmodal.general.bundling.footertextstart'
                      )}{' '}
                      <span style={{ color: '#54b2d3' }}>
                        {t(
                          'setup.services.servicestab.createmodal.general.bundling.footerlearnmore'
                        )}
                      </span>{' '}
                      {t(
                        'setup.services.servicestab.createmodal.general.bundling.footertextend'
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
                  'setup.services.servicestab.createmodal.general.autoconsumption'
                )}{' '}
                <Tooltip
                  title={t(
                    'setup.services.servicestab.createmodal.general.autoconsumption.tooltip'
                  )}
                >
                  <QuestionCircleOutlined
                    style={{
                      color: 'var(--light-grey-color)',
                      marginLeft: '5px',
                    }}
                  />
                </Tooltip>
              </h2>
              <div className={styles.createServiceAutoConsumption}>
                <div>
                  <Select
                    placeholder={t(
                      'setup.services.servicestab.createmodal.general.autoconsumption.selectproduct.placeholder'
                    )}
                  />
                </div>
                <div>
                  <InputNumber
                    placeholder={t(
                      'setup.services.servicestab.createmodal.general.bundling.value'
                    )}
                  />
                </div>
              </div>
              <div>
                <Checkbox defaultChecked={false}>
                  {t(
                    'setup.services.servicestab.createmodal.general.autoconsumption.consumablededuction'
                  )}
                </Checkbox>
              </div>
              <Divider style={{ margin: '15px 0' }} />
              <Button icon={<PlusOutlined />}>
                {t(
                  'setup.services.servicestab.createmodal.general.autoconsumption.addnewitem'
                )}
              </Button>
            </div>
            <div className={styles.createServiceSection} style={{ margin: 0 }}>
              <h2 className={styles.createServiceSectionTitle}>
                {t(
                  'setup.services.servicestab.createmodal.general.financialinformation'
                )}
              </h2>
              <div className={styles.createServiceSectionItem}>
                <FormWrapper
                  label={t(
                    'setup.services.servicestab.createmodal.general.financialinformation.sku'
                  )}
                >
                  <FormikInput
                    name="sku"
                    placeholder={t(
                      'setup.services.servicestab.createmodal.general.financialinformation.sku.placeholder'
                    )}
                    value={values.sku}
                    onChange={(e) => setFieldValue('sku', e.target.value)}
                  />
                </FormWrapper>
              </div>
              <div className={styles.createServiceSectionItem}>
                <FormWrapper
                  label={t(
                    'setup.services.servicestab.createmodal.general.financialinformation.procedurecode'
                  )}
                  tooltip={t(
                    'setup.services.servicestab.createmodal.general.financialinformation.procedurecode.tooltip'
                  )}
                >
                  <FormikInput
                    name="procedureCode"
                    placeholder={t(
                      'setup.services.servicestab.createmodal.general.financialinformation.procedurecode.placeholder'
                    )}
                    value={values.procedureCode}
                    onChange={(e) =>
                      setFieldValue('procedureCode', e.target.value)
                    }
                  />
                </FormWrapper>
              </div>
              <div className={styles.createServiceSectionItem}>
                <FormWrapper
                  label={t(
                    'setup.services.servicestab.createmodal.general.financialinformation.invoiceitemname'
                  )}
                  tooltip={t(
                    'setup.services.servicestab.createmodal.general.financialinformation.invoiceitemname.tooltip'
                  )}
                >
                  <FormikInput
                    name="invoiceItemName"
                    placeholder={t(
                      'setup.services.servicestab.createmodal.general.financialinformation.invoiceitemname.placeholder'
                    )}
                    value={values.invoiceItemName}
                    onChange={(e) =>
                      setFieldValue('invoiceItemName', e.target.value)
                    }
                  />
                </FormWrapper>
              </div>
              <div className={styles.createServiceSectionItem}>
                <FormWrapper
                  label={t(
                    'setup.services.servicestab.createmodal.general.financialinformation.displaytextoninvoice'
                  )}
                  tooltip={t(
                    'setup.services.servicestab.createmodal.general.financialinformation.displaytextoninvoice.tooltip'
                  )}
                >
                  <FormikInput
                    name="displayTextOnInvoice"
                    placeholder={t(
                      'setup.services.servicestab.createmodal.general.financialinformation.displaytextoninvoice.placeholder'
                    )}
                    value={values.displayTextOnInvoice}
                    onChange={(e) =>
                      setFieldValue('displayTextOnInvoice', e.target.value)
                    }
                  />
                </FormWrapper>
              </div>
              <div>
                <Checkbox
                  defaultChecked={values.packageSession}
                  onChange={(e) =>
                    setFieldValue('packageSession', e.target.checked)
                  }
                >
                  {t(
                    'setup.services.servicestab.createmodal.general.financialinformation.packagesession'
                  )}{' '}
                  <Tooltip
                    title={t(
                      'setup.services.servicestab.createmodal.general.financialinformation.packagesession.tooltip'
                    )}
                  >
                    <QuestionCircleOutlined
                      style={{
                        color: 'var(--light-grey-color)',
                        marginLeft: '5px',
                      }}
                    />
                  </Tooltip>
                </Checkbox>
              </div>
            </div>
          </Panel>
        </Collapse>
      </div>
    </div>
  )
}

export default General
