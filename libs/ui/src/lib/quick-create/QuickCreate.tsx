import React, { FC, useState } from 'react'
import {
  PlusCircleFilled,
  UserAddOutlined,
  RiseOutlined,
  MessageOutlined,
  MailOutlined,
  WalletOutlined,
  CloseOutlined,
} from '@ant-design/icons'
import { Popover } from 'antd'
import { Button } from '@pabau/ui'
import { useTranslation } from 'react-i18next'
import styles from './QuickCreate.module.less'

export const QuickCreate: FC = () => {
  const [visible, setVisible] = useState(false)
  const { t } = useTranslation('common')

  const QuickCreateContent = () => (
    <div className={styles.quickCreateContentConatiner}>
      <div
        className={styles.quickCreateContentClose}
        onClick={() => setVisible(false)}
      >
        <CloseOutlined />
      </div>
      <p>{t('common-label-create')}</p>
      <div className={styles.quickCreateItemsContainer}>
        <div className={styles.quickCreateItem}>
          <div className={styles.quickCreateItemIcon}>
            <UserAddOutlined />
          </div>
          <p>{t('quickcreate.client')}</p>
        </div>
        <div className={styles.quickCreateItem}>
          <div className={styles.quickCreateItemIcon}>
            <RiseOutlined />
          </div>
          <p>{t('quickcreate.lead')}</p>
        </div>
        <div className={styles.quickCreateItem}>
          <div className={styles.quickCreateItemIcon}>
            <MessageOutlined />
          </div>
          <p>{t('quickcreate.sms')}</p>
        </div>
        <div className={styles.quickCreateItem}>
          <div className={styles.quickCreateItemIcon}>
            <WalletOutlined />
          </div>
          <p>{t('quickcreate.sale')}</p>
        </div>
        <div className={styles.quickCreateItem}>
          <div className={styles.quickCreateItemIcon}>
            <MailOutlined />
          </div>
          <p>{t('quickcreate.newsletter')}</p>
        </div>
      </div>
    </div>
  )
  return (
    <div className={styles.quickCreateContainer}>
      <Popover
        placement="bottomRight"
        content={QuickCreateContent}
        trigger="click"
        visible={visible}
        onVisibleChange={(e) => setVisible(e)}
      >
        <Button
          type="default"
          className={styles.createBtnStyle}
          onClick={() => setVisible(true)}
        >
          <PlusCircleFilled /> {t('common-label-create')}
        </Button>
      </Popover>
    </div>
  )
}

export default QuickCreate
