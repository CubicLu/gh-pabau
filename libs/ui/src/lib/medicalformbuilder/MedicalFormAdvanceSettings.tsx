import {
  defaultMedicaFormAdvanceSettingData,
  LanguageDropdown,
  MedicaFormAdvanceSettingData,
  Notification,
  NotificationType,
} from '@pabau/ui'
import {
  Button,
  Checkbox,
  Col,
  Input,
  InputNumber,
  Radio,
  Row,
  Typography,
} from 'antd'
import classNames from 'classnames'
import React, { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './MedicalFormAdvance.module.less'

interface P {
  formSaveLabel: string
  changeFormSaveLabel: (string) => void
  onSaveAdvSettings?: (advSettings: MedicaFormAdvanceSettingData) => void
  currentAdvSettings?: MedicaFormAdvanceSettingData
}

const MedicalFormAdvanceSettings: FC<P> = ({
  formSaveLabel = '',
  changeFormSaveLabel,
  onSaveAdvSettings,
  currentAdvSettings,
}) => {
  const { t } = useTranslation('common')
  const { Title } = Typography
  const { TextArea } = Input
  const [settingData, setSettingData] = useState<MedicaFormAdvanceSettingData>(
    currentAdvSettings
      ? currentAdvSettings
      : defaultMedicaFormAdvanceSettingData
  )

  useEffect(() => {
    if (currentAdvSettings) setSettingData(currentAdvSettings)
  }, [currentAdvSettings])

  const onChangeSetting = (key, val) => {
    if (key === 'shareToClient' || key === 'reminder') {
      setSettingData((prevData) => {
        return {
          ...prevData,
          [key]: val,
        }
      })
    } else {
      setSettingData((prevData) => {
        return {
          ...prevData,
          data: { ...prevData.data, [key]: val },
        }
      })
    }
    if (key === 'submitButtonLabel') changeFormSaveLabel?.(val)
    onSaveAdvSettings?.(settingData)
  }

  const onAddCardDetails = () => {
    Notification(NotificationType.success, 'Card Added')
  }
  return (
    <div className={styles.medicalFormSettingsContainer}>
      <div className={styles.banner}>
        <Title level={5}>
          {t('ui.medicalformbuilder.advanced.banner.title')}
        </Title>
        <label>{t('ui.medicalformbuilder.advanced.banner.description')}</label>
      </div>
      <div className={styles.formContainer}>
        <Title level={5}>
          {t('ui.medicalformbuilder.advanced.lang.title')}
        </Title>
        <div className={styles.formGroup}>
          <p>{t('ui.medicalformbuilder.advanced.lang.description')}</p>
          <div className={styles.selectedLanguage}>
            <LanguageDropdown
              value={settingData.data.language}
              onSelected={(val) => onChangeSetting('language', val)}
            />
          </div>
        </div>
      </div>
      <div className={styles.formContainer}>
        <Title level={5}>
          {t('ui.medicalformbuilder.advanced.basic.title')}
        </Title>
        <p>{t('ui.medicalformbuilder.advanced.basic.description')}</p>
        <div className={styles.formGroup}>
          <p>{t('ui.medicalformbuilder.advanced.basic.heading')}</p>
          <Radio.Group
            onChange={(e) => onChangeSetting('headingUse', e.target.value)}
            value={settingData.data.headingUse}
          >
            <Radio value={'heading_by_default'}>
              {t(
                'ui.medicalformbuilder.advanced.basic.heading.default.heading'
              )}
            </Radio>
            <Radio value={'section_by_default'}>
              {t(
                'ui.medicalformbuilder.advanced.basic.heading.default.section'
              )}
            </Radio>
          </Radio.Group>
        </div>
        <div className={styles.formGroup}>
          <p>{t('ui.medicalformbuilder.advanced.basic.submit')}</p>
          <Input
            value={settingData.data.submitButtonLabel}
            onChange={(e) =>
              onChangeSetting('submitButtonLabel', e.target.value)
            }
            placeholder={t(
              'ui.medicalformbuilder.advanced.basic.submit.placeholder'
            )}
          />
        </div>
        <div className={styles.formGroup}>
          <div>
            <Checkbox
              onChange={(e) =>
                onChangeSetting('shareToClient', e.target.checked ? 1 : 0)
              }
              checked={Number(settingData.shareToClient) === 0 ? false : true}
            >
              {t('ui.medicalformbuilder.advanced.basic.sharelink')}
            </Checkbox>
          </div>
          <div>
            <Checkbox
              onChange={(e) =>
                onChangeSetting('reminder', e.target.checked ? 1 : 0)
              }
              checked={Number(settingData.reminder) === 0 ? false : true}
            >
              {t('ui.medicalformbuilder.advanced.basic.reminder')}
            </Checkbox>
          </div>
          <div>
            <InputNumber
              style={{ width: '100%' }}
              min={0}
              step={1}
              onChange={(e) => onChangeSetting('reminder', Number(e))}
              value={settingData.reminder}
            />
          </div>
        </div>
      </div>
      <div className={styles.formContainer}>
        <Title level={5}>
          {t('ui.medicalformbuilder.advanced.acknowledgement.title')}
        </Title>
        <label>
          {t('ui.medicalformbuilder.advanced.acknowledgement.description')}
        </label>

        <div
          className={classNames(
            styles.tyAlertContainer,
            settingData.data.ackRedirect === 'ty_page'
              ? styles.tyAlertContainerSelected
              : null
          )}
        >
          <div>
            <Radio.Group
              onChange={(e) => onChangeSetting('ackRedirect', e.target.value)}
              value={settingData.data.ackRedirect}
            >
              <Radio value={'ty_page'}>
                {t(
                  'ui.medicalformbuilder.advanced.acknowledgement.thankpage.title'
                )}
              </Radio>
            </Radio.Group>
            <div>
              <label>
                {t(
                  'ui.medicalformbuilder.advanced.acknowledgement.thankpage.description'
                )}
              </label>
            </div>
          </div>

          <div className={styles.tyWhiteContainer}>
            <div>
              <Radio.Group
                onChange={(e) => onChangeSetting('thkTextType', e.target.value)}
                value={settingData.data.thkTextType}
              >
                <Radio value={'plain_text'}>
                  {t('ui.medicalformbuilder.advanced.acknowledgement.ty.plain')}
                </Radio>
                <Radio value={'rich_text'}>
                  {t('ui.medicalformbuilder.advanced.acknowledgement.ty.rich')}
                </Radio>
              </Radio.Group>
            </div>
            <div className={styles.formGroup}>
              <TextArea
                rows={4}
                onChange={(e) => onChangeSetting('thkText', e.target.value)}
                value={settingData.data.thkText}
              />
            </div>
            <div className={styles.formGroup}>
              <div>
                <Checkbox
                  onChange={(e) =>
                    onChangeSetting('thkShowLink', e.target.checked ? 1 : 0)
                  }
                  checked={
                    Number(settingData.data.thkShowLink) === 0 ? false : true
                  }
                >
                  {t('ui.medicalformbuilder.advanced.acknowledgement.showlink')}
                </Checkbox>
              </div>
              <div>
                <Checkbox
                  onChange={(e) =>
                    onChangeSetting('thkAddSocial', e.target.checked ? 1 : 0)
                  }
                  checked={
                    Number(settingData.data.thkAddSocial) === 0 ? false : true
                  }
                >
                  {t(
                    'ui.medicalformbuilder.advanced.acknowledgement.addsocial'
                  )}
                </Checkbox>
              </div>
            </div>
          </div>
        </div>
        <div
          className={classNames(
            styles.tyAlertContainer,
            settingData.data.ackRedirect === 'redirect'
              ? styles.tyAlertContainerSelected
              : null
          )}
        >
          <div className={styles.formGroup}>
            <div>
              <Radio.Group
                onChange={(e) => onChangeSetting('ackRedirect', e.target.value)}
                value={settingData.data.ackRedirect}
              >
                <Radio value={'redirect'}>Redirect to</Radio>
              </Radio.Group>
            </div>
            <div>
              <label>
                {t(
                  'ui.medicalformbuilder.advanced.acknowledgement.redirecttype'
                )}
              </label>
            </div>
            <div>
              <TextArea
                rows={4}
                onChange={(e) =>
                  onChangeSetting('redirectText', e.target.value)
                }
                value={settingData.data.redirectText}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MedicalFormAdvanceSettings
