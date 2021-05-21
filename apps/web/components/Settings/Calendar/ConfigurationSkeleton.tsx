import { Col, Row, Skeleton } from 'antd'
import classNames from 'classnames'
import React, { FC } from 'react'
import styles from './Calendar.module.less'
import skeletonStyles from './skeleton.module.less'

export const ConfigurationSkeleton: FC = () => {
  return (
    <div
      className={classNames(
        styles.calendarSettingsConfiguration,
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
          styles.configurationControls,
          skeletonStyles.limitedWidth
        )}
      >
        <Row>
          <Col xs={24} style={{ marginBottom: '15px' }} className="pRelative">
            <label>
              <Skeleton active paragraph={{ rows: 0 }} />
            </label>
            <Skeleton.Input active />
          </Col>
        </Row>
        <Row>
          <Col
            xs={24}
            md={12}
            className={classNames(styles.colRightSpace, 'pRelative')}
          >
            <label>
              <Skeleton active paragraph={{ rows: 0 }} />
            </label>
            <Skeleton.Input active />
          </Col>
          <Col
            xs={24}
            md={12}
            className={classNames(styles.colLeftSpace, 'pRelative')}
          >
            <label>
              <Skeleton active paragraph={{ rows: 0 }} />
            </label>
            <Skeleton.Input active />
          </Col>
        </Row>
        <Row>
          <Col
            xs={24}
            className={classNames(styles.timeInputSpace, 'pRelative')}
          >
            <label>
              <Skeleton active paragraph={{ rows: 0 }} />
            </label>
            <Skeleton.Input active />
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default ConfigurationSkeleton
