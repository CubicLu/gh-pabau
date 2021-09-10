import React, { FC, useEffect, useState } from 'react'
import { DocumentNode } from '@apollo/client'
import { useTranslation } from 'react-i18next'

import {
  Notification,
  NotificationType,
  PermissionColumnType,
  PermissionsGroupType,
  PermissionsType,
  ReportsPermissionTable,
  ReportsPermissionTableProps,
} from '@pabau/ui'
import { useUpdateModulePermissionMutation } from '@pabau/graphql'

import { useData } from '../../../../mocks/Users'

interface ModulesProps {
  columns: PermissionColumnType[]
  userGroupData: any
  listQuery: DocumentNode
  isListQueryLoader: boolean
  listPages: any
  listPagesLoader?: boolean
  reports: any
  reportsTabData: ReportsPermissionTableProps
  setIsListQueryLoading?: React.Dispatch<React.SetStateAction<boolean>>
  setTabValue: React.Dispatch<React.SetStateAction<string | number>>
}

const Modules: FC<ModulesProps> = ({
  reports,
  columns,
  userGroupData,
  listQuery,
  isListQueryLoader,
  listPages,
  listPagesLoader,
  setIsListQueryLoading,
  setTabValue,
  reportsTabData,
}) => {
  const { t } = useTranslation('common')
  const { moduleTabData, loaderDatasource, loaderColumns } = useData(t)

  const [moduleData, setModuleData] =
    useState<ReportsPermissionTableProps>(moduleTabData)

  const [editUserPermissionMutation] = useUpdateModulePermissionMutation({
    onCompleted() {
      Notification(
        NotificationType.success,
        t('team.user.update.group.permission.success')
      )
    },
    onError() {
      Notification(
        NotificationType.error,
        t('team.user.update.group.permission.error')
      )
      setIsListQueryLoading(false)
    },
  })

  useEffect(() => {
    if (columns.length > 0 && userGroupData.length > 0 && listPages) {
      for (const group of userGroupData) {
        if (group.GroupPermission.length > 0) {
          setNewPermission(
            group.group_name,
            group.GroupPermission[0].module_permissions
          )
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columns, listPages])

  const setNewPermission = (key: string, module_permissions?: string) => {
    if (key !== 'owner') {
      let pagesId = []
      if (module_permissions) {
        pagesId = JSON.parse(module_permissions)
      }

      const newReportsData = moduleData.dataSource.map((thread) => {
        if (thread?.children?.length > 0) {
          thread.children.map((children) => {
            const matchReport = listPages.find(
              (pages) => pages.name === children.key
            )
            children.permissions[key] = pagesId.includes(
              matchReport?.id.toString()
            )
            return children
          })
        } else {
          const matchReport = listPages.find(
            (pages) => pages.name === thread.key
          )
          thread.permissions[key] = pagesId.includes(matchReport?.id.toString())
        }
        return thread
      })
      setModuleData({ ...moduleData, dataSource: newReportsData })
    }
  }

  const handleChange = async (
    record: PermissionsGroupType | PermissionsType,
    columnKey: string,
    checked: boolean
  ) => {
    setIsListQueryLoading(true)
    const permissions = (record as PermissionsType).permissions
    const children = (record as PermissionsGroupType).children

    const groupData = userGroupData.find(
      (thread) => thread.group_name === columnKey
    )
    const newModulePermission = []
    const reportPermission = []
    if (permissions) {
      if (record.key === 'Reports' && !checked) {
        reportsTabData.dataSource.map((thread) => {
          thread?.children.map((children) => {
            let matchReport
            if (children.key === '0') {
              matchReport = reports.find(
                (report) => report.name === children.name
              )
            } else {
              matchReport = reports.find(
                (report) => report.report_code === children.key
              )
            }
            if (matchReport) {
              reportPermission.push(matchReport.id)
            }
            return children
          })
          return thread
        })
      }

      const matchReport = listPages.find((page) => page.name === record.key)
      if (matchReport) {
        newModulePermission.push(matchReport.id)
      }
    } else if (children && children.length > 0) {
      for (const thread of children) {
        const matchReport = listPages.find((page) => page.name === thread.key)
        if (matchReport) {
          newModulePermission.push(matchReport.id)
        }
      }
    }

    const groupPermissionVariables = {
      groupId: groupData.id,
      module_permission: newModulePermission.join(','),
      report_permission: reportPermission.join(','),
      checked: checked,
    }

    const userPermissionVariables = {
      groupId: groupData.id,
      module_permission: newModulePermission.join(','),
      report_permission: reportPermission.join(','),
      checked: checked,
    }

    if (reportPermission.length === 0) {
      delete groupPermissionVariables.report_permission
      delete userPermissionVariables.report_permission
    }

    await editUserPermissionMutation({
      variables: userPermissionVariables,
      optimisticResponse: {},
      refetchQueries: [
        {
          query: listQuery,
        },
      ],
    })
  }

  return (
    <ReportsPermissionTable
      isListQueryLoader={isListQueryLoader || listPagesLoader}
      tableColumnName={t('team.user.module.table.column.name')}
      pageTitle={t('team.user.module.page.title')}
      subTitle={t('team.user.module.sub.title')}
      dataSource={
        isListQueryLoader || listPagesLoader
          ? loaderDatasource
          : moduleData.dataSource
      }
      columns={isListQueryLoader || listPagesLoader ? loaderColumns : columns}
      onUpdatePermission={(record, columnKey, checked) => {
        handleChange(record, columnKey, checked)
      }}
      setTabValue={setTabValue}
    />
  )
}

export default Modules
