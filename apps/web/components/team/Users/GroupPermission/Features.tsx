import React, { FC, useEffect, useState } from 'react'
import { gql, useMutation, DocumentNode } from '@apollo/client'
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

import { useData } from '../../../../mocks/Users'

interface FeatureProps {
  columns: PermissionColumnType[]
  userGroupData: any
  listQuery: DocumentNode
  isListQueryLoader: boolean
  setIsListQueryLoading?: React.Dispatch<React.SetStateAction<boolean>>
  setTabValue: React.Dispatch<React.SetStateAction<string | number>>
}

const EDIT_USER_GROUP_PERMISSION = gql`
  mutation update_User_permission(
    $groupId: Int!
    $data: UserUpdateManyMutationInput!
  ) {
    updateManyUser(
      where: {
        UserGroupMember: { group_id: { equals: $groupId } }
        company: {}
      }
      data: $data
    ) {
      count
    }
  }
`

const EDIT_INV_BILLER_PERMISSION = gql`
  mutation update_can_sell(
    $groupId: Int!
    $data: InvBillerUpdateManyMutationInput!
  ) {
    updateManyInvBiller(
      where: {
        User: { UserGroupMember: { group_id: { equals: $groupId } } }
        Company: {}
      }
      data: $data
    ) {
      count
    }
  }
`

const EDIT_STAFF_META_PERMISSION = gql`
  mutation($groupId: Int!, $staff_meta: [staffMetaInput]) {
    updateManyStaffMetaFeaturesByGroupId(
      group_id: $groupId
      staff_meta: $staff_meta
    )
  }
`

const EDIT_USER_MAIN_PERMISSION = gql`
  mutation upsertManyUsersMainPermissionByGroupId(
    $groupId: Int!
    $delete_alert_notes: Boolean!
  ) {
    upsertManyUsersMainPermissionByGroupId(
      group_id: $groupId
      delete_alert_notes: $delete_alert_notes
    )
  }
`

const UPDATE_GROUP_PERMISSION = gql`
  mutation update_feature_group_permission(
    $groupId: Int!
    $feature_permissions: String!
  ) {
    upsertGroupPermissionFeatureByGroupId(
      group_id: $groupId
      features_permission: $feature_permissions
    ) {
      count
    }
  }
`

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
  } = useData(t)

  const [featuresData, setFeaturesData] = useState<ReportsPermissionTableProps>(
    featureTabData
  )

  const [isLoading, setIsLoading] = useState(false)

  const [editMutation] = useMutation(EDIT_USER_GROUP_PERMISSION, {
    onError() {
      Notification(
        NotificationType.error,
        t('team.user.updateGroupPermissionError.message')
      )
      setIsLoading(false)
    },
  })

  const [editInvBillerMutation] = useMutation(EDIT_INV_BILLER_PERMISSION, {
    onError() {
      Notification(
        NotificationType.error,
        t('team.user.updateGroupPermissionError.message')
      )
      setIsLoading(false)
    },
  })

  const [editStaffMetaMutation] = useMutation(EDIT_STAFF_META_PERMISSION, {
    onError() {
      Notification(
        NotificationType.error,
        t('team.user.updateGroupPermissionError.message')
      )
      setIsLoading(false)
    },
  })

  const [editAlertNotesMutation] = useMutation(EDIT_USER_MAIN_PERMISSION, {
    onError() {
      Notification(
        NotificationType.error,
        t('team.user.updateGroupPermissionError.message')
      )
      setIsLoading(false)
    },
  })

  const [updateGroupPermission] = useMutation(UPDATE_GROUP_PERMISSION, {
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
            children.permissions[key] = fieldData?.value
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
      setIsLoading(true)
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

        const results = await Promise.all(
          mutationArray.map((key) => {
            if (key === 'user') {
              const userVariables = {
                groupId: groupData.id,
                data: {
                  ...userKeyValues,
                },
              }
              return editMutation({
                variables: userVariables,
                optimisticResponse: {},
              })
            } else if (key === 'invBiller') {
              const invBillerVariables = {
                groupId: groupData.id,
                data: {
                  ...invBillerKeyValues,
                },
              }
              return editInvBillerMutation({
                variables: invBillerVariables,
                optimisticResponse: {},
              })
            } else if (key === 'staffMeta') {
              const staffMetaVariables = {
                groupId: groupData.id,
                staff_meta: staffMetaKeyValues,
              }
              return editStaffMetaMutation({
                variables: staffMetaVariables,
                optimisticResponse: {},
              })
            } else if (key === 'deleteAlerts') {
              const variables = {
                groupId: groupData.id,
                delete_alert_notes:
                  deleteAlertNotesKeyVales['delete_alert_notes'],
              }
              return editAlertNotesMutation({
                variables: variables,
                optimisticResponse: {},
              })
            }
            // eslint-disable-next-line array-callback-return
            return
          })
        )

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
    if (key === 'InvBiller') {
      newFeaturePermission.field.push({
        modal: 'InvBiller',
        key: key,
        value: checked,
      })
      invBillerKeyValues['is_disabled'] = { set: checked }
    } else if (staff_meta_keys.includes(key)) {
      newFeaturePermission.field.push({
        modal: 'StaffMeta',
        key: key,
        value: checked,
      })
      staffMetaKeyValues.push({
        meta_name: key,
        meta_value: checked,
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
        value: checked,
      })
      userKeyValues[key] = {
        set: field_type_number.includes(key) ? (checked ? 1 : 0) : checked,
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
      tableColumnName={t('team.user.feature.tableColumnName')}
      pageTitle={t('team.user.feature.pageTitle')}
      subTitle={t('team.user.feature.subTitle')}
      dataSource={
        isListQueryLoader ? loaderDatasource : featuresData.dataSource
      }
      columns={isListQueryLoader ? loaderColumns : columns}
      onUpdatePermission={async (record, columnKey, checked) => {
        await handleChange(record, columnKey, checked)
      }}
      isLoading={isLoading}
      setTabValue={setTabValue}
    />
  )
}

export default Features
