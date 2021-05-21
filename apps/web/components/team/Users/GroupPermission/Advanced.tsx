import React, { useState, FC, useEffect } from 'react'
import {
  PermissionColumnType,
  PermissionsGroupType,
  PermissionsType,
  ReportsPermissionTable,
  ReportsPermissionTableProps,
} from '@pabau/ui'
import { useTranslation } from 'react-i18next'
import { useData } from '../../../../mocks/Users'

interface AdvancedProps {
  columns: PermissionColumnType[]
  userGroupData: any
  isListQueryLoader?: boolean
}

const Advanced: FC<AdvancedProps> = ({
  columns,
  userGroupData,
  isListQueryLoader,
}) => {
  const { t } = useTranslation('common')
  const { advancedTabData, loaderDatasource, loaderColumns } = useData(t)
  const [advancedData, setAdvancedData] = useState<ReportsPermissionTableProps>(
    advancedTabData
  )

  useEffect(() => {
    if (columns.length > 0 && userGroupData.length > 0) {
      for (const group of userGroupData) {
        if (group.GroupPermission.length > 0) {
          setNewPermission(group.group_name)
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columns])

  const handleChange = (
    record: PermissionsGroupType | PermissionsType,
    columnKey: string,
    checked: boolean
  ) => {
    const permissions = (record as PermissionsType).permissions
    const children = (record as PermissionsGroupType).children
    if (children) {
      children.map((item) => (item.permissions[columnKey] = checked))
    } else {
      permissions[columnKey] = checked
    }
  }

  const setNewPermission = (key: string) => {
    const newAdvancedData: PermissionsGroupType[] = advancedData.dataSource.map(
      (thread) => {
        if (thread?.children?.length > 0) {
          thread.children.map((children) => {
            children.permissions[key] = false
            return children
          })
        } else if (thread?.permissions) {
          thread.permissions[key] = false
        }
        return thread
      }
    )
    setAdvancedData({ ...advancedData, dataSource: newAdvancedData })
  }

  return (
    <ReportsPermissionTable
      tableColumnName={t('team.user.advanced.tableColumnName')}
      pageTitle={t('team.user.advanced.pageTitle')}
      subTitle={t('team.user.advanced.subTitle')}
      dataSource={
        isListQueryLoader ? loaderDatasource : advancedData.dataSource
      }
      columns={isListQueryLoader ? loaderColumns : columns}
      onUpdatePermission={(record, columnKey, checked) => {
        handleChange(record, columnKey, checked)
      }}
      isDefaultExpanded={true}
      isListQueryLoader={isListQueryLoader}
    />
  )
}

export default Advanced
