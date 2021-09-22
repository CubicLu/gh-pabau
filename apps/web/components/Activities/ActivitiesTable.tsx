import React, { FC, ReactNode, useCallback, useEffect, useState } from 'react'
import styles from '../../pages/activities/index.module.less'
import { Resizable } from 'react-resizable'
import ReactDragListView from 'react-drag-listview'
import {
  Avatar,
  Button,
  CustomIcon,
  Pagination,
  Notification,
  NotificationType,
} from '@pabau/ui'
import { Drawer, Popover, Table, Tooltip, Skeleton, Image } from 'antd'
import {
  PlusCircleOutlined,
  CheckOutlined,
  TagOutlined,
  DollarCircleFilled,
  UserOutlined,
  AimOutlined,
} from '@ant-design/icons'
import { ActivitiesDataProps, statuses, Labels } from '../../pages/activities'
import AddColumnPopover from './AddColumnPopover'
import { ColumnsType } from 'antd/es/table'
import { useTranslationI18 } from '../../hooks/useTranslationI18'
import { useMedia } from 'react-use'
import { EditableCell } from './EditableCell'
import { columnNames } from './AddColumnPopover'
import { cellTypes } from './EditableCell'
// import { RowSelectionType } from 'antd/es/table/interface'
import {
  assignedData,
  clientsData,
  leadArray,
  leadSourceArray,
  leadWonByData,
  lostReasonArray,
  ownersData,
  scheduleArray,
} from '../../mocks/Activities'
import dayjs from 'dayjs'
import * as Icon from '@ant-design/icons'
import searchEmpty from '../../assets/images/empty.png'
import { useUpsertOneActivityUserColumnsMutation } from '@pabau/graphql'
import { ReactComponent as ActivityIcon } from '../../assets/images/activity-icon.svg'
import { DisplayDateTime, DisplayDate } from '../../hooks/displayDate'
import { AuthenticatedUser, JwtUser } from '@pabau/yup'

export type ActivitiesType = {
  width?: number
}

export type PaginateType = {
  total: number
  offset: number
  limit: number
  currentPage: number
  showingRecords: number
}

interface DataSourceType {
  [key: string]: string | number
}

export interface ActivityTableProps {
  tabValue: string
  searchText?: string
  filteredData?: ActivitiesDataProps[]
  handleLabelClick?: (e, val) => void
  handleDeleteClick?: () => void
  selectedRowKeys?: number[]
  setSelectedRowKeys?: (val: number[]) => void
  handleRowClick?: (val) => void
  onStatusChange?: (val, status) => void
  onSelectDone?: (record, selected, selectedRows) => void
  onSortData?: (val) => void
  handleCellSave?: (val) => void
  editCreateActivityModal?: (val) => void
  labels?: Labels[]
  setLabels?: (val: Labels[]) => void
  paginateData?: PaginateType
  setPaginateData?: (val: PaginateType) => void
  loading?: boolean
  defaultSkeletonRows?: number
  searchTerm?: string
  selectedColumn?: string[]
  setSelectedColumn?: (value: string[]) => void
  userActiveColumn?: string[]
  setCreateActivityVisible?: (value: boolean) => void
  loggedUser?: Partial<AuthenticatedUser> & JwtUser
}

interface ColumnProps {
  id?: string
  title?: ReactNode
  dataIndex?: string
  render?: ReactNode
  visible?: boolean
  width?: number
  editable?: boolean
  editName?: string
  columnName?: string
}
const ResizableTitle = (props) => {
  const { onResize, width, ...restProps } = props
  if (!width) {
    return <th {...restProps} />
  }

  return (
    <Resizable
      width={width}
      height={0}
      handle={
        <span
          className={styles.reactResizableHandle}
          onClick={(e) => {
            e.stopPropagation()
          }}
        />
      }
      onResize={onResize}
    >
      <th {...restProps} />
    </Resizable>
  )
}

