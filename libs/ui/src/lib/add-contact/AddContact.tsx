import { LeftOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { Input } from 'antd'
import {
  BasicModal as Modal,
  Button,
  Relationship,
  Search,
  RelationshipType,
} from '@pabau/ui'
import React, { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './AddContact.module.less'

interface Appointment {
  id: string
  firstName: string
  lastName: string
  avatarUrl?: string
  mobile?: string
  email?: string
}

export interface AddContactProps {
  visible: boolean
  contactType: RelationshipType
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
  const [showSearch, setShowSearch] = useState(true)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [avatar, setAvatar] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
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

  const handleSelectAppointment = (id) => {
    setShowSearch(false)
    const findItem = appointments.find((el) => Number(el.id) === Number(id))
    if (findItem) {
      const { firstName, lastName, avatarUrl, mobile, email } = findItem
      setAvatar(avatarUrl || '')
      setFirstName(firstName)
      setLastName(lastName)
      setPhone(mobile || '')
      setEmail(email || '')
    }
  }

  const handleClickAddContactManually = () => {
    setAvatar('')
    setFirstName('')
    setLastName('')
    setPhone('')
    setEmail('')
  }

  const handleAddRelationship = () => {
    onAddRelationship({
      firstName,
      lastName,
      phone,
      avatar,
      email,
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
            {visible && showSearch && (
              <Search
                searchResults={appointments}
                placeHolder={t('ui.add.contact.appointments.placeholder')}
                resultSelectedHandler={(id) => handleSelectAppointment(id)}
              />
            )}
            {visible && !showSearch && (
              <div className={styles.displaySelectedAppointment}>
                <Input
                  value={`${firstName} ${lastName}`}
                  onFocus={() => setShowSearch(true)}
                />
              </div>
            )}
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
            disabled={!firstName || !lastName || !phone || !avatar || !email}
          >
            {t('ui.add.contact.add')}
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default AddContact
