import { PlusOutlined } from '@ant-design/icons'
import { Button, ButtonTypes, HelpTooltip, InputWithTags } from '@pabau/ui'
import React, { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './Setting.module.less'

type linkedFieldProps = {
  linkedLabel: string
  defaultFieldValue: string
  defaultFieldValueWithTag: string
  changedForm: boolean
  onChangeDefaults: (value: string) => void
}

const SettingDefaultField: FC<linkedFieldProps> = ({
  linkedLabel,
  defaultFieldValue,
  defaultFieldValueWithTag,
  changedForm,
  onChangeDefaults,
}) => {
  const { t } = useTranslation('common')
  const [defaultField, setDefaultField] = useState(defaultFieldValue)
  const [defaultFieldWithTag, setDefaultFieldWithTag] = useState(
    defaultFieldValueWithTag
  )
  const [addDefaultField, setAddDefaultField] = useState(false)
  const [triggerChangeValue, setTriggerChangeValue] = useState(false)

  useEffect(() => {
    setDefaultField(defaultFieldValue)
  }, [defaultFieldValue])
  useEffect(() => {
    setDefaultFieldWithTag(defaultFieldValueWithTag)
  }, [defaultFieldValueWithTag])

  useEffect(() => {
    setTriggerChangeValue((triggerChangeValue) => !triggerChangeValue)
  }, [changedForm])

  const onChange = (value) => {
    setDefaultField(value)
    onChangeDefaults(value)
  }

  return (
    <>
      <p style={{ marginTop: '20px' }}>
        {linkedLabel}{' '}
        <HelpTooltip
          helpText={t('ui.medicalform.setting.defaultfield.tooltip')}
        />
      </p>

      {(addDefaultField || defaultFieldValue !== '') && (
        <div className={styles.defaultField}>
          <InputWithTags
            placeholder={t('ui.medicalform.setting.defaultfield.placeholder')}
            onChange={onChange}
            value={defaultField}
            valueWithTag={defaultFieldWithTag}
            triggerChangeValue={triggerChangeValue}
            disabledTags={['leads', 'opportunity']}
          />
        </div>
      )}
      {addDefaultField === false && defaultFieldValue === '' && (
        <>
          <Button
            style={{ marginTop: '5px' }}
            type={ButtonTypes.default}
            icon={<PlusOutlined />}
            size="small"
            onClick={() => setAddDefaultField((e) => true)}
          >
            {t('ui.medicalform.setting.defaultfield.add')}
          </Button>
          <br />
        </>
      )}
    </>
  )
}

export default SettingDefaultField
