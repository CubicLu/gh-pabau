import { BellOutlined } from '@ant-design/icons'
import { PabauPlus, TabMenu } from '@pabau/ui'
import { Col, Form, Radio, Row, Skeleton } from 'antd'
import React, { FC, useState } from 'react'
import Link from 'next/link'
import { ReactComponent as ExternalLinkGrey } from '../../../assets/images/external-link-grey.svg'
import { ReactComponent as Palette } from '../../../assets/images/palette.svg'
import { ReactComponent as Voucher } from '../../../assets/images/voucher.svg'
import { useTranslationI18 } from '../../../hooks/useTranslationI18'

import styles from './Style.module.less'

export const ReviewsConfigStepOneSkeleton: FC = () => {
  const [form] = Form.useForm()
  const [isListing, setIsListing] = useState(true)
  const [isEmail, setIsEmail] = useState(true)

  const { t } = useTranslationI18()

  const GridSkeleton = (): JSX.Element => {
    return (
      <Row gutter={[16, 16]}>
        {Array.from({ length: 16 }, (_, i) => (
          <Col span={3}>
            <Skeleton.Button
              active={true}
              size={'default'}
              shape={'square'}
              style={{ width: 35, height: 35 }}
            />
          </Col>
        ))}
      </Row>
    )
  }

  const LineSkeleton = (): JSX.Element => {
    return (
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Skeleton.Button
            active={true}
            size={'default'}
            shape={'square'}
            style={{ width: 320, height: 35 }}
          />
        </Col>
      </Row>
    )
  }

  const BoxSkeleton = (): JSX.Element => {
    return (
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Skeleton.Button
            active={true}
            size={'default'}
            shape={'square'}
            style={{ width: 400, height: 320 }}
          />
        </Col>
      </Row>
    )
  }

  return (
    <Form form={form} layout="vertical">
      <div className={styles.reviewsConfigBody}>
        <div className={styles.reviewsConfigBodyDesktop}>
          <div>
            <h2>{t('setup.reviewsConfig.builder')}</h2>
            <div>
              <div className={styles.section}>
                <h3>
                  <Palette className={styles.marginRight} />
                  <span>{t('setup.reviewsConfig.apperance')}</span>
                </h3>
                <h4>{t('setup.reviewsConfig.apperanceText')}</h4>
                <GridSkeleton />
                <div className={styles.sectionItem}>
                  <Form.Item label={t('setup.reviewsConfig.logoPosition')}>
                    <LineSkeleton />
                  </Form.Item>
                </div>
                <div className={styles.sectionItem}>
                  <LineSkeleton />
                </div>
                <div className={styles.sectionItem}>
                  <Form.Item label={t('setup.reviewsConfig.clientName')}>
                    <LineSkeleton />
                  </Form.Item>
                </div>
              </div>
              <div className={styles.section}>
                <h3>
                  <BellOutlined
                    className={`${styles.marginRight} ${styles.color}`}
                  />
                  <span>{t('setup.reviewsConfig.notifications')}</span>
                </h3>
                <h4>{t('setup.reviewsConfig.notificationText')}</h4>
                <LineSkeleton />
                <div className={styles.sectionItem}>
                  <div className={styles.changeInClientNotifications}>
                    <a target="_blank">
                      {t('setup.reviewsConfig.notificationsText')}
                      <ExternalLinkGrey className={styles.marginLeft} />
                    </a>
                  </div>
                </div>
              </div>
              <div className={styles.section}>
                <h3>
                  <Voucher className={styles.marginRight} />
                  <span className={styles.marginRightEight}>
                    {t('setup.reviewsConfig.incentive')}
                  </span>
                  <PabauPlus modalType="Marketing" />
                </h3>
                <h4>{t('setup.reviewsConfig.incentiveText')}</h4>
                <div className={styles.sectionItem}>
                  <Form.Item label={t('setup.reviewsConfig.incentive.label')}>
                    <LineSkeleton />
                  </Form.Item>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h2>{t('setup.reviewsConfig.preview')}</h2>
            <div className={styles.previewPanel}>
              <Radio.Group
                buttonStyle="solid"
                defaultValue={isListing}
                value={isListing}
                onChange={(e) => setIsListing(e.target.value)}
              >
                <Radio.Button value={true}>
                  {t('setup.reviewsConfig.listingButton')}
                </Radio.Button>
                <Radio.Button value={false}>
                  {t('setup.reviewsConfig.readButton')}
                </Radio.Button>
              </Radio.Group>
              <div className={styles.templatePanel}>
                <BoxSkeleton />
              </div>
              <Radio.Group
                buttonStyle="solid"
                defaultValue={isEmail}
                value={isEmail}
                onChange={(e) => setIsEmail(e.target.value)}
              >
                <Radio.Button value={true}>Email</Radio.Button>
                <Radio.Button value={false}>SMS Text</Radio.Button>
              </Radio.Group>
              <div className={styles.templatePanel}>
                <BoxSkeleton />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.reviewsConfigBodyMobile}>
          <TabMenu
            menuItems={['BUILDER', 'PREVIEW']}
            tabPosition="top"
            minHeight="1px"
          >
            <div>
              <div className={styles.section}>
                <h3>
                  <Palette className={styles.marginRight} />
                  <span>{t('setup.reviewsConfig.apperance')}</span>
                </h3>
                <h4>{t('setup.reviewsConfig.apperanceText')}</h4>
                <GridSkeleton />
                <div className={styles.sectionItem}>
                  <Form.Item label={t('setup.reviewsConfig.logoPosition')}>
                    <LineSkeleton />
                  </Form.Item>
                </div>
                <div className={styles.sectionItem}>
                  <LineSkeleton />
                </div>
                <div className={styles.sectionItem}>
                  <Form.Item label={t('setup.reviewsConfig.clientName')}>
                    <LineSkeleton />
                  </Form.Item>
                </div>
              </div>
              <div className={styles.section}>
                <h3>
                  <BellOutlined
                    className={`${styles.marginRight} ${styles.color}`}
                  />
                  <span>{t('setup.reviewsConfig.notifications')}</span>
                </h3>
                <h4>{t('setup.reviewsConfig.notificationText')}</h4>
                <div className={styles.sectionItem}></div>
                <div className={styles.sectionItem}>
                  <div className={styles.changeInClientNotifications}>
                    <Link href="/client-notifications/request-feedback">
                      <a target="_blank">
                        {t('setup.reviewsConfig.notificationsText')}
                        <ExternalLinkGrey className={styles.marginLeft} />
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
              <div className={styles.section}>
                <h3>
                  <Voucher className={styles.marginRight} />
                  <span className={styles.marginRightEight}>
                    {t('setup.reviewsConfig.incentive')}
                  </span>
                  <PabauPlus modalType="Marketing" />
                </h3>
                <h4>{t('setup.reviewsConfig.clientReview')}</h4>
                <div className={styles.sectionItem}>
                  <Form.Item label={t('setup.reviewsConfig.incentive.label')}>
                    <LineSkeleton />
                  </Form.Item>
                </div>
              </div>
            </div>
            <div className={styles.previewPanel}>
              <Radio.Group
                buttonStyle="solid"
                defaultValue={isListing}
                value={isListing}
                onChange={(e) => setIsListing(e.target.value)}
              >
                <Radio.Button value={true}>
                  {t('setup.reviewsConfig.listingButton')}
                </Radio.Button>
                <Radio.Button value={false}>
                  {t('setup.reviewsConfig.readButton')}
                </Radio.Button>
              </Radio.Group>
              <div className={styles.templatePanel}>
                <BoxSkeleton />
              </div>
              <Radio.Group
                buttonStyle="solid"
                defaultValue={isEmail}
                value={isEmail}
                onChange={(e) => setIsEmail(e.target.value)}
              >
                <Radio.Button value={true}>
                  {t('setup.reviewsConfig.email')}
                </Radio.Button>
                <Radio.Button value={false}>
                  {t('setup.reviewsConfig.smsText')}
                </Radio.Button>
              </Radio.Group>
              <div className={styles.templatePanel}>
                <BoxSkeleton />
              </div>
            </div>
          </TabMenu>
        </div>
      </div>
    </Form>
  )
}

export default ReviewsConfigStepOneSkeleton
