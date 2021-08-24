import { QuestionCircleFilled } from '@ant-design/icons'
import { InputWithTags, UserListItem } from '@pabau/ui'
import { Checkbox, InputNumber, Radio, Select } from 'antd'
import cn from 'classnames'
import React, { FC, useState } from 'react'
import styles from './RulesContainer.module.less'
import { ThenProp } from './RulesContainerInterface'
const { Option } = Select

interface P {
  t: ThenProp
  onChangeThen: (number, any) => void
  userListItems: UserListItem[]
}

interface dueDateItem {
  key: number
  label: string
}

export const RulesActionActivity: FC<P> = ({
  t,
  onChangeThen,
  userListItems = [],
}) => {
  const dueDatesPreDefineds = [
    {
      key: 0,
      label: 'The same day',
    },
    {
      key: 1,
      label: 'In one day',
    },
    {
      key: 2,
      label: 'Next Monday',
    },
    {
      key: 3,
      label: 'Next Tuesday',
    },
    {
      key: 4,
      label: 'Next Wednesday',
    },
    {
      key: 5,
      label: 'Next Thursday',
    },
    {
      key: 6,
      label: 'Next Friday',
    },
    {
      key: 7,
      label: 'Next Saturday',
    },
    {
      key: 8,
      label: 'Next Sunday',
    },
    {
      key: 9,
      label: 'In 2 days',
    },
    {
      key: 10,
      label: 'In 3 days',
    },
    {
      key: 11,
      label: 'In 4 days',
    },
    {
      key: 12,
      label: 'In 5 days',
    },
    {
      key: 13,
      label: 'In 6 days',
    },
    {
      key: 14,
      label: 'In 7 days',
    },
    {
      key: 15,
      label: 'In 1 week',
    },
    {
      key: 16,
      label: 'In 2 weeks',
    },
    {
      key: 17,
      label: 'In 3 weeks',
    },
    {
      key: 18,
      label: 'In 4 weeks',
    },
    {
      key: 19,
      label: 'In 1 month',
    },
    {
      key: 20,
      label: 'In 2 months',
    },
    {
      key: 21,
      label: 'In 3 months',
    },
    {
      key: 22,
      label: 'In 4 months',
    },
    {
      key: 23,
      label: 'In 5 months',
    },
    {
      key: 24,
      label: 'In 6 months',
    },
    {
      key: 25,
      label: 'In 7 months',
    },
    {
      key: 26,
      label: 'In 8 months',
    },
    {
      key: 27,
      label: 'In 9 months',
    },
    {
      key: 28,
      label: 'In 10 months',
    },
    {
      key: 29,
      label: 'In 11 months',
    },
    {
      key: 30,
      label: 'In 12 months',
    },
  ]
  const dueDatesCustom = [
    {
      key: 1,
      label: 'day(s)',
    },
    {
      key: 2,
      label: 'week(s)',
    },
    {
      key: 3,
      label: 'month(s)',
    },
    {
      key: 4,
      label: 'year(s)',
    },
  ]
  const [dueDates, setDueDates] = useState<dueDateItem[]>(dueDatesPreDefineds)
  const [dueDateType, setDueDateType] = useState('predefine')
  const [dueDate, setDueDate] = useState('')
  const changeDueDatesType = (e) => {
    setDueDates([])
    if (e.target.value === 'predefine') {
      setDueDates(dueDatesPreDefineds)
    } else {
      setDueDates(dueDatesCustom)
    }
    setDueDateType(e.target.value)
    setDueDate('')
  }
  const changeDueDates = (e) => {
    setDueDate(e)
  }
  return (
    <div className={cn(styles.formGroup, styles.noTemplate)}>
      <label>Assigned to</label>
      <Select>
        {userListItems?.map((userListItem) => (
          <Option
            key={userListItem.id}
            value={userListItem.id}
            className={userListItem.id === 0 ? 'styleForStaticOption' : ''}
          >
            {userListItem.full_name}
          </Option>
        ))}
      </Select>
      <div className={styles.devider}></div>
      <label>Activity subject (Required)</label>
      <div className={t.to === '' ? styles.emptyCondition : ''}>
        <InputWithTags
          placeholder={''}
          onFullChange={(e) =>
            onChangeThen(t.id, [
              {
                key: 'to',
                value: e,
              },
            ])
          }
          value={t.to}
          valueWithTag={t.to}
          disabledTags={[
            'datetime',
            'company',
            'invoice',
            'giftvoucher',
            'leads',
            'staff',
            'opportunity',
            'quickbook',
            'customfields',
            'forms',
            'connect',
          ]}
          forWhat={t.to === '' ? 'ruleEmpty' : 'rule'}
        />
      </div>
      <div className={styles.devider}></div>
      <label>Type (Required)</label>
      <Select>
        <Option value="1">Type 1</Option>
        <Option value="2">Type 2</Option>
      </Select>
      <div className={styles.devider}></div>
      <label>Due date (Required)</label>
      <Radio.Group onChange={changeDueDatesType} value={dueDateType}>
        <Radio value="predefine">Predefined</Radio>
        <Radio value="custom">Custom</Radio>
      </Radio.Group>
      <div
        className={cn(
          dueDateType === 'custom'
            ? styles.dueDateCustom
            : styles.dueDatePredefined
        )}
      >
        {dueDateType === 'custom' && <InputNumber min={0} step={1} />}
        <Select onChange={changeDueDates} value={dueDate}>
          {dueDates.map((item) => (
            <Option value={item.key} key={item.key}>
              {item.label}
            </Option>
          ))}
        </Select>
      </div>
      <Checkbox>
        Skip weekends <QuestionCircleFilled />
      </Checkbox>
    </div>
  )
}

export default RulesActionActivity
