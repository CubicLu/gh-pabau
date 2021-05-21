import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { Button } from '@pabau/ui'
import React, { FC } from 'react'
import styles from './Style.module.less'

interface ReviewsConfigFooterProps {
  step: number
  onNext: () => void
  onPrev: () => void
}

export const ReviewsConfigFooter: FC<ReviewsConfigFooterProps> = ({
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
    <div className={styles.reviewsConfigFooter}>
      <Button
        type="primary"
        disabled={step <= 0}
        onClick={() => handleClickPrev()}
      >
        <LeftOutlined /> Previous Step
      </Button>
      <p>{`Step ${step + 1}/4`}</p>
      <Button
        type="primary"
        disabled={step >= 3}
        onClick={() => handleClickNext()}
      >
        Next Step <RightOutlined />
      </Button>
    </div>
  )
}

export default ReviewsConfigFooter
