import { Button, ButtonTypes } from '@pabau/ui'
import React, { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import SettingDefaultField from './SettingDefaultField'
import SettingElementTypeOption from './SettingElementTypeOption'
import SettingLinkedField from './SettingLinkedField'

interface P {
  changedForm: boolean
  defaultFieldValue: string
  defaultFieldValueWithTag: string
  onChangeDefaults: (value: string) => void
  linkedFieldValue: string
  onChangeLinkedField: (value: string) => void
  inputTypeValue: string
  onChangeInputType: (value: string) => void
  componentName: string
}

const SettingElementAdvanced: FC<P> = ({
  changedForm,
  defaultFieldValue,
  defaultFieldValueWithTag,
  onChangeDefaults,
  linkedFieldValue,
  onChangeLinkedField,
  inputTypeValue,
  onChangeInputType,
  componentName,
}) => {
  const { t } = useTranslation('common')
  const [advanced, setAdvanced] = useState(false)

  useEffect(() => {
    setAdvanced(false)
  }, [changedForm])

  return (
    <>
      {advanced && (
        <>
          {(componentName === 'basic_shortanswer' ||
            componentName === 'basic_signature') && (
            <SettingElementTypeOption
              title={
                componentName === 'basic_signature'
                  ? t('ui.medicalform.setting.advanced.signatrue')
                  : t('ui.medicalform.setting.advanced.inputtype')
              }
              value={inputTypeValue}
              onChangeInputType={onChangeInputType}
              componentName={componentName}
            />
          )}
          {componentName !== 'basic_signature' && (
            <>
              <SettingLinkedField
                linkedLabel={t('ui.medicalform.setting.advanced.linked')}
                linkedFieldValue={linkedFieldValue}
                onChangeLinkedField={onChangeLinkedField}
              />
              <SettingDefaultField
                linkedLabel={t('ui.medicalform.setting.advanced.default')}
                defaultFieldValue={defaultFieldValue}
                defaultFieldValueWithTag={defaultFieldValueWithTag}
                changedForm={changedForm}
                onChangeDefaults={onChangeDefaults}
              />
            </>
          )}
        </>
      )}
      <Button
        type={ButtonTypes.default}
        style={{ marginTop: '15px' }}
        onClick={(e) => setAdvanced((advanced) => !advanced)}
        size="small"
      >
        {!advanced && t('ui.medicalform.setting.advanced.show')}
        {advanced && t('ui.medicalform.setting.advanced.hide')}
      </Button>
    </>
  )
}

export default SettingElementAdvanced
