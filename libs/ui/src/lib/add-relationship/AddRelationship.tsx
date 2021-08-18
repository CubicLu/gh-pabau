import { BasicModal as Modal } from '@pabau/ui'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { ReactComponent as Company } from '../../assets/images/relationship/company.svg'
import { ReactComponent as EmergencyContact } from '../../assets/images/relationship/emergency-contact.svg'
import { ReactComponent as FamilyMember } from '../../assets/images/relationship/family-member.svg'
import { ReactComponent as InsuranceProvider } from '../../assets/images/relationship/insurance-provider.svg'
import { ReactComponent as NextOfKin } from '../../assets/images/relationship/next-of-kin.svg'
import { ReactComponent as Practioner } from '../../assets/images/relationship/practioner.svg'
import styles from './AddRelationship.module.less'

export type RelationshipType =
  | 'family-member'
  | 'emergency-contact'
  | 'next-of-kin'
  | 'practioner'
  | 'insurance-provider'
  | 'company'
export interface Relationship {
  type: RelationshipType
  company?: string
  address?: string
  email?: string
  phone?: string
  avatar?: string
  firstName?: string
  lastName?: string
  surgeryName?: string
}

export interface AddRelationshipProps {
  title?: string
  visible: boolean
  onClose: () => void
  onOpenAddModal: (relationshipType: RelationshipType) => void
}

export const AddRelationship: FC<AddRelationshipProps> = ({
  title,
  visible,
  onClose,
  onOpenAddModal,
}) => {
  const { t } = useTranslation('common')
  const contacts = [
    {
      type: 'family-member',
      title: t('ui.add.relationship.title.family'),
      logo: <FamilyMember />,
    },
    {
      type: 'emergency-contact',
      title: t('ui.add.relationship.title.emergency'),
      logo: <EmergencyContact />,
    },
    {
      type: 'next-of-kin',
      title: t('ui.add.relationship.title.nextofkin'),
      logo: <NextOfKin />,
    },
  ]
  const thirdParties = [
    {
      type: 'practioner',
      title: t('ui.add.relationship.title.practioner'),
      logo: <Practioner />,
    },
    {
      type: 'insurance-provider',
      title: t('ui.add.relationship.title.insurance'),
      logo: <InsuranceProvider />,
    },
    {
      type: 'company',
      title: t('ui.add.relationship.title.company'),
      logo: <Company />,
    },
  ]
  return (
    <Modal
      title={title || t('ui.add.relationship.title')}
      visible={visible}
      centered
      footer={false}
      width={460}
      onCancel={() => onClose()}
    >
      <div className={styles.addRelationshipContainer}>
        <div className={styles.section}>
          <p className={styles.title}>
            {t('ui.add.relationship.section.contact')}
          </p>
          {contacts.map((contact, index) => (
            <div
              className={styles.item}
              key={`relationship-contact-${index}`}
              onClick={() => onOpenAddModal(contact.type as RelationshipType)}
            >
              {contact.logo}
              {contact.title}
            </div>
          ))}
        </div>
        <div className={styles.section}>
          <p className={styles.title}>
            {t('ui.add.relationship.section.thirdparty')}
          </p>
          {thirdParties.map((thirdParty, index) => (
            <div
              className={styles.item}
              key={`relationship-third-party-${index}`}
              onClick={() =>
                onOpenAddModal(thirdParty.type as RelationshipType)
              }
            >
              {thirdParty.logo}
              {thirdParty.title}
            </div>
          ))}
        </div>
      </div>
    </Modal>
  )
}

export default AddRelationship
