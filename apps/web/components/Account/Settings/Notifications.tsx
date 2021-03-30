import { ButtonCheckbox } from '@pabau/ui'
import { Checkbox as AntCheckbox, Descriptions, Divider, Form } from 'antd'
import React, { FC } from 'react'
import useWindowSize from '../../../hooks/useWindowSize'
import { useTranslationI18 } from '../../../hooks/useTranslationI18'

const Notification: FC = () => {
  const { t } = useTranslationI18()
  const btnOptions = [
    {
      key: 1,
      label: t('account.settings.notification.general.button.label1'),
      disabled: false,
    },
    {
      key: 2,
      label: t('account.settings.notification.general.button.label2'),
      disabled: false,
    },
    {
      key: 3,
      label: t('account.settings.notification.general.button.label3'),
      disabled: false,
    },
    {
      key: 4,
      label: t('account.settings.notification.general.button.label4'),
      disabled: false,
    },
  ]
  const size = useWindowSize()
  const generalNotifications = [
    {
      key: 'scheduled_report',
      label: t('account.settings.notification.general.header1'),
      desc: t('account.settings.notification.general.description1'),
    },
    {
      key: 'appt_booked',
      label: t('account.settings.notification.general.header2'),
      desc: t('account.settings.notification.general.description2'),
    },
    {
      key: 'appt_cancelled',
      label: t('account.settings.notification.general.header3'),
      desc: t('account.settings.notification.general.description3'),
    },
    {
      key: 'alert_when_you_hit_target',
      label: t('account.settings.notification.general.header4'),
      desc: t('account.settings.notification.general.description4'),
    },
    {
      key: 'alert_when_client_arrives',
      label: t('account.settings.notification.general.header5'),
      desc: t('account.settings.notification.general.description5'),
    },
  ]
  const apptNotifications = [
    { key: '1', label: t('account.settings.notification.application.label1') },
    { key: '2', label: t('account.settings.notification.application.label2') },
    { key: '3', label: t('account.settings.notification.application.label3') },
  ]
  return (
    <>
      <Descriptions title={t('account.settings.tab.header3')}>
        <Descriptions.Item>
          {t('account.settings.notification.description')}
        </Descriptions.Item>
      </Descriptions>
      <Divider />
      <Form layout="vertical">
        <Form.Item>
          <h1>{t('account.settings.notification.general.label')}</h1>
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
          <h1 className="nofiticaionApp">
            {t('account.settings.notification.application.label')}
          </h1>
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
