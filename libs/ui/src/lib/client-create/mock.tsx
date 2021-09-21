import React from 'react'
import {
  UsergroupAddOutlined,
  LockOutlined,
  GlobalOutlined,
  CalendarOutlined,
  LaptopOutlined,
  HeartOutlined,
  InboxOutlined,
  WalletOutlined,
  DollarOutlined,
  FileOutlined,
} from '@ant-design/icons'

import { ReactComponent as DrugIcon } from '../../assets/images/contact-sharing/drugs.svg'
import { ReactComponent as AllergyIcon } from '../../assets/images/contact-sharing/allergy.svg'
import { ReactComponent as GPDetailIcon } from '../../assets/images/contact-sharing/gp-detail.svg'
import { ReactComponent as SmsIcon } from '../../assets/images/timeline/sms-icon.svg'
import { ReactComponent as MailIcon } from '../../assets/images/timeline/mail-icon.svg'
import { ReactComponent as CallIcon } from '../../assets/images/timeline/call-icon.svg'
import { ReactComponent as UserIcon } from '../../assets/images/contact-sharing/user.svg'
import { TFunction } from 'react-i18next'
import { RecordSharing } from './SharingAndPrivacy/RecordSharing'
import { SettingSharing } from './SharingAndPrivacy/SettingSharing'
import { SharingHistoryProps } from './SharingAndPrivacy/SharingHistory'
import { CustomDropdownOptionType } from '@pabau/ui'

export const initialValues = {
  salutation: '',
  Fname: '',
  Lname: '',
  gender: '',
  MarketingSource: '',
  DOB: undefined,
  preferredLanguage: '',
  Email: '',
  Mobile: '',
  Phone: '',
  MailingProvince: '',
  MailingCountry: '',
  MailingStreet: '',
  MailingCity: '',
  MailingPostal: '',
  marketingPromotion: ['subscriptionToReceive'],
}

export const sectionToShare = (t: TFunction<'common'>): RecordSharing[] => {
  return [
    {
      key: 'family',
      label: t('create.client.modal.privacy.record.sharing.family.label'),
      color: 'green',
    },
    {
      key: 'emergencyContact',
      label: t(
        'create.client.modal.privacy.record.sharing.emergency.contact.label'
      ),
      color: 'red',
    },
    {
      key: 'nextOfKin',
      label: t('create.client.modal.privacy.record.sharing.next.kin.label'),
      color: 'green',
    },
    {
      key: 'insuranceProvider',
      label: t(
        'create.client.modal.privacy.record.sharing.insurance.provider.label'
      ),
      color: 'orange',
    },
    {
      key: 'gp',
      label: t('create.client.modal.privacy.record.sharing.gp.label'),
      color: 'blue',
    },
    {
      key: 'company',
      label: t('create.client.modal.privacy.record.sharing.company.label'),
      color: 'purple',
    },
  ]
}

export const recordToSharingOption = (
  t: TFunction<'common'>
): CustomDropdownOptionType[] => {
  return [
    {
      key: 'restricted',
      icon: <LockOutlined />,
      title: t(
        'create.client.modal.privacy.record.sharing.option.restricted.title'
      ),
      displayTitle: t(
        'create.client.modal.privacy.record.sharing.option.restricted.display'
      ),
      description: t(
        'create.client.modal.privacy.record.sharing.option.restricted.description'
      ),
      value: '-1',
    },
    {
      key: 'sharing',
      icon: <UsergroupAddOutlined />,
      title: t(
        'create.client.modal.privacy.record.sharing.option.sharing.title'
      ),
      displayTitle: t(
        'create.client.modal.privacy.record.sharing.option.sharing.display'
      ),
      description: t(
        'create.client.modal.privacy.record.sharing.option.sharing.description'
      ),
      value: '0',
    },
    {
      key: 'access',
      icon: <GlobalOutlined />,
      title: t(
        'create.client.modal.privacy.record.sharing.option.access.title'
      ),
      displayTitle: t(
        'create.client.modal.privacy.record.sharing.option.access.display'
      ),
      description: t(
        'create.client.modal.privacy.record.sharing.option.access.description'
      ),
      isShowPlus: true,
      value: '1',
    },
  ]
}

