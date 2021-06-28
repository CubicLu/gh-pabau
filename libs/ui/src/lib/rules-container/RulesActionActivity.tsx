import { QuestionCircleFilled } from '@ant-design/icons'
import { Checkbox, Input, Radio, Select } from 'antd'
import cn from 'classnames'
import React, { FC } from 'react'
import styles from './RulesContainer.module.less'
import { ThenProp } from './RulesContainerInterface'
const { Option } = Select

interface P {
  t: ThenProp
  onChangeThen: (number, any) => void
}

export const RulesActionActivity: FC<P> = ({ t, onChangeThen }) => {
  return (
    <div className={cn(styles.formGroup, styles.noTemplate)}>
      <label>Activity subject (Required)</label>
      <div className={t.to === '' ? styles.emptyCondition : ''}>
        <Input
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
      <div className={styles.devider}></div>
      <label>Type (Required)</label>
      <Select>
        <Option value="1">Type 1</Option>
        <Option value="2">Type 2</Option>
      </Select>
      <div className={styles.devider}></div>
      <label>Due date (Required)</label>
      <Radio.Group>
        <Radio value={1}>Predefined</Radio>
        <Radio value={2}>Custom</Radio>
      </Radio.Group>
      <Select>
        <Option value="1">Due date 1</Option>
        <Option value="2">Due date 2</Option>
      </Select>
      <Checkbox>
        Skip weekends <QuestionCircleFilled />
      </Checkbox>
      <div className={styles.devider}></div>
      <label>Assigned to</label>
      <Select>
        <Option value="1">Assigned 1</Option>
        <Option value="2">Assigned 2</Option>
      </Select>
    </div>
  )
}

export default RulesActionActivity
