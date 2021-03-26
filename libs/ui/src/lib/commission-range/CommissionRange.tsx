import React, { FC, useMemo } from 'react'
import { Row, Col } from 'antd'
import styles from './CommissionRange.module.less'

export interface UserField {
  id: string
  avatar: string
  name: string
  revenue: number
}

export interface CommissionRangeField {
  id: number
  range: number[]
  percent: number
}

export interface CommissionRangeProps {
  rangeItems: CommissionRangeField[]
  userRevenue: UserField[]
  type: string
  rangeColors?: string[]
}

export const CommissionRange: FC<CommissionRangeProps> = ({
  rangeItems,
  userRevenue,
  type,
  rangeColors = ['#df562b', '#faad14', '#00a36e'],
}) => {
  rangeItems.sort((a, b) => {
    return a.range[0] - b.range[0]
  })

  const maxRevenue =
    rangeItems.length > 0 ? rangeItems[rangeItems.length - 1].range[1] : 0
  const renderRangeItems = rangeItems.map((rangeItem) => {
    const width = ((rangeItem.range[1] - rangeItem.range[0]) * 100) / maxRevenue
    return (
      <div
        key={rangeItem.id}
        className={styles.rangeItem}
        style={{
          width: `calc(${width}% + ${rangeItem.id > 1 ? 8 : 0}px)`,
          zIndex: rangeItems.length - rangeItem.id,
        }}
      >
        <span className={styles.rangeValue}>{rangeItem.percent}%</span>
        <div
          className={styles.rangeBar}
          style={{
            backgroundColor:
              rangeColors[(rangeItem.id - 1) % rangeColors.length],
          }}
        />
      </div>
    )
  })
  const renderRangeSteps = rangeItems.map((rangeItem) => (
    <span key={rangeItem.id}>
      <i
        className={styles.dotWrap}
        style={{
          backgroundColor: rangeColors[(rangeItem.id - 1) % rangeColors.length],
        }}
      />
      £{rangeItem.range[0]}
    </span>
  ))

  const totalValue = useMemo(() => {
    let ret = 0
    for (const { revenue } of userRevenue) {
      if (revenue) ret += revenue
    }
    return ret
  }, [userRevenue])

  return (
    <div className={styles.mainCommissionWrap}>
      <div className={styles.commissionRange}>
        <Row>
          <Col>
            <h2>{type}s commission</h2>
          </Col>
        </Row>
        <Row wrap={false}>
          <Col className={styles.rangeWrapper}>
            <div className={styles.rangeItems}>{renderRangeItems}</div>
            {userRevenue.map((dataList) => (
              <div
                key={dataList.id}
                className={styles.rangeUser}
                style={{
                  left: `${
                    (dataList.revenue * 100) / maxRevenue > 100
                      ? 100
                      : (dataList.revenue * 100) / maxRevenue - 1
                  }%`,
                }}
              >
                <img src={dataList.avatar} alt={dataList.name} />
              </div>
            ))}
          </Col>
        </Row>
        <Row className={styles.directionColumn}>
          <div className={styles.rangeSteps}>{renderRangeSteps}</div>
          <div className={styles.totalRevenue}>
            <span>Total: £{totalValue}</span>
          </div>
        </Row>
      </div>
    </div>
  )
}

export default CommissionRange
