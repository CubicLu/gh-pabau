import React, { FC, useState } from 'react'
import { useMedia } from 'react-use'

import { Button, TabMenu } from '@pabau/ui'
import { Row, Col, Card } from 'antd'
import { Layout, Breadcrumb } from '@pabau/ui'

import { LeftOutlined } from '@ant-design/icons'

import { PosConfigObj } from '../../../mocks/PosConfiguration'

import General from '../../../components/Setup/Settings/PosConfiguration/General'
import Appearance from '../../../components/Setup/Settings/PosConfiguration/Appearance'

import styles from './pos-configuration.module.less'

interface P {
  general: GeneralPosConfig
  appearance: AppearancePosConfig
}

const PosConfiguration: FC<P> = () => {
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

  const tabItems = ['General', 'Appearance']

  return (
    <div className={styles.mainWrapper}>
      <Layout>
        <Card className={styles.posConfigurationContainer}>
          <div className={styles.hideDesktopView}>
            <Row className={styles.mobDevice}>
              <Col>
                <div className={styles.mobTopHead}>
                  <div className={styles.mobTopHeadRow}>
                    <LeftOutlined /> <h6> {'Point Of Sale Settings'}</h6>
                  </div>
                  <p>
                    {
                      'Take control over which features are enabled on your point of sale screen.'
                    }
                  </p>
                </div>
              </Col>
            </Row>
          </div>
          <div className={styles.hideMobileView}>
            <Row className={styles.mainWrapper}>
              <Col span={20} className={styles.titleWrapper}>
                <Breadcrumb
                  breadcrumbItems={[
                    { breadcrumbName: 'Setup', path: 'setup' },
                    { breadcrumbName: 'Point Of Sale Settings', path: '' },
                  ]}
                />
                <div className={styles.posConfigHeader}>
                  <h4>{'POS Configuration'}</h4>
                  <p className={styles.description}>
                    {
                      'Take control over which features are enabled on your point of sale screen.'
                    }
                  </p>
                </div>
              </Col>
              <Col span={'auto'} className={styles.titleSaveBtn}>
                <Button
                  type="primary"
                  className={styles.saveBtn}
                  onClick={handleSave}
                >
                  {'Save Changes'}
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
              <Button type={'primary'}>{'Save Changes'}</Button>
            </div>
          )}
        </Card>
      </Layout>
    </div>
  )
}

export default PosConfiguration
