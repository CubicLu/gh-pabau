import { InputWithTags, SmsMessageTemplateItem } from '@pabau/ui'
import { Select } from 'antd'
import React, { FC } from 'react'
import styles from './RulesContainer.module.less'
import { ThenProp } from './RulesContainerInterface'
const { Option } = Select

interface P {
  t: ThenProp
  onChangeThen: (number, any) => void
  smsMessageTemplateItems: SmsMessageTemplateItem[]
}

export const RulesActionSms: FC<P> = ({
  t,
  onChangeThen,
  smsMessageTemplateItems = [],
}) => {
  return (
    <>
      <div className={styles.formGroup}>
        <label>From</label>
        <Select
          style={{ width: 130 }}
          // value={t.from}
          onChange={(e) =>
            onChangeThen(t.id, [
              {
                key: 'from',
                value: e,
              },
            ])
          }
        >
          <Option value="1">From-1</Option>
          <Option value="2">From-2</Option>
        </Select>
      </div>
      <div className={styles.formGroup}>
        <label>Templates</label>
        <Select
          style={{ width: 130 }}
          // value={t.template}
          onChange={(e) =>
            onChangeThen(t.id, [
              {
                key: 'template',
                value: e,
              },
            ])
          }
        >
          {smsMessageTemplateItems?.map((smsMessageTemplateItem) => (
            <Option
              key={smsMessageTemplateItem.template_id}
              value={smsMessageTemplateItem.template_id}
            >
              {smsMessageTemplateItem.template_name}
            </Option>
          ))}
        </Select>
      </div>
      <div className={styles.formGroup} style={{ marginRight: 10 }}>
        <label>To</label>
        <InputWithTags
          width={180}
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
          enabledTags={['[CLIENTMOBILE]']}
        />
      </div>
    </>
  )
}

export default RulesActionSms
