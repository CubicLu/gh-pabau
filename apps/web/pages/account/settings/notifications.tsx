import { ButtonCheckbox } from '@pabau/ui'
import { Checkbox as AntCheckbox, Descriptions, Divider, Form } from 'antd'
import React, { FC } from 'react'
import useWindowSize from '../../../hooks/useWindowSize'

const Notification: FC = () => {
  const btnOptions = [
    { key: 1, label: 'iOS', disabled: false },
    { key: 2, label: 'Email', disabled: false },
    { key: 3, label: 'SMS', disabled: false },
    { key: 4, label: 'Pabau Web', disabled: false },
  ]
  const size = useWindowSize()
  const generalNotifications = [
    {
      key: 'scheduled_report',
      label: 'Scheduled report',
      desc: 'When a scheduled report is delivered to you',
    },
    {
      key: 'appt_booked',
      label: 'Appointment booked',
      desc: 'When an appointment is booked with them',
    },
    {
      key: 'appt_cancelled',
      label: 'Appointment cancelled',
      desc: 'When an appointment is cancelled',
    },
    {
      key: 'alert_when_you_hit_target',
      label: 'Alert when you hit your target',
      desc: 'When you hit the target',
    },
    {
      key: 'alert_when_client_arrives',
      label: 'Alert when a client arrives',
      desc: 'When client arrives',
    },
  ]
  const apptNotifications = [
    { key: '1', label: 'News and announcements' },
    { key: '2', label: 'New feature release' },
    { key: '3', label: 'New blog post' },
  ]
  return (
    <>
      <Descriptions title="Notifications">
        <Descriptions.Item>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Descriptions.Item>
      </Descriptions>
      <Divider />
      <Form layout="vertical">
        <Form.Item>
          <h1>GENERAL</h1>
        </Form.Item>
        {generalNotifications.map(({ key, label, desc }) => (
          <>
            <Form.Item key={key}>
              <h2>{label}</h2>
              <span>{desc}</span>
              <br />
              <br />
              {btnOptions.map(({ key, label, disabled }) => (
                <ButtonCheckbox
                  key={key}
                  label={label}
                  disabled={disabled}
                  size={size.width <= 767 ? 'small' : null}
                />
              ))}
            </Form.Item>
            <Divider />
          </>
        ))}

        <Form.Item>
          <h1 className="nofiticaionApp">APPLICATION</h1>
          {apptNotifications.map(({ key, label }) => (
            <>
              <AntCheckbox className="nofiticaionAppChk" key={key}>
                {label}
              </AntCheckbox>
              <br />
            </>
          ))}
        </Form.Item>
      </Form>
    </>
  )
}

export default Notification
