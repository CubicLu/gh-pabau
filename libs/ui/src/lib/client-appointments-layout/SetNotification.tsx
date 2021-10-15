import React, { FC, useState } from 'react'
import { BasicModal as Modal, Button } from '@pabau/ui'
import { Switch } from 'antd'
import { useTranslation } from 'react-i18next'
import styles from './SetNotification.module.less'

export interface SetNotificationProps {
  visible: boolean
  onClose: () => void
  reminder: boolean
  requestFeedback: boolean
  handleReminder: (reminder) => void
  handleRequestFeedback: (requestFeedback) => void
  onSave: (reminder, requestFeedback) => void
}

const SetNotificationModal: FC<SetNotificationProps> = ({
  visible,
  onClose,
  reminder,
  requestFeedback,
  handleReminder,
  handleRequestFeedback,
  onSave,
}) => {
  const { t } = useTranslation('common')
  const [reminderCheck, setReminderCheck] = useState(reminder)
  const [requestFeedbackCheck, setRequestFeedbackCheck] = useState(
    requestFeedback
  )
  const handleClickClose = () => {
    onClose()
  }
  const handleClickSave = () => {
    handleReminder(reminderCheck)
    handleRequestFeedback(requestFeedbackCheck)
    onSave(reminderCheck, requestFeedbackCheck)
    onClose()
  }

  const modalTitle = (
    <span className={styles.modalTitle}>
      {t('client.appointment.set.notification.title')}
    </span>
  )
  return (
    <Modal
      visible={visible}
      title={modalTitle}
      centered
      footer={false}
      width={384}
      onCancel={() => handleClickClose()}
    >
      <div className={styles.modalContainer}>
        <div className={styles.settingItem}>
          <span>
            {t('client.appointment.set.notification.appointment.reminder')}
          </span>
          <Switch
            checked={reminderCheck}
            onChange={(checked) => {
              setReminderCheck(checked)
            }}
          />
        </div>
        <div className={styles.settingItem}>
          <span>
            {t('client.appointment.set.notification.request.feedback')}
          </span>
          <Switch
            checked={requestFeedbackCheck}
            onChange={(checked) => setRequestFeedbackCheck(checked)}
          />
        </div>
        <div className={styles.saveButtonContainer}>
          <Button type="primary" onClick={() => handleClickSave()}>
            {t('client.appointment.set.notification.save.button')}
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export const SetNotification: FC<SetNotificationProps> = (props) => {
  const { visible } = props
  return visible ? <SetNotificationModal {...props} /> : <div />
}

export default SetNotification