export const settingSharing = (t: TFunction<'common'>): SettingSharing[] => {
  return [
    {
      id: 1,
      title: t('create.client.modal.privacy.sharing.setting.bookings.title'),
      items: [
        {
          key: 'bookAppointments',
          icon: <CalendarOutlined />,
          title: t(
            'create.client.modal.privacy.sharing.setting.book.appointments.title'
          ),
          enabled: true,
        },
        {
          key: 'bookClass',
          icon: <LaptopOutlined />,
          title: t(
            'create.client.modal.privacy.sharing.setting.book.class.title'
          ),
          enabled: false,
        },
      ],
    },
    {
      id: 2,
      title: t('create.client.modal.privacy.sharing.setting.account.title'),
      items: [
        {
          key: 'loyalty',
          icon: <HeartOutlined />,
          title: t('create.client.modal.privacy.sharing.setting.loyalty.title'),
          enabled: true,
        },
        {
          key: 'myPackages',
          icon: <InboxOutlined />,
          title: t(
            'create.client.modal.privacy.sharing.setting.my.packages.title'
          ),
          enabled: false,
        },
        {
          key: 'purchasePackage',
          icon: <WalletOutlined />,
          title: t(
            'create.client.modal.privacy.sharing.setting.purchase.package.title'
          ),
          enabled: false,
        },
        {
          key: 'payments',
          icon: <DollarOutlined />,
          title: t('create.client.modal.privacy.sharing.setting.payment.title'),
          enabled: false,
        },
      ],
    },
    {
      id: 3,
      title: t(
        'create.client.modal.privacy.sharing.setting.clinical.record.title'
      ),
      items: [
        {
          key: 'appointments',
          icon: <CalendarOutlined />,
          title: t(
            'create.client.modal.privacy.sharing.setting.appointments.title'
          ),
          enabled: false,
        },
        {
          key: 'class',
          icon: <InboxOutlined />,
          title: t('create.client.modal.privacy.sharing.setting.class.title'),
          enabled: false,
        },
        {
          key: 'documents',
          icon: <FileOutlined />,
          title: t(
            'create.client.modal.privacy.sharing.setting.documents.title'
          ),
          enabled: true,
        },
        {
          key: 'medications',
          icon: <DrugIcon />,
          title: t(
            'create.client.modal.privacy.sharing.setting.medications.title'
          ),
          enabled: false,
        },
        {
          key: 'allergies',
          icon: <AllergyIcon />,
          title: t(
            'create.client.modal.privacy.sharing.setting.allergies.title'
          ),
          enabled: false,
        },
        {
          key: 'gpDetails',
          icon: <GPDetailIcon />,
          title: t(
            'create.client.modal.privacy.sharing.setting.gp.details.title'
          ),
          enabled: false,
        },
      ],
    },
  ]
}

export const sharingHistory = (
  t: TFunction<'common'>
): SharingHistoryProps[] => {
  return [
    {
      id: 1,
      icon: <SmsIcon />,
      description: t(
        'create.client.modal.privacy.sharing.history.sms.description'
      ),
      date: '2021-10-31T01:04:25.000Z',
      name: 'Martin Wade',
    },
    {
      id: 2,
      icon: <MailIcon />,
      description: t(
        'create.client.modal.privacy.sharing.history.email.description'
      ),
      date: '2021-08-31T10:08:25.000Z',
      name: 'Jeremy Epstein',
    },
    {
      id: 3,
      icon: <UserIcon />,
      description: t(
        'create.client.modal.privacy.sharing.history.user.description'
      ),
      date: '2021-08-22T17:09:25.000Z',
      name: 'Martin Wade',
    },
    {
      id: 4,
      icon: <CallIcon />,
      description: t(
        'create.client.modal.privacy.sharing.history.call.description'
      ),
      date: '2021-08-21T06:06:34.000Z',
      name: 'Jeremy Epstein',
    },
  ]
}
