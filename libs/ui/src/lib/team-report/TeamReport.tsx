import React, { FC } from 'react'
import { Table, Badge, Typography, Tooltip } from 'antd'
import { LetterBadge, LetterBadgeColors } from '../letter-badge/LetterBadge'
import { DownOutlined, UpOutlined } from '@ant-design/icons'
import { PresetStatusColorType } from 'antd/lib/_util/colors'
import styles from './TeamReport.module.less'
const { Text } = Typography

export enum TableRowType {
  Header = 'header',
  Summary = 'summary',
}

export enum TableColAlign {
  Left = 'left',
  Right = 'right',
}

interface TeamReportCellValue {
  value: string
  badge: PresetStatusColorType
  Revenue: number
  Target: number
}

interface TeamReportRow {
  key: number
  desc: string
  children?: TeamReportRow
  type: TableRowType
  header_num: number
}

interface ColumnTransformer {
  (text: string, record: TeamReportRow): JSX.Element
}

interface TeamReportColumn {
  title: string
  dataIndex: string
  key: number | string
  align: TableColAlign
  render?: ColumnTransformer
}

interface TeamReportParams {
  source: TeamReportRow[]
  columns: TeamReportColumn[]
  loading?: boolean
}

const letter_badges = [
  {
    letter: 'A',
    color: LetterBadgeColors.blue,
  },
  {
    letter: 'B',
    color: LetterBadgeColors.green,
  },
  {
    letter: 'C',
    color: LetterBadgeColors.yellow,
  },
  {
    letter: 'D',
    color: LetterBadgeColors.purple,
  },
]

const transformTableCell = (
  text: string | TeamReportCellValue,
  record: TeamReportRow
): JSX.Element => {
  let badge = <Badge color="transparent" />
  if (typeof text === 'object') {
    const tootltip = (
      <div>
        Revenue £{text.Revenue}
        <br />
        Target £{text.Target}
      </div>
    )
    badge = (
      <Tooltip title={tootltip}>
        <Badge status={text.badge} />
      </Tooltip>
    )
    text = text.value
  }

  let ret = (
    <Text>
      {text} {badge}
    </Text>
  )

  if (record.type && record.type === TableRowType.Header && text) {
    const lb = letter_badges[record.header_num]
    ret = (
      <Text strong className={styles.antTableSectionCell}>
        <LetterBadge color={lb.color}>{lb ? lb.letter : '*'}</LetterBadge>
        {text}
      </Text>
    )
  } else if (record.type === TableRowType.Summary) {
    ret = (
      <Text strong>
        {text} {badge}
      </Text>
    )
  }
  return ret
}

const transformTotalColumn = (
  text: string | TeamReportCellValue,
  record: TeamReportRow
): JSX.Element => {
  let badge = <Badge color="transparent" />
  if (typeof text === 'object') {
    const tootltip = (
      <div>
        Revenue £{text.Revenue}
        <br />
        Target £{text.Target}
      </div>
    )
    badge = (
      <Tooltip title={tootltip}>
        <Badge status={text.badge} />
      </Tooltip>
    )
    text = text.value
  }
  return (
    <Text style={{ fontWeight: 'bold' }}>
      {text} {badge}
    </Text>
  )
}

export const TeamReport: FC<TeamReportParams> = ({
  source,
  columns,
  loading = false,
}) => {
  columns = columns.map((col) => {
    if (col.key === 'total') col.render = transformTotalColumn
    else col.render = transformTableCell
    return col
  })

  return (
    <Table
      dataSource={source}
      columns={columns}
      scroll={{ x: 1200, y: 1200 }}
      loading={loading}
      size="small"
      pagination={false}
      expandable={{
        expandedRowRender: (record) => record.desc,
        expandIconColumnIndex: 1,
        expandIcon: ({ expanded, onExpand, record }) => {
          return record.children ? (
            expanded ? (
              <UpOutlined onClick={(e) => onExpand(record, e)} />
            ) : (
              <DownOutlined onClick={(e) => onExpand(record, e)} />
            )
          ) : null
        },
      }}
    />
  )
}