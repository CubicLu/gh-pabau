import { FileTextTwoTone, LeftOutlined } from '@ant-design/icons'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './MedicalFormBuilder.module.less'

interface P {
  formName: string
  hideFormBuilder?: () => void
}

export const MedicalFormInfo: FC<P> = ({ formName, hideFormBuilder }) => {
  const { t } = useTranslation('common')
  const onBack = () => {
    hideFormBuilder?.()
  }

  return (
    <div className={styles.medicalFormInfoPanel}>
      <LeftOutlined onClick={onBack} />
      <FileTextTwoTone />
      <span>
        {formName === '' ? t('ui.medicalformbuilder.form.empty') : formName}
      </span>
    </div>
  )
}

export default MedicalFormInfo
