import { LeftOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { BasicModal as Modal, Button, Relationship } from '@pabau/ui'
import { Select } from 'antd'
import React, { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './AddContact.module.less'

const { Option } = Select

interface Appointment {
  title: string
  firstName: string
  lastName: string
  avatar: string
  phone: string
}

export interface AddContactProps {
  visible: boolean
  contactType: string
  appointments: Appointment[]
  onAddRelationship: (relationship: Relationship) => void
  onClose: () => void
}

export const AddContact: FC<AddContactProps> = ({
  visible,
  contactType,
  onAddRelationship,
  onClose,
  appointments,
}) => {
  const { t } = useTranslation('common')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [avatar, setAvatar] = useState('')
  const [phone, setPhone] = useState('')
  const modalTitle = (
    <div className={styles.modalTitle}>
      <LeftOutlined className={styles.backTo} onClick={() => onClose()} />
      <span className={styles.text}>
        {contactType === 'family-member'
          ? t('ui.add.contact.title.family')
          : contactType === 'emergency-contact'
          ? t('ui.add.contact.title.emergency')
          : t('ui.add.contact.title.nextofkin')}
      </span>
    </div>
  )

  const handleSelectAppointment = (index) => {
    const { firstName, lastName, avatar, phone } = appointments[index]
    setAvatar(avatar)
    setFirstName(firstName)
    setLastName(lastName)
    setPhone(phone)
  }

  const handleClickAddContactManually = () => {
    setAvatar('')
    setFirstName('')
    setLastName('')
    setPhone('')
  }

  const handleAddRelationship = () => {
    onAddRelationship({
      firstName,
      lastName,
      phone,
      avatar,
      type: contactType,
    })
  }

  return (
    <Modal
      title={modalTitle}
      centered
      visible={visible}
      onCancel={() => onClose()}
      modalWidth={460}
      footer={false}
    >
      <div className={styles.addContactContainer}>
        <div className={styles.addContactBody}>
          <p className={styles.label}>{t('ui.add.contact.label')}</p>
          <div className={styles.chooseAppointment}>
            <Select
              placeholder={t('ui.add.contact.appointments.placeholder')}
              onSelect={handleSelectAppointment}
            >
              {appointments?.map((appointment, index) => (
                <Option value={index} key={`appointment-item-${index}`}>
                  {appointment.title}
                </Option>
              ))}
            </Select>
          </div>
          <div
            className={styles.addContactManually}
            onClick={handleClickAddContactManually}
          >
            <PlusCircleOutlined style={{ marginRight: '8px' }} />{' '}
            {t('ui.add.contact.add.manually')}
          </div>
        </div>
        <div className={styles.addContactFooter}>
          <Button onClick={() => onClose()}>
            {t('ui.add.contact.cancel')}
          </Button>
          <Button
            type="primary"
            onClick={handleAddRelationship}
            disabled={!firstName || !lastName || !phone || !avatar}
          >
            {t('ui.add.contact.add')}
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default AddContact
