import React from 'react'
import Layout from '../../components/Layout/Layout'
import styles from './staff-notifications.module.less'
import { Form as AntForm, Select } from 'formik-antd'
import { Formik } from 'formik'
import { Col, Row, Button } from 'antd'
import { gql, useMutation } from '@apollo/client'
import { useLiveQuery, Notification, NotificationType } from '@pabau/ui'
import { NextPage } from 'next'

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

const LIST_QUERY = gql`
  query notification_types {
    notification_types {
      id
      type
      type_name
      title
      text
    }
  }
`

const ADD_MUTATION = gql`
  mutation insert_notifications_one(
    $text: String!
    $title: String!
    $type: String!
  ) {
    insert_notifications_one(
      object: { text: $text, title: $title, type: $type }
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

export const StaffNotifications: NextPage = () => {
  const { data: notificationTypes } = useLiveQuery(LIST_QUERY)

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
    const body = {
      type: notificationType.type,
      title: notificationType.title,
      text: notificationType.text,
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
              <Formik initialValues={initialValues} onSubmit={onSubmit}>
                {({ handleSubmit }) => (
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
                      <Select name={'users'} style={{ width: '100%' }}>
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
