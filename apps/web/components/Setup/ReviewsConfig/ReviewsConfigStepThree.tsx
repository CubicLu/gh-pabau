import { ReviewChoice } from '@pabau/ui'
import React, { FC } from 'react'
import { integrations } from './ReviewsConfigSetting'
import styles from './Style.module.less'

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
