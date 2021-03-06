import React, { FC, ReactNode } from 'react'
import QRCode from 'react-qr-code'
import { settingSharing } from '../mock'
import styles from './SharingPrivacy.module.less'
import { useTranslation } from 'react-i18next'
import {
  ButtonCheckbox,
  InitialDetailsProps,
  Notification,
  NotificationType,
} from '@pabau/ui'
import { Form as AntForm, Input } from 'formik-antd'
import { Button } from 'antd'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'

interface P {
  companyName?: string
  setFieldValue(
    field: keyof InitialDetailsProps,
    values: Record<string, number> | number
  ): void
  values?: InitialDetailsProps
  accessCode?: number
}

export interface SettingSharing {
  id: number
  title: string
  items: SharingItem[]
}

interface SharingItem {
  key: string
  title: string
  icon: ReactNode
  enabled: boolean
}
const SettingSharing: FC<P> = ({
  companyName,
  setFieldValue,
  values,
  accessCode,
}) => {
  const { t } = useTranslation('common')

  const settingSharingData = settingSharing(t)

  const handleChange = (checked, itemKey: string) => {
    const selectedData = values ? { ...values['settingSharing'] } : {}
    if (selectedData) {
      selectedData[itemKey] = checked ? 1 : 0
      setFieldValue('settingSharing', selectedData)
    }
  }

  const handleCopy = () => {
    const text = values?.shareLink || ''
    navigator.clipboard.writeText(text).then(() => {
      Notification(
        NotificationType.success,
        t(
          'create.client.modal.privacy.sharing.setting.copy.notification.message'
        )
      )
    })
  }

  return (
    <AntForm
      layout={'vertical'}
      requiredMark={false}
      className={styles.innerMainWrapper}
    >
      <h4>
        {`${companyName} ${t(
          'create.client.modal.privacy.sharing.setting.title'
        )}`}
      </h4>
      <div className={styles.settingSharingWrapper}>
        {settingSharingData.map((data) => {
          return (
            <div key={data.id} className={styles.settingSharingInner}>
              <h5>{data.title}</h5>
              {data.items.map((item) => {
                return (
                  <div key={item.key} className={styles.itemWrapper}>
                    <div className={styles.itemTitle}>
                      <div className={styles.itemIcon}>{item.icon}</div>
                      <span>{item.title}</span>
                    </div>
                    <div className={styles.btnBottom}>
                      <ButtonCheckbox
                        checked={
                          values?.['settingSharing']?.[item.key] === 1
                            ? true
                            : false
                        }
                        icon={
                          values?.['settingSharing']?.[item.key] ? (
                            <CheckOutlined />
                          ) : (
                            <CloseOutlined />
                          )
                        }
                        label={
                          values?.['settingSharing']?.[item.key]
                            ? t(
                                'create.client.modal.privacy.sharing.setting.enabled.button.title'
                              )
                            : t(
                                'create.client.modal.privacy.sharing.setting.disabled.button.title'
                              )
                        }
                        size={'middle'}
                        onChange={(checked) => handleChange(checked, item.key)}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          )
        })}
        <div className={styles.customLink}>
          <h5>
            {t('create.client.modal.privacy.sharing.setting.sharelink.title')}
          </h5>
          <AntForm.Item name={'shareLink'}>
            <Input name={'shareLink'} size={'large'} />
          </AntForm.Item>
          <div className={styles.linkGroupBtn}>
            <Button type={'primary'} size={'large'} onClick={handleCopy}>
              {t(
                'create.client.modal.privacy.sharing.setting.copy.button.title'
              )}
            </Button>
          </div>
        </div>
        <div className={styles.customLink}>
          <h5>
            {t('create.client.modal.privacy.sharing.setting.access.code.title')}
          </h5>
          <p>
            {t(
              'create.client.modal.privacy.sharing.setting.access.code.description'
            )}
          </p>
          <h3>{accessCode}</h3>
        </div>
        <div className={styles.customLink}>
          <h5>
            {t('create.client.modal.privacy.sharing.setting.QR.code.title')}
          </h5>
          <p>
            {t(
              'create.client.modal.privacy.sharing.setting.QR.code.description'
            )}
          </p>
          <div className={styles.qrCodeSection}>
            <span>
              <QRCode
                level={'H'}
                size={140}
                value={values?.['shareLink'] ?? ''}
              />
            </span>
            <p>
              {t(
                'create.client.modal.privacy.sharing.setting.QR.code.access.description'
              )}
              <a href={'/'}>
                {t(
                  'create.client.modal.privacy.sharing.setting.QR.code.access.link.description'
                )}
              </a>
            </p>
          </div>
          <p className={styles.scanWarn}>
            {t(
              'create.client.modal.privacy.sharing.setting.sharing.warn.description'
            )}
          </p>
        </div>
      </div>
    </AntForm>
  )
}

export default SettingSharing
