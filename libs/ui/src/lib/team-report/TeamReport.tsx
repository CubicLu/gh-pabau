import { DownOutlined, UpOutlined } from '@ant-design/icons'
import { Badge, Table, Tooltip, Typography, Skeleton, Space, Empty } from 'antd'
import { PresetStatusColorType } from 'antd/lib/_util/colors'
import React, { FC, useState } from 'react'
import { useMedia } from 'react-use'
import { LetterBadge, LetterBadgeColors } from '../letter-badge/LetterBadge'
import styles from './TeamReport.module.less'
import { useTranslation } from 'react-i18next'
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

type TeamReportColumn = {
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
  onSelect?: (row: number, column: string | number, record: unknown) => void
  error?: boolean
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
  {
    letter: 'E',
    color: LetterBadgeColors.blue,
  },
]

const transformTableCell = (
  text: string | TeamReportCellValue,
  record: TeamReportRow,
  onClick: VoidFunction
): JSX.Element => {
  let badge = <Badge color="transparent" />
  if (typeof text === 'object') {
    const tootltip = (
      <div>
        Revenue {text.Revenue}
        <br />
        Target {text.Target}
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
  return (
    <div style={{ cursor: 'pointer' }} onClick={() => onClick()}>
      {ret}
    </div>
  )
}

const transformTotalColumn = (
  text: string | TeamReportCellValue,
  record: TeamReportRow
): JSX.Element => {
  let badge = <Badge color="transparent" />
  if (typeof text === 'object') {
    const tootltip = (
      <div>
        Revenue {text.Revenue}
        <br />
        Target {text.Target}
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
  onSelect,
  error,
}) => {
  const isMobile = useMedia('(max-width: 767px)', false)
  const { t } = useTranslation('common')
  const [selectedRow, setSelectedRow] = useState<number>(-1)
  const [selectedColumn, setSelectedColumn] = useState<string | number>('')
  const tableColumns = columns.map((col) => {
    return {
      ...col,
      width: 200,
      onCell: (record) => ({
        className:
          record.key === selectedRow && col.key === selectedColumn
            ? styles.selectedCell
            : undefined,
      }),
      render: (value, record) =>
        col.key === 'total'
          ? transformTotalColumn(value, record)
          : transformTableCell(value, record, () => {
              if (
                value &&
                col.title &&
                !(record.key === selectedRow && col.key === selectedColumn)
              ) {
                setSelectedRow(record.key)
                setSelectedColumn(col.key)
                onSelect?.(record.key, col.key, record)
              } else {
                setSelectedRow(-1)
                setSelectedColumn('')
                onSelect?.(-1, '', null)
              }
            }),
    }
  })

  return loading ? (
    <Space direction="vertical" className={styles.loader}>
      {[0, 1, 2, 3, 4, 5, 6, 7].map((index) => (
        <Space key={index} direction="horizontal" style={{ width: '100%' }}>
          {(isMobile ? [0, 1] : [0, 1, 2, 3, 4]).map((col) => (
            <Skeleton.Input key={col} active />
          ))}
        </Space>
      ))}
    </Space>
  ) : (
    <Table
      dataSource={error ? [] : source}
      columns={tableColumns}
      scroll={{ x: 1200, y: 'calc(100vh - 140px)' }}
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
      locale={{
        emptyText: (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={
              error
                ? t('setup.reports.table.error')
                : t('setup.reports.table.empty')
            }
          />
        ),
      }}
    />
  )
}
