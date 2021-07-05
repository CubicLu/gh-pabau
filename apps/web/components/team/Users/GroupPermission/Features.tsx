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
import {
  useUpdateManyUserMutation,
  useUpdateManyInvBillerMutation,
  useUpdateStaffMetaFeaturePermissionMutation,
  useUpdateDeleteAlertsFeaturePermissionMutation,
  useUpdateFeatureGroupPermissionMutation,
} from '@pabau/graphql'

import { useData } from '../../../../mocks/Users'

interface FeatureProps {
  columns: PermissionColumnType[]
  userGroupData: any
  listQuery: DocumentNode
  isListQueryLoader: boolean
  setIsListQueryLoading?: React.Dispatch<React.SetStateAction<boolean>>
  setTabValue: React.Dispatch<React.SetStateAction<string | number>>
}

const Features: FC<FeatureProps> = ({
  columns,
  userGroupData,
  listQuery,
  isListQueryLoader,
  setIsListQueryLoading,
  setTabValue,
}) => {
  const { t } = useTranslation('common')
  const {
    featureTabData,
    staff_meta_keys,
    field_type_number,
    loaderDatasource,
    loaderColumns,
    invert_fields,
  } = useData(t)

  const [featuresData, setFeaturesData] = useState<ReportsPermissionTableProps>(
    featureTabData
  )

  const [editMutation] = useUpdateManyUserMutation({
    onError() {
      Notification(
        NotificationType.error,
        t('team.user.update.group.permission.error')
      )
      setIsListQueryLoading(false)
    },
  })

  const [editInvBillerMutation] = useUpdateManyInvBillerMutation({
    onError() {
      Notification(
        NotificationType.error,
        t('team.user.update.group.permission.error')
      )
      setIsListQueryLoading(false)
    },
  })

  const [editStaffMetaMutation] = useUpdateStaffMetaFeaturePermissionMutation({
    onError() {
      Notification(
        NotificationType.error,
        t('team.user.update.group.permission.error')
      )
      setIsListQueryLoading(false)
    },
  })

  const [
    editAlertNotesMutation,
  ] = useUpdateDeleteAlertsFeaturePermissionMutation({
    onError() {
      Notification(
        NotificationType.error,
        t('team.user.update.group.permission.error')
      )
      setIsListQueryLoading(false)
    },
  })

  const [updateGroupPermission] = useUpdateFeatureGroupPermissionMutation({
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
    if (columns.length > 0 && userGroupData.length > 0) {
      for (const group of userGroupData) {
        if (
          group.GroupPermission.length > 0 &&
          group.GroupPermission[0].feature_permissions
        ) {
          setNewPermission(
            group.group_name,
            JSON.parse(group.GroupPermission[0].feature_permissions)
          )
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columns])

  const setNewPermission = (key: string, feature_permissions?: any) => {
    if (key !== 'owner') {
      const newFeatureData = featuresData.dataSource.map((thread) => {
        if (thread?.children?.length > 0) {
          thread.children.map((children) => {
            const fieldData = feature_permissions.field.find(
              (field) => field.key === children.key
            )

            if (fieldData) {
              children.permissions[key] = invert_fields.includes(fieldData.key)
                ? !fieldData.value
                : fieldData.value
            } else {
              children.permissions[key] = false
            }

            return children
          })
        }
        return thread
      })
      setFeaturesData({ ...featuresData, dataSource: newFeatureData })
    }
  }

  const handleChange = async (
    record: PermissionsGroupType | PermissionsType,
    columnKey: string,
    checked: boolean
  ) => {
    if (userGroupData.length > 0) {
      setIsListQueryLoading(true)
      const permissions = (record as PermissionsType).permissions
      const children = (record as PermissionsGroupType).children

      const groupData = userGroupData.find(
        (thread) => thread.group_name === columnKey
      )

      let newFeaturePermission = {
        field: [],
      }
      let userKeyValues = {}
      let invBillerKeyValues = {}
      let staffMetaKeyValues = []
      let deleteAlertNotesKeyVales = {}
      if (permissions) {
        const values = setFeaturePermission(
          record.key,
          checked,
          newFeaturePermission,
          userKeyValues,
          invBillerKeyValues,
          staffMetaKeyValues,
          deleteAlertNotesKeyVales
        )
        newFeaturePermission = values.newFeaturePermission
        userKeyValues = values.userKeyValues
        invBillerKeyValues = values.invBillerKeyValues
        deleteAlertNotesKeyVales = values.deleteAlertNotesKeyVales
        staffMetaKeyValues = values.staffMetaKeyValues
      } else if (children && children.length > 0) {
        for (const thread of children) {
          const values = setFeaturePermission(
            thread.key,
            checked,
            newFeaturePermission,
            userKeyValues,
            invBillerKeyValues,
            staffMetaKeyValues,
            deleteAlertNotesKeyVales
          )
          newFeaturePermission = values.newFeaturePermission
          userKeyValues = values.userKeyValues
          invBillerKeyValues = values.invBillerKeyValues
          deleteAlertNotesKeyVales = values.deleteAlertNotesKeyVales
          staffMetaKeyValues = values.staffMetaKeyValues
        }
      }

      const mutationArray = []
      if (groupData.UserGroupMember.length > 0) {
        if (Object.keys(userKeyValues).length > 0) {
          mutationArray.push('user')
        }
        if (Object.keys(invBillerKeyValues).length > 0) {
          mutationArray.push('invBiller')
        }
        if (staffMetaKeyValues.length > 0) {
          mutationArray.push('staffMeta')
        }
        if (Object.keys(deleteAlertNotesKeyVales).length > 0) {
          mutationArray.push('deleteAlerts')
        }

        const mutations = []
        for (const key of mutationArray) {
          if (key === 'user') {
            mutations.push(
              editMutation({
                variables: {
                  where: {
                    UserGroupMember: { group_id: { equals: groupData.id } },
                    company: {},
                  },
                  data: {
                    ...userKeyValues,
                  },
                },
              })
            )
          } else if (key === 'invBiller') {
            mutations.push(
              editInvBillerMutation({
                variables: {
                  where: {
                    User: {
                      UserGroupMember: { group_id: { equals: groupData.id } },
                    },
                    Company: {},
                  },
                  data: {
                    ...invBillerKeyValues,
                  },
                },
              })
            )
          } else if (key === 'staffMeta') {
            const staffMetaVariables = {
              groupId: groupData.id,
              staff_meta: staffMetaKeyValues,
            }
            mutations.push(
              editStaffMetaMutation({
                variables: staffMetaVariables,
              })
            )
          } else if (key === 'deleteAlerts') {
            const variables = {
              groupId: groupData.id,
              delete_alert_notes:
                deleteAlertNotesKeyVales['delete_alert_notes'],
            }
            mutations.push(
              editAlertNotesMutation({
                variables: variables,
              })
            )
          }
        }
        const results = await Promise.all(mutations)

        let isUpdateGroup = true
        for (const result of results) {
          if (!result) {
            isUpdateGroup = false
            break
          } else if (result && !result.data) {
            isUpdateGroup = false
            break
          }
        }

        if (isUpdateGroup) {
          await updateGroupPermission({
            variables: {
              groupId: groupData.id,
              feature_permissions: JSON.stringify(newFeaturePermission),
            },
            optimisticResponse: {},
            refetchQueries: [
              {
                query: listQuery,
              },
            ],
          })
        }
      } else {
        await updateGroupPermission({
          variables: {
            groupId: groupData.id,
            feature_permissions: JSON.stringify(newFeaturePermission),
          },
          optimisticResponse: {},
          refetchQueries: [
            {
              query: listQuery,
            },
          ],
        })
      }
    }
  }

  const setFeaturePermission = (
    key: string,
    checked: boolean,
    newFeaturePermission,
    userKeyValues,
    invBillerKeyValues,
    staffMetaKeyValues,
    deleteAlertNotesKeyVales
  ) => {
    const checkedValue = invert_fields.includes(key) ? !checked : checked
    if (key === 'InvBiller') {
      newFeaturePermission.field.push({
        modal: 'InvBiller',
        key: key,
        value: checkedValue,
      })
      invBillerKeyValues['is_disabled'] = { set: checkedValue }
    } else if (staff_meta_keys.includes(key)) {
      newFeaturePermission.field.push({
        modal: 'StaffMeta',
        key: key,
        value: checkedValue,
      })
      staffMetaKeyValues.push({
        meta_name: key,
        meta_value: checkedValue,
      })
    } else if (key === 'delete_alert_notes') {
      newFeaturePermission.field.push({
        modal: 'UserMainPermission',
        key: key,
        value: checked,
      })
      deleteAlertNotesKeyVales[key] = checked
    } else {
      newFeaturePermission.field.push({
        modal: 'User',
        key: key,
        value: checkedValue,
      })
      userKeyValues[key] = {
        set: field_type_number.includes(key)
          ? checkedValue
            ? 1
            : 0
          : checkedValue,
      }
    }

    return {
      newFeaturePermission,
      userKeyValues,
      invBillerKeyValues,
      staffMetaKeyValues,
      deleteAlertNotesKeyVales,
    }
  }

  return (
    <ReportsPermissionTable
      isListQueryLoader={isListQueryLoader}
      tableColumnName={t('team.user.feature.table.column.name')}
      pageTitle={t('team.user.feature.page.title')}
      subTitle={t('team.user.feature.sub.title')}
      dataSource={
        isListQueryLoader ? loaderDatasource : featuresData.dataSource
      }
      columns={isListQueryLoader ? loaderColumns : columns}
      onUpdatePermission={async (record, columnKey, checked) => {
        await handleChange(record, columnKey, checked)
      }}
      setTabValue={setTabValue}
    />
  )
}

export default Features
