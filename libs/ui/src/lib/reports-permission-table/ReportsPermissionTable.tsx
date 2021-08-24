import React, { FC, useState, HTMLAttributes } from 'react'
import { Popover, Skeleton, Table as AntTable, Tooltip } from 'antd'
import { CheckboxChangeEvent } from 'antd/es/checkbox'
import {
  TableProps,
  ColumnsType,
  ColumnGroupType,
  ColumnType,
} from 'antd/es/table'
import {
  DeleteOutlined,
  DownOutlined,
  MinusOutlined,
  PlusOutlined,
} from '@ant-design/icons'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'

import { Avatar, BasicModal, Button, Checkbox } from '@pabau/ui'

import styles from './ReportsPermissionTable.module.less'

export type PermissionColumnType = {
  key: string
  title: string
  staffMember?: string[]
  isDisabled?: boolean
}

export type PermissionsType = {
  key: string
  name: string
  permissions: {
    [key: string]: boolean
  }
  tooltipMessage?: string
}

export type PermissionsGroupType = {
  key: string
  name: string
  children?: PermissionsType[]
  permissions?: {
    [key: string]: boolean
  }
  tooltipMessage?: string
}

export type ReportsPermissionTableProps = TableProps<PermissionsGroupType> & {
  pageTitle?: string
  subTitle?: string
  tableColumnName?: string
  columns?: PermissionColumnType[]
  onUpdatePermission?: (
    record: PermissionsGroupType | PermissionsType,
    columnKey: string,
    checked?: boolean
  ) => void
  isDefaultExpanded?: boolean
  isListQueryLoader?: boolean
  setTabValue?: React.Dispatch<React.SetStateAction<string | number>>
}

