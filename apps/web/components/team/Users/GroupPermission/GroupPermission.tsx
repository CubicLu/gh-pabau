import React, { useState, FC, useEffect } from 'react'
import { useMedia } from 'react-use'
import * as Yup from 'yup'
import { Form, Input } from 'formik-antd'
import { Formik } from 'formik'
import { useTranslation } from 'react-i18next'
import { gql, useMutation } from '@apollo/client'

import {
  TabMenu,
  BasicModal,
  Button,
  PermissionColumnType,
  useLiveQuery,
  Notification,
  NotificationType,
  ReportsPermissionTableProps,
} from '@pabau/ui'
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

const LIST_USER_GROUP = gql`
  query {
    userGroups {
      id
      company_id
      group_name
      group_description
      GroupPermission {
        group_id
        feature_permissions
        module_permissions
        report_permissions
      }
      UserGroupMember {
        group_id
        User {
          id
          full_name
          image
        }
      }
    }
  }
`

const LIST_PAGES = gql`
  query {
    pages {
      id
      name
    }
  }
`

const LIST_REPORTS = gql`
  query {
    reports(orderBy: { name: asc }) {
      id
      name
      report_code
      company_id
    }
  }
`

const NEW_GROUP_MUTATION = gql`
  mutation createUserGroup($name: String!, $description: String!) {
    createOneUserGroup(
      data: {
        group_name: $name
        group_description: $description
        Company: {}
        restrict_clients: 0
        restrict_locations: ""
        restrict_calendar: 0
        restrict_data: 0
        limit_contacts: 0
      }
    ) {
      id
    }
  }
`

export const GroupPermission: FC<GroupPermissionProps> = ({
  isNewGroupValue,
  onNewGroupCancel,
  setTabValue,
}) => {
  const { t } = useTranslation('common')
  const isMobile = useMedia('(max-width: 767px)', false)

  const { data, loading } = useLiveQuery(LIST_USER_GROUP)

  const { data: listPages, loading: listPagesLoader } = useLiveQuery(LIST_PAGES)
  const { data: reports, loading: listReportLoader } = useLiveQuery(
    LIST_REPORTS
  )
  const { reportsTabData, columns } = useData(t)

  const [column, setColumn] = useState<PermissionColumnType[]>(columns)
  const [isAddGroupLoading, setAddGroupLoading] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const [reportsData, setReportsData] = useState<ReportsPermissionTableProps>(
    reportsTabData
  )

  const [addGroup] = useMutation(NEW_GROUP_MUTATION, {
    onCompleted() {
      Notification(
        NotificationType.success,
        `Success! You have added new group successfully`
      )
      setAddGroupLoading(false)
      onNewGroupCancel()
    },
    onError() {
      Notification(NotificationType.error, `Error! While adding new group`)
      setAddGroupLoading(false)
      onNewGroupCancel()
    },
  })

  useEffect(() => {
    if (reports) {
      const filterReports = reports.filter((thread) => thread.company_id !== 0)
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
          if (thread.key === '8') {
            thread.children = childrenData
          }
          return thread
        })
        setReportsData({ ...reportsData, dataSource: newReports })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reports])

  useEffect(() => {
    let columnData
    if (data?.length > 0) {
      columnData = data.map((group) => {
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
        name: values.name,
        description: values.description,
      },
      optimisticResponse: {},
      refetchQueries: [
        {
          query: LIST_USER_GROUP,
        },
      ],
    })
  }

  return (
    <div className={styles.groupPermissionWrapper}>
      <TabMenu
        menuItems={[
          t('team.user.groupPermission.tabOne'),
          t('team.user.groupPermission.tabTwo'),
          t('team.user.groupPermission.tabThree'),
          t('team.user.groupPermission.tabFour'),
        ]}
        tabPosition={isMobile ? 'top' : 'left'}
        disabledKeys={[3]}
      >
        <Modules
          columns={column}
          userGroupData={data?.length > 0 ? data : []}
          listQuery={LIST_USER_GROUP}
          isListQueryLoader={isLoading}
          setIsListQueryLoading={setIsLoading}
          listPages={listPages}
          listPagesLoader={listPagesLoader}
          reports={reports}
          setTabValue={setTabValue}
          reportsTabData={reportsData}
        />
        <Features
          columns={column}
          userGroupData={data?.length > 0 ? data : []}
          listQuery={LIST_USER_GROUP}
          isListQueryLoader={isLoading}
          setIsListQueryLoading={setIsLoading}
          setTabValue={setTabValue}
        />
        <Reports
          userGroupData={data?.length > 0 ? data : []}
          listQuery={LIST_USER_GROUP}
          isListQueryLoader={isLoading}
          listPages={listPages}
          reports={reports}
          listReportLoader={listReportLoader}
          setIsListQueryLoading={setIsLoading}
          setTabValue={setTabValue}
          reportsTabData={reportsData}
        />
        <Advanced
          userGroupData={data?.length > 0 ? data : []}
          columns={column}
          isListQueryLoader={isLoading}
        />
      </TabMenu>
      <BasicModal
        title={t('team.user.groupPermission.addGroupTitle')}
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
            name: Yup.string().required('Name is required'),
            description: Yup.string().required('Description is required'),
          })}
          onSubmit={async (values: GroupType, { resetForm }) => {
            await onAddGroup(values)
            resetForm()
          }}
          render={({ handleSubmit }) => (
            <Form layout="vertical">
              <Form.Item
                label={t('team.user.groupPermission.inputName')}
                name={'name'}
              >
                <Input name={'name'} />
              </Form.Item>
              <Form.Item
                label={t('team.user.groupPermission.inputDesc')}
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
                  {t('team.user.groupPermission.addGroupBtnText')}
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
