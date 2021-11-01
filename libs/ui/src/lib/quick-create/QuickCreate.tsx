import React, { FC, useState } from 'react'
import {
  PlusCircleFilled,
  UserOutlined,
  AimOutlined,
  WalletOutlined,
  CloseOutlined,
} from '@ant-design/icons'
import { ReactComponent as ActivityIcon } from '../../assets/images/activity-icon.svg'
import { Popover, Tooltip } from 'antd'
import { useKeyboardShortcut } from '../../hooks/useKeyboardShortcut'
import { Button } from '@pabau/ui'
import { useTranslation } from 'react-i18next'
import { useMedia } from 'react-use'
import styles from './QuickCreate.module.less'
import { ClientCreate, LeadCreate } from '@pabau/ui'
import { initialValues } from '../client-create/mock'
import { initialLeadValues, employeeList } from '../lead-create/mock'

interface QuickCreateProps {
  clientCreateRender?: (handleClose?: () => void) => JSX.Element
  leadCreateRender?: (handleClose?: () => void) => JSX.Element
}
export const QuickCreate: FC<QuickCreateProps> = ({
  clientCreateRender,
  leadCreateRender,
}) => {
  const isMobile = useMedia('(max-width: 767px)', false)
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
              <UserOutlined />
            </div>
            <p>{t('quickcreate.client')}</p>
            <p className={styles.controlTag}>SHIFT + C</p>
          </div>
          <div
            className={styles.quickCreateItem}
            onClick={toggleCreateLeadModal}
          >
            <div className={styles.quickCreateItemIcon}>
              <AimOutlined />
            </div>
            <p>{t('quickcreate.lead')} </p>
            <p className={styles.controlTag}>SHIFT + L</p>
          </div>
          <div className={styles.quickCreateItem}>
            <div className={styles.quickCreateItemIcon}>
              <ActivityIcon />
            </div>
            <p>{t('quickcreate.activity')}</p>
            <p className={styles.controlTag}>SHIFT + A</p>
          </div>
          <div className={styles.quickCreateItem}>
            <div className={styles.quickCreateItemIcon}>
              <WalletOutlined />
            </div>
            <p>{t('quickcreate.sale')}</p>
            <p className={styles.controlTag}>SHIFT + S</p>
          </div>
        </div>
      </div>
      {clientCreateRender ? (
        clientModalVisible && clientCreateRender(toggleCreateClientModal)
      ) : (
        <ClientCreate
          modalVisible={clientModalVisible}
          handleClose={toggleCreateClientModal}
          initialValues={initialValues}
        />
      )}
      {leadCreateRender ? (
        leadModalVisible && leadCreateRender(toggleCreateLeadModal)
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

  useKeyboardShortcut(['Shift', '+'], () => setVisible(!visible), {
    overrideSystem: false,
  })

  useKeyboardShortcut(['Shift', '='], () => setVisible(!visible), {
    overrideSystem: false,
  })

  useKeyboardShortcut(['Shift', 'C'], () => toggleCreateClientModal(), {
    overrideSystem: false,
  })

  useKeyboardShortcut(['Shift', 'L'], () => toggleCreateLeadModal(), {
    overrideSystem: false,
  })

  return (
    <Popover
      placement={isMobile ? 'top' : 'bottomRight'}
      content={QuickCreateContent}
      trigger="click"
      visible={visible}
      onVisibleChange={(e) => setVisible(e)}
    >
      <Tooltip title={t('common-quick-add')}>
        <Button
          type="default"
          className={styles.createBtnStyle}
          onClick={() => setVisible(true)}
        >
          <PlusCircleFilled /> {t('common-label-create')}
        </Button>
      </Tooltip>
    </Popover>
  )
}

export default QuickCreate
