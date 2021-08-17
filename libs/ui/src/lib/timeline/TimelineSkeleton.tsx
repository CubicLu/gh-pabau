import React, { FC } from 'react'
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component'
import { Skeleton } from 'antd'
import styles from './Timeline.module.less'

export const TimelineSkeleton: FC = () => {
  return (
    <div className={styles.followWrapper}>
      <div className={styles.timelineWrap}>
        <div className="vertical-timeline-element--work">
          {[1, 2].map((day) => (
            <div className={styles.timeEleWrap} key={day}>
              <VerticalTimeline layout={'1-column-left'}>
                {[1, 2, 3, 4, 5].map((event, index) => {
                  return (
                    <VerticalTimelineElement
                      key={index}
                      icon={
                        <Skeleton.Avatar size={'default'} shape={'circle'} />
                      }
                    >
                      <Skeleton paragraph={{ rows: 1 }} />
                    </VerticalTimelineElement>
                  )
                })}
              </VerticalTimeline>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TimelineSkeleton
