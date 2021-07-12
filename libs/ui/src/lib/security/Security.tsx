import React, { FC, useState } from 'react'
import {
  SecurityScore,
  Button,
  CustomModal,
  PasswordExpirationProps,
  BasicModal,
} from '@pabau/ui'
import styles from './Security.module.less'
import { Dropdown, Menu, Modal, Row, Skeleton } from 'antd'
import {
  VideoCameraOutlined,
  UnlockOutlined,
  MailOutlined,
} from '@ant-design/icons'
import { useTranslation } from 'react-i18next'

interface SecurityProps {
  twoFAstatus: boolean
  newButtonText: string
  dangerButtonText: string
  onDelete: () => void
  onOk?(val) => void
  enableSensData?: number
  config?: PasswordExpirationProps
  passwordExpiration?: string
  loading?: boolean
  onForceResetPassword?(val): void
}

export const Security: FC<SecurityProps> = ({
  twoFAstatus,
  newButtonText,
  dangerButtonText,
  onDelete,
  onOk,
  enableSensData,
  config,
  passwordExpiration,
  loading,
  onForceResetPassword,
}) => {
  const { t } = useTranslation('common')
  const [showModal, setShowModal] = useState(false)
  const percent =
    (twoFAstatus ? 0 : 50) +
    (enableSensData === (undefined || 0) ? 0 : 20) +
    (config?.password_expire === '90 days' ? 20 : 0) +
    (config?.lockout_period === '10 minutes' ? 10 : 0)
  const securityToolsData = [
    {
      id: '1',
      title: t('business.security.tool.data.force.title'),
      name: t('business.security.tool.data.force.name'),
      imgSrc: <VideoCameraOutlined />,
      isActive: twoFAstatus,
      modalType: 1,
      modalTitle: t('business.security.tool.data.force.modal.title'),
      modalContent: t('business.security.tool.data.force.modal.content'),
    },
    {
      id: '3',
      title: t('business.security.tool.data.password.expiration.title'),
      name: t('business.security.tool.data.password.expiration.name'),
      imgSrc: <UnlockOutlined />,
      isActive: passwordExpiration === '0' ? false : true,
      modalType: 2,
      modalTitle: t(
        'business.security.tool.data.password.expiration.modal.title'
      ),
      modalMenu: [
        t('business.security.tool.data.password.expiration.modal.menu.expire'),
        t('business.security.tool.data.password.expiration.modal.menu.history'),
        t('business.security.tool.data.password.expiration.modal.menu.login'),
        t('business.security.tool.data.password.expiration.modal.menu.period'),
      ],
      modalContent: [
        [
          t(
            'business.security.tool.data.password.expiration.modal.menu.expire.90days'
          ),
          t(
            'business.security.tool.data.password.expiration.modal.menu.expire.180days'
          ),
          t(
            'business.security.tool.data.password.expiration.modal.menu.expire.365days'
          ),
          t(
            'business.security.tool.data.password.expiration.modal.menu.expire.never'
          ),
        ],
        [
          t(
            'business.security.tool.data.password.expiration.modal.menu.login.5attempts'
          ),
          t(
            'business.security.tool.data.password.expiration.modal.menu.login.10attempts'
          ),
          t(
            'business.security.tool.data.password.expiration.modal.menu.login.15attempts'
          ),
        ],
        [
          t(
            'business.security.tool.data.password.expiration.modal.menu.history.3password'
          ),
          t(
            'business.security.tool.data.password.expiration.modal.menu.history.4password'
          ),
          t(
            'business.security.tool.data.password.expiration.modal.menu.history.5password'
          ),
          t(
            'business.security.tool.data.password.expiration.modal.menu.history.password.enabled.disabled'
          ),
        ],
        [
          t(
            'business.security.tool.data.password.expiration.modal.menu.period.5minutes'
          ),
          t(
            'business.security.tool.data.password.expiration.modal.menu.period.10minutes'
          ),
          t(
            'business.security.tool.data.password.expiration.modal.menu.period.15minutes'
          ),
        ],
      ],
      okbtn: t('business.security.tool.data.password.expiration.btn'),
    },
    {
      id: '4',
      title: t('business.security.tool.data.encrypted.encryption.title'),
      name: t('business.security.tool.data.encrypted.encryption.name'),
      imgSrc: <MailOutlined />,
      isActive: enableSensData === 0 ? false : true,
      modalType: 3,
      modalTitle: t(
        'business.security.tool.data.encrypted.encryption.model.title'
      ),
      modalContent: t(
        'business.security.tool.data.encrypted.encryption.modal.content'
      ),
      okbtn: t('business.security.tool.data.encrypted.encryption.btn'),
    },
  ]

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

  const handleOk = (val) => {
    onOk?.(val)
  }

  const handleButtonClick = () => {
    setShowModal(true)
  }

  return (
    <>
      <div className={styles.SecurityContainer}>
        <div className={styles.securitySubContainer}>
          <div className={styles.securityHeaderContainer}>
            <p className={styles.tabTitle}>
              {' '}
              {t('business.security.tab.title')}
            </p>
            <div className={styles.securityOpsContainer}>
              <Dropdown overlay={menu} placement="bottomRight">
                {!loading ? (
                  <Button type="ghost">
                    {t('business.security.manage.bulk.action')}
                  </Button>
                ) : (
                  <Skeleton.Button active={true} size={'small'} />
                )}
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
              onButtonTitle={handleButtonClick}
              loading={loading}
            />
          </div>
        </div>
        <div className={styles.securityToolsContainer}>
          <CustomModal
            datasource={securityToolsData}
            onOk={handleOk}
            config={config}
            loading={loading}
          />
        </div>
        {showModal && (
          <Modal
            title={t('business.security.tool.data.password.reset.dropdown')}
            visible={showModal}
            onOk={() => {
              onForceResetPassword?.(1)
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
      <BasicModal
        title={t('business.security.score')}
        visible={showModal}
        onCancel={() => setShowModal(false)}
        newButtonText={'Ok'}
        centered={true}
        onOk={() => {
          setShowModal(false)
        }}
      >
        {percent < 30
          ? t('business.security.bad.message')
          : percent >= 30 && percent < 60
          ? t('business.security.good.message')
          : t('business.security.excellent.message')}
      </BasicModal>
    </>
  )
}
export default Security
