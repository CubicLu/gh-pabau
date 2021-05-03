import React, { FC, useState } from 'react'
import { SecurityScore, Button, CustomModal } from '@pabau/ui'
import { useSecurityToolsData } from '../../assets/securityData'
import styles from './Security.module.less'
import { Dropdown, Menu, Modal, Row } from 'antd'
import { useTranslation } from 'react-i18next'
export const Security: FC = () => {
  const { t } = useTranslation('common')
  const { securityToolsData, percent } = useSecurityToolsData(t)
  const [showModal, setShowModal] = useState(false)
  const menu = (
    <Menu>
      <Menu.Item
        key="1"
        onClick={() => {
          setShowModal(true)
        }}
      >
        {t('business.security.tool.data.password.reset.dropdown')}
      </Menu.Item>
    </Menu>
  )
  return (
    <div className={styles.SecurityContainer}>
      <div className={styles.securitySubContainer}>
        <div className={styles.securityHeaderContainer}>
          <p className={styles.tabTitle}> {t('business.security.tab.title')}</p>
          <div className={styles.securityOpsContainer}>
            <Dropdown overlay={menu} placement="bottomRight">
              <Button type="ghost">
                {t('business.security.manage.bulk.action')}
              </Button>
            </Dropdown>
          </div>
        </div>
      </div>
      <div className={styles.securitySubContainer}>
        <div className={styles.securityScoreContainer}>
          <SecurityScore
            percent={percent}
            title1={t('business.security.title1')}
            title2={t('business.security.title2')}
            buttonTitle={t('business.security.button.title')}
          />
        </div>
      </div>
      <div className={styles.securityToolsContainer}>
        <CustomModal datasource={securityToolsData} />
      </div>
      {showModal && (
        <Modal
          title={t('business.security.tool.data.password.reset.dropdown')}
          visible={showModal}
          onOk={() => {
            setShowModal(false)
          }}
          onCancel={() => {
            setShowModal(false)
          }}
        >
          <Row gutter={[24, 24]} className="gutter-row">
            <p>{t('business.security.manage.bulk.action.model')}</p>
          </Row>
        </Modal>
      )}
    </div>
  )
}
export default Security
