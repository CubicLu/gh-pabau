import React, { FC } from 'react'
import { Typography, Card } from 'antd'
import styles from './SettingsLayout.module.less'

interface P {
  title: string
  description: string
}

const SettingsLayout: FC<P> = ({ title, description, children }) => {
  const { Title } = Typography
  return (
    <div className={styles.settingsLayoutContainer}>
      <Card className={styles.settingsLayoutHead}>
        <Title>{title}</Title>
        <span>{description}</span>
      </Card>
      <div className={styles.containerBody}>{children}</div>
    </div>
  )
}

export default SettingsLayout