export const ReportsPermissionTable: FC<ReportsPermissionTableProps> = ({
  pageTitle: title,
  subTitle: subtitle,
  tableColumnName,
  columns: permissionColumns,
  dataSource = [],
  onUpdatePermission,
  isDefaultExpanded,
  isListQueryLoader,
  setTabValue,
  ...props
}) => {
  const { t } = useTranslation('common')
  const [deleteVisible, setDeleteVisible] = useState(false)
  const [popoverVisible, setPopOverVisible] = useState({})
  const [teammatePopoverVisible, setTeammatePopOverVisible] = useState({})
  const [isShowMore, setIsShowMore] = useState(false)
  const showLimit = 5
  const [
    expandedRecord,
    setExpandedRecord,
  ] = useState<PermissionsGroupType | null>(null)
  const [
    isShowPermissionChanges,
    setIsShowPermissionChanges,
  ] = useState<boolean>(false)
  const [permissionChangeModule, setPermissionChangeModule] = useState<{
    record: PermissionsGroupType | PermissionsType
    columnKey: string
    tooltipMessage: string[]
    checked?: boolean
  }>()

  const columns:
    | ColumnsType<PermissionsGroupType>
    | ColumnsType<PermissionsType> = [
    {
      title: tableColumnName,
      dataIndex: 'name',
      key: 'name',
      // eslint-disable-next-line react/display-name
      render: (text, record) => {
        return !isListQueryLoader ? (
          <Tooltip title={record.tooltipMessage} placement={'right'}>
            <span>{record.name}</span>
          </Tooltip>
        ) : (
          <span>
            <Skeleton paragraph={false} round active />
          </span>
        )
      },
    },
    ...(permissionColumns ?? []).map((column: PermissionColumnType):
      | ColumnGroupType<PermissionsGroupType>
      | ColumnType<PermissionsType> => ({
      // eslint-disable-next-line react/display-name
      title: () => (
        <div>
          {isListQueryLoader ? (
            <Skeleton paragraph={false} round active />
          ) : column.staffMember && column.staffMember.length > 0 ? (
            <Popover
              trigger="hover"
              visible={popoverVisible[column.key]}
              onVisibleChange={(value) => {
                setPopOverVisible({ ...popoverVisible, [column.key]: value })
              }}
              overlayClassName={styles.staffPopover}
              content={() => {
                return (
                  <div>
                    <div>
                      {column.staffMember?.map((name) => {
                        return (
                          <span key={name}>
                            <Avatar name={name} />
                          </span>
                        )
                      })}
                    </div>
                    <span className={styles.trashIcon}>
                      <DeleteOutlined
                        onClick={() => {
                          setDeleteVisible(true)
                          setPopOverVisible({
                            ...popoverVisible,
                            [column.key]: false,
                          })
                        }}
                      />
                    </span>
                  </div>
                )
              }}
            >
              <div>{column.title}</div>
            </Popover>
          ) : column.key !== 'owner' ? (
            <Popover
              trigger="hover"
              visible={teammatePopoverVisible[column.key]}
              onVisibleChange={(value) => {
                setTeammatePopOverVisible({
                  ...teammatePopoverVisible,
                  [column.key]: value,
                })
              }}
              content={() => {
                return (
                  <div>
                    <Button
                      onClick={() => {
                        setTeammatePopOverVisible({
                          ...teammatePopoverVisible,
                          [column.key]: false,
                        })
                        setTabValue?.(0)
                      }}
                    >
                      {t('reportPermissionTable.deleteModal.addTeamMateBtn')}
                    </Button>
                  </div>
                )
              }}
            >
              <div>{column.title}</div>
            </Popover>
          ) : (
            <div>{column.title}</div>
          )}
        </div>
      ),
      key: column.key,
      dataIndex: `permissions.${column.key}`,
      align: 'center',
      render: function RenderPermission(
        _value,
        record: PermissionsGroupType | PermissionsType
      ) {
        const permissions = (record as PermissionsType).permissions
        const children = (record as PermissionsGroupType).children

        return !isListQueryLoader ? (
          <Checkbox
            value={`${record.key}_${column.key}`}
            checked={
              permissions?.[column.key] ??
              !!children?.find((item) => item.permissions?.[column.key])
            }
            disabled={column.isDisabled}
            onClick={(e) => e.stopPropagation()}
            onChange={(e: CheckboxChangeEvent) => {
              const children = (record as PermissionsGroupType).children
              setIsShowPermissionChanges(true)
              setPermissionChangeModule({
                record,
                columnKey: column.key,
                checked: e.target.checked,
                tooltipMessage:
                  record.key === '0' || record.key === 'custom_report'
                    ? [
                        t(
                          'reportPermissionTable.applyChanges.reviewChanges.customReportMessage'
                        ),
                      ]
                    : record.tooltipMessage
                    ? [record.tooltipMessage]
                    : children && children?.length > 0
                    ? children.map((thread) =>
                        thread.tooltipMessage ? thread.tooltipMessage : ''
                      )
                    : [],
              })
            }}
          />
        ) : (
          <Skeleton paragraph={false} round active />
        )
      },
    })),
  ]

  const onCancelApplyChanges = () => {
    setIsShowPermissionChanges(false)
    setPermissionChangeModule(undefined)
  }

  const onApplyChanges = () => {
    if (permissionChangeModule?.record && permissionChangeModule?.columnKey) {
      const { record, checked, columnKey } = permissionChangeModule
      onUpdatePermission?.(record, columnKey, checked)
      onCancelApplyChanges()
    }
  }

  return (
    <div className={styles.tableWrapper}>
      <h3 className={styles.tableWrapperTitle}>{title}</h3>
      <div className={styles.tableWrapperSubtitle}>
        <p>{subtitle}</p>
      </div>

      <AntTable
        className={styles.permissionTable}
        dataSource={dataSource}
        columns={columns}
        defaultExpandAllRows={isDefaultExpanded}
        expandRowByClick
        scroll={{ x: 'max-content' }}
        expandIcon={({ expanded, record }) =>
          record.children ? (
            <DownOutlined
              className={classNames(
                styles.expandIcon,
                expanded && styles.expanded
              )}
            />
          ) : (
            <span className={styles.expandIconPlaceholder} />
          )
        }
        onExpand={(expanded, record) => {
          if (record.children) {
            setExpandedRecord(expanded ? record : null)
          }
        }}
        onRow={({ key }): HTMLAttributes<HTMLElement> =>
          expandedRecord
            ? expandedRecord.key === key
              ? { className: styles.expandedRow }
              : expandedRecord.children?.find((item) => item.key === key)
              ? {
                  className: styles.expandedRowChild,
                }
              : {}
            : {}
        }
        pagination={false}
        {...props}
      />
      <BasicModal
        title={t('reportPermissionTable.applyChanges.modalTitle')}
        visible={isShowPermissionChanges}
        className={styles.applyChangesModal}
        onCancel={() => {
          onCancelApplyChanges()
        }}
      >
        <h4>{t('reportPermissionTable.applyChanges.modalDesc')}</h4>
        <div className={styles.reviewWrapper}>
          <h4>{t('reportPermissionTable.applyChanges.reviewChanges')}</h4>
          <div className={styles.permissionDescWrapper}>
            {permissionChangeModule?.tooltipMessage &&
              permissionChangeModule.tooltipMessage
                .slice(
                  0,
                  isShowMore
                    ? permissionChangeModule.tooltipMessage.length
                    : showLimit
                )
                .map((message, idx) => {
                  return (
                    <div key={idx} className={styles.permissionDesc}>
                      {permissionChangeModule?.checked ? (
                        <PlusOutlined className={styles.plusIcon} />
                      ) : (
                        <MinusOutlined className={styles.minusIcon} />
                      )}
                      <div className={styles.desc}>{message}</div>
                    </div>
                  )
                })}
          </div>
          {permissionChangeModule?.tooltipMessage &&
            permissionChangeModule.tooltipMessage.length > showLimit && (
              <div className={styles.permissionDescButton}>
                {isShowMore ? (
                  <Button onClick={() => setIsShowMore(false)}>
                    {t(
                      'reportPermissionTable.applyChanges.reviewChanges.showLess'
                    )}
                  </Button>
                ) : (
                  <Button onClick={() => setIsShowMore(true)}>
                    {t(
                      'reportPermissionTable.applyChanges.reviewChanges.showMore'
                    )}
                  </Button>
                )}
              </div>
            )}
        </div>
        <div className={styles.applyBtn}>
          <Button
            size={'large'}
            className={styles.cancelBtn}
            onClick={() => {
              !isListQueryLoader && onCancelApplyChanges()
            }}
          >
            {t('reportPermissionTable.applyChanges.cancel')}
          </Button>
          <Button size={'large'} type={'primary'} onClick={onApplyChanges}>
            {t('reportPermissionTable.applyChanges.applyChangesBtn')}
          </Button>
        </div>
      </BasicModal>
      <BasicModal
        title={t('reportPermissionTable.deleteModal.title')}
        visible={deleteVisible}
        onCancel={() => setDeleteVisible(false)}
        centered={true}
      >
        <div className={styles.deleteModal}>
          <h4>{t('reportPermissionTable.deleteModal.description')}</h4>
          <div className={styles.okBtn}>
            <Button
              size={'large'}
              type={'primary'}
              onClick={() => setDeleteVisible(false)}
            >
              {t('reportPermissionTable.deleteModal.okBtnText')}
            </Button>
          </div>
        </div>
      </BasicModal>
    </div>
  )
}

export default ReportsPermissionTable
