import React, { FC } from 'react'
import { useMedia } from 'react-use'
import { Breadcrumb, Button, TabMenu } from '@pabau/ui'
import { Row, Col, Card } from 'antd'
import { Layout } from '@pabau/ui'
import { LeftOutlined } from '@ant-design/icons'
import { PerformanceConfigObj } from '../../../mocks/PerformanceSettings'
import { useTranslationI18 } from '../../../hooks/useTranslationI18'
import ReviewSettings from '../../../components/Setup/Settings/ReviewSettings/ReviewSettings'
import AssessmentSettings from '../../../components/Setup/Settings/AssessmentSettings/AssessmentSettings'
import PeopleSettings from '../../../components/Setup/Settings/PeopleSettings/PeopleSettings'
import styles from './performance.module.less'

interface P {
  review: ReviewScheduleConfig
  assessment: AssessmentScheduleConfig
  people: PeopleConfig
}

const Performance: FC<P> = () => {
  const isMobile = useMedia('(max-width: 768px)', false)
  const { t } = useTranslationI18()

  const handleChange = (
    key: string,
    config: ReviewScheduleConfig | AssessmentScheduleConfig | PeopleConfig
  ) => {
    console.log(config)
  }

  const handleSave = (): void => {
    console.log('Save Object')
  }

  const tabItems = [
    t('settings-performance-tab-header1'),
    t('settings-performance-tab-header2'),
    t('settings-performance-tab-header3'),
  ]

  return (
    <div className={styles.mainWrapper}>
      <Layout>
        <Card className={styles.performanceContainer}>
          <div className={styles.hideDesktopView}>
            <Row className={styles.mobDevice}>
              <Col>
                <div className={styles.mobTopHead}>
                  <div className={styles.mobTopHeadRow}>
                    <LeftOutlined /> <h6> {t('settings-header')}</h6>
                  </div>
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
                    { breadcrumbName: t('settings-header'), path: '' },
                  ]}
                />
                <div className={styles.posConfigHeader}>
                  <h4>{t('settings-header')}</h4>
                </div>
              </Col>
              <Col span={'auto'} className={styles.titleSaveBtn}>
                <Button
                  type="primary"
                  className={styles.saveBtn}
                  onClick={handleSave}
                >
                  {t('settings-performance-save')}
                </Button>
              </Col>
            </Row>
          </div>
          <TabMenu tabPosition={isMobile ? 'top' : 'left'} menuItems={tabItems}>
            <ReviewSettings
              date={PerformanceConfigObj.review}
              handleChange={handleChange}
            />
            <AssessmentSettings
              listAssessment={PerformanceConfigObj.assessment}
              handleChange={handleChange}
            />
            <PeopleSettings
              peopleList={PerformanceConfigObj.peopleList}
              handleChange={handleChange}
            />
          </TabMenu>
          {isMobile && (
            <div className={styles.mobSaveBtn} onClick={handleSave}>
              <Button type={'primary'}>{t('settings-performance-save')}</Button>
            </div>
          )}
        </Card>
      </Layout>
    </div>
  )
}

export default Performance
