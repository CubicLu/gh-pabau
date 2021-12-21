import React, { FC } from 'react'
import { Collapse, Form, Select, Tooltip } from 'antd'
import {
  CheckCircleFilled,
  EnvironmentOutlined,
  PercentageOutlined,
  QuestionCircleOutlined,
  ReadOutlined,
} from '@ant-design/icons'
import { ReactComponent as Money } from '../../../assets/images/pricing/money.svg'
import { Avatar, Checkbox, CurrencyInput } from '@pabau/ui'
import { useTranslationI18 } from '../../../hooks/useTranslationI18'
import { ContractItem, CreateServiceType } from '../CreateService'
import styles from '../CreateService.module.less'

const { Panel } = Collapse
const { Option } = Select

interface pricingOptions {
  title: string
  value: string
  isBook: boolean
  isSell: boolean
  selected: boolean
}
interface durations {
  title: string
  value: string
}
interface paymentProcessing {
  type: string
  value: string
  selected: boolean
}
interface PricingTabProps {
  contractList: ContractItem[]
  values: CreateServiceType
  setFieldValue(
    field: keyof CreateServiceType,
    value: string | string[] | boolean | number
  ): void
  pricingOptions: pricingOptions[]
  handleSelectPricingOption: (option, setFieldValue) => void
  durations: durations[]
  paymentProcessing: paymentProcessing[]
  handleEmployeePricingDuration: (key, type, val, setFieldValue) => void
  handleLocationPricing: (key, val, setFieldValue) => void
  handleContractPricing: (key, val, setFieldValue) => void
  handleSelectPaymentProcessingOption: (item, setFieldValue) => void
}

