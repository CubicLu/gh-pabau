import { InputHtmlWithTags } from '@pabau/ui'
import React, { FC } from 'react'
import styles from './Setting.module.less'

interface P {
  title: string
  desc: string
  value: string
  valueWithTag: string
  onChangeText: (value: string) => void
}

const SettingElementTextBlock: FC<P> = ({
  title,
  desc,
  value,
  valueWithTag,
  onChangeText,
}) => {
  // const onTextChange = (e) => {
  //   onChangeText?.(e)
  // }
  const onTextWithTagChange = (e) => {
    onChangeText?.(e)
  }
  return (
    <>
      <h3 style={{ marginTop: '5px' }}>{title}</h3>
      <div className={styles.txtBlock}>
        <InputHtmlWithTags
          placeholder={''}
          onChange={onTextWithTagChange}
          value={value}
          valueWithTag={valueWithTag}
          disabledTags={['leads', 'opportunity']}
        />
      </div>
    </>
  )
}

export default SettingElementTextBlock
