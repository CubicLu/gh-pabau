import {
  CalendarOutlined,
  CommentOutlined,
  DollarCircleOutlined,
  ExportOutlined,
  FileOutlined,
  HeartOutlined,
  InboxOutlined,
  LaptopOutlined,
  RightOutlined,
  ShareAltOutlined,
  UserOutlined,
  WalletOutlined,
} from '@ant-design/icons'
import { Avatar } from '@pabau/ui'
import { Collapse } from 'antd'
import Link from 'next/link'
import React, { useContext, useState } from 'react'
import { ReactComponent as Allergies } from '../assets/images/allergies-outlined.svg'
import { ReactComponent as Drugs } from '../assets/images/drugs-outlined.svg'
import { ReactComponent as MedicalHistory } from '../assets/images/medical-history.svg'
import { ReactComponent as Stethoscope } from '../assets/images/stethoscope-outlined.svg'
import ConnectLayout from '../components/ConnectLayout/ConnectLayout'

import styles from './account.module.less'
import { useTranslation } from 'react-i18next'
import { ClientContext } from '../components/UserContext/context/ClientContext'

const { Panel } = Collapse

export const Account = (props) => {
  const { t } = useTranslation('connect')
  const [lang, setLang] = useState('en')
  const clientContext = useContext(ClientContext)
  return (
    <ConnectLayout
      onChangeLanguage={(val) => setLang(val)}
      clientContext={clientContext}
    >
      <div className={styles.connectAccount}>
        <div className={styles.connectAccountSection}>
          <div className={styles.connectAccountSectionHeader}>
            <Avatar
              name={`${clientContext[0]?.fname} ${clientContext[0]?.lname}`}
              size={56}
            />
            <span className={styles.connnectAccountUserName}>
              {`${clientContext[0]?.fname} ${clientContext[0]?.lname}`}
            </span>
          </div>
          <div className={styles.connectAccountSectionBody}>
            <div className={styles.connectAccountLinkItemTitle}>
              {t('connect.account.title')}
            </div>
            <Link href="/account/personal-details">
              <div className={styles.connectAccountLinkItem}>
                <div className={styles.connectAccountLinkItemLeft}>
                  <UserOutlined className={styles.connectAccountLinkItemIcon} />
                  {t('connect.account.personaldetails')}
                </div>
                <RightOutlined className={styles.connectAccountLinkItemRight} />
              </div>
            </Link>
            <Link href="/account/loyalty">
              <div className={styles.connectAccountLinkItem}>
                <div className={styles.connectAccountLinkItemLeft}>
                  <HeartOutlined
                    className={styles.connectAccountLinkItemIcon}
                  />
                  {t('connect.account.loyalty')}
                </div>
                <RightOutlined className={styles.connectAccountLinkItemRight} />
              </div>
            </Link>
            <Link href="/account/packages">
              <div className={styles.connectAccountLinkItem}>
                <div className={styles.connectAccountLinkItemLeft}>
                  <InboxOutlined
                    className={styles.connectAccountLinkItemIcon}
                  />
                  {t('connect.account.mypackages')}
                </div>
                <RightOutlined className={styles.connectAccountLinkItemRight} />
              </div>
            </Link>
            <Link href="/account/purchase-package">
              <div className={styles.connectAccountLinkItem}>
                <div className={styles.connectAccountLinkItemLeft}>
                  <WalletOutlined
                    className={styles.connectAccountLinkItemIcon}
                  />
                  {t('connect.account.purchasepackage')}
                </div>
                <RightOutlined className={styles.connectAccountLinkItemRight} />
              </div>
            </Link>
            <Link href="/account/payments">
              <div className={styles.connectAccountLinkItem}>
                <div className={styles.connectAccountLinkItemLeft}>
                  <DollarCircleOutlined
                    className={styles.connectAccountLinkItemIcon}
                  />
                  {t('connect.account.payments')}
                </div>
                <RightOutlined className={styles.connectAccountLinkItemRight} />
              </div>
            </Link>
            <div className={styles.connectAccountLinkItemTitle}>
              {t('connect.account.clinicalrecords')}
            </div>
            <Link href="/account/appointments">
              <div className={styles.connectAccountLinkItem}>
                <div className={styles.connectAccountLinkItemLeft}>
                  <CalendarOutlined
                    className={styles.connectAccountLinkItemIcon}
                  />
                  {t('connect.account.appointments')}
                </div>
                <RightOutlined className={styles.connectAccountLinkItemRight} />
              </div>
            </Link>
            <Link href="/account/classes">
              <div className={styles.connectAccountLinkItem}>
                <div className={styles.connectAccountLinkItemLeft}>
                  <LaptopOutlined
                    className={styles.connectAccountLinkItemIcon}
                  />
                  {t('connect.account.classes')}
                </div>
                <RightOutlined className={styles.connectAccountLinkItemRight} />
              </div>
            </Link>
            <Collapse expandIconPosition="right">
              <Panel
                header={
                  <div className={styles.connectAccountLinkItem}>
                    <div className={styles.connectAccountLinkItemLeft}>
                      <MedicalHistory
                        className={styles.connectAccountLinkItemIcon}
                      />
                      {t('connect.account.medicalrecord')}
                    </div>
                  </div>
                }
                key="medical-history"
              >
                <div className={styles.medicalHistoryItems}>
                  <Link href="/account/medical-history">
                    <div className={styles.connectAccountLinkItem}>
                      <div className={styles.connectAccountLinkItemLeft}>
                        <MedicalHistory
                          className={styles.connectAccountLinkItemIcon}
                        />
                        {t('connect.account.medicalhistory')}
                      </div>
                    </div>
                  </Link>
                  <Link href="/account/medications">
                    <div className={styles.connectAccountLinkItem}>
                      <div className={styles.connectAccountLinkItemLeft}>
                        <Drugs className={styles.connectAccountLinkItemIcon} />
                        {t('connect.account.medications')}
                      </div>
                    </div>
                  </Link>
                  <Link href="/account/allergies">
                    <div className={styles.connectAccountLinkItem}>
                      <div className={styles.connectAccountLinkItemLeft}>
                        <Allergies
                          className={styles.connectAccountLinkItemIcon}
                        />
                        {t('connect.account.allergies')}
                      </div>
                    </div>
                  </Link>
                  <Link href="/account/lab-history">
                    <div className={styles.connectAccountLinkItem}>
                      <div className={styles.connectAccountLinkItemLeft}>
                        <Drugs className={styles.connectAccountLinkItemIcon} />
                        {t('connect.account.testresults')}
                      </div>
                    </div>
                  </Link>
                  <Link href="/account/share-record">
                    <div
                      className={styles.connectAccountLinkItem}
                      style={{
                        borderTop: '1px solid var(--border-color-base)',
                      }}
                    >
                      <div className={styles.connectAccountLinkItemLeft}>
                        <ShareAltOutlined
                          className={styles.connectAccountLinkItemIcon}
                        />
                        {t('connect.account.sharerecord')}
                      </div>
                    </div>
                  </Link>
                  <Link href="/account/export-record">
                    <div className={styles.connectAccountLinkItem}>
                      <div className={styles.connectAccountLinkItemLeft}>
                        <ExportOutlined
                          className={styles.connectAccountLinkItemIcon}
                        />
                        {t('connect.account.exportrecord')}
                      </div>
                    </div>
                  </Link>
                </div>
              </Panel>
            </Collapse>

            <Link href="/account/document">
              <div className={styles.connectAccountLinkItem}>
                <div className={styles.connectAccountLinkItemLeft}>
                  <FileOutlined className={styles.connectAccountLinkItemIcon} />
                  {t('connect.account.document')}
                </div>
                <RightOutlined className={styles.connectAccountLinkItemRight} />
              </div>
            </Link>
            <Link href="/account/gp-details">
              <div className={styles.connectAccountLinkItem}>
                <div className={styles.connectAccountLinkItemLeft}>
                  <Stethoscope className={styles.connectAccountLinkItemIcon} />
                  {t('connect.account.gpdetails')}
                </div>
                <RightOutlined className={styles.connectAccountLinkItemRight} />
              </div>
            </Link>
            <Link href="/account/chat-history">
              <div className={styles.connectAccountLinkItem}>
                <div className={styles.connectAccountLinkItemLeft}>
                  <CommentOutlined
                    className={styles.connectAccountLinkItemIcon}
                  />
                  {t('connect.account.chathistory')}
                </div>
                <RightOutlined className={styles.connectAccountLinkItemRight} />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </ConnectLayout>
  )
}

export default Account
