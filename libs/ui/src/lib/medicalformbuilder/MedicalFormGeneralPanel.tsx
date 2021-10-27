import {
  AddSuggestion,
  FormType,
  SelectedForms,
  CompanyListItem,
} from '@pabau/ui'
import React, { FC, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './MedicalFormBuilder.module.less'
import MedicalFormName from './MedicalFormName'

interface MedicalFormGeneralProps {
  isEditing: () => boolean
  onSelectFormType: (val: SelectedForms) => void
  changeFormName: (formName: string) => void
  changeService: (services: Array<string | number>) => void
  formName: string
  medicalFormType: string
  companyServiceListItems: CompanyListItem[]
  medicalFormServices: string
}

const MedicalFormGeneralPanel: FC<MedicalFormGeneralProps> = ({
  isEditing,
  onSelectFormType,
  changeFormName,
  changeService,
  formName,
  medicalFormType = '',
  companyServiceListItems = [],
  medicalFormServices = '',
}) => {
  const { t } = useTranslation('common')
  const [defaultServices, setDefaultServices] = useState<
    Array<string | number>
  >([])

  useEffect(() => {
    console.log('companyServiceListItems', companyServiceListItems)
  }, [companyServiceListItems])

  useEffect(() => {
    console.log('medicalFormServices', medicalFormServices)
    if (medicalFormServices === 'null' || medicalFormServices === '') {
      setDefaultServices([])
    } else {
      setDefaultServices(
        medicalFormServices.split(',').map(function (item) {
          return Number(item.trim())
        })
      )
    }
  }, [medicalFormServices])

  const onChangeSetting = (setting) => {
    onSelectFormType(setting)
  }
  const onSelectServices = (services) => {
    console.log(services)
    changeService(services)
  }

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
        options={companyServiceListItems}
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
