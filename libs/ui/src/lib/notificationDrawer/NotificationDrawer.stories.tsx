import React from 'react'
import AppointmentSVG from '../../assets/images/notification.svg'
import NotificationDrawer from './NotificationDrawer'

export default {
  component: NotificationDrawer,
  title: 'Notification/NotificationDrawer',
  args: {},
  argTypes: {},
}
const NotificationDrawerStory = ({ ...args }) => {
  const relativeTime = () =>
    new Intl.DateTimeFormat('en-AU', {
      second: 'numeric',
    }).format(new Date())
  return <NotificationDrawer {...args} relativeTime={relativeTime} />
}

export const NotificationDrawers = NotificationDrawerStory.bind({})
NotificationDrawers.args = {
  notifications: [
    {
      notificationTime: '3:00 PM',
      notificationType: 'Appointment',
      notificationTypeIcon: AppointmentSVG,
      title: 'Cancelled appointment',
      desc: 'Your appointment at 17:00 PM with John Smith was cancelled',
      read: false,
    },
    {
      notificationTime: '1:20 PM',
      notificationType: 'Appointment',
      notificationTypeIcon: AppointmentSVG,
      title: 'Cancelled appointment',
      desc: 'Your appointment at 17:00 PM with John Smith was cancelled',
      read: true,
    },
  ],
}
