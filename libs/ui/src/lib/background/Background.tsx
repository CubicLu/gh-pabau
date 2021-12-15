import React, { useState, FC } from 'react'
import { StopOutlined } from '@ant-design/icons'

import styles from './Background.module.less'

export interface listType {
  name: string
  color: string
}

export interface BackgroundProps {
  list: listType[]
  onChange?: (name: string) => void
  defaultSelectedColor: string
}

export const Background: FC<BackgroundProps> = ({
  list,
  onChange,
  defaultSelectedColor,
}) => {
  const [selected, setSelected] = useState<string>(defaultSelectedColor)

  const handleChange = (color: string) => {
    setSelected(color)
    onChange?.(color)
  }

  return (
    <div className={styles.backgroundWrapper}>
      <div className={styles.title}>Background Colour</div>
      <div className={styles.listWrapper}>
        {list &&
          list.length > 0 &&
          list.map((thread, index) => {
            return (
              <div key={index} className={styles.list}>
                <div
                  style={{ background: thread.color }}
                  className={
                    selected === thread.color
                      ? `${styles.box} ${styles.selectedBox}`
                      : styles.box
                  }
                  onClick={() => handleChange(thread.color)}
                >
                  {thread.name === 'None' && (
                    <StopOutlined className={styles.noneIcon} />
                  )}
                </div>
                <p className={styles.name}>{thread.name}</p>
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default Background
