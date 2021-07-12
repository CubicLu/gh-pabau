import { Button, RadioGroup, SimpleDropdown } from '@pabau/ui'
import { Col, Divider, Row, Skeleton } from 'antd'
import React, { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './System.module.less'

interface MedicalConfig {
  tretmentCycles: string
  secureMedicalForms: boolean
  disablePrescriptions: boolean
  performSurgical: boolean
  medicalApprovals: boolean
  historyData: boolean
  enableLabs: boolean
  timeFormat: string
}

export interface SystemProps {
  config?: MedicalConfig
  loading?: boolean
  onSave?(val: MedicalConfig): void
  buttonClicked?: boolean
}

export const System: FC<SystemProps> = ({
  config,
  onSave,
  loading,
  buttonClicked,
}) => {
  const defaultConfig: MedicalConfig = {
    tretmentCycles:
      config?.tretmentCycles !== undefined
        ? config?.tretmentCycles
        : 'Always display',
    secureMedicalForms:
      config?.secureMedicalForms !== undefined
        ? config?.secureMedicalForms
        : false,
    disablePrescriptions:
      config?.disablePrescriptions !== undefined
        ? config.disablePrescriptions
        : false,
    performSurgical:
      config?.performSurgical !== undefined ? config.performSurgical : true,
    medicalApprovals:
      config?.medicalApprovals !== undefined ? config.medicalApprovals : false,
    historyData: config?.historyData !== undefined ? config.historyData : true,
    enableLabs: config?.enableLabs !== undefined ? config.enableLabs : true,
    timeFormat:
      config?.timeFormat !== undefined
        ? config.timeFormat
        : '12 hours (e.g. 9:00pm)',
  }

  const { t } = useTranslation('common')
  const [configs, setConfigs] = useState<MedicalConfig>(defaultConfig)
  const handleSaveChanges = () => {
    setConfigs(configs)
    onSave?.(configs)
  }
  const handleItemChange = (change) => {
    const configChange: MedicalConfig = { ...configs }
    configChange[change.key] = change.value
    setConfigs(configChange)
  }

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
            {!loading ? (
              <SimpleDropdown
                label={t('business.system.cycles.label')}
                tooltip={t('business.system.cycles.label')}
                value={configs.tretmentCycles}
                dropdownItems={[
                  t('business.system.option.title1'),
                  t('business.system.option.title2'),
                ]}
                onSelected={(val) =>
                  handleItemChange({ key: 'tretmentCycles', value: val })
                }
              />
            ) : (
              <>
                <span className={styles.text}>
                  {t('business.system.cycles.label')}
                </span>
                <Skeleton.Input active={true} size={'small'} />
              </>
            )}
          </Col>
          <Col className="gutter-row" xs={24} sm={12}>
            {!loading ? (
              <SimpleDropdown
                label={t('business.system.time.format')}
                tooltip={t('business.system.time.format')}
                value={configs.timeFormat}
                dropdownItems={[
                  t('busines.system.time.format.option1'),
                  t('busines.system.time.format.option2'),
                ]}
                onSelected={(val) =>
                  handleItemChange({ key: 'timeFormat', value: val })
                }
              />
            ) : (
              <>
                <span className={styles.text}>
                  {t('business.system.time.format')}
                </span>
                <Skeleton.Input active={true} size={'small'} />
              </>
            )}
          </Col>
          <Col className="gutter-row" xs={24} sm={12}>
            {!loading ? (
              <RadioGroup
                label={t('business.system.enable.labs')}
                tooltip={t('business.system.enable.labs.tooltip')}
                value={
                  configs.enableLabs === true
                    ? t('business.system.value.yes')
                    : t('business.system.value.no')
                }
                radioItems={[
                  t('business.system.value.yes'),
                  t('business.system.value.no'),
                ]}
                onChange={(val) =>
                  handleItemChange({
                    key: 'enableLabs',
                    value: val === 'Yes',
                  })
                }
              />
            ) : (
              <>
                <span className={styles.text}>
                  {t('business.system.enable.labs')}
                </span>
                <Skeleton.Input
                  active={true}
                  size={'small'}
                  className={styles.input}
                />
              </>
            )}
          </Col>
          <Col className="gutter-row" xs={24} sm={12}>
            {!loading ? (
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
            ) : (
              <>
                <span className={styles.text}>
                  {t('business.system.medical.formu.label')}
                </span>
                <Skeleton.Input
                  active={true}
                  size={'small'}
                  className={styles.input}
                />
              </>
            )}
          </Col>
          <Col className="gutter-row" xs={24} sm={12}>
            {!loading ? (
              <RadioGroup
                label={t('business.system.surgical.label')}
                tooltip={t('business.system.surgical.tooltip')}
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
            ) : (
              <>
                <span className={styles.text}>
                  {t('business.system.surgical.label')}
                </span>
                <Skeleton.Input
                  active={true}
                  size={'small'}
                  className={styles.input}
                />
              </>
            )}
          </Col>
          <Col className="gutter-row" xs={24} sm={12}>
            {!loading ? (
              <RadioGroup
                label={t('business.system.prescriptions.label')}
                tooltip={t('business.system.prescriptions.tooltip')}
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
            ) : (
              <>
                <span className={styles.text}>
                  {t('business.system.prescriptions.label')}
                </span>
                <Skeleton.Input
                  active={true}
                  size={'small'}
                  className={styles.input}
                />
              </>
            )}
          </Col>
          <Col className="gutter-row" xs={24} sm={12}>
            {!loading ? (
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
            ) : (
              <>
                <span className={styles.text}>
                  {t('business.system.medical.approvals.label')}
                </span>
                <Skeleton.Input
                  active={true}
                  size={'small'}
                  className={styles.input}
                />
              </>
            )}
          </Col>
          <Col className="gutter-row" xs={24} sm={12}>
            {!loading ? (
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
            ) : (
              <>
                <span className={styles.text}>
                  {t('business.system.history.label')}
                </span>
                <Skeleton.Input
                  active={true}
                  size={'small'}
                  style={{ width: 200 }}
                />
              </>
            )}
          </Col>
        </Row>
        <div className={styles.btnSave}>
          {!loading ? (
            <Button
              type="primary"
              onClick={() => handleSaveChanges()}
              loading={buttonClicked}
            >
              {t('business.details.save.changes')}
            </Button>
          ) : (
            <Skeleton.Button
              active={true}
              size={'small'}
              className={styles.btn}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default System
