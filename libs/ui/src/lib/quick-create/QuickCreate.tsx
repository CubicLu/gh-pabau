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
import { ClientCreate, LeadCreate } from '@pabau/ui'
import { initialValues } from '../client-create/mock'
import { initialLeadValues, employeeList } from '../lead-create/mock'

interface QuickCreateProps {
  clientCreateRender?: () => JSX.Element
  leadCreateRender?: () => JSX.Element
}
export const QuickCreate: FC<QuickCreateProps> = ({
  clientCreateRender,
  leadCreateRender,
}) => {
  const [visible, setVisible] = useState(false)
  const [clientModalVisible, setClientModalVisible] = useState(false)
  const [leadModalVisible, setLeadModalVisible] = useState(false)
  const { t } = useTranslation('common')

  const toggleCreateClientModal = () => {
    setClientModalVisible(!clientModalVisible)
    setVisible(false)
  }

  const toggleCreateLeadModal = () => {
    setLeadModalVisible(!leadModalVisible)
    setVisible(false)
  }

  const QuickCreateContent = () => (
    <>
      <div className={styles.quickCreateContentConatiner}>
        <div
          className={styles.quickCreateContentClose}
          onClick={() => setVisible(false)}
        >
          <CloseOutlined />
        </div>
        <p>{t('common-label-create')}</p>
        <div className={styles.quickCreateItemsContainer}>
          <div
            className={styles.quickCreateItem}
            onClick={toggleCreateClientModal}
          >
            <div className={styles.quickCreateItemIcon}>
              <UserAddOutlined />
            </div>
            <p>{t('quickcreate.client')}</p>
          </div>
          <div
            className={styles.quickCreateItem}
            onClick={toggleCreateLeadModal}
          >
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
      {clientCreateRender ? (
        clientModalVisible && clientCreateRender()
      ) : (
        <ClientCreate
          modalVisible={clientModalVisible}
          handleClose={toggleCreateClientModal}
          initialValues={initialValues}
        />
      )}
      {leadCreateRender ? (
        leadModalVisible && leadCreateRender()
      ) : (
        <LeadCreate
          employeeList={employeeList}
          initialValues={initialLeadValues}
          modalVisible={leadModalVisible}
          handleClose={toggleCreateLeadModal}
        />
      )}
    </>
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
