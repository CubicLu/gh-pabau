import React, { FC, useState } from 'react'
import { ReportsPermissions } from '@pabau/ui'
import { reportsPermission } from '../../../../mocks/UserDetail'

interface ReportsProps {
  handleReportsSaveChanges: (reportPermissionKey: string[]) => void
  ReportsPermissionKeys: string[]
}

const Reports: FC<ReportsProps> = ({
  handleReportsSaveChanges,
  ReportsPermissionKeys,
}) => {
  const [permission, setPermission] = useState<string[]>(ReportsPermissionKeys)

  const handleChange = (permissionKeys: string[]) => {
    setPermission([...permissionKeys])
    handleReportsSaveChanges([...permissionKeys])
  }

  return (
    <ReportsPermissions
      data={reportsPermission}
      permissions={permission}
      pageTitle={'Report permissions'}
      subTitle={'Choose what reports Joseph Howard can view'}
      onChange={handleChange}
    />
  )
}

export default Reports
