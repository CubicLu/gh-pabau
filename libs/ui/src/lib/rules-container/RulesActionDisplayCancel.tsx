import { Input } from 'antd'
import cn from 'classnames'
import React, { FC } from 'react'
import styles from './RulesContainer.module.less'
import { ThenProp } from './RulesContainerInterface'
const { TextArea } = Input

interface P {
  t: ThenProp
  onChangeThen: (number, any) => void
}

export const RulesActionDisplayCancel: FC<P> = ({ t, onChangeThen }) => {
  return (
    <div className={cn(styles.formGroup, styles.noTemplate)}>
      <label>Display notice message</label>
      <div className={t.to === '' ? styles.emptyCondition : ''}>
        <TextArea
          rows={4}
          onChange={(e) =>
            onChangeThen(t.id, [
              {
                key: 'to',
                value: e.target.value,
              },
            ])
          }
          value={t.to}
        />
      </div>
    </div>
  )
}

export default RulesActionDisplayCancel
