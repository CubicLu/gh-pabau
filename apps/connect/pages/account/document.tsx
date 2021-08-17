import { DownloadOutlined, FilePdfOutlined } from '@ant-design/icons'
import { useGetContactAttachmentsLazyQuery } from '@pabau/graphql'
import { Avatar, Breadcrumb } from '@pabau/ui'
import { Typography } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import userAvatar from '../../assets/images/users/alex.png'
import ConnectLayout from '../../components/ConnectLayout/ConnectLayout'
import { ClientContext } from '../../components/ContextWrapper/context/ClientContext'
import { useDateFormatter } from '../../hooks/useDateFormatter'
import styles from './documents.module.less'

const { Title } = Typography

export const Document = () => {
  const { t } = useTranslation('connect')
  const [lang, setLang] = useState('en')
  const clientContext = useContext(ClientContext)
  const [documents, setDocuments] = useState([])
  const { formatDateFromUnix } = useDateFormatter()
  const [getContactAttachments] = useGetContactAttachmentsLazyQuery({
    onCompleted(response) {
      if (response.findManyCmContact.length > 0) {
        const formattedDocs = response.findManyCmContact[0].Attachments.map(
          (attachment) => {
            return {
              name: attachment.attach_name,
              date: `${formatDateFromUnix(attachment.date, {
                regular_display: 1,
              })} `,
              documentName: attachment.attachment_title,
              image: userAvatar,
              uri: `https://crm.pabau.com/cdn/documents/${attachment.linkref}`,
            }
          }
        )

        setDocuments(formattedDocs)
      }
    },
    onError(error) {
      console.log('error', error)
    },
  })

  const onDocumentClick = (uri) => {
    window.open(uri, '_blank')
  }

  useEffect(() => {
    if (clientContext) {
      getContactAttachments({
        variables: {
          contactId: clientContext[0].contact_id,
        },
      })
    }
  }, [clientContext, getContactAttachments])

  return (
    <ConnectLayout
      onChangeLanguage={(val) => setLang(val)}
      clientContext={clientContext}
    >
      <div className={styles.documents}>
        <div className={styles.documentsHeader}>
          <Breadcrumb
            breadcrumbItems={[
              {
                breadcrumbName: t('connect.account.title'),
                path: 'connect/account',
              },
              {
                breadcrumbName: t('account.settings.documents.title'),
                path: '',
              },
            ]}
          />
          <Title>{t('account.settings.documents.title')}</Title>
        </div>
        <div className={styles.documentsMobileHeader}>
          <Title>{t('account.settings.documents.title')}</Title>
        </div>
        <div className={styles.documentsContent}>
          {documents.map((d, i) => {
            return (
              <div key={i} className={styles.document}>
                <div className={styles.top}>
                  <div className={styles.left}>
                    <Avatar size={30} src={d.image} />
                    <span className={styles.name}>{d.name}</span>
                    <span className={styles.action}>
                      {t('connect.account.document.shared')}
                    </span>
                  </div>
                  <div className={styles.right}>
                    <span>{d.date}</span>
                  </div>
                </div>
                <div
                  className={styles.bottom}
                  onClick={() => {
                    onDocumentClick(d.uri)
                  }}
                >
                  <div className={styles.documentCont}>
                    <div>
                      <FilePdfOutlined className={styles.icon} />
                      <span>{d.documentName}</span>
                    </div>
                    <DownloadOutlined />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </ConnectLayout>
  )
}

export default Document
