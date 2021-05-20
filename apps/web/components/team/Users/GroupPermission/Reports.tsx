import React, { FC, useEffect, useState } from 'react'
import { DocumentNode, gql, useMutation } from '@apollo/client'
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

const EDIT_USER_REPORTS = gql`
  mutation update(
    $group_id: Int!
    $report_permission: String!
    $checked: Boolean! = false
  ) {
    upsertManyUsersReportsByGroupId(
      report_ids: $report_permission
      group_id: $group_id
      checked: $checked
    )
  }
`

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

  const [reportsData, setReportsData] = useState<ReportsPermissionTableProps>(
    reportsTabData
  )
  const [isLoading, setIsLoading] = useState(false)
  const [reportColumn, setReportColumn] = useState<PermissionColumnType[]>(
    columns
  )

  const [editUserReportsMutation] = useMutation(EDIT_USER_REPORTS, {
    onCompleted() {
      Notification(
        NotificationType.success,
        t('team.user.updateGroupPermissionSuccess.message')
      )
      setIsLoading(false)
      setIsListQueryLoading(true)
    },
    onError() {
      Notification(
        NotificationType.error,
        t('team.user.updateGroupPermissionError.message')
      )
      setIsLoading(false)
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
      const reportId = report_permissions.split(',')
      const modulePages = module_permission.split(',')

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
    setIsLoading(true)
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
      tableColumnName={t('team.user.reports.tableColumnName')}
      pageTitle={t('team.user.reports.pageTitle')}
      subTitle={t('team.user.reports.subTitle')}
      dataSource={isListQueryLoader ? loaderDatasource : reportsData.dataSource}
      columns={isListQueryLoader ? loaderColumns : reportColumn}
      onUpdatePermission={(record, columnKey, checked) => {
        handleChange(record, columnKey, checked)
      }}
      isLoading={isLoading}
      isListQueryLoader={isListQueryLoader || listReportLoader}
      setTabValue={setTabValue}
    />
  )
}

export default Reports
