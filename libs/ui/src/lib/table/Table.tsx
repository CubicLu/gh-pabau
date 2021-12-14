import { ContactsOutlined, LockOutlined, MenuOutlined } from '@ant-design/icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Daily } from '@pabau/ui'
import {
  Avatar,
  Button,
  Image,
  Popover,
  Skeleton,
  Table as AntTable,
} from 'antd'
import { ColumnsType, TableProps } from 'antd/es/table'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
} from 'react-sortable-hoc'
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

interface DataSourceType {
  [key: string]: string | number
}

type CustomColumns = {
  skeletonWidth?: string
  visible?: boolean
  columnType?: string
}

// eslint-disable-next-line @typescript-eslint/ban-types
export type TableType<T = object> = {
  onRowClickWithEvent?: (e, event) => void
  onRowClick?: (e) => void
  onRowHover?: (e) => void
  onLeaveRow?: (e) => void
  padlocked?: string[]
  noDataText?: string
  noDataBtnText?: string
  noDataIcon?: JSX.Element
  onAddTemplate?: () => void
  searchTerm?: string
  needTranslation?: boolean
  showSizeChanger?: boolean
  isHover?: boolean
  loading?: boolean
  displayColor?: boolean
  displayLock?: boolean
  columns?: CustomColumns[]
  defaultSkeletonRows?: number
  needEvent?: boolean
} & TableProps<T> &
  DragProps

