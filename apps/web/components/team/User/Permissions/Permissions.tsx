import React, { FC, useState } from 'react'
import { useMedia } from 'react-use'

import {
  Button,
  PermissionFieldType,
  TabMenu,
  FeaturePermissionProps,
  Notification,
  NotificationType,
} from '@pabau/ui'
import Modules from './Modules'
import Feature from './Feature'
import Reports from './Reports'
import styles from '../UserDetail.module.less'
import { userDetail } from '../../../../mocks/UserDetail'
import { useTranslation } from 'react-i18next'

const Permissions: FC = () => {
  const isMobile = useMedia('(max-width: 767px)', false)
  const { t } = useTranslation('common')
  const { PermissionFields, feature, reportPermissionsKeys } = userDetail(t)
  const [moduleData, setModuleData] = useState<PermissionFieldType[]>(
    PermissionFields
  )
  const [featureData, setFeatureData] = useState<FeaturePermissionProps[]>(
    feature
  )
  const [reportPermission, setReportPermission] = useState<string[]>(
    reportPermissionsKeys
  )

  const handleSaveChanges = () => {
    Notification(NotificationType.success, 'Success! Saved changes.')
  }

  const handleModuleChanges = (moduleData: PermissionFieldType[]) => {
    setModuleData(moduleData)
  }

  const handleFeatureChanges = (moduleData: FeaturePermissionProps[]) => {
    setFeatureData(moduleData)
  }

  const handleReportsSaveChanges = (reportPermissionKey: string[]) => {
    setReportPermission(reportPermissionKey)
  }
  return (
    <div className={styles.permissionTabWrapper}>
      <div className={styles.permissionHead}>
        <h4>Permissions</h4>
        <Button
          size={'large'}
          htmlType={'submit'}
          className={styles.saveBtn}
          onClick={handleSaveChanges}
        >
          Save changes
        </Button>
      </div>
      <TabMenu
        className={styles.tabSetPermission}
        tabPosition={'top'}
        menuItems={['Modules', 'Features', 'Reports']}
      >
        <Modules
          handleModuleSaveChanges={handleModuleChanges}
          PermissionFields={moduleData}
        />
        <Feature
          handleFeatureSaveChanges={handleFeatureChanges}
          FeatureFields={featureData}
        />
        <Reports
          ReportsPermissionKeys={reportPermission}
          handleReportsSaveChanges={handleReportsSaveChanges}
        />
      </TabMenu>
      {isMobile && (
        <div className={styles.permissionMobileBtn}>
          <Button
            size={'large'}
            htmlType={'submit'}
            className={styles.saveBtn}
            onClick={handleSaveChanges}
          >
            Save changes
          </Button>
        </div>
      )}
    </div>
  )
}

export default Permissions
