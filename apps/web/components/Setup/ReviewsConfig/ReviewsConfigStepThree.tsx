import React, { FC } from 'react'
import { ReviewChoice } from '@pabau/ui'
import { integrations } from './ReviewsConfigSetting'
import styles from './style.module.less'

export const ReviewsConfigStepThree: FC = () => {
  return (
    <div className={styles.reviewsConfigBody}>
      <div className={styles.reviewChoiceContainer}>
        <ReviewChoice {...integrations} />
      </div>
    </div>
  )
}

export default ReviewsConfigStepThree