export const Table: FC<TableType> = ({
  dataSource = [],
  padlocked,
  isCustomColorExist = false,
  isCustomIconExist = false,
  isHover = false,
  updateDataSource,
  onRowClickWithEvent,
  onRowClick,
  onRowHover,
  onLeaveRow,
  noDataText,
  noDataBtnText,
  noDataIcon = <ContactsOutlined />,
  onAddTemplate,
  searchTerm = '',
  needTranslation,
  showSizeChanger,
  loading,
  displayColor = false,
  displayLock = false,
  defaultSkeletonRows = 50,
  needEvent = false,
  ...props
}) => {
  const onSortEnd = ({ oldIndex, newIndex }) => {
    if (oldIndex !== newIndex) {
      const newData = array_move(dataSource, oldIndex, newIndex)
      updateDataSource?.({ newData, oldIndex, newIndex })
    }
  }

  const DraggableBodyRow = ({ className, style, ...restProps }) => {
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
    if (isActive === '') return
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
  const renderLockIcon = (isLock) => {
    return (
      <div className={styles.lockIcon}>
        {isLock ? <LockOutlined color="#B8B8C0" /> : null}{' '}
      </div>
    )
  }
  const renderTableSource = (val, rowData) => {
    return (
      <div className={styles.alignItems}>
        {(isCustomColorExist || displayColor) &&
          renderCustomColor(val, rowData)}
        {val}
        {padlocked?.includes(val) && (
          <div style={{ marginLeft: '6px' }}>
            <LockOutlined />
          </div>
        )}
        {displayLock ? (
          rowData['basic_field'] ? (
            <div style={{ marginLeft: '6px' }}>
              <LockOutlined />
            </div>
          ) : null
        ) : null}
        {isCustomIconExist && rowData.icon && (
          <FontAwesomeIcon
            style={
              rowData?.icon_color &&
              displayColor && { color: rowData.icon_color }
            }
            icon={
              rowData.icon.includes('-') && rowData.icon.includes('fa')
                ? rowData.icon.replace(/fa-/gi, 'fa,').split(',')
                : rowData.icon
            }
            className={styles.tableIcon}
          />
        )}
      </div>
    )
  }

  const renderCustomColor = (val, rowData) => {
    return (
      <div>
        {displayColor ? (
          <div
            style={{
              background:
                rowData['name'] === 'Complete'
                  ? '#5cd828'
                  : rowData['name'] === 'no-show'
                  ? '#f15d3b'
                  : rowData.color || rowData?.icon_color,
            }}
            className={styles.customColor}
          />
        ) : (
          <div
            style={{ background: rowData.color }}
            className={styles.customColor}
          />
        )}
      </div>
    )
  }

  const renderAmount = (val) => {
    return (
      <div>
        {' '}
        {typeof val === 'number' && '$'}{' '}
        {typeof val === 'number' ? val?.toFixed(2) : val}{' '}
      </div>
    )
  }

  const renderCodeInput = (code) => {
    return (
      <Button type="dashed" className={styles.codeBtn}>
        {code}
      </Button>
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

  const renderMessageHover = (val) => {
    if (val.length > 60) {
      return (
        <Popover trigger="hover" content={val}>
          {val.slice(0, 60)}...
        </Popover>
      )
    }
    return <span>{val}</span>
  }

  const renderHoverContent = (val, rowData) => {
    let display = '1'
    if (!rowData.isShow) {
      display = '0'
    }
    return (
      <div
        key={rowData.key}
        className={styles.renderHoverWrap}
        style={{ opacity: display }}
      >
        {rowData?.visibleData}
      </div>
    )
  }

  const renderSortHandler = () => {
    if (props?.columns) {
      props.columns = props.columns
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ?.filter((col: any) => col.visible === true)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .map((col: any) => {
          if (col?.render) {
            return col
          } else if (
            col &&
            (col.dataIndex === 'public' ||
              col.dataIndex === 'is_active' ||
              col.dataIndex === 'integration')
          ) {
            col.render = renderActiveButton
          } else if (col.dataIndex === 'is_lock') {
            col.render = renderLockIcon
          } else if (col.isHover) {
            col.render = renderHoverContent
          } else
            switch (col.dataIndex) {
              case 'messageHover': {
                col.render = renderMessageHover

                break
              }
              case 'days': {
                col.render = renderDays

                break
              }
              case 'amount': {
                col.render = renderAmount

                break
              }
              case 'start_time':
              case 'end_time': {
                col.render = renderTime

                break
              }
              case 'code': {
                col.render = renderCodeInput

                break
              }
              default: {
                if (!col.render) {
                  col.render = renderTableSource
                }
              }
            }
          return col
        })
    }

    return props.draggable
      ? [{ ...dragColumn }, ...(props.columns || [])]
      : props.columns
  }

  const onHoverEnterHandle = (data) => {
    onRowHover?.(data)
  }

  const onHoverLeaveHandle = (data) => {
    onLeaveRow?.(data)
  }

  const renderAvatarLoader = () => {
    return <Skeleton.Avatar active={true} size="default" shape={'circle'} />
  }

  if (loading && props?.columns) {
    // eslint-disable-next-line
    const columns: ColumnsType<any> = []
    const dataSource: DataSourceType[] = []
    for (const key of props?.columns) {
      const { visible = true, columnType = '' } = key
      if (visible) {
        if (columnType === 'avatar') {
          columns.push({ ...key, render: renderAvatarLoader })
        } else {
          columns.push({
            ...key,
            render: function render() {
              const width = key.skeletonWidth ?? '200px'
              return (
                <div className={styles.columnLoader} style={{ width: width }}>
                  <Skeleton.Input active={true} size="small" />
                </div>
              )
            },
          })
        }
      }
    }
    for (let i = 0; i < defaultSkeletonRows; i = i + 1) {
      let data
      for (const key of props?.columns) {
        // eslint-disable-next-line
        // @ts-ignore
        data = { ...data, id: i, key: i, [key.dataIndex]: '' }
      }
      dataSource.push(data)
    }
    return (
      <AntTable
        dataSource={dataSource}
        columns={columns}
        rowKey="key"
        pagination={false}
        className={styles.dragTable}
      />
    )
  }

  return !dataSource?.length && !loading && !searchTerm ? (
    <div className={styles.noDataTableBox}>
      <div className={styles.noDataTextStyle}>
        <Avatar icon={noDataIcon} size="large" className={styles.roundDesign} />
        <p>{`${noDataText}`}</p>
        <div className={styles.spaceBetweenText} />
        {noDataBtnText && (
          <Button
            className={styles.createTemaplateBtn}
            type="primary"
            onClick={() => onAddTemplate?.()}
          >
            {`${noDataBtnText}`}
          </Button>
        )}
      </div>
    </div>
  ) : !dataSource?.length && !loading && searchTerm ? (
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
              needEvent
                ? onRowClickWithEvent?.(record, event)
                : onRowClick?.(record)
            }
          },
          onMouseEnter: (event) => {
            isHover && onHoverEnterHandle(record)
          },
          onMouseLeave: (event) => {
            isHover && onHoverLeaveHandle(record)
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
