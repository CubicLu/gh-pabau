import React, { useState, FC, useEffect } from 'react'
import { useMedia } from 'react-use'
import * as Yup from 'yup'
import { Form, Input } from 'formik-antd'
import { Formik } from 'formik'
import { useTranslation } from 'react-i18next'

import {
  TabMenu,
  BasicModal,
  Button,
  PermissionColumnType,
  Notification,
  NotificationType,
  ReportsPermissionTableProps,
} from '@pabau/ui'
import {
  FindManyUserGroupsDocument,
  useFindManyUserGroupsQuery,
  useFindManyPagesQuery,
  useFindManyReportsQuery,
  useCreateOneUserGroupMutation,
} from '@pabau/graphql'
import Features from './Features'
import Reports from './Reports'
import Modules from './Modules'
import Advanced from './Advanced'
import styles from './GroupPermission.module.less'
import { useData } from '../../../../mocks/Users'

interface GroupType {
  name: string
  description: string
}

interface GroupPermissionProps {
  isNewGroupValue?: boolean
  onNewGroupCancel: () => void
  setTabValue: React.Dispatch<React.SetStateAction<string | number>>
}

export const GroupPermission: FC<GroupPermissionProps> = ({
  isNewGroupValue,
  onNewGroupCancel,
  setTabValue,
}) => {
  const { t } = useTranslation('common')
  const isMobile = useMedia('(max-width: 767px)', false)

  const { data, loading } = useFindManyUserGroupsQuery()

  const { data: listPages, loading: listPagesLoader } = useFindManyPagesQuery()
  const {
    data: reportsList,
    loading: listReportLoader,
  } = useFindManyReportsQuery()
  const { reportsTabData, columns } = useData(t)

  const [column, setColumn] = useState<PermissionColumnType[]>(columns)
  const [isAddGroupLoading, setAddGroupLoading] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const [reportsData, setReportsData] = useState<ReportsPermissionTableProps>(
    reportsTabData
  )

  const [addGroup] = useCreateOneUserGroupMutation({
    onCompleted() {
      Notification(
        NotificationType.success,
        t('team.user.group.permission.success')
      )
      setAddGroupLoading(false)
      onNewGroupCancel()
    },
    onError() {
      Notification(
        NotificationType.error,
        t('team.user.group.permission.error')
      )
      setAddGroupLoading(false)
      onNewGroupCancel()
    },
  })

  useEffect(() => {
    if (reportsList?.reports) {
      const filterReports = reportsList.reports.filter(
        (thread) => thread.company_id !== 0
      )
      if (filterReports.length > 0) {
        const childrenData = filterReports.map((thread) => {
          return {
            key: '0',
            name: thread.name,
            permissions: {
              owner: true,
            },
          }
        })

        const newReports = reportsData.dataSource.map((thread) => {
          if (thread.key === 'custom_report') {
            thread.children = childrenData
          }
          return thread
        })
        setReportsData({ ...reportsData, dataSource: newReports })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reportsList])

  useEffect(() => {
    let columnData
    if (data?.userGroups) {
      columnData = data.userGroups.map((group) => {
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
      setColumn(columnData)
    }
    if (!loading) {
      setIsLoading(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  const onAddGroup = async (values: GroupType) => {
    setAddGroupLoading(true)
    await addGroup({
      variables: {
        data: {
          group_name: values.name,
          group_description: values.description,
          Company: {},
          restrict_clients: 0,
          restrict_locations: '',
          restrict_data: 0,
          limit_contacts: 0,
        },
      },
      refetchQueries: [
        {
          query: FindManyUserGroupsDocument,
        },
      ],
    })
  }

  return (
    <div className={styles.groupPermissionWrapper}>
      <TabMenu
        menuItems={[
          t('team.user.group.permission.tab.modules'),
          t('team.user.group.permission.tab.features'),
          t('team.user.group.permission.tab.reports'),
          t('team.user.group.permission.tab.advanced'),
        ]}
        tabPosition={isMobile ? 'top' : 'left'}
        disabledKeys={[3]}
      >
        <Modules
          columns={column}
          userGroupData={data?.userGroups.length > 0 ? data.userGroups : []}
          listQuery={FindManyUserGroupsDocument}
          isListQueryLoader={isLoading}
          setIsListQueryLoading={setIsLoading}
          listPages={listPages?.pages}
          listPagesLoader={listPagesLoader}
          reports={reportsList?.reports}
          setTabValue={setTabValue}
          reportsTabData={reportsData}
        />
        <Features
          columns={column}
          userGroupData={data?.userGroups.length > 0 ? data.userGroups : []}
          listQuery={FindManyUserGroupsDocument}
          isListQueryLoader={isLoading}
          setIsListQueryLoading={setIsLoading}
          setTabValue={setTabValue}
        />
        <Reports
          userGroupData={data?.userGroups.length > 0 ? data.userGroups : []}
          listQuery={FindManyUserGroupsDocument}
          isListQueryLoader={isLoading}
          listPages={listPages?.pages}
          reports={reportsList?.reports}
          listReportLoader={listReportLoader}
          setIsListQueryLoading={setIsLoading}
          setTabValue={setTabValue}
          reportsTabData={reportsData}
        />
        <Advanced
          userGroupData={data?.userGroups.length > 0 ? data.userGroups : []}
          columns={column}
          isListQueryLoader={isLoading}
        />
      </TabMenu>
      <BasicModal
        title={t('team.user.group.permission.add.groupT.title')}
        visible={isNewGroupValue}
        className={styles.groupAddModal}
        onCancel={onNewGroupCancel}
      >
        <Formik
          enableReinitialize={true}
          initialValues={{
            name: '',
            description: '',
          }}
          validationSchema={Yup.object({
            name: Yup.string().required(
              t('team.user.group.permission.name.required')
            ),
            description: Yup.string().required(
              t('team.user.group.permission.description.required')
            ),
          })}
          onSubmit={async (values: GroupType, { resetForm }) => {
            await onAddGroup(values)
            resetForm()
          }}
          render={({ handleSubmit }) => (
            <Form layout="vertical">
              <Form.Item
                label={t('team.user.group.permission.input.name')}
                name={'name'}
              >
                <Input name={'name'} />
              </Form.Item>
              <Form.Item
                label={t('team.user.group.permission.input.desc')}
                name={'description'}
              >
                <Input.TextArea rows={3} name={'description'} />
              </Form.Item>
              <div className={styles.btnAdd}>
                <Button
                  htmlType={'submit'}
                  type={'primary'}
                  size={'large'}
                  loading={isAddGroupLoading}
                  onClick={() => handleSubmit}
                >
                  {t('team.user.group.permission.add.group.btntext')}
                </Button>
              </div>
            </Form>
          )}
        />
      </BasicModal>
    </div>
  )
}

export default GroupPermission
