import { Button, ButtonTypes } from '@pabau/ui'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './MedicalFormBuilder.module.less'

interface P {
  clickCreateFormBtn: () => void
  create?: boolean
  disabledButton?: boolean
}

export const MedicalFormSetting: FC<P> = ({
  clickCreateFormBtn,
  create = true,
  disabledButton = true,
}) => {
  const { t } = useTranslation('common')
  const onClickBtn = () => {
    clickCreateFormBtn?.()
  }

  return (
    <div className={styles.medicalFormSettingPanel}>
      <Button
        type={ButtonTypes.primary}
        className={styles.createButton}
        onClick={onClickBtn}
        disabled={disabledButton}
      >
        {create
          ? t('ui.medicalformbuilder.form.create')
          : t('ui.medicalformbuilder.form.save')}
      </Button>
    </div>
  )
}

export default MedicalFormSetting
