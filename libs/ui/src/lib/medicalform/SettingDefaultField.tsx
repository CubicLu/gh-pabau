import { PlusOutlined } from '@ant-design/icons'
import { Button, ButtonTypes, HelpTooltip, InputWithHelper } from '@pabau/ui'
import React, { FC, useEffect, useState } from 'react'
import styles from './Setting.module.less'

type linkedFieldProps = {
  linkedLabel: string
  defaultFieldValue: string
  onChangeDefaults: (value: string) => void
}

const SettingDefaultField: FC<linkedFieldProps> = ({
  linkedLabel,
  defaultFieldValue,
  onChangeDefaults,
}) => {
  const [defaultField, setDefaultField] = useState(defaultFieldValue)
  const [addDefaultField, setAddDefaultField] = useState(false)

  useEffect(() => {
    setDefaultField(defaultFieldValue)
  }, [defaultFieldValue])

  const onChange = (value) => {
    setDefaultField(value)
    onChangeDefaults(value)
  }

  return (
    <>
      <p style={{ marginTop: '20px' }}>
        {linkedLabel} <HelpTooltip helpText="Hello" />
      </p>

      {(addDefaultField || defaultFieldValue !== '') && (
        <div className={styles.linkedField}>
          <InputWithHelper
            help="Personalize Default Field"
            value={defaultField}
            onChangeValue={onChange}
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
            Add
          </Button>
          <br />
        </>
      )}
    </>
  )
}

export default SettingDefaultField
