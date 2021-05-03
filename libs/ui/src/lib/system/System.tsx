import React, { FC, useEffect, useState } from 'react'
import { Row, Col, Divider } from 'antd'
import {
  Button,
  SimpleDropdown,
  RadioGroup,
  Notification,
  NotificationType,
} from '@pabau/ui'
import styles from './System.module.less'
import { useTranslation } from 'react-i18next'

interface MedicalConfig {
  tretmentCycles: string
  secureMedicalForms: boolean
  disablePrescriptions: boolean
  performSurgical: boolean
  medicalApprovals: boolean
  historyData: boolean
}

export interface SystemProps {
  config?: MedicalConfig
  onSave?(val: MedicalConfig): void
}

const defaultConfig: MedicalConfig = {
  tretmentCycles: 'Always display',
  secureMedicalForms: false,
  disablePrescriptions: false,
  performSurgical: true,
  medicalApprovals: false,
  historyData: true,
}

export const System: FC<SystemProps> = ({ config, onSave }) => {
  const { t } = useTranslation('common')
  const [configs, setConfigs] = useState<MedicalConfig>(defaultConfig)
  const handleSaveChanges = () => {
    Notification(
      NotificationType.success,
      t('notification.type.success.message')
    )
    onSave?.(configs)
  }
  const handleItemChange = (change) => {
    const configChange: MedicalConfig = { ...configs }
    configChange[change.key] = change.value
    setConfigs(configChange)
  }

  useEffect(() => {
    setConfigs(config || defaultConfig)
  }, [config])

  return (
    <div className={styles.systemContainer}>
      <div className={styles.systemSubContainer}>
        <div className={styles.systemHeaderContainer}>
          <div>
            <p className={styles.tabTitle}>{t('business.system.tab.title')}</p>
            <p className={styles.tabSubTitle}>
              {t('business.system.sub.title')}
            </p>
          </div>
        </div>
      </div>
      <Divider />
      <div className={styles.systemSubContainer}>
        <Row gutter={[28, 28]}>
          <Col className="gutter-row" xs={24} sm={12}>
            <SimpleDropdown
              label={t('business.system.cycles.label')}
              tooltip={t('business.system.cycles.label')}
              value={configs.tretmentCycles}
              dropdownItems={['Always display']}
              onSelected={(val) =>
                handleItemChange({ key: 'tretmentCycles', value: val })
              }
            />
          </Col>
          <Col className="gutter-row" xs={24} sm={12}>
            <RadioGroup
              label={t('business.system.medical.formu.label')}
              tooltip={t('business.system.medical.formu.tooltip')}
              value={
                configs.secureMedicalForms === true
                  ? t('business.system.value.yes')
                  : t('business.system.value.no')
              }
              radioItems={[
                t('business.system.value.yes'),
                t('business.system.value.no'),
              ]}
              onChange={(val) =>
                handleItemChange({
                  key: 'secureMedicalForms',
                  value: val === 'Yes',
                })
              }
            />
          </Col>
          <Col className="gutter-row" xs={24} sm={12}>
            <RadioGroup
              label={t('business.system.surgical.label')}
              tooltip={t('business.system.surgical.tooltip')}
              value={
                configs.disablePrescriptions === true
                  ? t('business.system.value.yes')
                  : t('business.system.value.no')
              }
              radioItems={[
                t('business.system.value.yes'),
                t('business.system.value.no'),
              ]}
              onChange={(val) =>
                handleItemChange({
                  key: 'disablePrescriptions',
                  value: val === 'Yes',
                })
              }
            />
          </Col>
          <Col className="gutter-row" xs={24} sm={12}>
            <RadioGroup
              label={t('business.system.prescriptions.label')}
              tooltip={t('business.system.prescriptions.tooltip')}
              value={
                configs.performSurgical === true
                  ? t('business.system.value.yes')
                  : t('business.system.value.no')
              }
              radioItems={[
                t('business.system.value.yes'),
                t('business.system.value.no'),
              ]}
              onChange={(val) =>
                handleItemChange({
                  key: 'performSurgical',
                  value: val === 'Yes',
                })
              }
            />
          </Col>
          <Col className="gutter-row" xs={24} sm={12}>
            <RadioGroup
              label={t('business.system.medical.approvals.label')}
              tooltip={t('business.system.medical.approvals.tooltip')}
              value={
                configs.medicalApprovals === true
                  ? t('business.system.value.yes')
                  : t('business.system.value.no')
              }
              radioItems={[
                t('business.system.value.yes'),
                t('business.system.value.no'),
              ]}
              onChange={(val) =>
                handleItemChange({
                  key: 'medicalApprovals',
                  value: val === 'Yes',
                })
              }
            />
          </Col>
          <Col className="gutter-row" xs={24} sm={12}>
            <RadioGroup
              label={t('business.system.history.label')}
              tooltip={t('business.system.history.tooltip')}
              value={
                configs.historyData === true
                  ? t('business.system.value.yes')
                  : t('business.system.value.no')
              }
              radioItems={[
                t('business.system.value.yes'),
                t('business.system.value.no'),
              ]}
              onChange={(val) =>
                handleItemChange({ key: 'historyData', value: val === 'Yes' })
              }
            />
          </Col>
        </Row>
        <div className={styles.btnSave}>
          <Button type="primary" onClick={() => handleSaveChanges()}>
            {t('business.details.save.changes')}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default System
