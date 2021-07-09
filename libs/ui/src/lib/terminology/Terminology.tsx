import { Input } from '@pabau/ui'
import { Button, Col, Divider, Row, Skeleton } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './Terminology.module.less'

interface TerminologyConfigItem {
  key: string
  label?: string
  value: string
}

export interface TerminologyConfig {
  title: string
  items: TerminologyConfigItem[]
}

export interface TerminologyProps {
  config?: TerminologyConfig[]
  optIns?: TerminologyConfig[]
  loading?: boolean
  onSave?(val): void
  buttonClicked?: boolean
}

export const Terminology: FC<TerminologyProps> = ({
  config,
  optIns,
  loading,
  onSave,
  buttonClicked,
}) => {
  const { t } = useTranslation('common')
  const defaultConfig = [
    {
      title: t('business.default.config.title1'),
      items: [
        {
          key: t('business.default.config.key.singular'),
          value: t('setup.business-details.people.appointment.singular'),
        },
        {
          key: t('business.default.config.key.plural'),
          value: t('setup.business-details.people.appointment.plural'),
        },
      ],
    },
    {
      title: t('business.default.config.title2'),
      items: [
        {
          key: t('business.default.config.key.singular'),
          value: t('setup.business-details.booking.attendees.singular'),
        },
        {
          key: t('business.default.config.key.plural'),
          value: t('setup.business-details.booking.attendees.plural'),
        },
      ],
    },
    {
      title: t('business.default.config.title3'),
      items: [
        {
          key: t('business.default.config.key.singular'),
          value: t('setup.business-details.employee.singular'),
        },
        {
          key: t('business.default.config.key.plural'),
          value: t('setup.business-details.employee.plural'),
        },
      ],
    },
    {
      title: t('business.default.config.title4'),
      items: [
        {
          key: t('business.default.config.key.singular'),
          value: t('setup.business-details.teacher.singular'),
        },
        {
          key: t('business.default.config.key.plural'),
          value: t('setup.business-details.teacher.plural'),
        },
      ],
    },
    {
      title: t('business.default.config.title5'),
      items: [
        {
          key: t('business.default.config.key.singular'),
          value: t('business.default.config.value.vate'),
        },
      ],
    },
  ]

  const defaultOptIns = [
    {
      title: t('business.default.opt.title.client'),
      items: [
        {
          key: t('business.default.opt.key.postal'),
          value: t('setup.business-details.client.postal'),
        },
        {
          key: t('business.default.opt.key.sms'),
          value: t('setup.business-details.client.sms'),
        },
        {
          key: t('business.default.opt.key.email'),
          value: t('setup.business-details.client.email'),
        },
        {
          key: t('business.default.opt.key.phone'),
          value: t('setup.business-details.client.phone'),
        },
      ],
    },
    {
      title: t('business.default.opt.title.leads'),
      items: [
        {
          key: t('business.default.opt.key.postal'),
          value: t('setup.business-details.client.postal'),
        },
        {
          key: t('business.default.opt.key.sms'),
          value: t('setup.business-details.client.sms'),
        },
        {
          key: t('business.default.opt.key.email'),
          value: t('setup.business-details.client.email'),
        },
        {
          key: t('business.default.opt.key.phone'),
          value: t('setup.business-details.client.phone'),
        },
      ],
    },
  ]

  const [configs, setConfigs] = useState(config || [])
  const [optInsItems, setOptInsItems] = useState(optIns || [])
  const handleConfigItemChange = ({ index, itemIndex, val }) => {
    const configItems = [...configs]
    configItems[index].items[itemIndex].value = val
    setConfigs(configItems)
  }
  const handleOptInsItemChange = ({ index, itemIndex, val }) => {
    const OptInsItems = [...optInsItems]
    OptInsItems[index].items[itemIndex].value = val
    setOptInsItems(OptInsItems)
  }
  const handleSaveChanges = () => {
    onSave?.({
      config: configs,
      optIns: optInsItems,
    })
  }

  useEffect(() => {
    setConfigs(config || defaultConfig)
    setOptInsItems(optIns || defaultOptIns)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config, optIns])

  return (
    <div className={styles.terminologyContainer}>
      <div className={styles.terminologySubContainer}>
        <div className={styles.terminologyHeaderContainer}>
          <div>
            <p className={styles.tabTitle}>
              {' '}
              {t('business.terminology.tab.title')}
            </p>
            <p className={styles.tabSubTitle}>
              {t('business.terminology.sub.title')}
            </p>
          </div>
        </div>
      </div>
      <Divider />
      {configs?.map((configItem, index) => (
        <div className={styles.configItem} key={configItem.title}>
          <div className={styles.terminologySubContainer}>
            <p className={styles.configSubTitle}>{configItem.title}</p>
            <Row gutter={[32, 28]}>
              {configItem.items.map((item, itemIndex) => (
                <Col className="gutter-row" xs={24} sm={12} key={item.key}>
                  {!loading ? (
                    <Input
                      text={item.value}
                      label={item.key}
                      onChange={(val) =>
                        handleConfigItemChange({ index, itemIndex, val })
                      }
                    />
                  ) : (
                    <>
                      <span className={styles.text}>{item.key}</span>
                      <Skeleton.Input active={true} size={'small'} />
                    </>
                  )}
                </Col>
              ))}
            </Row>
          </div>
          <Divider />
        </div>
      ))}
      <p className={styles.configTitle}>
        {t('business.terminology.config.title')}
      </p>
      {optInsItems?.map((optInsItem, index) => (
        <div className={styles.configItem} key={optInsItem.title}>
          <div className={styles.terminologySubContainer}>
            <p className={styles.configSubTitle}>{optInsItem.title}</p>
            <Row gutter={[32, 28]}>
              {optInsItem.items.map((item, itemIndex) => (
                <Col className="gutter-row" xs={24} sm={12} key={item.key}>
                  {!loading ? (
                    <Input
                      text={item.value}
                      label={item.label}
                      onChange={(val) =>
                        handleOptInsItemChange({ index, itemIndex, val })
                      }
                    />
                  ) : (
                    <>
                      <span className={styles.text}>{item.label}</span>
                      <Skeleton.Input active={true} size={'small'} />
                    </>
                  )}
                </Col>
              ))}
            </Row>
          </div>
          <Divider />
        </div>
      ))}
      <div className={styles.btnSave}>
        {!loading ? (
          <Button
            type="primary"
            onClick={() => handleSaveChanges()}
            loading={buttonClicked}
          >
            {t('business.details.save.changes')}
          </Button>
        ) : (
          <Skeleton.Button
            active={true}
            size={'small'}
            className={styles.btn}
          />
        )}
      </div>
    </div>
  )
}

export default Terminology
