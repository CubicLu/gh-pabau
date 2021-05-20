import { DeleteOutlined, SaveOutlined } from '@ant-design/icons'
import { Button, ButtonTypes } from '@pabau/ui'
import { Switch, Tooltip } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './Setting.module.less'

interface P {
  needLeft: boolean
  deleteFunc: () => void
  saveFunc: () => void
  requireFunc: (checked) => void
  required: boolean
  linkedField: string
}

export const SettingMedicalFormBottom: FC<P> = ({
  needLeft,
  deleteFunc,
  saveFunc,
  requireFunc,
  required,
  linkedField,
}) => {
  const { t } = useTranslation('common')
  const [checked, setChecked] = useState(required)
  const [requiredTootip, setRequiredTooltip] = useState('')
  const [disabled, setDisabled] = React.useState(false)
  const requiredTooltip = t('ui.medicalform.setting.requried.tooltip')
  useEffect(() => {
    setChecked(required)
  }, [required])
  useEffect(() => {
    if (linkedField === '') {
      setRequiredTooltip('')
      setDisabled(false)
    } else {
      setRequiredTooltip(requiredTooltip)
      setChecked(true)
      setDisabled(true)
    }
  }, [linkedField, requiredTooltip])

  return (
    <div className={styles.formItem} style={{ borderBottom: 'none' }}>
      <div className={`${styles.formBottom} ${styles.formCommon}`}>
        {needLeft && (
          <div className={styles.leftButtons}>
            <Tooltip title={requiredTootip}>
              <Switch
                size="small"
                onChange={requireFunc}
                checked={checked}
                disabled={disabled}
                onClick={(e) => setChecked((e) => !e)}
              />
            </Tooltip>
            <span>{t('ui.medicalform.setting.bottom.required')}</span>
          </div>
        )}
        <div className={styles.rightButtons}>
          <Button
            type={ButtonTypes.default}
            icon={<DeleteOutlined />}
            onClick={deleteFunc}
            size="small"
          >
            {t('ui.medicalform.setting.bottom.delete')}
          </Button>
          <Button
            type={ButtonTypes.primary}
            icon={<SaveOutlined />}
            size="small"
            onClick={saveFunc}
          >
            {t('ui.medicalform.setting.bottom.save')}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default SettingMedicalFormBottom
