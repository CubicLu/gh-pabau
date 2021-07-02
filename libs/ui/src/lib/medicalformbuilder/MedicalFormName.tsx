import { Input } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './MedicalFormBuilder.module.less'

interface P {
  label: string
  desc: string
  name: string
  changeFormName: (formName: string) => void
}

export const MedicalFormName: FC<P> = ({
  label,
  desc,
  name,
  changeFormName,
}) => {
  const { t } = useTranslation('common')
  const [formName, setFormName] = useState(name)
  const defaultFormName = t('ui.medicalformbuilder.form.empty')

  useEffect(() => {
    setFormName(name)
  }, [name])

  const onChangeFormName = (e) => {
    setFormName(e.target.value)
    changeFormName(e.target.value)
  }
  return (
    <div className={styles.medicalFormName}>
      <div className={styles.label}>{label}</div>
      <Input
        placeholder={desc}
        value={formName === '' ? defaultFormName : formName}
        onChange={onChangeFormName}
      />
    </div>
  )
}

export default MedicalFormName