const PricingTab: FC<PricingTabProps> = ({
  contractList,
  values,
  setFieldValue,
  pricingOptions,
  handleSelectPricingOption,
  durations,
  paymentProcessing,
  handleEmployeePricingDuration,
  handleLocationPricing,
  handleContractPricing,
  handleSelectPaymentProcessingOption,
}) => {
  const { t } = useTranslationI18()
  const [form] = Form.useForm()
  return (
    <div className={styles.createServicePricing}>
      <div className={styles.createServiceSection}>
        <h2 className={styles.createServiceSectionTitle} style={{ margin: 0 }}>
          {t('setup.services.servicestab.createmodal.pricing.pricing&duration')}{' '}
          <Tooltip
            title={t(
              'setup.services.servicestab.createmodal.pricing.pricing&duration.tooltip'
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
            'setup.services.servicestab.createmodal.pricing.pricing&duration.subtitle'
          )}
        </h3>
        <div className={styles.createServiceSectionItem}>
          <div className={styles.pricingOptions}>
            {pricingOptions.map((option) => (
              <div
                key={option.title}
                className={
                  option.value === values.pricingOption
                    ? styles.pricingOptionSelected
                    : ''
                }
                onClick={() => handleSelectPricingOption(option, setFieldValue)}
              >
                <div className={styles.pricingOptionLogos}>
                  {option.isBook && (
                    <ReadOutlined className={styles.readBook} />
                  )}
                  {option.isSell && <Money />}
                </div>
                <div className={styles.pricingOptionTitle}>{option.title}</div>
                <div className={styles.pricingChecked}>
                  <CheckCircleFilled />
                </div>
                <Tooltip
                  title={t(
                    'setup.services.servicestab.createmodal.pricing.pricingoptions.placeholder'
                  )}
                  mouseLeaveDelay={2}
                >
                  <div className={styles.tooltipContainer} />
                </Tooltip>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.createServiceSectionItem}>
          <Form form={form} layout="vertical">
            <Form.Item
              label={t(
                'setup.services.servicestab.createmodal.pricing.serviceprice'
              )}
            >
              <CurrencyInput
                unit="GBP"
                value={values.servicePrice}
                onChange={(val) => setFieldValue('servicePrice', val.value)}
              />
            </Form.Item>
          </Form>
        </div>
        <div className={styles.createServiceSectionItem}>
          <Form form={form} layout="vertical">
            <Form.Item
              label={t(
                'setup.services.servicestab.createmodal.pricing.duration'
              )}
            >
              <Select
                placeholder={t(
                  'setup.services.servicestab.createmodal.pricing.duration.placeholder'
                )}
                defaultValue={values.duration}
                onSelect={(val: string) => setFieldValue('duration', val)}
              >
                {durations.map((duration) => (
                  <Option key={duration.value} value={duration.value}>
                    {duration.title}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Form>
        </div>
        <div className={styles.createServiceSectionItem}>
          <Form form={form} layout="vertical">
            <Form.Item
              label={t('setup.services.servicestab.createmodal.pricing.tax')}
            >
              <Select
                placeholder={t(
                  'setup.services.servicestab.createmodal.pricing.tax.placeholder'
                )}
                defaultValue={values.tax}
                onSelect={(val: string) => setFieldValue('tax', val)}
              >
                <Option selected value="defaultSetting">
                  {t(
                    'setup.services.servicestab.createmodal.pricing.tax.defaulttaxsetting'
                  )}
                </Option>
              </Select>
            </Form.Item>
          </Form>
        </div>
      </div>
      <div className={styles.advancedSettings}>
        <Collapse ghost>
          <Panel
            header={t(
              'setup.services.servicestab.createmodal.pricing.specialpricing'
            )}
            key="special-pricing-options"
          >
            <div className={styles.createServiceSection}>
              <h2
                className={styles.createServiceSectionTitle}
                style={{ margin: 0 }}
              >
                {t(
                  'setup.services.servicestab.createmodal.pricing.specialpricing.employees'
                )}
              </h2>
              <h3
                className={styles.createServiceSectionSubTitle}
                style={{ marginBottom: '1rem' }}
              >
                {t(
                  'setup.services.servicestab.createmodal.pricing.specialpricing.employees.subtitle'
                )}
              </h3>
              <div className={styles.teamMemberPricingHeader}>
                <div>
                  {t(
                    'setup.services.servicestab.createmodal.pricing.specialpricing.employees.name'
                  )}
                </div>
                <div>
                  <span>
                    {t(
                      'setup.services.servicestab.createmodal.pricing.specialpricing.employees.price'
                    )}
                  </span>
                  <span>
                    {t(
                      'setup.services.servicestab.createmodal.pricing.specialpricing.employees.duration'
                    )}
                  </span>
                </div>
              </div>
              {values.empData &&
                values.empData.length > 0 &&
                values.empData
                  .filter((item) => item.selected === true)
                  .map((item, index) => (
                    <div className={styles.teamMemberPricing} key={item.name}>
                      <div>
                        <Avatar src={item?.avatar} name={item.name} size={40} />
                        <span>{item.name}</span>
                      </div>
                      <div>
                        <div className={styles.currencyInput}>
                          <CurrencyInput
                            unit="GBP"
                            placeholder={`${values.servicePrice}`}
                            value={item.price}
                            onChange={(val) =>
                              handleEmployeePricingDuration(
                                index,
                                'price',
                                val.value,
                                setFieldValue
                              )
                            }
                          />
                        </div>
                        <div>
                          <Select
                            placeholder={item.duration}
                            defaultValue={item.duration}
                            onSelect={(e) => {
                              handleEmployeePricingDuration(
                                index,
                                'duration',
                                e,
                                setFieldValue
                              )
                            }}
                          >
                            {durations.map((item) => (
                              <Option key={item.value} value={item.value}>
                                {item.title}
                              </Option>
                            ))}
                          </Select>
                        </div>
                      </div>
                    </div>
                  ))}
            </div>
            <div className={styles.createServiceSection}>
              <h2
                className={styles.createServiceSectionTitle}
                style={{ margin: 0 }}
              >
                {t(
                  'setup.services.servicestab.createmodal.pricing.specialpricing.location'
                )}
              </h2>
              <h3
                className={styles.createServiceSectionSubTitle}
                style={{ marginBottom: '1rem' }}
              >
                {t(
                  'setup.services.servicestab.createmodal.pricing.specialpricing.location.subtitle'
                )}
              </h3>
              <div className={styles.locationPricingHeader}>
                <span>
                  {t(
                    'setup.services.servicestab.createmodal.pricing.specialpricing.employees.name'
                  )}
                </span>
                <span>
                  {t(
                    'setup.services.servicestab.createmodal.pricing.specialpricing.employees.price'
                  )}
                </span>
              </div>
              {values.locData &&
                values.locData.length > 0 &&
                values.locData
                  .filter((item) => item.selected === true)
                  .map((item, index) => (
                    <div
                      className={styles.locationPricingItem}
                      key={item.location}
                    >
                      <div>
                        <div
                          style={{
                            backgroundImage: item.img
                              ? `url(${item.img})`
                              : 'none',
                          }}
                        >
                          {!item.img && (
                            <EnvironmentOutlined className={styles.envIcon} />
                          )}
                        </div>
                        <div>
                          <span>{item.location}</span>
                          <span>{item.detail}</span>
                        </div>
                      </div>
                      <div>
                        <CurrencyInput
                          placeholder={`${values.servicePrice}`}
                          unit="GBP"
                          value={item?.price}
                          onChange={(val) =>
                            handleLocationPricing(
                              index,
                              val.value,
                              setFieldValue
                            )
                          }
                        />
                      </div>
                    </div>
                  ))}
            </div>
            <div className={styles.createServiceSection}>
              <h2
                className={styles.createServiceSectionTitle}
                style={{ margin: 0 }}
              >
                {t(
                  'setup.services.servicestab.createmodal.pricing.specialpricing.contract'
                )}
              </h2>
              <h3
                className={styles.createServiceSectionSubTitle}
                style={{ marginBottom: '1rem' }}
              >
                {t(
                  'setup.services.servicestab.createmodal.pricing.specialpricing.contract.subtitle'
                )}
              </h3>
              <div className={styles.contractPricingHeader}>
                <span>
                  {t(
                    'setup.services.servicestab.createmodal.pricing.specialpricing.employees.name'
                  )}
                </span>
                <span>
                  {t(
                    'setup.services.servicestab.createmodal.pricing.specialpricing.employees.price'
                  )}
                </span>
              </div>
              {contractList.map((item, index) => (
                <div className={styles.contractPricingItem} key={item.name}>
                  <div>
                    <div>{item.logo}</div>
                    <div>
                      <span>{item.key}</span>
                      <span>{item.type}</span>
                    </div>
                  </div>
                  <div>
                    <CurrencyInput
                      placeholder={`${values.servicePrice}`}
                      unit="GBP"
                      value={item?.price}
                      onChange={(val) =>
                        handleContractPricing(index, val.value, setFieldValue)
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        </Collapse>
      </div>
      <div className={styles.createServiceSection}>
        <h2 className={styles.createServiceSectionTitle} style={{ margin: 0 }}>
          {t(
            'setup.services.servicestab.createmodal.pricing.deposits&onlinepayments'
          )}
        </h2>
        <h3
          className={styles.createServiceSectionSubTitle}
          style={{ marginBottom: '1rem' }}
        >
          {t(
            'setup.services.servicestab.createmodal.pricing.deposits&onlinepayments.subtitle'
          )}
        </h3>
        <div className={styles.createServiceSectionItem}>
          <div className={styles.paymentProcessing}>
            {paymentProcessing.map((option) => (
              <div
                key={option.value}
                className={
                  option.value === values.onlinePayment
                    ? styles.paymentProcessingOptionSelected
                    : ''
                }
                onClick={() =>
                  handleSelectPaymentProcessingOption(option, setFieldValue)
                }
              >
                <div className={styles.paymentProcessingOptionLogos}>
                  {option.value === 'Amount' && <Money />}
                  {option.value === 'Percent' && <PercentageOutlined />}
                </div>
                <div className={styles.paymentProcessingOptionTitle}>
                  {option.type}
                </div>
                <div className={styles.paymentProcessingChecked}>
                  <CheckCircleFilled />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.createServiceSectionItem}>
          <Form form={form} layout="vertical">
            <Form.Item
              label={t(
                'setup.services.servicestab.createmodal.pricing.deposits&onlinepayments.amount'
              )}
            >
              <CurrencyInput
                placeholder={`${values.servicePrice}`}
                unit={values.onlinePayment === 'Amount' ? 'GBP' : 'PER'}
                value={values.onlinePaymentAmount}
                onChange={(val) =>
                  setFieldValue('onlinePaymentAmount', val.value)
                }
              />
            </Form.Item>
          </Form>
        </div>
        <div className={styles.createServiceSectionItem}>
          <Checkbox
            defaultChecked={values.completingBooking}
            onChange={(val) =>
              setFieldValue('completingBooking', val.target.checked)
            }
          >
            {t(
              'setup.services.servicestab.createmodal.pricing.deposits&onlinepayments.completingonline'
            )}
          </Checkbox>
        </div>
        <div className={styles.createServiceSectionItem} style={{ margin: 0 }}>
          <Checkbox
            defaultChecked={values.paymentBeforeBooking}
            onChange={(val) =>
              setFieldValue('paymentBeforeBooking', val.target.checked)
            }
          >
            {t(
              'setup.services.servicestab.createmodal.pricing.deposits&onlinepayments.paymentbeforebooking'
            )}
          </Checkbox>
        </div>
      </div>
    </div>
  )
}

export default PricingTab
