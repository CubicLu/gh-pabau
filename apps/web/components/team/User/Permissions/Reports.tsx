import React, { FC, useState } from 'react'
import { ReportsPermissions } from '@pabau/ui'
import { userDetail } from '../../../../mocks/UserDetail'
import { useTranslation } from 'react-i18next'

interface ReportsProps {
  handleReportsSaveChanges: (reportPermissionKey: string[]) => void
  ReportsPermissionKeys: string[]
}

const Reports: FC<ReportsProps> = ({
  handleReportsSaveChanges,
  ReportsPermissionKeys,
}) => {
  const { t } = useTranslation('common')
  const { reportsPermission } = userDetail(t)
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
