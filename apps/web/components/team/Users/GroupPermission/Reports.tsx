import React, { FC, useEffect, useState } from 'react'
import { DocumentNode } from '@apollo/client'
import { useTranslation } from 'react-i18next'

import {
  ReportsPermissionTable,
  PermissionColumnType,
  ReportsPermissionTableProps,
  PermissionsGroupType,
  PermissionsType,
  Notification,
  NotificationType,
} from '@pabau/ui'
import { useUpdateReportPermissionMutation } from '@pabau/graphql'
import { useData } from '../../../../mocks/Users'

interface ReportsProps {
  userGroupData: any
  listQuery: DocumentNode
  isListQueryLoader: boolean
  listPages: any
  reports: any
  listReportLoader: boolean
  setIsListQueryLoading?: React.Dispatch<React.SetStateAction<boolean>>
  setTabValue: React.Dispatch<React.SetStateAction<string | number>>
  reportsTabData: ReportsPermissionTableProps
}

const Reports: FC<ReportsProps> = ({
  userGroupData,
  listQuery,
  isListQueryLoader,
  listPages,
  reports,
  listReportLoader,
  setIsListQueryLoading,
  setTabValue,
  reportsTabData,
}) => {
  const { t } = useTranslation('common')
  const { columns, loaderDatasource, loaderColumns } = useData(t)

  const [reportsData, setReportsData] =
    useState<ReportsPermissionTableProps>(reportsTabData)
  const [reportColumn, setReportColumn] =
    useState<PermissionColumnType[]>(columns)

  const [editUserReportsMutation] = useUpdateReportPermissionMutation({
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
    let columnData
    if (userGroupData?.length > 0) {
      columnData = userGroupData.map((group) => {
        return {
          key: group.group_name,
          title: group.group_name,
          staffMember:
            group.UserGroupMember.length > 0
              ? group.UserGroupMember.map((thread) => thread.User.full_name)
              : [],
        }
      })
      columnData.push(columns[0])
      setReportColumn([...columnData])
    }

    if (columnData?.length > 1 && userGroupData.length > 0 && reports) {
      let moduleReports
      if (listPages?.length > 0) {
        moduleReports = listPages.find((thread) => thread.name === 'Reports')
      }
      for (const group of userGroupData) {
        if (group.GroupPermission.length > 0) {
          setNewPermission(
            group.group_name,
            columnData,
            group.GroupPermission[0].report_permissions,
            group.GroupPermission[0].module_permissions,
            moduleReports.id
          )
        } else {
          setNewPermission(
            group.group_name,
            columnData,
            '',
            '',
            moduleReports.id
          )
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userGroupData, reports])

  const setNewPermission = (
    key: string,
    columnData,
    report_permissions?: string,
    module_permission?: string,
    module_report?: string
  ) => {
    if (key !== 'owner') {
      let reportId = []
      let modulePages = []
      if (report_permissions) {
        reportId = JSON.parse(report_permissions)
      }
      if (module_permission) {
        modulePages = JSON.parse(module_permission)
      }

      const newColumns = []
      for (const [index, col] of columnData.entries()) {
        newColumns.push(col)
        if (newColumns[index].key === key) {
          newColumns[index].isDisabled = !modulePages.includes(
            module_report.toString()
          )
        }
      }

      const newReportsData = reportsData.dataSource.map((thread) => {
        if (thread?.children?.length > 0) {
          thread.children.map((children) => {
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

            children.permissions[key] = reportId.includes(
              matchReport?.id.toString()
            )
            return children
          })
        }
        return thread
      })

      setReportColumn(newColumns)
      setReportsData({ ...reportsData, dataSource: newReportsData })
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
    const newReportPermission = []
    if (permissions) {
      const matchReport = getMatchReport(record)
      if (matchReport) {
        newReportPermission.push(matchReport.id)
      }
    } else if (children && children.length > 0) {
      for (const thread of children) {
        const matchReport = getMatchReport(thread)
        if (matchReport) {
          newReportPermission.push(matchReport.id)
        }
      }
    }
    const variables = {
      group_id: groupData.id,
      report_permission: newReportPermission.join(','),
      checked: checked,
    }

    await editUserReportsMutation({
      variables: variables,
      optimisticResponse: {},
      refetchQueries: [
        {
          query: listQuery,
        },
      ],
    })
  }

  const getMatchReport = (record) => {
    let matchReport
    if (record.key === '0') {
      matchReport = reports.find((report) => report.name === record.name)
    } else {
      matchReport = reports.find((report) => report.report_code === record.key)
    }
    return matchReport
  }

  return (
    <ReportsPermissionTable
      tableColumnName={t('team.user.reports.table.column.name')}
      pageTitle={t('team.user.reports.page.title')}
      subTitle={t('team.user.reports.sub.title')}
      dataSource={isListQueryLoader ? loaderDatasource : reportsData.dataSource}
      columns={isListQueryLoader ? loaderColumns : reportColumn}
      onUpdatePermission={(record, columnKey, checked) => {
        handleChange(record, columnKey, checked)
      }}
      isListQueryLoader={isListQueryLoader || listReportLoader}
      setTabValue={setTabValue}
    />
  )
}

export default Reports
