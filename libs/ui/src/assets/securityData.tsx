import { SafetyOutlined, UnlockOutlined, MailOutlined } from '@ant-design/icons'
import React from 'react'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function useSecurityToolsData(t, twoFAstatus) {
  const securityToolsData = [
    {
      id: '1',
      title: t('setup.business-details.2fa.title'),
      name: t('setup.business-details.2fa.tooltip'),
      imgSrc: <SafetyOutlined />,
      isActive: twoFAstatus,
      modalType: 1,
      modalTitle: t('setup.business-details.2fa.title'),
      modalContent: t('setup.business-details.2fa.content'),
    },
    {
      id: '3',
      title: t('business.security.tool.data.password.expiration.title'),
      name: t('business.security.tool.data.password.expiration.name'),
      imgSrc: <UnlockOutlined />,
      isActive: false,
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
      isActive: true,
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
  const percent = 76

  return { securityToolsData, percent }
}