export const defaultColumns = [
  columnNames.done.label,
  columnNames.dueDate.label,
  columnNames.subject.label,
  columnNames.clientName.label,
  columnNames.clientEmail.label,
  columnNames.clientPhone.label,
  columnNames.leadName.label,
  columnNames.assignedToUser.label,
  columnNames.status.label,
]
export const ActivityTable: FC<ActivityTableProps> = React.memo(
  ({
    filteredData,
    selectedRowKeys,
    setSelectedRowKeys,
    onStatusChange,
    onSelectDone,
    onSortData,
    handleCellSave,
    editCreateActivityModal,
    labels,
    setLabels,
    paginateData,
    setPaginateData,
    loading,
    defaultSkeletonRows = 50,
    searchTerm,
    selectedColumn,
    setSelectedColumn,
    userActiveColumn,
    setCreateActivityVisible,
    tabValue,
    loggedUser,
  }) => {
    const isMobile = useMedia('(max-width: 768px)', false)
    const { t } = useTranslationI18()
    // const [sourceData, setSourceData] = useState<ActivitiesDataProps[]>([])

    const [visibleAddColumnPopover, setVisibleAddColumnPopover] = useState(
      false
    )
    // const [displayData, setDisplayData] = useState([])
    // const [selectedColumn, setSelectedColumn] = useState(defaultColumns)
    const [displayAddColumn, setDisplayAddColumn] = useState(true)
    // const [paginateData, setPaginateData] = useState({
    //   total: sourceData?.length,
    //   offset: 0,
    //   limit: 50,
    //   currentPage: 1,
    //   showingRecords: 50,
    // })

    const visibleColumn = useCallback(
      (name) => {
        return selectedColumn.includes(name)
      },
      [selectedColumn]
    )

    const [columns, setColumns] = useState([])
    const [upsertActiveColumn] = useUpsertOneActivityUserColumnsMutation({
      onCompleted() {
        Notification(
          NotificationType.success,
          t('activity.table.dynamic.field.update.message')
        )
      },
      onError() {
        Notification(
          NotificationType.error,
          t('activity.table.dynamic.field.update.error.message')
        )
      },
    })

    useEffect(() => {
      if (userActiveColumn.length > 0) {
        setSelectedColumn(userActiveColumn)
      } else {
        setSelectedColumn(defaultColumns)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userActiveColumn])

    useEffect(() => {
      if (!paginateData?.total) {
        setDisplayAddColumn(false)
      } else {
        setDisplayAddColumn(true)
      }
    }, [paginateData])

    const RenderStatus = (data) => {
      const { status, id } = data
      const [visible, setVisible] = useState(false)
      const { backgroundColor, borderColor } = renderStatus(status)
      const toggleVisible = () => {
        setVisible((e) => !e)
      }

      return (
        <span>
          <Popover
            content={() => StatusContent(data, setVisible)}
            placement="bottomRight"
            overlayClassName="statusBtnMenu"
            visible={visible && !isMobile}
            onVisibleChange={(val) => setVisible(val)}
          >
            <Button
              className={styles.statusBtn}
              style={{
                border: `1px solid ${borderColor}`,
                color: borderColor,
              }}
              backgroundColor={backgroundColor}
            >
              {status}
            </Button>
          </Popover>
          {isMobile && (
            <Drawer
              title={t('activityList.column.status')}
              placement={'bottom'}
              closable={false}
              onClose={toggleVisible}
              visible={visible}
              key={id}
              className={styles.statusMobileDrawer}
            >
              <span className={styles.line}></span>
              {StatusContent(data, setVisible)}
            </Drawer>
          )}
        </span>
      )
    }

    const columnsData = [
      {
        id: columnNames.dueDate.id,
        title: (
          <span className="dragHandler">
            {t('activityList.column.dueDate')}
          </span>
        ),
        dataIndex: 'dueDate',
        render: (date) => (
          <span className={styles.cellFormater}>{DisplayDateTime(date)}</span>
        ),
        visible: visibleColumn(columnNames.dueDate.label),
        width: 120,
        editable: true,
        defaultSortOrder: 'ascend',
        skeletonWidth: '80px',
        editName: t('activityList.column.date.editName'),
        columnName: columnNames.dueDate.label,
        type: cellTypes.date,
      },
      {
        id: columnNames.subject.id,
        title: (
          <span className="dragHandler">
            {t('activityList.column.subject')}
          </span>
        ),
        dataIndex: null,
        skeletonWidth: '80px',
        render: (data) => {
          const { type_name = '', subject, type_badge } = data
          return (
            <div className={styles.subjectWrapper}>
              <span className={styles.avatarWrapper}>
                {renderSubjectIcon(type_name, type_badge)}
              </span>
              <span
                className={styles.dotWrapper}
                onClick={() => editCreateActivityModal(data)}
              >
                {subject}
              </span>
            </div>
          )
        },
        width: 100,
        editable: true,
        editName: t('activityList.column.subject.editName'),
        visible: visibleColumn(columnNames.subject.label),
        columnName: columnNames.subject.label,
        type: cellTypes.string,
      },
      {
        id: columnNames.clientName.id,
        title: (
          <span className="dragHandler">
            <UserOutlined />
            {t('activityList.column.clientName')}
          </span>
        ),
        dataIndex: 'client',
        skeletonWidth: '80px',
        render: (data) => {
          const { firstName = '', lastName = '' } = data
          return (
            <span className={styles.cellFormater}>
              <a href="/" className={styles.link}>
                {`${firstName} ${lastName}` || ''}
              </a>
            </span>
          )
        },
        width: 100,
        editable: true,
        editName: t('activityList.column.client.editName'),
        visible: visibleColumn(columnNames.clientName.label),
        columnName: columnNames.clientName.label,
        type: cellTypes.selectWithSearch,
        selectOptions: clientsData,
        selectPrefixIcon: <CustomIcon name={'userFilled'} />,
      },
      {
        id: columnNames.leadDescription.id,
        title: (
          <span className="dragHandler">
            <AimOutlined />
            {t('activityList.column.leadDescription')}
          </span>
        ),
        dataIndex: 'lead',
        width: 100,
        editable: true,
        skeletonWidth: '80px',
        visible: visibleColumn(columnNames.leadDescription.label),
        editName: t('activityList.column.leadDescription.editName'),
        columnName: columnNames.leadDescription.label,
        render: ({ description }) => {
          return (
            <span className={styles.cellFormater}>
              <a>{description}</a>
            </span>
          )
        },
        type: cellTypes.selectWithSearch,
        selectOptions: leadArray,
        selectPrefixIcon: (
          <div className={styles.dollarIcon}>
            <DollarCircleFilled />
          </div>
        ),
      },
      {
        id: columnNames.leadName.id,
        title: (
          <span className="dragHandler">
            <AimOutlined />
            {t('activityList.column.leadName')}
          </span>
        ),
        dataIndex: 'lead',
        skeletonWidth: '80px',
        render: (data) => {
          const { firstName = '', lastName = '' } = data
          return (
            <span className={styles.cellFormater}>
              <a href="/" className={styles.link}>
                {`${firstName} ${lastName}` || ''}
              </a>
            </span>
          )
        },
        width: 100,
        editable: true,
        editName: t('activityList.column.leadFirstName.editName'),
        visible: visibleColumn(columnNames.leadName.label),
        columnName: columnNames.leadName.label,
        type: cellTypes.string,
      },
      {
        id: columnNames.leadEmail.id,
        title: (
          <span className="dragHandler">
            <AimOutlined />
            {t('activityList.column.leadEmail')}
          </span>
        ),
        dataIndex: 'lead',
        skeletonWidth: '80px',
        render: (data) => {
          const { email = '' } = data
          return <span className={styles.cellFormater}>{email}</span>
        },
        width: 120,
        editable: true,
        editName: t('activityList.column.leadEmail.editName'),
        visible: visibleColumn(columnNames.leadEmail.label),
        columnName: columnNames.leadEmail.label,
        type: cellTypes.email,
      },
      {
        id: columnNames.leadPhone.id,
        title: (
          <span className="dragHandler">
            <AimOutlined />
            {t('activityList.column.leadPhone')}
          </span>
        ),
        dataIndex: 'lead',
        skeletonWidth: '80px',
        render: (data) => {
          const { phone = '' } = data
          return (
            <span className={styles.cellFormater}>{phone && `+${phone}`}</span>
          )
        },
        width: 120,
        editable: true,
        editName: t('activityList.column.leadPhone.editName'),
        visible: visibleColumn(columnNames.leadPhone.label),
        columnName: columnNames.leadPhone.label,
        type: cellTypes.phone,
      },
      {
        id: columnNames.leadCreatedDate.id,
        title: (
          <span className="dragHandler">
            <AimOutlined />
            {t('activityList.column.leadCreatedDate')}
          </span>
        ),
        dataIndex: 'lead',
        skeletonWidth: '80px',
        render: ({ createdDate }) => {
          return (
            <span className={styles.cellFormater}>
              {createdDate && DisplayDateTime(createdDate)}
            </span>
          )
        },
        width: 120,
        visible: visibleColumn(columnNames.leadCreatedDate.label),
        columnName: columnNames.leadCreatedDate.label,
      },
      {
        id: columnNames.wonTime.id,
        title: (
          <span className="dragHandler">
            <AimOutlined />
            {t('activityList.column.leadWonTime')}
          </span>
        ),
        dataIndex: 'lead',
        skeletonWidth: '80px',
        render: ({ wonTime }) => {
          return (
            <span className={styles.cellFormater}>
              {wonTime && DisplayDateTime(wonTime)}
            </span>
          )
        },
        width: 120,
        visible: visibleColumn(columnNames.wonTime.label),
        columnName: columnNames.wonTime.label,
      },
      {
        id: columnNames.leadOwner.id,
        title: (
          <span className="dragHandler">
            <AimOutlined />
            {t('activityList.column.owner')}
          </span>
        ),
        dataIndex: 'lead',
        skeletonWidth: '80px',
        render: ({ owner }) => {
          return (
            owner && (
              <div className={styles.avtarMargin}>
                <span className={styles.avatarWrapper}>
                  <Avatar name={owner?.full_name} />
                </span>
              </div>
            )
          )
        },
        width: 100,
        editable: true,
        editName: t('activityList.column.leadOwner.editName'),
        visible: visibleColumn(columnNames.leadOwner.label),
        columnName: columnNames.leadOwner.label,
        type: cellTypes.listWithSearch,
        selectOptions: ownersData,
        hideFooter: true,
      },
      {
        id: columnNames.leadDoneActivities.id,
        title: (
          <span className="dragHandler activityText">
            <AimOutlined />
            {t('activityList.column.leadDoneActivities')}
          </span>
        ),
        dataIndex: 'lead',
        skeletonWidth: '80px',
        sorter: false,
        render: (data) => {
          const { leadDoneActivities = '' } = data
          return (
            <span className={styles.cellFormater}>{leadDoneActivities}</span>
          )
        },
        width: 100,
        visible: visibleColumn(columnNames.leadDoneActivities.label),
        columnName: columnNames.leadDoneActivities.label,
      },
      {
        id: columnNames.leadClosedOn.id,
        title: (
          <span className="dragHandler">
            <AimOutlined />
            {t('activityList.column.leadClosedOn')}
          </span>
        ),
        dataIndex: 'lead',
        skeletonWidth: '80px',
        render: ({ leadClosedOn }) => {
          return (
            <span className={styles.cellFormater}>
              {leadClosedOn && DisplayDateTime(leadClosedOn)}
            </span>
          )
        },
        width: 120,
        visible: visibleColumn(columnNames.leadClosedOn.label),
        columnName: columnNames.leadClosedOn.label,
      },
      {
        id: columnNames.firstActivityTime.id,
        title: (
          <span className="dragHandler activityText">
            <AimOutlined />
            {t('activityList.column.firstActivityTime')}
          </span>
        ),
        dataIndex: 'lead',
        skeletonWidth: '80px',
        sorter: false,
        render: ({ firstActivityTime }) => {
          return (
            <span className={styles.cellFormater}>
              {firstActivityTime && DisplayDateTime(firstActivityTime)}
            </span>
          )
        },
        width: 120,
        visible: visibleColumn(columnNames.firstActivityTime.label),
        columnName: columnNames.firstActivityTime.label,
      },
      {
        id: columnNames.leadLastActivityDate.id,
        title: (
          <span className="dragHandler activityText">
            <AimOutlined />
            {t('activityList.column.leadLastActivityDate')}
          </span>
        ),
        dataIndex: 'lead',
        skeletonWidth: '80px',
        sorter: false,
        render: ({ leadLastActivityDate }) => {
          return (
            <span className={styles.cellFormater}>
              {leadLastActivityDate && DisplayDateTime(leadLastActivityDate)}
            </span>
          )
        },
        width: 120,
        visible: visibleColumn(columnNames.leadLastActivityDate.label),
        columnName: columnNames.leadLastActivityDate.label,
      },
      {
        id: columnNames.leadLastActivity.id,
        title: (
          <span className="dragHandler activityText">
            <AimOutlined />
            {t('activityList.column.leadLastActivity')}
          </span>
        ),
        dataIndex: 'lead',
        skeletonWidth: '80px',
        sorter: false,
        render: ({ leadLastActivityDays }) => {
          return (
            <span className={styles.cellFormater}>{leadLastActivityDays}</span>
          )
        },
        width: 100,
        visible: visibleColumn(columnNames.leadLastActivity.label),
        columnName: columnNames.leadLastActivity.label,
      },
      {
        id: columnNames.leadLostReason.id,
        title: (
          <span className="dragHandler activityText">
            <AimOutlined />
            {t('activityList.column.leadLostReason')}
          </span>
        ),
        dataIndex: 'lead',
        skeletonWidth: '80px',
        sorter: false,
        render: (data) => {
          const { leadLostReason = '' } = data
          return <span className={styles.cellFormater}>{leadLostReason}</span>
        },
        width: 150,
        editable: true,
        editName: t('activityList.column.leadLostReason.editName'),
        visible: visibleColumn(columnNames.leadLostReason.label),
        columnName: columnNames.leadLostReason.label,
        type: cellTypes.list,
        selectOptions: lostReasonArray,
      },
      {
        id: columnNames.leadTotalActivities.id,
        title: (
          <span className="dragHandler">
            <AimOutlined />
            {t('activityList.column.leadTotalActivities')}
          </span>
        ),
        dataIndex: 'lead',
        skeletonWidth: '80px',
        render: (data) => {
          const { leadTotalActivities = 0 } = data
          return (
            <span className={styles.cellFormater}>{leadTotalActivities}</span>
          )
        },
        width: 100,
        visible: visibleColumn(columnNames.leadTotalActivities.label),
        columnName: columnNames.leadTotalActivities.label,
      },
      {
        id: columnNames.leadLostTime.id,
        title: (
          <span className="dragHandler">
            <AimOutlined />
            {t('activityList.column.leadLostTime')}
          </span>
        ),
        dataIndex: 'lead',
        skeletonWidth: '80px',
        render: ({ leadLostTime }) => {
          return (
            <span className={styles.cellFormater}>
              {leadLostTime && DisplayDateTime(leadLostTime)}
            </span>
          )
        },
        width: 120,
        visible: visibleColumn(columnNames.leadLostTime.label),
        columnName: columnNames.leadLostTime.label,
      },
      {
        id: columnNames.leadSource.id,
        title: (
          <span className="dragHandler">
            <AimOutlined />
            {t('activityList.column.leadSource')}
          </span>
        ),
        dataIndex: 'lead',
        skeletonWidth: '80px',
        render: ({ leadSource }) => {
          return <span className={styles.cellFormater}>{leadSource?.name}</span>
        },
        width: 100,
        editable: true,
        editName: t('activityList.column.leadSource.editName'),
        visible: visibleColumn(columnNames.leadSource.label),
        columnName: columnNames.leadSource.label,
        type: cellTypes.list,
        selectOptions: leadSourceArray,
      },
      {
        id: columnNames.wonBy.id,
        title: (
          <span className="dragHandler activityText">
            <AimOutlined />
            {t('activityList.column.wonBy')}
          </span>
        ),
        dataIndex: 'lead',
        skeletonWidth: '80px',
        sorter: false,
        render: ({ wonBy = '' }) => {
          const [firstName] = wonBy.split(' ')
          return (
            wonBy && (
              <div className={styles.avtarMargin}>
                <span className={styles.avatarWrapper}>
                  <Avatar name={firstName} />
                </span>
              </div>
            )
          )
        },
        width: 100,
        editable: true,
        editName: t('activityList.column.wonBy.editName'),
        visible: visibleColumn(columnNames.wonBy.label),
        columnName: columnNames.wonBy.label,
        type: cellTypes.listWithSearch,
        selectOptions: leadWonByData,
        hideFooter: true,
      },
      {
        id: columnNames.leadStage.id,
        title: (
          <span className="dragHandler">
            <AimOutlined />
            {t('activityList.column.leadStage')}
          </span>
        ),
        dataIndex: 'lead',
        skeletonWidth: '80px',
        render: ({ leadStage }) => {
          return <span className={styles.cellFormater}>{leadStage}</span>
        },
        width: 100,
        visible: visibleColumn(columnNames.leadStage.label),
        columnName: columnNames.leadStage.label,
      },
      {
        id: columnNames.assignedToUser.id,
        title: (
          <span className="dragHandler">
            {t('activityList.column.assigned')}
          </span>
        ),
        dataIndex: 'assigned',
        skeletonWidth: '50px',
        render: (data) => {
          const { full_name } = data
          return (
            <div className={styles.avtarMargin}>
              <span className={styles.avatarWrapper}>
                <Avatar name={full_name} />
              </span>
            </div>
          )
        },
        width: 50,
        editable: true,
        editName: t('activityList.column.assigned.editName'),
        visible: visibleColumn(columnNames.assignedToUser.label),
        columnName: columnNames.assignedToUser.label,
        type: cellTypes.listWithSearch,
        selectOptions: assignedData,
        hideFooter: true,
      },
      {
        id: columnNames.status.id,
        skeletonWidth: '80px',
        title: (
          <span className="dragHandler">{t('activityList.column.status')}</span>
        ),
        dataIndex: null,
        render: (data) => {
          return <div>{RenderStatus(data)}</div>
        },
        width: 120,
        visible: visibleColumn(columnNames.status.label),
        columnName: columnNames.status.label,
      },
      {
        id: columnNames.type.id,
        title: (
          <span className="dragHandler">{t('activityList.column.type')}</span>
        ),
        dataIndex: 'type_name',
        skeletonWidth: '80px',
        width: 100,
        visible: visibleColumn(columnNames.type.label),
        editable: true,
        editName: t('activityList.column.type.editName'),
        columnName: columnNames.type.label,
        type: cellTypes.activityType,
        hideFooter: true,
      },
      {
        id: columnNames.note.id,
        title: (
          <span className="dragHandler">{t('activityList.column.note')}</span>
        ),
        dataIndex: 'note',
        skeletonWidth: '80px',
        width: 100,
        visible: visibleColumn(columnNames.note.label),
        editable: true,
        editName: t('activityList.column.note.editName'),
        columnName: columnNames.note.label,
        type: cellTypes.multiple,
      },
      {
        id: columnNames.freeBusy.id,
        title: (
          <span className="dragHandler">
            {t('activityList.column.freeBusy')}
          </span>
        ),
        dataIndex: 'freeBusy',
        skeletonWidth: '80px',
        width: 100,
        visible: visibleColumn(columnNames.freeBusy.label),
        editable: true,
        editName: t('activityList.column.freeBusy.editName'),
        columnName: columnNames.freeBusy.label,
        type: cellTypes.list,
        selectOptions: scheduleArray,
        render: (data) => {
          return (
            <span className={styles.cellFormater}>
              {data ? 'Free' : 'Busy'}
            </span>
          )
        },
      },
      {
        id: columnNames.creator.id,
        title: (
          <span className="dragHandler">
            {t('activityList.column.creator')}
          </span>
        ),
        dataIndex: 'creator',
        skeletonWidth: '80px',
        width: 100,
        visible: visibleColumn(columnNames.creator.label),
        columnName: columnNames.creator.label,
        render: ({ full_name }) => {
          return <span className={styles.cellFormater}>{full_name}</span>
        },
      },
      {
        id: columnNames.addTime.id,
        title: (
          <span className="dragHandler">
            {t('activityList.column.addTime')}
          </span>
        ),
        dataIndex: 'addTime',
        skeletonWidth: '80px',
        width: 120,
        visible: visibleColumn(columnNames.addTime.label),
        editable: false,
        columnName: columnNames.addTime.label,
        render: (date) => (
          <span className={styles.cellFormater}>{DisplayDateTime(date)}</span>
        ),
      },
      {
        id: columnNames.doneTime.id,
        title: (
          <span className="dragHandler">
            {t('activityList.column.doneTime')}
          </span>
        ),
        dataIndex: 'doneTime',
        skeletonWidth: '80px',
        width: 120,
        visible: visibleColumn(columnNames.doneTime.label),
        columnName: columnNames.doneTime.label,
        render: (date) => (
          <span className={styles.cellFormater}>
            {date && DisplayDateTime(date)}
          </span>
        ),
      },
      {
        id: columnNames.duration.id,
        title: (
          <span className="dragHandler activityText">
            {t('activityList.column.duration')}
          </span>
        ),
        dataIndex: 'duration',
        skeletonWidth: '80px',
        width: 100,
        visible: visibleColumn(columnNames.duration.label),
        editable: true,
        sorter: false,
        editName: t('activityList.column.duration.editName'),
        columnName: columnNames.duration.label,
        type: cellTypes.number,
      },
      {
        id: columnNames.label.id,
        title: (
          <span className="dragHandler activityText">
            <UserOutlined />
            {t('activityList.column.label')}
          </span>
        ),
        dataIndex: 'client',
        skeletonWidth: '80px',
        sorter: false,
        render: ({ label = [] }) => {
          return (
            <div>
              {label.map((item, index) => {
                const data = item?.CmLabel
                return (
                  <div className={styles.labelWrapper} key={index}>
                    <Button
                      className={styles.labelButton}
                      style={{
                        border: `1px solid ${data.color}`,
                        color: data.color ?? '#2a5193',
                      }}
                      backgroundColor={''}
                      icon={<TagOutlined />}
                    >
                      {data.name}
                    </Button>
                  </div>
                )
              })}
            </div>
          )
        },
        width: 180,
        editable: true,
        editName: t('activityList.column.label.editName'),
        visible: visibleColumn(columnNames.label.label),
        columnName: columnNames.label.label,
        type: cellTypes.label,
      },
      {
        id: columnNames.clientEmail.id,
        title: (
          <span className="dragHandler">
            <UserOutlined />
            {t('activityList.column.clientEmail')}
          </span>
        ),
        dataIndex: 'client',
        skeletonWidth: '80px',
        render: (data) => {
          const { email = '' } = data
          return <span className={styles.cellFormater}>{email}</span>
        },
        width: 120,
        editable: true,
        editName: t('activityList.column.clientEmail.editName'),
        visible: visibleColumn(columnNames.clientEmail.label),
        columnName: columnNames.clientEmail.label,
        type: cellTypes.email,
      },
      {
        id: columnNames.clientPhone.id,
        title: (
          <span className="dragHandler">
            <UserOutlined />
            {t('activityList.column.clientPhone')}
          </span>
        ),
        dataIndex: 'client',
        skeletonWidth: '80px',
        render: (data) => {
          const { phone = '' } = data
          return (
            <span className={styles.cellFormater}>{phone && `+${phone}`}</span>
          )
        },
        width: 120,
        editable: true,
        editName: t('activityList.column.clientPhone.editName'),
        visible: visibleColumn(columnNames.clientPhone.label),
        columnName: columnNames.clientPhone.label,
        type: cellTypes.phone,
      },
      {
        id: columnNames.clientStreet.id,
        title: (
          <span className="dragHandler">
            <UserOutlined />
            {t('activityList.column.clientStreet')}
          </span>
        ),
        dataIndex: 'client',
        skeletonWidth: '80px',
        render: (data) => {
          const { street = '' } = data
          return <span className={styles.cellFormater}>{street}</span>
        },
        width: 100,
        editable: true,
        editName: t('activityList.column.clientStreet.editName'),
        visible: visibleColumn(columnNames.clientStreet.label),
        columnName: columnNames.clientStreet.label,
        type: cellTypes.string,
      },
      {
        id: columnNames.clientCity.id,
        title: (
          <span className="dragHandler">
            <UserOutlined />
            {t('activityList.column.clientCity')}
          </span>
        ),
        dataIndex: 'client',
        skeletonWidth: '80px',
        render: (data) => {
          const { city = '' } = data
          return <span className={styles.cellFormater}>{city}</span>
        },
        width: 100,
        editable: true,
        editName: t('activityList.column.clientCity.editName'),
        visible: visibleColumn(columnNames.clientCity.label),
        columnName: columnNames.clientCity.label,
        type: cellTypes.string,
      },
      {
        id: columnNames.clientPostCode.id,
        title: (
          <span className="dragHandler">
            <UserOutlined />
            {t('activityList.column.clientPostcode')}
          </span>
        ),
        dataIndex: 'client',
        skeletonWidth: '80px',
        render: ({ postal = '' }) => {
          return <span className={styles.cellFormater}>{postal}</span>
        },
        width: 100,
        editable: true,
        editName: t('activityList.column.clientPostCode.editName'),
        visible: visibleColumn(columnNames.clientPostCode.label),
        columnName: columnNames.clientPostCode.label,
        type: cellTypes.string,
      },
      {
        id: columnNames.clientCountry.id,
        title: (
          <span className="dragHandler">
            <UserOutlined /> {t('activityList.column.clientCountry')}
          </span>
        ),
        dataIndex: 'client',
        skeletonWidth: '80px',
        render: ({ country = '' }) => {
          return <span className={styles.cellFormater}>{country}</span>
        },
        width: 100,
        editable: true,
        editName: t('activityList.column.clientCountry.editName'),
        visible: visibleColumn(columnNames.clientCountry.label),
        columnName: columnNames.clientCountry.label,
        type: cellTypes.string,
      },
      {
        id: columnNames.clientTotalActivities.id,
        title: (
          <span className="dragHandler">
            <UserOutlined />
            {t('activityList.column.clientTotalActivities')}
          </span>
        ),
        dataIndex: 'client',
        skeletonWidth: '80px',
        render: ({ clientTotalActivities }) => {
          return (
            <span className={styles.cellFormater}>{clientTotalActivities}</span>
          )
        },
        width: 100,
        visible: visibleColumn(columnNames.clientTotalActivities.label),
        columnName: columnNames.clientTotalActivities.label,
      },
      {
        id: columnNames.clientMobile.id,
        title: (
          <span className="dragHandler">
            <UserOutlined />
            {t('activityList.column.clientMobile')}
          </span>
        ),
        dataIndex: 'client',
        skeletonWidth: '80px',
        render: ({ mobile = '' }) => {
          return <span className={styles.cellFormater}>{mobile}</span>
        },
        width: 100,
        visible: visibleColumn(columnNames.clientMobile.label),
        columnName: columnNames.clientMobile.label,
      },
      {
        id: columnNames.clientCreatedAt.id,
        title: (
          <span className="dragHandler">
            <UserOutlined />
            {t('activityList.column.clientCreatedAt')}
          </span>
        ),
        dataIndex: 'client',
        skeletonWidth: '80px',
        render: ({ createdDate }) => {
          return (
            <span className={styles.cellFormater}>
              {createdDate && DisplayDate(createdDate)}
            </span>
          )
        },
        width: 100,
        visible: visibleColumn(columnNames.clientCreatedAt.label),
        columnName: columnNames.clientCreatedAt.label,
      },
      {
        id: columnNames.clientSource.id,
        title: (
          <span className="dragHandler">
            <UserOutlined />
            {t('activityList.column.clientSource')}
          </span>
        ),
        dataIndex: 'client',
        skeletonWidth: '80px',
        render: ({ source }) => {
          return <span className={styles.cellFormater}>{source?.name}</span>
        },
        width: 100,
        visible: visibleColumn(columnNames.clientSource.label),
        columnName: columnNames.clientSource.label,
      },
      {
        id: columnNames.clientSalutation.id,
        title: (
          <span className="dragHandler">
            <UserOutlined />
            {t('activityList.column.clientSalutation')}
          </span>
        ),
        dataIndex: 'client',
        skeletonWidth: '80px',
        render: ({ salutation = '' }) => {
          return <span className={styles.cellFormater}>{salutation}</span>
        },
        width: 100,
        visible: visibleColumn(columnNames.clientSalutation.label),
        columnName: columnNames.clientSalutation.label,
      },
      {
        id: columnNames.clientGender.id,
        title: (
          <span className="dragHandler">
            <UserOutlined />
            {t('activityList.column.clientGender')}
          </span>
        ),
        dataIndex: 'client',
        skeletonWidth: '80px',
        render: ({ gender }) => {
          return <span className={styles.cellFormater}>{gender}</span>
        },
        width: 100,
        visible: visibleColumn(columnNames.clientGender.label),
        columnName: columnNames.clientGender.label,
      },
      {
        id: columnNames.clientID.id,
        title: (
          <span className="dragHandler">
            <UserOutlined />
            {t('activityList.column.clientID')}
          </span>
        ),
        dataIndex: 'client',
        skeletonWidth: '80px',
        render: ({ id }) => {
          return <span className={styles.cellFormater}>{id}</span>
        },
        width: 100,
        visible: visibleColumn(columnNames.clientID.label),
        columnName: columnNames.clientID.label,
      },
      {
        id: columnNames.clientDOB.id,
        title: (
          <span className="dragHandler">
            <UserOutlined />
            {t('activityList.column.clientDOB')}
          </span>
        ),
        dataIndex: 'client',
        skeletonWidth: '80px',
        render: ({ DOB }) => {
          return (
            <span className={styles.cellFormater}>
              {DOB && DisplayDate(DOB)}
            </span>
          )
        },
        width: 100,
        visible: visibleColumn(columnNames.clientDOB.label),
        columnName: columnNames.clientDOB.label,
      },
      {
        id: columnNames.clientStatus.id,
        title: (
          <span className="dragHandler">
            <UserOutlined />
            {t('activityList.column.clientStatus')}
          </span>
        ),
        dataIndex: 'client',
        skeletonWidth: '80px',
        render: ({ status }) => {
          return (
            <span className={styles.cellFormater}>
              {status
                ? t('basic-crud-table-button-active')
                : t('basic-crud-table-button-inactive')}
            </span>
          )
        },
        width: 100,
        visible: visibleColumn(columnNames.clientStatus.label),
        columnName: columnNames.clientStatus.label,
      },
    ]

    const [columnItem, setColumnItem] = useState<ColumnProps[]>(columnsData)

    useEffect(() => {
      const displayColumn = columnItem.map((data) => ({
        ...data,
        visible: selectedColumn.includes(data?.columnName),
      }))
      const columnData = selectedColumn.map((data) => {
        return displayColumn.find((item) => item?.columnName === data)
      })
      setColumns(columnData)
    }, [selectedColumn, columnItem, isMobile])

    // useEffect(() => {
    //   // const data = sourceData?.slice(
    //   //   paginateData.offset,
    //   //   paginateData.currentPage * paginateData.limit
    //   // )
    //   // setPaginateData((d) => ({ ...d, total: sourceData?.length }))
    //   setDisplayData(sourceData)
    // }, [
    //   sourceData
    // ])

    // useEffect(() => {
    //   setPaginateData((d: PaginateType) => ({ ...d, showingRecords: displayData.length }))
    // }, [displayData])

    const renderStatus = (status) => {
      switch (status) {
        case statuses.workingOn:
          return {
            borderColor: '#FAAD14',
            backgroundColor: 'rgba(250, 173, 20, 0.05)',
          }
        case statuses.reopened:
          return {
            borderColor: '#FF5B64',
            backgroundColor: '#FFF7F7',
          }
        case statuses.pending:
          return {
            borderColor: '#54B2D3',
            backgroundColor: 'rgba(84, 178, 211, 0.05)',
          }
        case statuses.done:
          return {
            borderColor: '#65CD98',
            backgroundColor: 'rgba(101, 205, 152, 0.05)',
          }
        case statuses.awaiting:
          return {
            borderColor: '#6B6B6B',
            backgroundColor: 'rgba(101, 205, 152, 0.05)',
          }
        default:
          return {
            borderColor: '#54B2D3',
            backgroundColor: 'rgba(107, 107, 107, 0.05)',
          }
      }
    }

    const renderSubjectIcon = (type, type_badge) => {
      return React.createElement(Icon?.[type_badge])
    }

    const StatusContent = (data, setVisible?: (val) => void) => {
      const { status } = data
      const [selectedStatus, setSelectedStatus] = useState(status)
      const statusList = [...Object.values(statuses)]
      if (!isMobile) {
        const index = statusList.indexOf(status)
        index !== -1 && statusList.splice(index, 1)
      }

      const onStatusSelect = (data, status) => {
        setSelectedStatus(status)
        onStatusChange(data, status)
        setVisible(false)
      }

      const onStatusChangeHandle = (data, item) => {
        onStatusChange(data, item)
        setVisible(false)
      }

      return (
        <div className={styles.checkStatusWrapper}>
          {statusList.map((item) => {
            const { backgroundColor, borderColor } = renderStatus(item)
            return (
              <div className={styles.checkStatus} key={item}>
                {isMobile && item === selectedStatus && <CheckOutlined />}
                <Button
                  className={styles.statusBtn}
                  style={{
                    border: `1px solid ${borderColor}`,
                    color: borderColor,
                  }}
                  backgroundColor={backgroundColor}
                  onClick={() => {
                    !isMobile
                      ? onStatusChangeHandle(data, item)
                      : onStatusSelect(data, item)
                  }}
                >
                  {item}
                </Button>
              </div>
            )
          })}
        </div>
      )
    }

    const components = {
      header: {
        cell: ResizableTitle,
      },
      body: {
        cell: EditableCell,
      },
    }

    const handleResize = (col, index) => (e, { size }) => {
      const nextColumns = [...columns]
      nextColumns[index] = {
        ...nextColumns[index],
        width: size?.width,
      }
      setColumns(nextColumns)
      const updateColumns = columnItem.map((data) => {
        const temp = { ...data }
        if (temp.columnName === col.columnName) {
          temp['width'] = size?.width
        }
        return temp
      })
      setColumnItem(updateColumns)
    }

    const dragProps = {
      async onDragEnd(fromIndex, toIndex) {
        const columns1 = [...columns.filter((data) => data?.visible)]
        if (selectedColumn.includes(columnNames.done.label)) {
          if (toIndex !== 0 && fromIndex !== 0) {
            const item = columns1.splice(fromIndex - 1, 1)[0]
            columns1.splice(toIndex - 1, 0, item)
          }
        } else {
          const item = columns1.splice(fromIndex, 1)[0]
          columns1.splice(toIndex, 0, item)
        }
        const selectColumn = columns1.map((data) => {
          return data?.columnName
        })
        const activeColumnName = selectedColumn.includes(columnNames.done.label)
          ? [columnNames.done.label, ...selectColumn]
          : selectColumn
        setSelectedColumn(activeColumnName)
        setColumns(columns1)
        await upsertActiveColumn({
          variables: {
            columns: JSON.stringify({ columns: activeColumnName }),
            userId: loggedUser?.user,
            companyId: loggedUser?.company,
          },
        })
      },
      nodeSelector: 'th',
      handleSelector: '.dragHandler',
      ignoreSelector: 'react-resizable-handle',
      lineClassName: styles.dragLineHandle,
    }

    const getColumns = () => {
      const columnsData = columns.map((col, index) => ({
        ...col,
        sorter: col?.sorter ?? true,
        key: index,
        showSorterTooltip: false,
        onHeaderCell: (column: ActivitiesType) => ({
          width: column.width,
          onResize: handleResize(col, index),
        }),
        onCell: (record: ActivitiesType) => ({
          record,
          editable: col.editable?.toString(),
          dataIndex: col.dataIndex,
          title: col.title,
          id: col.id,
          editName: col?.editName,
          handleSave: handleCellSave,
          ellipsis: 'true',
          type: col?.type,
          selectOptions: col?.selectOptions || [],
          labels,
          setLabels,
          hideFooter: col?.hideFooter || false,
          selectPrefixIcon: col.selectPrefixIcon,
        }),
      }))

      if (isMobile) {
        const columns = columnsData.filter((col) => col.visible)
        return [
          ...columns,
          {
            title: (
              <div className={styles.addIcon}>
                {displayAddColumn && (
                  <AddColumnPopover
                    selectedColumn={selectedColumn}
                    setSelectedColumn={setSelectedColumn}
                    visibleAddColumnPopover={visibleAddColumnPopover}
                    setVisibleAddColumnPopover={setVisibleAddColumnPopover}
                    upsertActiveColumnMutation={upsertActiveColumn}
                    loggedUser={loggedUser}
                  >
                    <Tooltip
                      title={t('activityList.column.addColumns')}
                      placement={'topRight'}
                    >
                      <PlusCircleOutlined />
                    </Tooltip>
                  </AddColumnPopover>
                )}
              </div>
            ),
            dataIndex: null,
            key: 'address',
          },
        ]
      }
      return columnsData.filter((col) => col.visible)
    }

    const onPaginationChange = (currentPage) => {
      const offset = paginateData.limit * (currentPage - 1)
      setPaginateData({ ...paginateData, offset, currentPage })
    }

    const handlePageSizeChange = (pageSize) => {
      setPaginateData({
        ...paginateData,
        limit: pageSize,
        currentPage: 1,
        offset: 0,
      })
    }

    const onTableChange = (pagination, filters, sorter) => {
      onSortData(sorter)
    }

    const renderTable = () => {
      if (loading && getColumns()) {
        // eslint-disable-next-line
      const tableColumn = [
          {
            title: '',
            dataIndex: null,
            width: 10,
            skeletonWidth: '15px',
          },
          ...getColumns(),
        ]
        const columns: ColumnsType<any> = []
        const dataSource: DataSourceType[] = []
        for (const key of tableColumn) {
          const { visible = true } = key
          if (visible) {
            delete key.onCell
            delete key.onHeaderCell
            columns.push({
              ...key,
              render: function render() {
                const width = key.skeletonWidth ?? '200px'
                return (
                  <div>
                    <Skeleton.Input
                      active={true}
                      size="small"
                      style={{ width: width }}
                    />
                  </div>
                )
              },
            })
          }
        }
        for (let i = 0; i < defaultSkeletonRows; i = i + 1) {
          let data
          for (const key of tableColumn) {
            // eslint-disable-next-line
          // @ts-ignore
            data = { ...data, id: i, key: i, [key.dataIndex]: '' }
          }
          dataSource.push(data)
        }
        return (
          <Table
            dataSource={dataSource}
            scroll={{ x: 'max-content' }}
            columns={columns}
            rowKey="key"
            pagination={false}
            className={styles.tableContent}
            // components={components}
          />
        )
      }
      return !filteredData?.length && !loading && !searchTerm ? (
        <div className={styles.noDataTableBox}>
          <div className={styles.noDataTextStyle}>
            <span className={styles.roundDesign}>
              <ActivityIcon className={styles.icon} />
            </span>
            <p className={styles.title}>
              {t('activityList.empty.activity.label')}
            </p>
            <p className={styles.titleDesc}>
              {t('activityList.empty.activity.label.description')}
            </p>
            <div className={styles.spaceBetweenText} />
            <Button
              className={styles.createTemaplateBtn}
              type="primary"
              onClick={() => setCreateActivityVisible?.(true)}
            >
              {t('activityList.createActivity')}
            </Button>
          </div>
        </div>
      ) : !filteredData?.length && !loading && searchTerm ? (
        <div className={styles.noSearchResult}>
          <Image src={searchEmpty} preview={false} />
          <p className={styles.noResultsText}>
            {t('crud-table-no-search-results')}
          </p>
          <p className={styles.tryAdjustText}>{t('crud-table-try-adjust')}</p>
        </div>
      ) : (
        <Table
          dataSource={filteredData.map((e: { id }) => ({
            key: e.id,
            ...e,
          }))}
          scroll={{ x: 'max-content' }}
          columns={getColumns()}
          pagination={false}
          rowSelection={
            selectedColumn.includes(columnNames.done.label)
              ? {
                  type: 'radio',
                  selectedRowKeys,
                  onChange: setSelectedRowKeys,
                  onSelect: onSelectDone,
                }
              : null
          }
          loading={false}
          components={components}
          className={styles.tableContent}
          rowClassName={(record: ActivitiesDataProps) => {
            const dueDate = dayjs(record.dueDate)
            const now = dayjs()
            if (record?.status === statuses.done) {
              return styles.doneRow
            } else if (now > dueDate) {
              return styles.overdueRow
            } else if (
              now <= dueDate &&
              now.format('DD') === dueDate.format('DD')
            ) {
              return styles.todayRow
            }
            return ''
          }}
          onChange={onTableChange}
        />
      )
    }

    return (
      <div className={styles.activityTable}>
        {!isMobile && displayAddColumn && (
          <div className={styles.addIcon}>
            <AddColumnPopover
              selectedColumn={selectedColumn}
              setSelectedColumn={setSelectedColumn}
              visibleAddColumnPopover={visibleAddColumnPopover}
              setVisibleAddColumnPopover={setVisibleAddColumnPopover}
              upsertActiveColumnMutation={upsertActiveColumn}
              loggedUser={loggedUser}
            >
              <Tooltip
                title={t('activityList.column.addColumns')}
                placement={'topRight'}
              >
                <PlusCircleOutlined />
              </Tooltip>
            </AddColumnPopover>
          </div>
        )}
        <ReactDragListView.DragColumn {...dragProps}>
          {renderTable()}
          {/* <Table
          dataSource={displayData.map((e: { id }) => ({
            key: e.id,
            ...e,
          }))}
          scroll={{ x: 'max-content' }}
          columns={getColumns()}
          pagination={false}
          rowSelection={
            selectedColumn.includes(columnNames.done.label)
              ? rowSelection
              : null
          }
          loading={false}
          components={components}
          className={styles.tableContent}
          rowClassName={(record: ActivitiesDataProps) => {
            return record?.status === statuses.done ? styles.doneRowClass : ''
          }}
          onChange={onTableChange}
        /> */}
        </ReactDragListView.DragColumn>
        <Pagination
          showingRecords={paginateData.showingRecords}
          defaultCurrent={1}
          total={paginateData.total}
          pageSize={paginateData.limit}
          current={paginateData.currentPage}
          onChange={onPaginationChange}
          pageSizeOptions={['5', '50', '100', '150', '200', '250']}
          onPageSizeChange={handlePageSizeChange}
        />
      </div>
    )
  }
)

export default ActivityTable
