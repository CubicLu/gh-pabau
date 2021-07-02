import { InputWithTags } from '@pabau/ui'
import { Select } from 'antd'
import React, { FC } from 'react'
import styles from './RulesContainer.module.less'
import { ThenProp } from './RulesContainerInterface'
const { Option } = Select

interface P {
  t: ThenProp
  onChangeThen: (number, any) => void
}

export const RulesActionSms: FC<P> = ({ t, onChangeThen }) => {
  return (
    <>
      <div className={styles.formGroup}>
        <label>Templates</label>
        <Select
          style={{ width: 200 }}
          value={t.template}
          onChange={(e) =>
            onChangeThen(t.id, [
              {
                key: 'template',
                value: e,
              },
            ])
          }
        >
          <Option value="1">Default Template</Option>
          <Option value="2">Client Email Template</Option>
        </Select>
      </div>
      <div className={styles.formGroup} style={{ marginRight: 10 }}>
        <label>To</label>
        <InputWithTags
          width={250}
          placeholder="Mobile number you'd like to send to"
          value={t.to}
          valueWithTag={t.to}
          onFullChange={(e) =>
            onChangeThen(t.id, [
              {
                key: 'to',
                value: e,
              },
            ])
          }
          forWhat={t.to === '' ? 'ruleEmpty' : 'rule'}
          disabledTags={[
            'appointments',
            'leads',
            'opportunity',
            'datetime',
            'company',
            'invoice',
            'giftvoucher',
            'staff',
            'quickbook',
            'customfields',
            'forms',
            'connect',
          ]}
        />
      </div>
    </>
  )
}

export default RulesActionSms
