import { Skeleton } from 'antd'
import classNames from 'classnames'
import React, { FC } from 'react'
import styles from './Calendar.module.less'
import skeletonStyles from './skeleton.module.less'

const AdvancedSkeleton: FC = () => {
  return (
    <div
      className={classNames(
        styles.calendarSettingsAppointment,
        skeletonStyles.skeletonWrapper
      )}
    >
      <div className={styles.settingContent}>
        <div className={skeletonStyles.limitedWidth}>
          <Skeleton active paragraph={{ rows: 1 }} />
        </div>
      </div>
      <div
        className={classNames(
          styles.appointmentsControls,
          skeletonStyles.limitedWidth
        )}
      >
        {[1, 2, 3, 4, 5, 6, 7].map((appointment) => {
          return (
            <div key={appointment} className={styles.advancedCheckList}>
              <div className="checkboxSkeleton">
                <Skeleton.Avatar shape="square" />
                <Skeleton active paragraph={{ rows: 0 }} />
              </div>
            </div>
          )
        })}
        <div className={classNames(styles.numberInput, 'pRelative')}>
          <label>
            <Skeleton active paragraph={{ rows: 0 }} />
          </label>
          <Skeleton.Input active />
        </div>
      </div>
    </div>
  )
}

export default AdvancedSkeleton
