import React, { FC, useState } from 'react'

import {
  Collapse,
  Row,
  Table as AntTable,
  Tooltip,
  Input,
  Card,
  Rate,
} from 'antd'

import {
  AvatarList,
  Button,
  CustomProgress,
  BasicModal,
  Checkbox,
} from '@pabau/ui'

import styles from './PeerFeedback.module.less'

import {
  BellOutlined,
  DeleteOutlined,
  EyeOutlined,
  QuestionCircleOutlined,
  SearchOutlined,
} from '@ant-design/icons'

import Avatar from 'antd/lib/avatar/avatar'
import { useTranslation } from 'react-i18next'

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
interface Question {
  id: number
  title: string
  defaultRating: number
  description: string
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
  question?: Question[]
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
  const { t } = useTranslation('common')
  const [reportsValues, setReportsValues] = useState([...reports])
  const [remindModal, setRemindModal] = useState(false)
  const [previewModal, setPreviewModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState([])
  const [userList, setUserList] = useState(users)
  const [previewContent, setPreviewContent] = useState(reports)
  const handleonClick = () => {
    setRemindModal(!remindModal)
    setSelectedUser(
      users?.map((user) => selectedUser.push(user.id as never)) as never
    )
  }
  const handleOnChange = (value, user) => {
    const storeUser = [...selectedUser]
    const idx = storeUser.indexOf(user as never)
    value ? storeUser.push(user as never) : storeUser.splice(idx, 1)
    setSelectedUser([...storeUser])
  }

  const handleunSelect = () => {
    setSelectedUser([])
  }

  const handleSearch = (e) => {
    const val = e.target.value
    val
      ? setUserList(
          userList
            ?.filter((user) =>
              user.name.toLowerCase().includes(val.toLowerCase())
            )
            .map((item) => ({ ...item }))
        )
      : setUserList(users)
  }
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
          title={text}
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

  const ActionColumn = ({ info }) => {
    return info.action ? (
      <Button
        type="default"
        size="middle"
        className={styles.previewButton}
        onClick={() => handlePreview(info.id)}
        icon={<EyeOutlined />}
      >
        {t('peer.feedback.preview.button')}
      </Button>
    ) : null
  }
  const handlePreview = (id) => {
    const previewDetails = reports.filter((report) => report.id === id)
    setPreviewContent(previewDetails)
    setPreviewModal(true)
  }

  const RemoveColumn = ({ info }) => {
    return (
      <DeleteOutlined
        onClick={() => {
          const updatedReports = reportsValues.filter(
            (value) => value.info.id !== info.id
          )
          setReportsValues([...updatedReports])
        }}
      />
    )
  }

  const employeeColumns = [
    {
      key: 'info',
      dataIndex: 'info',
      title: t('peer.feedback.overview.employees.info'),
      className: styles.columnInfo,
      width: 364,
      // eslint-disable-next-line react/display-name
      render: (info: User) => <UserInfoColumn info={info} />,
    },
    {
      key: 'analyticalThinking',
      dataIndex: 'analyticalThinking',
      title: (
        <TooltipHeaderColumn
          text={t('peer.feedback.overview.employees.analytical.thinking')}
        />
      ),
      className: styles.columnAnalyticalThinking,
    },
    {
      key: 'attentionToDetail',
      dataIndex: 'attentionToDetail',
      title: (
        <TooltipHeaderColumn
          text={t('peer.feedback.overview.employees.attentionto.detail')}
        />
      ),
      className: styles.columnAttentionToDetail,
    },
    {
      key: 'myCustomCategory',
      dataIndex: 'myCustomCategory',
      title: t('peer.feedback.overview.employees.mycustom.category'),
      className: styles.columnMyCustomCategory,
    },
  ]

  const reportColumns = [
    {
      key: 'info',
      dataIndex: 'info',
      title: t('peer.feedback.report.Reviewer.info'),
      className: styles.columnInfo,
      width: 364,
      // eslint-disable-next-line react/display-name
      render: (info: User) => <UserInfoColumn info={info} />,
    },
    {
      key: 'requestedOn',
      dataIndex: 'requestedOn',
      title: t('peer.feedback.report.requested'),
    },
    {
      key: 'completedOn',
      dataIndex: 'completedOn',
      title: t('peer.feedback.report.completed'),
    },
    {
      key: 'action',
      // dataIndex: 'action',
      title: t('peer.feedback.report.action'),
      // eslint-disable-next-line react/display-name
      render: (info: ReportProps) => <ActionColumn info={info} />,
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
          <div>{t('peer.feedback.overall.avg')}</div>
        </AntTable.Summary.Cell>
        <AntTable.Summary.Cell index={2} className={styles.summaryColumn}>
          <div>{avg1.toFixed()}</div>
        </AntTable.Summary.Cell>
        <AntTable.Summary.Cell index={3} className={styles.summaryColumn}>
          <div>{avg2.toFixed()}</div>
        </AntTable.Summary.Cell>
        <AntTable.Summary.Cell index={4} className={styles.summaryColumn}>
          <div>{avg3.toFixed()}</div>
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
            onClick={handleonClick}
          >
            {t('peer.feedback.remind.modal.button')}
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
              {reviewData.value} {t('peer.feedback.outof')} {reviewData.total}
            </div>
          </div>
          <div className={styles.filledProgressContainer}>
            <CustomProgress
              percent={calPercentValue.progressPercent}
              rest={calPercentValue.progressRest}
              labelPercent={t('peer.feedback.filled')}
              labelRest={t('peer.feedback.pending')}
              colorPercent="#65CD98"
              colorRest="#FAAD14"
            />
          </div>
        </Row>
      </div>
      <Collapse className={styles.tableContainer} defaultActiveKey={'1'}>
        <Panel
          header={t('peer.feedback.panel.header.Overviewby.employees')}
          key="1"
          className={styles.tableContent}
        >
          <AntTable
            dataSource={employees}
            columns={employeeColumns}
            rowClassName={styles.employeeRow}
            summary={() => <SummaryRow employees={employees} />}
            pagination={false}
            scroll={{ x: 'max-content' }}
          />
        </Panel>
      </Collapse>
      <Collapse className={styles.tableContainer}>
        <Panel
          header={t('peer.feedback.panel.header.individual.reports')}
          key="2"
          className={styles.tableContent}
        >
          <AntTable
            dataSource={reportsValues}
            columns={reportColumns}
            rowClassName={styles.reportRow}
            pagination={false}
            scroll={{ x: 'max-content' }}
          />
        </Panel>
      </Collapse>
      <BasicModal
        visible={previewModal}
        modalWidth={682}
        title={t('peer.feedback.preview.modal.title')}
        footer={false}
        onCancel={() => setPreviewModal(false)}
        onOk={() => setPreviewModal(false)}
      >
        <div className={styles.previewModal}>
          {previewContent.map((report) => {
            return report?.question?.map((questionList) => {
              return (
                <div style={{ margin: '10px' }} key={questionList.id}>
                  <Card>
                    <h2 className={styles.previewTitle}>
                      {questionList.title}
                    </h2>
                    <Rate allowHalf defaultValue={questionList.defaultRating} />
                    <p className={styles.previewDescription}>
                      {questionList.description}
                    </p>
                  </Card>
                </div>
              )
            })
          })}
        </div>
      </BasicModal>
      <BasicModal
        visible={remindModal}
        modalWidth={682}
        title={t('peer.feedback.remind.modal.title')}
        newButtonText={t('peer.feedback.remind.modal.button')}
        onCancel={() => setRemindModal(false)}
        onOk={() => setRemindModal(false)}
      >
        <div className={styles.modalContainer}>
          <p>{t('peer.feedback.modal.description')}</p>
          <div className={styles.headerWrapper}>
            <div className={styles.checkBtn}>
              <Button onClick={() => handleunSelect()}>
                {t('peer.feedback.modal.unselect.button')}
              </Button>
            </div>
            <div className={styles.searchBox}>
              <Input
                placeholder={t('peer.feedback.modal.search.placeholder')}
                allowClear
                style={{ width: 280 }}
                onChange={(e) => handleSearch(e)}
                suffix={<SearchOutlined />}
              />
            </div>
          </div>
          <div className={styles.userWrapper}>
            {userList?.map((user) => {
              return (
                <Checkbox
                  checked={selectedUser.includes(user.id as never)}
                  onChange={(value) =>
                    handleOnChange(value.target.checked, user.id)
                  }
                  key={user.id}
                >
                  <div className={styles.flexDiv}>
                    <div className={styles.userAvatar}>
                      <Avatar src={user.avatarUrl} />
                    </div>
                    <div className={styles.flexFullDiv}>
                      <div className={styles.userName}>{user.name}</div>
                      <div className={styles.userTitle}>{user.title}</div>
                    </div>
                  </div>
                </Checkbox>
              )
            })}
          </div>
        </div>
      </BasicModal>
    </div>
  )
}

export default PeerFeedback
