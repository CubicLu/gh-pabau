import React, { useState, useMemo, useRef, useContext, useEffect } from 'react'
import Layout from '../../components/Layout/Layout'
import styles from './staff-notifications.module.less'
import { Form as AntForm, Select } from 'formik-antd'
import { Formik } from 'formik'
import { Col, Row, Button } from 'antd'
import { gql, useMutation } from '@apollo/client'
import { useLiveQuery, Notification, NotificationType } from '@pabau/ui'
import { NextPage } from 'next'
import { UserContext } from '../../context/UserContext'

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
  query user_list($isAdmin: Boolean = true, $company: numeric!) {
    user_list(
      where: { _and: { admin: { _eq: $isAdmin }, company: { _eq: $company } } }
    ) {
      id
      first_name
      last_name
      admin
      company
    }
  }
`

const LIST_QUERY = gql`
  query application_notification_type {
    application_notification_type {
      type
      name
      id
      enabled
      notification_title {
        title
      }
      notification_description {
        description
      }
    }
  }
`

const ADD_MUTATION = gql`
  mutation insert_notifications_one($type: uuid!, $sent_to: jsonb) {
    insert_notifications_one(object: { type: $type, sent_to: $sent_to }) {
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
  console.log('notificationTypes', notificationTypes)
  const [user, setUser] = useState<LoggedUser>()
  const loggedUser = useContext(UserContext)

  console.log('loggedUser', user)

  useEffect(() => {
    const { me } = loggedUser
    const userData = {
      company: me?.company?.id,
      user: me?.id,
      fullName: me?.full_name,
    }
    setUser(userData)
  }, [])

  const [userRole, setUserRole] = useState<'All Users' | 'All Admins'>(
    'All Users'
  )
  const formRef = useRef(null)

  const getQueryVariables = useMemo(() => {
    const queryOptions = {
      variables: {
        isAdmin: userRole === 'All Users' ? false : true,
        company: user?.company,
      },
    }

    return queryOptions
  }, [userRole, user?.company])

  const { data: userList } = useLiveQuery(USER_LIST_QUERY, getQueryVariables)

  const getNotificationType = (type) => {
    return notificationTypes.find((notification) => notification.type === type)
  }

  const [addMutation] = useMutation(ADD_MUTATION, {
    onCompleted(data) {
      Notification(NotificationType.success, 'Notification sent')
    },
    onError(err) {
      Notification(NotificationType.error, 'While sending the notification')
    },
  })

  const onSubmit = async (values) => {
    const notificationType = getNotificationType(values.type)
    const sent_users = []
    for (const user of userList) {
      sent_users.push(user.id)
    }
    const body = {
      type: notificationType.id,
      sent_to: sent_users,
    }

    await addMutation({
      variables: body,
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
                            value={notification_type.type}
                          >
                            {notification_type.type}
                          </Select.Option>
                        ))}
                      </Select>
                    </AntForm.Item>
                    <AntForm.Item
                      label={'Destination ID'}
                      name={'destination_id'}
                      required
                    >
                      <Select name={'destination_id'} style={{ width: '100%' }}>
                        <Select.Option value={'123'}>123</Select.Option>
                      </Select>
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
