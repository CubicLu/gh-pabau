import {
  EmailMessageTemplateItem,
  InputHtmlWithTags,
  InputWithTags,
} from '@pabau/ui'
import { Input, Select } from 'antd'
import cn from 'classnames'
import React, { FC } from 'react'
import styles from './RulesContainer.module.less'
import { ThenProp } from './RulesContainerInterface'

const { Option } = Select

interface P {
  t: ThenProp
  onChangeThen: (number, any) => void
  emailMessageTemplateItems: EmailMessageTemplateItem[]
}

export const RulesActionEmail: FC<P> = ({
  t,
  onChangeThen,
  emailMessageTemplateItems,
}) => {
  return (
    <div className={cn(styles.formGroup, styles.noTemplate)}>
      {t.event === 'send_email_using_template' && (
        <>
          <label>Templates</label>
          <Select
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
            {emailMessageTemplateItems?.map((emailMessageTemplateItem) => (
              <Option
                key={emailMessageTemplateItem.template_id}
                value={emailMessageTemplateItem.template_id}
              >
                {emailMessageTemplateItem.template_name}
              </Option>
            ))}
          </Select>
          <div className={styles.devider}></div>
        </>
      )}
      <label>From</label>
      <Select>
        <Option value="1">From 1</Option>
        <Option value="2">From 2</Option>
      </Select>
      <div className={styles.devider}></div>
      <label>To (Required)</label>
      <InputWithTags
        placeholder="Emails you'd like to send to"
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
        enabledTags={['[CLIENTEMAIL]']}
      />
      {t.event !== 'send_email_using_template' && (
        <>
          <div className={styles.devider}></div>
          <label>Email subject (Required)</label>
          <Input />
          <div className={styles.devider}></div>
          <label>Body (Required)</label>
          <div style={{ border: `1px solid #ecedf0` }}>
            <InputHtmlWithTags
              placeholder={''}
              value={''}
              valueWithTag={''}
              disabledTags={[]}
              maxWidth={460}
            />
          </div>
        </>
      )}
      <div className={styles.devider}></div>
      <label>CC (Carbon copy)</label>
      <Select>
        <Option value="1">CC 1</Option>
        <Option value="2">CC 2</Option>
      </Select>
    </div>
  )
}

export default RulesActionEmail
