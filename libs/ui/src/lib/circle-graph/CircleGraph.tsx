import React, {
  FC,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { CloseOutlined } from '@ant-design/icons'
import { Button } from '@pabau/ui'
import { Progress, Skeleton, Space, Tooltip } from 'antd'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { useMedia } from 'react-use'
import graphOffTrackMobileSvg from '../../assets/images/graph-off-track-mobile.svg'
import graphOffTrackSvg from '../../assets/images/graph-off-track.svg'
import graphOnTrackMobileSvg from '../../assets/images/graph-on-track-mobile.svg'
import graphOnTrackSvg from '../../assets/images/graph-on-track.svg'
import styles from './CircleGraph.module.less'
const CIRCLE_MAX_LENGTH = 52

interface Data {
  name: string
  label?: string
  revenue: string
  target: string
}

export interface ChartData {
  id: number
  name: string
  label?: string
  services?: Data[]
  badge?: string
}

interface RenderData {
  id?: number
  targetName?: string
  targetLabel?: string
  name?: string
  label?: string
  type?: string
  angle?: number
  left?: string
  right?: string
  top?: string
  target?: string
  revenue?: string
  isFilled: boolean
  color?: string
}

export interface ChartGraph {
  loading?: boolean
  chartData?: ChartData[]
  date?: string
}

export const CircleGraph: FC<ChartGraph> = ({
  chartData = [],
  date = '',
  loading,
}) => {
  const { t } = useTranslation('common')
  const isMobile = useMedia('(max-width: 767px)', false)
  const ref = useRef<HTMLInputElement>(null)
  const [graphData, setGraphData] = useState<RenderData[]>()
  const [notAvailableResult, setNotAvailableResult] = useState(0)
  const [paginateData, setPaginateData] = useState({
    total: 0,
    limit: 10,
    currentPage: 1,
  })

  const calculateBoxes = useCallback(
    (pageData) => {
      let calculatedData: RenderData[] = []
      let countTotalData = 0
      let notAvailableCount = 0
      if (pageData && pageData.length > 0) {
        countTotalData += pageData.reduce(
          (prev, cur) => prev + (cur.data?.length || 0),
          0
        )
        const gapLength = isMobile
          ? 1
          : (CIRCLE_MAX_LENGTH - countTotalData) / pageData.length

        for (const parent of pageData) {
          for (let i = 0; i < gapLength; i++) {
            calculatedData.push({ isFilled: false })
          }
          calculatedData.push({
            id: parent.id,
            target: '1',
            targetName: parent.name,
            targetLabel: parent.label,
            type: parent.badge,
            isFilled: true,
            color: parent.color,
          })
          if (parent.data && parent.data.length > 0) {
            for (const child of parent.data) {
              const getData = {
                id: parent.id,
                targetName: parent.name,
                targetLabel: parent.label,
                target: child.target,
                revenue: child.revenue,
                type: parent.badge,
                name: child.name,
                label: child.label,
                isFilled: true,
              }
              calculatedData.push(getData)
              if (child.target <= 0) {
                notAvailableCount++
              }
            }
          }
        }
      }

      const angle = 360 / calculatedData.length

      calculatedData = calculatedData.map((data, i, arr) => ({
        ...data,
        angle: isMobile ? 0 : angle * i,
        left: isMobile
          ? i <= arr.length / 2
            ? data.isFilled && !data.name
              ? '8px'
              : '0px'
            : 'unset'
          : '0px',
        right: isMobile
          ? i > arr.length / 2
            ? data.isFilled && !data.name
              ? '8px'
              : '0px'
            : 'unset'
          : '0px',
        top: isMobile
          ? 32 * (i <= arr.length / 2 ? i - 1 : i - Math.ceil(arr.length / 2)) +
            50 +
            'px'
          : '50%',
      }))

      setNotAvailableResult(notAvailableCount)

      setGraphData(calculatedData)
    },
    [isMobile]
  )

  useEffect(() => {
    const sizes: number[] = chartData
      ?.filter((chart) => chart?.services?.length)
      .map((chart) => chart?.services?.length || 0)
    const maxLen = Math.max(...sizes)
    const total = Math.ceil(maxLen / paginateData.limit)
    if (paginateData.total !== total) {
      setPaginateData({
        ...paginateData,
        total,
      })

      const offset = paginateData.limit * (paginateData.currentPage - 1)
      const pageData: ChartData[] = chartData?.map((chart) => ({
        ...chart,
        data: chart.services?.slice(offset, paginateData.limit),
        services: chart.services?.slice(offset, paginateData.limit),
      }))
      calculateBoxes(pageData)
    }
  }, [chartData, paginateData.currentPage, calculateBoxes, paginateData])

  const displayTooltip = (data, t): ReactNode => {
    if (data) {
      return (
        <div>
          <div>Revenue: {data.revenue}</div>
          <div>Target: {data.target}</div>
        </div>
      )
    }
    return null
  }

  const nextPage = () => {
    setPaginateData({
      ...paginateData,
      currentPage: paginateData.currentPage + 1,
    })
  }
  const prevPage = () => {
    setPaginateData({
      ...paginateData,
      currentPage: paginateData.currentPage - 1,
    })
  }
  const targetNameList: RenderData[] = []
  const resArr: RenderData[] = []
  let offTrackCount = 0
  let onTrackCount = 0
  let totalDataCount = 0

  if (graphData && graphData?.length > 0) {
    for (const renderData of graphData) {
      const isHitTheTarget =
        renderData.revenue &&
        renderData.target &&
        Boolean(renderData.revenue >= renderData.target)
      if (renderData.type && renderData.targetName) {
        totalDataCount++
        if (isHitTheTarget) onTrackCount++
        else if (isHitTheTarget !== undefined) offTrackCount++
        targetNameList.push(renderData)
        for (const item of targetNameList) {
          const i = resArr.findIndex((x) => x.id === item.id)
          if (i <= -1) {
            resArr.push(item)
          }
        }
      }
    }
  }

  return (
    <div>
      <div className={classNames(styles.circleChart)}>
        <div
          className={classNames(
            styles.innerStyle,
            styles.circleDate,
            styles.desktopViewNone
          )}
        >
          {loading ? (
            <Skeleton.Input active style={{ width: 200 }} />
          ) : (
            <h2>Team Target for {date}</h2>
          )}
        </div>
        <div className={classNames(styles.desktopViewNone)}>
          <Space
            size={24}
            direction="horizontal"
            align="start"
            style={{ marginTop: 28 }}
          >
            <div className={classNames(styles.progressCircle)}>
              {loading ? (
                <Skeleton.Input className={styles.progressLoader} active />
              ) : (
                <Progress
                  type="circle"
                  percent={Math.round((onTrackCount / totalDataCount) * 100)}
                  trailColor="#FF5B64"
                  strokeColor="#65cd98"
                  width={120}
                  strokeLinecap="square"
                />
              )}
            </div>
            <div className={classNames(styles.innerStyle, styles.offTrack)}>
              {loading ? (
                <Skeleton.Input active style={{ width: 100 }} />
              ) : (
                <>
                  <p>Off&nbsp;track</p>
                  <Space size={8}>
                    <img
                      src={graphOnTrackMobileSvg}
                      alt="graph-off-track-svg"
                      style={{
                        width: 16,
                        height: 16,
                      }}
                    />
                    <div>{offTrackCount}</div>
                  </Space>
                </>
              )}
            </div>
            <div className={classNames(styles.innerStyle, styles.onTrack)}>
              {loading ? (
                <Skeleton.Input active style={{ width: 100 }} />
              ) : (
                <>
                  <p>On&nbsp;track</p>
                  <Space size={8}>
                    <img
                      src={graphOffTrackMobileSvg}
                      alt="graph-off-track-svg"
                      style={{
                        width: 16,
                        height: 16,
                      }}
                    />
                    <div>{onTrackCount}</div>
                  </Space>
                </>
              )}
            </div>
          </Space>
        </div>
        {loading ? (
          <Skeleton.Input className={styles.loader} active />
        ) : (
          <ul
            style={{
              height: isMobile
                ? ((graphData?.length || 0) / 2) * 32 + 100
                : 'unset',
            }}
          >
            {graphData &&
              graphData?.length > 0 &&
              graphData.map((renderData, i) => {
                const key = i + 1
                const isHitTheTarget =
                  renderData.revenue &&
                  renderData.target &&
                  Boolean(renderData.revenue >= renderData.target)

                const tooltip = displayTooltip(renderData, t)
                const animationType = `animation-${i}`

                return (
                  renderData.target !== undefined &&
                  renderData.target && (
                    <>
                      <style>
                        {`@keyframes ${animationType} {
                        0% {
                          transform: rotate(${renderData.angle}deg) scale(0.9);
                        }
                        100% {
                          transform: rotate(${renderData.angle}deg) scale(1);
                        }
                      }`}
                      </style>
                      <li
                        key={key}
                        style={{
                          animation: `${animationType} 1s ease`,
                          animationIterationCount: 1,
                          transform: `rotate(${renderData.angle}deg)`,
                          top: renderData.top,
                          left: isMobile ? renderData.left : 'unset',
                          right: renderData.right,
                          listStyle: 'none',
                        }}
                      >
                        {renderData.isFilled && !renderData.name ? (
                          isMobile ? (
                            <Space
                              direction="horizontal"
                              size={4}
                              style={{
                                width: '100%',
                                textTransform: 'uppercase',
                                justifyContent:
                                  renderData.left === 'unset'
                                    ? 'flex-end'
                                    : 'flex-start',
                              }}
                            >
                              {renderData.left === 'unset' && (
                                <span>{renderData.targetName}</span>
                              )}
                              <span
                                className={styles.parentBadge}
                                style={{
                                  background: renderData.color,
                                }}
                              >
                                {renderData.type}
                              </span>
                              {renderData.left !== 'unset' && (
                                <span>{renderData.targetName}</span>
                              )}
                            </Space>
                          ) : null
                        ) : (
                          <Tooltip placement="top" title={tooltip}>
                            <Space
                              size={8}
                              className={styles.circleBox}
                              style={{
                                justifyContent:
                                  renderData.left === 'unset'
                                    ? 'flex-end'
                                    : 'flex-start',
                              }}
                            >
                              {renderData.left === 'unset' && (
                                <div className={classNames(styles.label)}>
                                  {renderData.label
                                    ? t(renderData.label)
                                    : renderData.name}
                                </div>
                              )}
                              <img
                                src={
                                  isHitTheTarget
                                    ? isMobile
                                      ? graphOnTrackMobileSvg
                                      : graphOnTrackSvg
                                    : isMobile
                                    ? graphOffTrackMobileSvg
                                    : graphOffTrackSvg
                                }
                                alt="graph-off-track-svg"
                                style={{
                                  display: renderData.isFilled
                                    ? 'block'
                                    : 'none',
                                }}
                              />
                              {renderData.left !== 'unset' && (
                                <div className={classNames(styles.label)}>
                                  {renderData.label
                                    ? t(renderData.label)
                                    : renderData.name}
                                </div>
                              )}
                            </Space>
                          </Tooltip>
                        )}
                      </li>
                    </>
                  )
                )
              })}
            <div className={classNames(styles.circle)} ref={ref}>
              {!isMobile &&
                resArr &&
                resArr?.length > 0 &&
                resArr.map((renderData, i) => {
                  const key = i + 1
                  const targetName = renderData.targetName
                  const targetLabel = renderData.targetLabel
                  return (
                    <div
                      style={{
                        transform: `rotate(${renderData.angle}deg)`,
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                      }}
                      key={key}
                    >
                      <Space
                        size={4}
                        direction="horizontal"
                        className={classNames(
                          styles.parentTag,
                          styles.mobileViewNone
                        )}
                      >
                        <span
                          className={styles.parentBadge}
                          style={{ background: renderData.color }}
                        >
                          {renderData.type}
                        </span>
                        <span>{targetLabel ? t(targetLabel) : targetName}</span>
                      </Space>
                    </div>
                  )
                })}
              <div
                className={classNames(
                  styles.innerStyle,
                  styles.circleDate,
                  styles.mobileViewNone
                )}
              >
                <h2>{date}</h2>
                <p>Team Target</p>
              </div>
              <div className={styles.mobileViewNone}>
                <div className={classNames(styles.horizontal)}>
                  <div
                    className={classNames(styles.innerStyle, styles.offTrack)}
                  >
                    <h2>{offTrackCount}</h2>
                    <p>Off&nbsp;track</p>
                    <CloseOutlined />
                  </div>
                  <div className={classNames(styles.progressCircle)}>
                    <Progress
                      type="circle"
                      percent={Math.round(
                        (onTrackCount / totalDataCount) * 100
                      )}
                      trailColor="#FF5B64"
                      strokeColor="#65cd98"
                      width={120}
                      strokeLinecap="square"
                    />
                  </div>
                  <div
                    className={classNames(styles.innerStyle, styles.onTrack)}
                  >
                    <h2>{onTrackCount}</h2>
                    <p>On&nbsp;track</p>
                    <div className={classNames(styles.circleIcon)}>
                      <span />
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={classNames(
                  styles.innerStyle,
                  styles.kpis,
                  styles.mobileViewNone
                )}
              >
                <p>{totalDataCount} KPIS</p>
                <span>({notAvailableResult} n/a results)</span>
              </div>
            </div>
          </ul>
        )}
      </div>
      <div>
        {paginateData.currentPage !== 1 && (
          <Button onClick={prevPage}>Previous</Button>
        )}
        {paginateData.total > paginateData.currentPage && (
          <Button onClick={nextPage} className={styles.nextBtn}>
            Next
          </Button>
        )}
      </div>
    </div>
  )
}

export default CircleGraph
