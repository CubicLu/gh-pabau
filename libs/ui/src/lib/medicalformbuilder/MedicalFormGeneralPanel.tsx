import { AddSuggestion, FormType, SelectedForms } from '@pabau/ui'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './MedicalFormBuilder.module.less'
import MedicalFormName from './MedicalFormName'

interface MedicalFormGeneralProps {
  isEditing: () => boolean
  onSelectFormType: (val: SelectedForms) => void
  changeFormName: (formName: string) => void
  formName: string
  medicalFormType: string
}

const MedicalFormGeneralPanel: FC<MedicalFormGeneralProps> = ({
  isEditing,
  onSelectFormType,
  changeFormName,
  formName,
  medicalFormType = '',
}) => {
  const { t } = useTranslation('common')

  const onChangeSetting = (setting) => {
    onSelectFormType(setting)
  }
  const onSelectServices = (services) => {
    console.log(services)
  }
  const serviceOptions = [
    t('ui.medicalformbuilder.form.service.category'),
    t('ui.medicalformbuilder.form.service.all'),
  ]
  const defaultServices = []

  return (
    <div className={styles.medicalFormGeneralPanel}>
      <MedicalFormName
        changeFormName={changeFormName}
        label={t('ui.medicalformbuilder.form.name')}
        desc={t('ui.medicalformbuilder.form.name.description')}
        name={formName}
      />
      <AddSuggestion
        label={t('ui.medicalformbuilder.form.suggestion')}
        defaultSelected={defaultServices}
        options={serviceOptions}
        onChange={onSelectServices}
      />
      <FormType
        isEditing={isEditing}
        medicalFormType={medicalFormType}
        onChangeSetting={onChangeSetting}
      />
    </div>
  )
}

export default MedicalFormGeneralPanel
