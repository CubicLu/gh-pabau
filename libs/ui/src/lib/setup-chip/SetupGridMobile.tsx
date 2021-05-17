import React from 'react'
import { RightOutlined } from '@ant-design/icons'
import styles from './SetupChip.module.less'
import { SubData } from './SetupGrid'

export interface SubDataTitleMobile {
  title: string
  data: SubData[]
}

export interface SetupGridMobileProps {
  image: string
  title: string
  keyValue: string
  subDataTitles: SubDataTitleMobile[]
  onClick: (index: string) => void
}

export function SetupGridMobile(props: SetupGridMobileProps): JSX.Element {
  const { image, title, subDataTitles, keyValue } = props
  return (
    <div
      className={styles.gridMobileWrapper}
      onClick={() => props.onClick(keyValue)}
    >
      <div className={styles.imgTitleWrap}>
        <img src={image} alt={title} />
        <div className={styles.title}>{title}</div>
      </div>
      <div className={styles.listIcon}>
        {subDataTitles.length > 0 && <RightOutlined />}
      </div>
    </div>
  )
}

export default SetupGridMobile
