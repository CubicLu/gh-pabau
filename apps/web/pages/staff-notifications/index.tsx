import { Notification, NotificationType } from '@pabau/ui'
import { Button, Col, Row } from 'antd'
import { Formik } from 'formik'
import { Form as AntForm, Input, Select } from 'formik-antd'
import { NextPage } from 'next'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import { useUser } from '../../context/UserContext'
import { notificationVariables } from '../../mocks/StaffNotifications'
import styles from './staff-notifications.module.less'
import {
  useStaff_Notification_TypesQuery,
  useInsert_Product_NewsMutation,
  useStaff_UsersQuery,
  useInsert_Notifications_OneMutation,
} from '@pabau/graphql'

const { TextArea } = Input

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

interface InitialNews {
  link: string
  description: string
  title: string
  users: Users
}

const users = ['All Admins', 'All Users']
const loops = [2, 5, 7]

const initialValues: InitialStaffNotifications = {
  type: '',
  destination_id: '',
  users: Users.AllUsers,
  loop: null,
}

const initialNewsValues: InitialNews = {
  link: '',
  description: '',
  title: '',
  users: Users.AllUsers,
}

interface LoggedUser {
  user: number
  company: number
  fullName: string
}

export const StaffNotifications: NextPage = () => {
  const { data: notificationTypesData } = useStaff_Notification_TypesQuery()
  const notificationTypes = notificationTypesData?.notification_types

  const [user, setUser] = useState<LoggedUser>()
  const loggedUser = useUser()

  useEffect(() => {
    const me = loggedUser?.me
    const userData = {
      company: me?.company,
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

  const { data: userListData, loading } = useStaff_UsersQuery(getQueryVariables)
  const userList = userListData?.findManyUser

  const [insertNotificationsOneMutation] = useInsert_Notifications_OneMutation({
    onCompleted(data) {
      Notification(NotificationType.success, 'Notification sent')
    },
    onError(err) {
      Notification(NotificationType.error, 'While sending the notification')
    },
  })

  const [insertProductNewsMutation] = useInsert_Product_NewsMutation({
    onCompleted(data) {
      Notification(NotificationType.success, 'News sent')
    },
    onError(err) {
      Notification(NotificationType.error, 'While sending the news')
    },
  })

  const getNotification = (type) => {
    return notificationTypes.find(
      (notificaiton) => notificaiton.notification_type === type
    )
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
      template: values.type,
      destination: values.destination_id,
      sent_by: user.user,
    }

    if (notificationVariable) {
      variables['variables'] = notificationVariable
    }

    await insertNotificationsOneMutation({
      variables,
      optimisticResponse: {},
    })
  }

  const onNewsCreate = async (values) => {
    const sent_users = []
    for (const user of userList) {
      sent_users.push(user.id)
    }
    const variables = {
      img: 'https://www.pabau.com/wp-content/uploads/2021/03/jhjhb-2.png',
      sent_to: sent_users,
      link: values.link,
      description: values.description,
      title: values.title,
    }

    await insertProductNewsMutation({
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
              <h1 style={{ fontSize: 18 }}>Notification</h1>
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
                            value={notification_type.notification_type}
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
                    {!loading && (
                      <Button type="primary" onClick={() => handleSubmit()}>
                        Create
                      </Button>
                    )}
                  </AntForm>
                )}
              </Formik>
            </Col>
          </Row>
          <Row>
            <Col md={8} style={{ marginTop: 20 }}>
              <h1 style={{ fontSize: 18 }}>News</h1>
              <Formik initialValues={initialNewsValues} onSubmit={onNewsCreate}>
                {({ handleSubmit, handleChange, setFieldValue }) => (
                  <AntForm layout={'vertical'} requiredMark={false}>
                    <AntForm.Item label={'Title'} name={'title'}>
                      <Input name={'title'} />
                    </AntForm.Item>

                    <AntForm.Item label={'Description'} name={'description'}>
                      <TextArea rows={4} name={'description'} />
                    </AntForm.Item>

                    <AntForm.Item label={'Destination'} name={'link'}>
                      <Input name={'link'} />
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

                    {!loading && (
                      <Button type="primary" onClick={() => handleSubmit()}>
                        Create
                      </Button>
                    )}
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
