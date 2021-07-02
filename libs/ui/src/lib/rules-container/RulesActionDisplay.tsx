import { Input, Select } from 'antd'
import React, { FC } from 'react'
import styles from './RulesContainer.module.less'
import { ThenProp } from './RulesContainerInterface'

const { Option } = Select

interface P {
  t: ThenProp
  onChangeThen: (number, any) => void
}

export const RulesActionDisplay: FC<P> = ({ t, onChangeThen }) => {
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
      <div className={styles.formGroup}>
        <label>To</label>
        <div className={t.to === '' ? styles.emptyCondition : ''}>
          <Input
            placeholder="Emails you'd like to send to"
            value={t.to}
            onChange={(e) =>
              onChangeThen(t.id, [
                {
                  key: 'to',
                  value: e.target.value,
                },
              ])
            }
          />
        </div>
      </div>
    </>
  )
}

export default RulesActionDisplay
