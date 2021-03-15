import { Button, ButtonTypes } from '@pabau/ui'
import React, { FC, useEffect, useState } from 'react'
import SettingDefaultField from './SettingDefaultField'
import SettingElementTypeOption from './SettingElementTypeOption'
import SettingLinkedField from './SettingLinkedField'

interface P {
  changedForm: boolean
  defaultFieldValue: string
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
  onChangeDefaults,
  linkedFieldValue,
  onChangeLinkedField,
  inputTypeValue,
  onChangeInputType,
  componentName,
}) => {
  const [advanced, setAdvanced] = useState(false)

  useEffect(() => {
    setAdvanced(false)
  }, [changedForm])

  return (
    <>
      {advanced && (
        <>
          {componentName === 'basic_shortanswer' && (
            <SettingElementTypeOption
              title="Input type"
              value={inputTypeValue}
              onChangeInputType={onChangeInputType}
            />
          )}
          <SettingLinkedField
            linkedLabel="Linked field"
            linkedFieldValue={linkedFieldValue}
            onChangeLinkedField={onChangeLinkedField}
          />
          <SettingDefaultField
            linkedLabel="Default field"
            defaultFieldValue={defaultFieldValue}
            onChangeDefaults={onChangeDefaults}
          />
        </>
      )}
      <Button
        type={ButtonTypes.default}
        style={{ marginTop: '15px' }}
        onClick={(e) => setAdvanced((advanced) => !advanced)}
        size="small"
      >
        {!advanced && `Show advanced settings`}
        {advanced && `Hide advanced settings`}
      </Button>
    </>
  )
}

export default SettingElementAdvanced
