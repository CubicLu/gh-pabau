import React from 'react'
import { Button } from '@pabau/ui'
import { Tooltip } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import styles from './CloseButton.module.less'

export const CloseButton = () => {
  return (
    <Tooltip placement="bottom" title="Close">
      <div className={styles.closeBtn}>
        <Button type="text">
          <CloseOutlined />
        </Button>
      </div>
    </Tooltip>
  )
}

export default CloseButton
