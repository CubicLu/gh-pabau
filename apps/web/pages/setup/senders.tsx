import React from 'react'
import Layout from '../../components/Layout/Layout'
import { Breadcrumb, MobileHeader, Button } from '@pabau/ui'
import styles from './senders.module.less'
import {
  FilterOutlined,
  LeftOutlined,
  MailOutlined,
  MobileOutlined,
  PlusSquareFilled,
} from '@ant-design/icons'
import { Typography, Row, Col } from 'antd'
import { useRouter } from 'next/router'
import { useTranslationI18 } from '../../hooks/useTranslationI18'
import { ReactComponent as Verified } from '../../assets/images/verified.svg'
import { useGridData } from '../../hooks/useGridData'

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
  const router = useRouter()
  const { t } = useTranslationI18()
  const { getParentSetupData } = useGridData(t)
  const parentMenu = getParentSetupData(router.pathname)
  const handleBack = () => {
    if (parentMenu.length > 0) {
      router.push({
        pathname: '/setup',
        query: { menu: parentMenu[0]?.keyValue },
      })
    } else {
      router.push('/setup')
    }
  }
  return (
    <>
      <div className={styles.desktopViewNone}>
        <MobileHeader className={styles.mobileHeader}>
          <div className={styles.allContentAlignMobile}>
            <div className={styles.mobileHeaderTextStyle}>
              <LeftOutlined onClick={handleBack} />
              <p>{t('setup.senders.title')}</p>
            </div>
            <div className={styles.mobileHeaderOpsStyle}>
              <FilterOutlined className={styles.filterIconStyle} />
              <PlusSquareFilled
                className={styles.plusIconStyle}
                onClick={() => router.push('senders/create')}
              />
            </div>
          </div>
        </MobileHeader>
      </div>

      <Layout active={'setup'}>
        <div className={styles.cardWrapper}>
          <div className={styles.cardHeader}>
            <div>
              <Breadcrumb
                breadcrumbItems={[
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
    </>
  )
}

export default Communications
