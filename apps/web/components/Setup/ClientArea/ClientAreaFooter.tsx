import React, { FC } from 'react'
import { Button } from '@pabau/ui'
import { LeftOutlined, RightOutlined, DownOutlined } from '@ant-design/icons'
import styles from './style.module.less'

interface ClientAreaFooterProps {
  step: number
  onNext: () => void
  onPrev: () => void
}

export const ClientAreaFooter: FC<ClientAreaFooterProps> = ({
  step,
  onNext,
  onPrev,
}) => {
  const handleClickNext = () => {
    onNext()
  }
  const handleClickPrev = () => {
    onPrev()
  }
  return (
    <div className={styles.clientAreaFooter}>
      <Button
        type="primary"
        disabled={step <= 0}
        onClick={() => handleClickPrev()}
      >
        <LeftOutlined /> Previous Step
      </Button>
      <p>{`Step ${step + 1}/3`}</p>
      {step < 2 && (
        <Button
          type="primary"
          disabled={step >= 2}
          onClick={() => handleClickNext()}
        >
          Next Step <RightOutlined />
        </Button>
      )}
      {step >= 2 && (
        <Button type="primary">
          Send Test <DownOutlined />
        </Button>
      )}
    </div>
  )
}

export default ClientAreaFooter
