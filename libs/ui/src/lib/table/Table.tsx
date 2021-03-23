import React, { FC } from 'react'
import { Button, Table as AntTable, Avatar, Image } from 'antd'
import { Daily } from '@pabau/ui'
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
} from 'react-sortable-hoc'
import { ContactsOutlined, LockOutlined, MenuOutlined } from '@ant-design/icons'
import { TableProps } from 'antd/es/table'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useTranslation } from 'react-i18next'
import searchEmpty from '../../assets/images/empty.png'
import styles from './Table.module.less'

export interface DragProps {
  draggable?: boolean
  isCustomColorExist?: boolean
  isCustomIconExist?: boolean
  updateDataSource?: ({ newData, oldIndex, newIndex }) => void
}

const DragHandle = SortableHandle(() => (
  <MenuOutlined style={{ cursor: 'pointer', color: '#999' }} />
))

const SortItem = SortableElement((props) => (
  <tr {...props} className={styles.abc} />
))
const SortContainer = SortableContainer((props) => <tbody {...props} />)

function array_move(arr, old_index, new_index) {
  if (new_index >= arr.length) {
    let k = new_index - arr.length + 1
    while (k--) {
      arr.push(undefined)
    }
  }
  arr.splice(new_index, 0, arr.splice(old_index, 1)[0])
  return arr.map((ele, index) => {
    ele.index = index
    return ele
  })
}

export type TableType = {
  onRowClick?: (e) => void
  padlocked?: string[]
  noDataText?: string
  noDataBtnText?: string
  noDataIcon?: JSX.Element
  onAddTemplate?: () => void
  searchTerm?: string
  needTranslation?: boolean
  showSizeChanger?: boolean
} & TableProps<never> &
  DragProps

export const Table: FC<TableType> = ({
  dataSource = [],
  padlocked,
  isCustomColorExist = false,
  isCustomIconExist = false,
  updateDataSource,
  onRowClick,
  noDataText,
  noDataBtnText,
  noDataIcon = <ContactsOutlined />,
  onAddTemplate,
  searchTerm = '',
  needTranslation,
  showSizeChanger,
  ...props
}) => {
  const onSortEnd = ({ oldIndex, newIndex }) => {
    if (oldIndex !== newIndex) {
      const newData = array_move(dataSource, oldIndex, newIndex)
      updateDataSource?.({ newData, oldIndex, newIndex })
    }
  }

  const DraggableBodyRow = ({ className, style, ...restProps }) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const index = dataSource.findIndex(
      (x: { key: string }) => x.key === restProps['data-row-key']
    )
    return <SortItem index={index} {...restProps} />
  }
  const { t } = useTranslation('common')

  const DraggableContainer = (props) => (
    <SortContainer
      useDragHandle
      helperClass={styles.rowDragging}
      onSortEnd={onSortEnd}
      {...props}
    />
  )

  const dragColumn = {
    title: '',
    dataIndex: 'sort',
    width: 64,
    className: 'drag-visible align-center',
    render: function renderDragHandle() {
      return <DragHandle />
    },
  }
  const renderActiveButton = (isActive) => {
    return (
      <Button
        className={isActive ? styles.activeBtn : styles.disableSourceBtn}
        disabled={!isActive}
      >
        {isActive
          ? t('basic-crud-table-button-active')
          : t('basic-crud-table-button-inactive')}
      </Button>
    )
  }

  const renderTableSource = (val, rowData) => {
    return (
      <div className={styles.alignItems}>
        {isCustomColorExist && renderCustomColor(val, rowData)}
        {val}
        {padlocked?.includes(val) && (
          <div style={{ marginLeft: '6px' }}>
            <LockOutlined />
          </div>
        )}
        {isCustomIconExist && rowData.icon && (
          <FontAwesomeIcon icon={rowData.icon} className={styles.tableIcon} />
        )}
      </div>
    )
  }

  const renderCustomColor = (val, rowData) => {
    return (
      <div
        style={{ background: rowData.color }}
        className={styles.customColor}
      />
    )
  }

  const checkPadLocks = (record) => {
    let clickable = true
    Object.keys(record).map((key) => {
      if (padlocked?.includes(record[key])) {
        clickable = false
      }
      return key
    })
    return clickable
  }

  const renderDays = (data) => {
    const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    const resultPassedData: Array<number> = []
    weekDays.map((item, index: number) => {
      if (data.includes(item)) {
        resultPassedData.push(index + 1)
        return item
      }
      return item
    })
    return (
      <div>
        <Daily tickedDays={resultPassedData} />
      </div>
    )
  }

  const renderTime = (val) => {
    return <div className={styles.alignItems}>{val.slice(0, 5)}</div>
  }

  const renderSortHandler = () => {
    if (props?.columns) {
      props.columns = props.columns
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ?.filter((col: any) => col.visible === true)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .map((col: any) => {
          if (
            col &&
            (col.dataIndex === 'public' ||
              col.dataIndex === 'is_active' ||
              col.dataIndex === 'integration')
          ) {
            col.render = renderActiveButton
          } else if (col.dataIndex === 'days') {
            col.render = renderDays
          } else if (
            col.dataIndex === 'start_time' ||
            col.dataIndex === 'end_time'
          ) {
            col.render = renderTime
          } else if (!col.render) {
            col.render = renderTableSource
          }
          return col
        })
    }

    return props.draggable
      ? [{ ...dragColumn }, ...(props.columns || [])]
      : props.columns
  }
  return !dataSource?.length && !props.loading && !searchTerm ? (
    <div className={styles.noDataTableBox}>
      <div className={styles.noDataTextStyle}>
        <Avatar icon={noDataIcon} size="large" className={styles.roundDesign} />
        <p>{`${noDataText}`}</p>
        <div className={styles.spaceBetweenText} />
        <Button
          className={styles.createTemaplateBtn}
          type="primary"
          onClick={() => onAddTemplate?.()}
        >
          {`${noDataBtnText}`}
        </Button>
      </div>
    </div>
  ) : !dataSource?.length && !props.loading && searchTerm ? (
    <div className={styles.noSearchResult}>
      <Image src={searchEmpty} preview={false} />
      <p className={styles.noResultsText}>
        {t('crud-table-no-search-results')}
      </p>
      <p className={styles.tryAdjustText}>{t('crud-table-try-adjust')}</p>
    </div>
  ) : (
    <AntTable
      {...props}
      onRow={(record, rowIndex) => {
        return {
          onClick: (event) => {
            if (checkPadLocks(record)) {
              onRowClick?.(record)
              console.log(event, record)
            }
          },
        }
      }}
      pagination={
        showSizeChanger ? { showSizeChanger: showSizeChanger } : false
      }
      dataSource={dataSource}
      columns={renderSortHandler()}
      rowKey="key"
      className={styles.dragTable}
      components={{
        body: {
          wrapper: DraggableContainer,
          row: DraggableBodyRow,
        },
      }}
    />
  )
}
