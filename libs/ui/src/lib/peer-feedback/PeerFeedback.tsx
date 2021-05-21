import React, { FC } from 'react'

import { Collapse, Row, Table as AntTable, Tooltip } from 'antd'

import { AvatarList, Button, CustomProgress } from '@pabau/ui'

import styles from './PeerFeedback.module.less'

import {
  BellOutlined,
  DeleteOutlined,
  EyeOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons'

import Avatar from 'antd/lib/avatar/avatar'

const relativeTime = (lan: string, date: Date): string => {
  const date1 = new Date()
  const date2 = new Date(date)
  const rtf = new Intl.RelativeTimeFormat(lan, {
    localeMatcher: 'best fit',
    numeric: 'always',
    style: 'long',
  })
  let diffInMilliSeconds = date1.getTime() - date2.getTime()

  diffInMilliSeconds = diffInMilliSeconds / 1000
  const seconds = Math.floor(diffInMilliSeconds % 60)
  diffInMilliSeconds = diffInMilliSeconds / 60
  const minutes = Math.floor(diffInMilliSeconds % 60)
  diffInMilliSeconds = diffInMilliSeconds / 60
  const hours = Math.floor(diffInMilliSeconds % 24)
  const days = Math.floor(diffInMilliSeconds / 24)
  const weeks = Math.floor(days / 7)
  const months = Math.floor(days / (365 / 12))
  const years = Math.floor(days / 365)
  return years > 0
    ? rtf.format(-years, 'years')
    : months > 0
    ? rtf.format(-months, 'months')
    : weeks > 0
    ? rtf.format(-weeks, 'weeks')
    : days > 0
    ? rtf.format(-days, 'days')
    : hours > 0
    ? rtf.format(-hours, 'hours')
    : minutes > 0
    ? rtf.format(-minutes, 'minutes')
    : rtf.format(-seconds, 'seconds')
}

const { Panel } = Collapse

interface User {
  id: number
  title: string
  name: string
  avatarUrl: string
}

interface ReviewData {
  title1: string
  title2: string
  value: number
  total: number
}

interface Employee {
  id: number
  info: User
  analyticalThinking: number
  attentionToDetail: number
  myCustomCategory: number
}

export interface ReportProps {
  id: number
  info: User
  requestedOn: string
  completedOn: string
  action: boolean
}

export type PeerFeedbackProps = {
  title: string
  users?: User[]
  lastSendOut: string
  reviewDate: Date
  reviewFilled: string
  filled: string
  reviewData: ReviewData
  employees: Employee[]
  reports: ReportProps[]
  onReportDelete?: (reportId: number) => void
  onRemindClick?: () => void
}

export const PeerFeedback: FC<PeerFeedbackProps> = ({
  title,
  users,
  lastSendOut,
  reviewDate,
  reviewFilled,
  filled,
  reviewData,
  employees,
  reports,
  onReportDelete,
  onRemindClick,
  ...props
}) => {
  interface ReviewPercent {
    progressPercentInt: number
    progressPercent: number
    progressRest: number
  }

  // const dateIsoFormat = (_date: Date): string => {
  //   return moment(_date).format('YYYY-MM-DDTHH:MN:SS.MSSZ')
  // }

  const dateFormat = (_date: Date): string => {
    const date = new Date(_date)
    return new Intl.DateTimeFormat('en-IE').format(date)
  }

  const calPercent = (reviewData: ReviewData): ReviewPercent => {
    if (!reviewData || reviewData.total === 0)
      return {
        progressPercentInt: 0,
        progressPercent: 0,
        progressRest: 100,
      }
    const p1 = Math.round((reviewData.value / reviewData.total) * 100)
    const p2 = Math.round((reviewData.value / reviewData.total) * 1000) / 10
    const p3 = 100 - p2
    const val: ReviewPercent = {
      progressPercentInt: p1,
      progressPercent: p2,
      progressRest: p3,
    }
    return val
  }

  const calPercentValue = calPercent(reviewData)

  interface TooltipHeaderColumnProps {
    text: string
  }

  const TooltipHeaderColumn: FC<TooltipHeaderColumnProps> = ({ text }) => {
    return (
      <>
        {text}
        <Tooltip
          placement="topLeft"
          title="Prompt Text"
          className={styles.toolTipMargin}
        >
          <QuestionCircleOutlined />
        </Tooltip>
      </>
    )
  }

  interface UserInfoColumnProps {
    info: User
  }

  const UserInfoColumn: FC<UserInfoColumnProps> = ({ info }) => {
    return (
      <div className={styles.flexDiv}>
        <div className={styles.userAvatar}>
          <Avatar src={info.avatarUrl} />
        </div>
        <div className={styles.flexFullDiv}>
          <div className={styles.userName}>{info.name}</div>
          <div className={styles.userTitle}>{info.title}</div>
        </div>
      </div>
    )
  }

  interface ActionColumnProps {
    action: boolean
  }

  const ActionColumn: FC<ActionColumnProps> = ({ action }) => {
    return action ? (
      <Button
        type="default"
        size="middle"
        className={styles.previewButton}
        icon={<EyeOutlined />}
      >
        {'Preview'}
      </Button>
    ) : null
  }

  const RemoveColumn = ({ info }) => {
    return <DeleteOutlined onClick={() => onReportDelete?.(info.id)} />
  }

  const employeeColumns = [
    {
      key: 'info',
      dataIndex: 'info',
      title: 'Employee',
      className: styles.columnInfo,
      width: 364,
      // eslint-disable-next-line react/display-name
      render: (info: User) => <UserInfoColumn info={info} />,
    },
    {
      key: 'analyticalThinking',
      dataIndex: 'analyticalThinking',
      title: <TooltipHeaderColumn text="Analytical thinking" />,
      className: styles.columnAnalyticalThinking,
    },
    {
      key: 'attentionToDetail',
      dataIndex: 'attentionToDetail',
      title: <TooltipHeaderColumn text="Attention to detail" />,
      className: styles.columnAttentionToDetail,
    },
    {
      key: 'myCustomCategory',
      dataIndex: 'myCustomCategory',
      title: 'My custom category',
      className: styles.columnMyCustomCategory,
    },
  ]

  const reportColumns = [
    {
      key: 'info',
      dataIndex: 'info',
      title: 'Reviewer',
      className: styles.columnInfo,
      width: 364,
      // eslint-disable-next-line react/display-name
      render: (info: User) => <UserInfoColumn info={info} />,
    },
    {
      key: 'requestedOn',
      dataIndex: 'requestedOn',
      title: 'Requested on',
    },
    {
      key: 'completedOn',
      dataIndex: 'completedOn',
      title: 'Completed on',
    },
    {
      key: 'action',
      dataIndex: 'action',
      title: 'Actions',
      // eslint-disable-next-line react/display-name
      render: (action: boolean) => <ActionColumn action={action} />,
    },
    {
      title: ' ',
      className: styles.columnRemove,
      width: 66,
      // eslint-disable-next-line react/display-name
      render: (info: ReportProps) => <RemoveColumn info={info} />,
    },
  ]

  interface SummaryRowProps {
    employees: Employee[]
  }

  const SummaryRow: FC<SummaryRowProps> = ({ employees }) => {
    let total1 = 0
    let total2 = 0
    let total3 = 0
    const lens = employees.length

    for (const employee of employees) {
      total1 += employee.analyticalThinking
      total2 += employee.attentionToDetail
      total3 += employee.myCustomCategory
    }

    const avg1 = total1 / lens
    const avg2 = total2 / lens
    const avg3 = total3 / lens

    return (
      <AntTable.Summary.Row>
        <AntTable.Summary.Cell index={1} className={styles.summaryTitleColumn}>
          <div>{'Overall Avg.'}</div>
        </AntTable.Summary.Cell>
        <AntTable.Summary.Cell index={2} className={styles.summaryColumn}>
          <div>{avg1}</div>
        </AntTable.Summary.Cell>
        <AntTable.Summary.Cell index={3} className={styles.summaryColumn}>
          <div>{avg2}</div>
        </AntTable.Summary.Cell>
        <AntTable.Summary.Cell index={4} className={styles.summaryColumn}>
          <div>{avg3}</div>
        </AntTable.Summary.Cell>
      </AntTable.Summary.Row>
    )
  }

  return (
    <div className={styles.peerFeedbackStyles}>
      <div className={styles.mainTitle}>
        <div>
          <div className={styles.mainTitleText}>{title}</div>
          <div className={styles.avatarList}>
            <AvatarList users={users} />
          </div>
          <div className={styles.subText}>{lastSendOut}</div>
          <div className={styles.subContent}>
            {relativeTime('en', reviewDate)}({dateFormat(reviewDate)})
          </div>
        </div>
        <div className={styles.remindButtonContainer}>
          <Button
            type="default"
            size="large"
            className={styles.remindButton}
            icon={<BellOutlined />}
            onClick={onRemindClick}
          >
            {'Remind'}
          </Button>
        </div>
      </div>
      <div className={styles.reviewContainer}>
        <div className={styles.reviewFilledText}>{reviewFilled}</div>
        <Row className={styles.filledPercentContainer}>
          <div className={styles.filledPercentTitle}>
            <div className={styles.filledPercentText}>
              {String(calPercentValue.progressPercentInt)}% {filled}
            </div>
            <div className={styles.filledNumber}>
              {reviewData.value} {'out of'} {reviewData.total}
            </div>
          </div>
          <div className={styles.filledProgressContainer}>
            <CustomProgress
              percent={calPercentValue.progressPercent}
              rest={calPercentValue.progressRest}
              labelPercent="Filled"
              labelRest="Pending"
              colorPercent="#65CD98"
              colorRest="#FAAD14"
            />
          </div>
        </Row>
      </div>
      <Collapse className={styles.tableContainer} defaultActiveKey={'1'}>
        <Panel
          header="Overview by employees"
          key="1"
          className={styles.tableContent}
        >
          <AntTable
            dataSource={employees}
            columns={employeeColumns}
            rowClassName={styles.employeeRow}
            summary={(employees) => <SummaryRow employees={employees} />}
            pagination={false}
            scroll={{ x: 'max-content' }}
          />
        </Panel>
      </Collapse>
      <Collapse className={styles.tableContainer}>
        <Panel
          header="Individual reports"
          key="2"
          className={styles.tableContent}
        >
          <AntTable
            dataSource={reports}
            columns={reportColumns}
            rowClassName={styles.reportRow}
            pagination={false}
            scroll={{ x: 'max-content' }}
          />
        </Panel>
      </Collapse>
    </div>
  )
}

export default PeerFeedback
