import { gql, useMutation } from '@apollo/client'
import { Notification, NotificationType, useLiveQuery } from '@pabau/ui'
import { Button, Col, Row } from 'antd'
import { Formik } from 'formik'
import { Form as AntForm, Input, Select } from 'formik-antd'
import { NextPage } from 'next'
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import { UserContext } from '../../context/UserContext'
import { notificationVariables } from '../../mocks/StaffNotifications'
import styles from './staff-notifications.module.less'

enum Users {
  AllAdmins = 'All Admins',
  AllUsers = 'All Users',
}
interface InitialStaffNotifications {
  type: string
  destination_id: string
  users: Users
  loop: number
}

const USER_LIST_QUERY = gql`
  query users($isAdmin: Int = 0, $company: Int) {
    users(
      where: {
        AND: { company_id: { equals: $company }, admin: { equals: $isAdmin } }
      }
    ) {
      id
      admin
      full_name
      username
      company_id
    }
  }
`

const LIST_QUERY = gql`
  query notification_types {
    notification_types {
      type
      id
      notification_type
    }
  }
`

const ADD_MUTATION = gql`
  mutation insert_notifications_one(
    $type: String
    $sent_to: jsonb
    $variables: jsonb
    $destination: String!
    $sent_by: Int # $loop: Int
  ) {
    insert_notifications_one(
      object: {
        type: $type
        destination: $destination
        sent_to: $sent_to
        variables: $variables
        sent_by: $sent_by
        # loop: $loop
      }
    ) {
      id
    }
  }
`

const users = ['All Admins', 'All Users']
const loops = [2, 5, 7]

const initialValues: InitialStaffNotifications = {
  type: '',
  destination_id: '',
  users: Users.AllUsers,
  loop: null,
}

interface LoggedUser {
  user: number
  company: number
  fullName: string
}

export const StaffNotifications: NextPage = () => {
  const { data: notificationTypes } = useLiveQuery(LIST_QUERY)
  const [user, setUser] = useState<LoggedUser>()
  const loggedUser = useContext(UserContext)

  useEffect(() => {
    const me = loggedUser?.me
    const userData = {
      company: me?.company?.id,
      user: me?.id,
      fullName: me?.full_name,
    }
    setUser(userData)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [userRole, setUserRole] = useState<'All Users' | 'All Admins'>(
    'All Users'
  )
  const formRef = useRef(null)

  const getQueryVariables = useMemo(() => {
    const queryOptions = {
      variables: {
        isAdmin: userRole === 'All Users' ? 0 : 1,
        company: user?.company,
      },
    }

    return queryOptions
  }, [userRole, user?.company])

  const { data: userList } = useLiveQuery(USER_LIST_QUERY, getQueryVariables)

  const [addMutation] = useMutation(ADD_MUTATION, {
    onCompleted(data) {
      Notification(NotificationType.success, 'Notification sent')
    },
    onError(err) {
      Notification(NotificationType.error, 'While sending the notification')
    },
  })

  const getNotification = (id) => {
    return notificationTypes.find((notificaiton) => notificaiton.id === id)
  }

  const getTypeVariable = (_type) => {
    const notificationType = notificationVariables.find(
      ({ type }) => type === _type
    )
    return notificationType?.variables
  }

  const onSubmit = async (values) => {
    const notification = getNotification(values.type)

    const notificationVariable = getTypeVariable(
      notification?.notification_type
    )

    const sent_users = []
    for (const user of userList) {
      sent_users.push(user.id)
    }

    const variables = {
      type: values.type,
      sent_to: sent_users,
      destination: values.destination_id,
      sent_by: user.user,
      // loop: 2,
    }

    if (notificationVariable) {
      variables['variables'] = notificationVariable
    }

    await addMutation({
      variables,
      optimisticResponse: {},
    })
  }

  return (
    <div>
      <Layout>
        <div className={styles.mainContainer}>
          <Row>
            <Col md={8}>
              <Formik
                innerRef={formRef}
                initialValues={initialValues}
                onSubmit={onSubmit}
              >
                {({ handleSubmit, handleChange }) => (
                  <AntForm layout={'vertical'} requiredMark={false}>
                    <AntForm.Item label={'Notification Type'} name={'type'}>
                      <Select name={'type'} style={{ width: '100%' }}>
                        {notificationTypes?.map((notification_type) => (
                          <Select.Option
                            key={notification_type.id}
                            value={notification_type.id}
                          >
                            {notification_type.type}
                          </Select.Option>
                        ))}
                      </Select>
                    </AntForm.Item>
                    <AntForm.Item
                      label={'Destination ID'}
                      name={'destination_id'}
                    >
                      <Input name={'destination_id'} />
                    </AntForm.Item>
                    <AntForm.Item label={'Users'} name={'users'}>
                      <Select
                        onChange={(e) => {
                          setUserRole(e)
                          handleChange(e)
                        }}
                        name={'users'}
                        style={{ width: '100%' }}
                      >
                        {users.map((role) => (
                          <Select.Option key={role} value={role}>
                            {role}
                          </Select.Option>
                        ))}
                      </Select>
                    </AntForm.Item>
                    <AntForm.Item label={'Loop'} name={'loop'}>
                      <Select name={'loop'} style={{ width: '100%' }}>
                        {loops.map((day) => (
                          <Select.Option key={day} value={day}>
                            {day + ' days'}
                          </Select.Option>
                        ))}
                      </Select>
                    </AntForm.Item>
                    <Button type="primary" onClick={() => handleSubmit()}>
                      Create
                    </Button>
                  </AntForm>
                )}
              </Formik>
            </Col>
          </Row>
        </div>
      </Layout>
    </div>
  )
}

export default StaffNotifications
