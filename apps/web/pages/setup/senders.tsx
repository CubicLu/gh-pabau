import {
  FilterOutlined,
  MailOutlined,
  MobileOutlined,
  PlusSquareFilled,
} from '@ant-design/icons'
import { Breadcrumb, Button } from '@pabau/ui'
import { Col, Row, Typography } from 'antd'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import { ReactComponent as Verified } from '../../assets/images/verified.svg'
import Layout from '../../components/Layout/Layout'
import MobileHeader from '../../components/MobileHeader'
import useWindowSize from '../../hooks/useWindowSize'
import { UserContext } from '../../context/UserContext'
import { useTranslationI18 } from '../../hooks/useTranslationI18'
import styles from './senders.module.less'

const { Title } = Typography

export interface MergeTagItem {
  type: string
  value: string
}

export interface SenderItem {
  id?: string
  type: 'email' | 'sms'
  fromName: string
  fromEmail?: string
  fromCompanyEmail?: string
  replyTo?: string
  isDefaultSender: boolean
  isEnableReplies?: boolean
  isUseCompanyEmail?: boolean
  isAutoUploadReplies?: boolean
  isEnterpriseEmail?: string
  masterCriteria?: string
  subCriteria?: string
  mergeTags: MergeTagItem[]
}

export const senderItems: SenderItem[] = [
  {
    id: '001',
    type: 'email',
    fromName: 'Clinic Bookings',
    fromEmail: 'william@pabau.com',
    isEnableReplies: true,
    isDefaultSender: false,
    mergeTags: [],
  },
  {
    id: '002',
    type: 'sms',
    fromName: 'The Health Clinic',
    isDefaultSender: true,
    isEnableReplies: true,
    mergeTags: [],
  },
  {
    id: '003',
    type: 'sms',
    fromName: 'Surgical Clinic',
    isDefaultSender: false,
    mergeTags: [],
  },
]

export const masterCriteriaOptions = ['Master category', 'Master category 2']
export const subCriteriaOptions = ['Sub category', 'Sub category 2']
export const mergeTagTypeOptions = ['Tag Type 1', 'Tag Type 2']

export const Communications: React.FC = () => {
  const user = useContext(UserContext)
  const router = useRouter()
  const size = useWindowSize()
  const { t } = useTranslationI18()

  return (
    <Layout {...user} active={'setup'}>
      <MobileHeader title={t('setup.senders.title')} parent="/setup">
        <FilterOutlined className={styles.filterIconStyle} />
        <PlusSquareFilled
          className={styles.plusIconStyle}
          onClick={() => router.push('senders/create')}
        />
      </MobileHeader>
      <div className={styles.cardWrapper}>
        {size.width > 767 && (
          <div className={styles.cardHeader}>
            <div>
              <Breadcrumb
                items={[
                  { breadcrumbName: t('sidebar.setup'), path: 'setup' },
                  { breadcrumbName: t('setup.senders.title'), path: '' },
                ]}
              />
              <Title>{t('setup.senders.title')}</Title>
            </div>
            <div className={styles.actions}>
              <Button>
                <FilterOutlined />
                {t('setup.senders.filter')}
              </Button>
              <Button
                onClick={() => router.push('senders/create')}
                backgroundColor="#54B2D3"
                className={styles.senderButton}
              >
                {t('setup.senders.create')}
              </Button>
            </div>
          </div>
        )}
        <div className={styles.cardContent}>
          <Row gutter={16}>
            {senderItems.map((item, index) => (
              <Col span={4} xs={12} sm={8} md={6} key={index}>
                <Button
                  className={styles.senderItem}
                  onClick={() => router.push(`senders/edit/${item.id}`)}
                >
                  <div className={styles.itemHeader}>
                    {item.type === 'email' ? (
                      <MailOutlined className={styles.itemIcon} />
                    ) : (
                      <MobileOutlined className={styles.itemIcon} />
                    )}
                    <div className={styles.verifiedWrapper}>
                      {item.isDefaultSender && (
                        <div className={styles.defaultText}>
                          {t('setup.senders.default')}
                        </div>
                      )}
                      {item.isEnableReplies && <Verified />}
                    </div>
                  </div>
                  <div className={styles.itemBody}>
                    <div>{item.fromName}</div>
                    {item.fromEmail && (
                      <div className={styles.email}>{item.fromEmail}</div>
                    )}
                  </div>
                </Button>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </Layout>
  )
}

export default Communications
