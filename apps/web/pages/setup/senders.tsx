import {
  FilterOutlined,
  MailOutlined,
  MobileOutlined,
  PlusSquareFilled,
} from '@ant-design/icons'
import { Breadcrumb, Button } from '@pabau/ui'
import { Col, Row, Typography, Skeleton } from 'antd'
import { useRouter } from 'next/router'
import Layout from '../../components/Layout/Layout'
import CommonHeader from '../../components/CommonHeader'
import { useUser } from '../../context/UserContext'
import { useTranslationI18 } from '../../hooks/useTranslationI18'
import styles from './senders.module.less'
import { GetComSendersDocument } from '@pabau/graphql'
import { useLazyQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { ReactComponent as Verified } from '../../assets/images/verified.svg'

const { Title } = Typography

export interface MergeTagItem {
  type: string
  value: string
}

export interface SenderItem {
  id?: string | number
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

export const masterCriteriaOptions = ['Master category', 'Master category 2']
export const subCriteriaOptions = ['Sub category', 'Sub category 2']
export const mergeTagTypeOptions = ['Tag Type 1', 'Tag Type 2']

export const Communications: React.FC = () => {
  const user = useUser()
  const router = useRouter()
  const { t } = useTranslationI18()
  const [isLoading, setIsLoading] = useState(true)
  const [senderDetails, setSenderDetails] = useState([{} as SenderItem])

  const [getSender] = useLazyQuery(GetComSendersDocument, {
    onCompleted: (comSenders) => {
      const temp = []

      comSenders.getSenders.map((sender) =>
        temp.push({
          id: sender.id,
          fromName: sender.senders_name,
          fromEmail: sender.data,
          isDefaultSender: sender.is_default === 1,
          type: sender.type,
        })
      )
      setSenderDetails(temp)
      setIsLoading(false)
    },
  })

  useEffect(() => {
    if (isLoading) {
      getSender()
    } else {
      setIsLoading(false)
    }
  }, [getSender, isLoading])

  return (
    <Layout {...user} active={'setup'}>
      <CommonHeader
        isLeftOutlined
        reversePath="/setup"
        title={t('setup.senders.title')}
      >
        <FilterOutlined className={styles.filterIconStyle} />
        <PlusSquareFilled
          className={styles.plusIconStyle}
          onClick={() => router.push('senders/create')}
        />
      </CommonHeader>
      <div className={styles.cardWrapper}>
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
        <div className={styles.cardContent}>
          <Row gutter={16}>
            {!isLoading ? (
              senderDetails.map((item, index) => (
                <Col span={4} xs={24} sm={12} md={6} key={index}>
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
                        {item.isDefaultSender && <Verified />}
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
              ))
            ) : (
              <>
                {Array.from({ length: 4 })
                  .fill(null)
                  .map((_, i) => i)
                  .map((i) => (
                    <Col span={4} xs={24} sm={12} md={6} key={i}>
                      <Button className={styles.senderItem}>
                        <div className={styles.itemHeader}>
                          <Skeleton.Input
                            style={{ width: 200 }}
                            active={isLoading}
                            size={'default'}
                          />
                        </div>
                        <div className={styles.itemBody}>
                          <div className={styles.emails}>
                            {' '}
                            <Skeleton.Input
                              style={{ width: 120 }}
                              active={isLoading}
                              size={'default'}
                            />
                          </div>
                          <Skeleton.Input
                            style={{ width: 75 }}
                            active={isLoading}
                            size={'default'}
                          />
                        </div>
                      </Button>
                    </Col>
                  ))}
              </>
            )}
          </Row>
        </div>
      </div>
    </Layout>
  )
}

export default Communications
