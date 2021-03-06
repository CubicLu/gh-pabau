import React, { FC, useState } from 'react'
import { useMedia } from 'react-use'
import { Button, TabMenu } from '@pabau/ui'
import { Row, Col, Card } from 'antd'
import { Breadcrumb } from '@pabau/ui'
import Layout from '../../../components/Layout/Layout'
import General from '../../../components/Setup/Settings/PosConfiguration/General'
import Appearance from '../../../components/Setup/Settings/PosConfiguration/Appearance'
import { useTranslationI18 } from '../../../hooks/useTranslationI18'
import CommonHeader from '../../../components/CommonHeader'
import styles from './pos-configuration.module.less'
import { useUser } from '../../../context/UserContext'

interface P {
  general: GeneralPosConfig
  appearance: AppearancePosConfig
}

const PosConfiguration: FC<P> = () => {
  const { t } = useTranslationI18()
  const user = useUser()
  const PosConfigObj = {
    general: {
      featureList: [
        {
          key: 1,
          value: t('setup.settings.pos.configuration.disable'),
          checked: true,
        },
        {
          key: 2,
          value: t('setup.settings.pos.configuration.calculate.discount'),
          checked: false,
        },
        {
          key: 3,
          value: t('setup.settings.pos.configuration.force.discount'),
          checked: false,
        },
        {
          key: 4,
          value: t('setup.settings.pos.configuration.lock.sale'),
          checked: false,
        },
        {
          key: 5,
          value: t('setup.settings.pos.configuration.prevent.invoice'),
          checked: false,
        },
        {
          key: 6,
          value: t('setup.settings.pos.configuration.add.booking'),
          checked: true,
        },
      ],
      dropdownList: [
        {
          key: 1,
          id: 'packageUseDate',
          label: t(
            'setup.settings.pos.configuration.dropdown.option.package.label'
          ),
          value: t(
            'setup.settings.pos.configuration.dropdown.option.package.value'
          ),
          options: [
            t(
              'setup.settings.pos.configuration.dropdown.option.package.option.15minutes'
            ),
            t(
              'setup.settings.pos.configuration.dropdown.option.package.option.30minutes'
            ),
            t(
              'setup.settings.pos.configuration.dropdown.option.package.option.45minutes'
            ),
          ],
          helpText: t(
            'setup.settings.pos.configuration.dropdown.option.package.help.tooltip'
          ),
        },
        {
          key: 2,
          id: 'cashupMode',
          label: t(
            'setup.settings.pos.configuration.dropdown.option.cashup.mode.label'
          ),
          value: t(
            'setup.settings.pos.configuration.dropdown.option.cashup.mode.value'
          ),
          options: [
            t(
              'setup.settings.pos.configuration.dropdown.option.cashup.mode.option.non.blind'
            ),
            t(
              'setup.settings.pos.configuration.dropdown.option.cashup.mode.option.blind'
            ),
          ],
          helpText: t(
            'setup.settings.pos.configuration.dropdown.option.cashup.mode.help.tooltip'
          ),
        },
        {
          key: 3,
          id: 'stockCountMode',
          label: t(
            'setup.settings.pos.configuration.dropdown.option.stock.count.mode.label'
          ),
          value: t(
            'setup.settings.pos.configuration.dropdown.option.stock.count.mode.value'
          ),
          options: [
            t(
              'setup.settings.pos.configuration.dropdown.option.stock.count.mode.option.non.blind'
            ),
            t(
              'setup.settings.pos.configuration.dropdown.option.stock.count.mode.option.blind'
            ),
          ],
          helpText: t(
            'setup.settings.pos.configuration.dropdown.option.stock.count.mode.help.tooltip'
          ),
        },
        {
          key: 4,
          id: 'paymentType',
          label: t(
            'setup.settings.pos.configuration.dropdown.option.payment.type.mode.label'
          ),
          value: t(
            'setup.settings.pos.configuration.dropdown.option.payment.type.mode.value'
          ),
          options: [
            t(
              'setup.settings.pos.configuration.dropdown.option.payment.type.mode.option.card'
            ),
            t(
              'setup.settings.pos.configuration.dropdown.option.payment.type.mode.option.net.banking'
            ),
          ],
          helpText: t(
            'setup.settings.pos.configuration.dropdown.option.payment.type.mode.help.tooltip'
          ),
        },
      ],
    },
    appearance: {
      featureList: [
        {
          key: 1,
          id: 'service',
          value: t('setup.settings.pos.configuration.appearance.service'),
          checked: true,
        },
        {
          key: 2,
          id: 'retail',
          value: t('setup.settings.pos.configuration.appearance.retail'),
          checked: true,
        },
        {
          key: 3,
          id: 'packages',
          value: t('setup.settings.pos.configuration.appearance.packages'),
          checked: false,
        },
        {
          key: 4,
          id: 'giftcards',
          value: t('setup.settings.pos.configuration.appearance.giftcards'),
          checked: false,
        },
        {
          key: 5,
          id: 'accounts',
          value: t('setup.settings.pos.configuration.appearance.accounts'),
          checked: false,
        },
        {
          key: 6,
          id: 'loyalty',
          value: t('setup.settings.pos.configuration.appearance.loyalty'),
          checked: true,
        },
      ],
    },
  }
  const [posConfigObj, setPosConfigObj] = useState<P>(PosConfigObj)
  const isMobile = useMedia('(max-width: 768px)', false)

  const handleChange = (
    key: string,
    obj: GeneralPosConfig | AppearancePosConfig
  ) => {
    console.log(obj)
    setPosConfigObj({ ...posConfigObj, [key]: obj })
  }

  const handleSave = (): void => {
    console.log('Save Object', posConfigObj)
  }

  const tabItems = [
    t('setup.settings.pos.configuration.tab.items.general'),
    t('setup.settings.pos.configuration.tab.items.appearance'),
  ]

  return (
    <div className={styles.mainWrapper}>
      <Layout {...user}>
        <CommonHeader
          title={t('setup.settings.pos.configuration.header')}
          isLeftOutlined
          reversePath="/setup"
        />
        <Card className={styles.posConfigurationContainer}>
          <div className={styles.hideMobileView}>
            <Row>
              <Col span={20} className={styles.titleWrapper}>
                <Breadcrumb
                  items={[
                    {
                      breadcrumbName: t(
                        'setup.settings.pos.configuration.point.settings.breadcrumb.setup'
                      ),
                      path: 'setup',
                    },
                    {
                      breadcrumbName: t(
                        'setup.settings.pos.configuration.point.settings.breadcrumb.point.settings'
                      ),
                      path: '',
                    },
                  ]}
                />
                <div className={styles.posConfigHeader}>
                  <h4>{t('setup.settings.pos.configuration.header')}</h4>
                  <p className={styles.description}>
                    {t('setup.settings.pos.configuration.description')}
                  </p>
                </div>
              </Col>
              <Col span={4} className={styles.titleSaveBtn}>
                <Button
                  type="primary"
                  className={styles.saveBtn}
                  onClick={handleSave}
                >
                  {t('setup.settings.pos.configuration.save.btn')}
                </Button>
              </Col>
            </Row>
          </div>
          <TabMenu tabPosition={isMobile ? 'top' : 'left'} menuItems={tabItems}>
            <General
              generalObj={posConfigObj.general}
              handleChange={handleChange}
            />
            <Appearance
              appearanceObj={posConfigObj.appearance}
              handleChange={handleChange}
            />
          </TabMenu>
          {isMobile && (
            <div className={styles.mobSaveBtn} onClick={handleSave}>
              <Button type={'primary'}>
                {t('setup.settings.pos.configuration.save.btn')}
              </Button>
            </div>
          )}
        </Card>
      </Layout>
    </div>
  )
}

export default PosConfiguration
