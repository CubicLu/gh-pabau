import { Button } from '@pabau/ui'
import { Progress, Skeleton } from 'antd'
import React from 'react'
import styles from './Security.module.less'

interface P {
  percent: number
  title1: string
  title2: string
  buttonTitle: string
  loading?: boolean
  onButtonTitle?(): void
}

export const SecurityScore: React.FC<P> = ({
  percent,
  title1,
  title2,
  buttonTitle,
  loading,
  onButtonTitle,
}) => {
  let progressColor, stateStr

  if (percent < 30) {
    progressColor = 'red'
    stateStr = 'Bad'
  } else if (percent >= 30 && percent < 60) {
    progressColor = 'yellow'
    stateStr = 'Good'
  } else {
    progressColor = 'green'
    stateStr = 'Excellent'
  }

  const handleButtonTitle = () => {
    onButtonTitle?.()
  }

  return (
    <div className={styles.scoreBody}>
      <p className={styles.scoreTitle}>{title1}</p>
      <div className={styles.seconddivrow}>
        <span className={styles.scorePercent}>
          {' '}
          {!loading ? (
            <>
              {percent || 0}% {stateStr}
            </>
          ) : (
            <Skeleton.Input
              active={true}
              size={'small'}
              className={styles.field}
            />
          )}
        </span>
        {!loading ? (
          <Progress
            className={styles.scoreProgress}
            percent={percent || 0}
            strokeColor={progressColor}
            showInfo={false}
          />
        ) : (
          <Skeleton.Input
            active={true}
            size={'small'}
            className={styles.scoreProgress}
          />
        )}
      </div>
      <div className={styles.thirddivrow}>
        <span className={styles.scoreTitle1}>{title2}</span>
        {!loading ? (
          <Button
            className={styles.btnScore}
            size="middle"
            type="link"
            onClick={handleButtonTitle}
          >
            {buttonTitle}
          </Button>
        ) : (
          <div className={styles.section}>
            <Skeleton.Input
              active={true}
              size={'small'}
              className={`${styles.btnScore} ${styles.input}`}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default SecurityScore
