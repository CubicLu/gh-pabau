import { TabMenu } from '@pabau/ui'
import { Skeleton } from 'antd'
import classNames from 'classnames'
import React, { FC } from 'react'
import styles from './calendar.module.less'
import skeletonStyles from './skeleton.module.less'

const AppearanceSkeleton: FC = () => {
  return (
    <div
      className={classNames(
        styles.calendarSettingsAppearance,
        skeletonStyles.skeletonWrapper
      )}
    >
      <div className={styles.settingContent}>
        <div className={skeletonStyles.limitedWidth}>
          <Skeleton active paragraph={{ rows: 1 }} />
        </div>
      </div>
      <div className={styles.generalControls}>
        <div
          className={classNames(
            styles.generalBlock,
            skeletonStyles.limitedWidth
          )}
        >
          <label>
            <Skeleton active paragraph={{ rows: 0 }} />
          </label>
          {[1, 2, 3].map((general) => {
            return (
              <div key={general}>
                <div className="checkboxSkeleton">
                  <Skeleton.Avatar shape="square" />
                  <Skeleton active paragraph={{ rows: 0 }} />
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <div className={styles.fontControls}>
        <div
          className={classNames(styles.fontBlock, skeletonStyles.limitedWidth)}
        >
          <label>
            <Skeleton active paragraph={{ rows: 0 }} />
          </label>
          <div className="pRelative">
            <Skeleton.Input active />
          </div>
        </div>
      </div>
      <div
        className={classNames(styles.fontControls, styles.appointmentPreview)}
      >
        <div className={classNames(styles.fontBlock)}>
          <label>
            <Skeleton active paragraph={{ rows: 0 }} />
          </label>
          <br />
          <TabMenu
            minHeight={'0vh'}
            tabPosition="top"
            menuItems={[
              <div className="tab" key="1">
                <Skeleton active paragraph={{ rows: 0 }} />
              </div>,
              <div className="tab" key="2">
                <Skeleton active paragraph={{ rows: 0 }} />
              </div>,
            ]}
          >
            <div className={classNames(styles.paddingDiv, 'pRelative')}>
              <div className="flexEnd">
                <Skeleton.Button active />
              </div>
              <br />
              <Skeleton.Input active style={{ height: 100 }} />
              <br />
              <br />
              <div className="flexStart">
                <Skeleton.Button active />
              </div>
            </div>
            <div className={classNames(styles.paddingDiv, 'pRelative')}>
              <div className="flexEnd">
                <Skeleton.Button active />
              </div>
              <br />
              <Skeleton.Input active style={{ height: 100 }} />
              <br />
              <br />
              <div className="flexStart">
                <Skeleton.Button active />
              </div>
            </div>
          </TabMenu>
        </div>
      </div>
    </div>
  )
}

export default AppearanceSkeleton
