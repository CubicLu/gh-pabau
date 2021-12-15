import { ReactNode } from 'react'
import {
  ShareAltOutlined,
  HomeOutlined,
  EditOutlined,
  LaptopOutlined,
  ScheduleOutlined,
  ShoppingOutlined,
  GiftOutlined,
  ExperimentOutlined,
  FileTextOutlined,
  MoneyCollectOutlined,
  PayCircleOutlined,
  TagsOutlined,
  PhoneOutlined,
  ClockCircleOutlined,
  GlobalOutlined,
  EnvironmentOutlined,
} from '@ant-design/icons'

export interface ClientAreaBuilderSetting {
  appearance: {
    backgroundColor: string
    iconColor: string
    headerColor: string
    footerColor: string
  }
  registrationFields: {
    fieldName: string
    label: string
    visible: boolean
    required: boolean
    disabled?: boolean
    key: number
  }[]
  customFields: {
    fieldName: string
    label: string
    visible: boolean
    required: boolean
    disabled?: boolean
    key: number
  }[]
}

export interface ClientAreaWidget {
  id: number
  icon: ReactNode
  isPlus: boolean
  isEnabled: boolean
  title: string
  description: string
  setting_key: string
}

export interface ClientAreaWidgetsItem {
  title: string
  description: string
  widgets: ClientAreaWidget[]
}

export interface ClientAreaWidgets {
  [key: string]: ClientAreaWidgetsItem
}

export interface ClientAreaShare {
  clientPortalURL: string
  addWordpressPlugin: string
  sendCampaign: string
  addConfirmationAndReminder: string
  learnMore: string
}

export const defaultBuilderSetting = {
  appearance: {
    backgroundColor: 'strong',
    iconColor: '',
    headerColor: '',
    footerColor: '',
  },
  registrationFields: [
    {
      fieldName: 'Salutation',
      label: 'Salutation',
      visible: false,
      required: false,
      key: 1,
    },
    {
      fieldName: 'First Name',
      label: 'First Name',
      visible: true,
      required: true,
      disabled: true,
      key: 2,
    },
    {
      fieldName: 'Last Name',
      label: 'Last Name',
      visible: true,
      required: true,
      disabled: true,
      key: 3,
    },
    {
      fieldName: 'Gender',
      label: 'Gender',
      visible: false,
      required: false,
      key: 4,
    },
    {
      fieldName: 'Date of Birth',
      label: 'Date of Birth',
      visible: false,
      required: false,
      key: 5,
    },
    {
      fieldName: 'Mobile',
      label: 'Mobile',
      visible: false,
      required: false,
      key: 6,
    },
    {
      fieldName: 'Address',
      label: 'Address',
      visible: false,
      required: false,
      key: 7,
    },
    {
      fieldName: 'City',
      label: 'City',
      visible: false,
      required: false,
      key: 8,
    },
    {
      fieldName: 'Country',
      label: 'Country',
      visible: false,
      required: false,
      key: 9,
    },
    {
      fieldName: 'Post code',
      label: 'Post code',
      visible: false,
      required: false,
      key: 10,
    },
    {
      fieldName: 'How did you hear about us?',
      label: 'How did you hear about us?',
      visible: false,
      required: false,
      key: 11,
    },
  ],
  customFields: [
    {
      fieldName: 'GP Name',
      label: 'GP Name',
      visible: false,
      required: false,
      key: 1,
    },
    {
      fieldName: 'GP Address',
      label: 'GP Address',
      visible: false,
      required: false,
      key: 2,
    },
    {
      fieldName: 'Gender',
      label: 'Gender',
      visible: false,
      required: false,
      key: 3,
    },
    {
      fieldName: 'Test MC',
      label: 'Test MC',
      visible: false,
      required: false,
      key: 4,
    },
  ],
}

export const defaultWidgetsData = {
  features: {
    title: 'Core Features',
    description:
      'Choose which features your clients can access in the client portal.',
    widgets: [
      {
        id: 0,
        icon: <LaptopOutlined />,
        isPlus: false,
        isEnabled: true,
        title: 'Online bookings',
        setting_key: 'online_bookings_enabled',
        description:
          'Clients can register/login and book appointments online in your available times',
      },
      {
        id: 1,
        icon: <ScheduleOutlined />,
        isPlus: false,
        isEnabled: true,
        title: 'Class sign up',
        setting_key: '',
        description:
          'Clients can register and sign up for your scheduled classes',
      },
      {
        id: 2,
        icon: <ShoppingOutlined />,
        isPlus: false,
        isEnabled: true,
        title: 'Courses',
        setting_key: '',
        description:
          'Clients can purchase courses of treatments and book their sessions in',
      },
      {
        id: 3,
        icon: <GiftOutlined />,
        isPlus: false,
        isEnabled: true,
        title: 'Gift vouchers',
        setting_key: '',
        description:
          'Clients can purchase online gift vouchers and spend the amount later on',
      },
    ],
  },
  profile: {
    title: 'Client Profile',
    description:
      'This section allows you to determine what logged in users have access to',
    widgets: [
      {
        id: 0,
        icon: <ExperimentOutlined />,
        isPlus: true,
        isEnabled: false,
        title: 'My labs',
        setting_key: '',
        description: 'Patients can view their labs online',
      },
      {
        id: 1,
        icon: <FileTextOutlined />,
        isPlus: true,
        isEnabled: true,
        title: 'My documents',
        setting_key: '',
        description:
          'Publish photos/documents for clients to simplify view and share via your Pabau Connect',
      },
      {
        id: 2,
        icon: <MoneyCollectOutlined />,
        isPlus: true,
        isEnabled: false,
        title: 'Invoices',
        setting_key: '',
        description: 'Patients can view their labs online',
      },
      {
        id: 3,
        icon: <PayCircleOutlined />,
        isPlus: false,
        isEnabled: false,
        title: 'Make Payment',
        setting_key: '',
        description: 'Some description here',
      },
      {
        id: 4,
        icon: <ShoppingOutlined />,
        isPlus: false,
        isEnabled: false,
        title: 'My Packages',
        setting_key: '',
        description: 'Patients can view their labs online',
      },
      {
        id: 5,
        icon: <TagsOutlined />,
        isPlus: false,
        isEnabled: true,
        title: 'Loyalty',
        setting_key: '',
        description:
          'Embed your card system into your connect account allowing your customers to check and redeem their points online',
      },
    ],
  },
  other: {
    title: 'Other',
    description:
      'Allow your clients to see extra information about your business',
    widgets: [
      {
        id: 0,
        icon: <PhoneOutlined />,
        isPlus: false,
        isEnabled: true,
        title: 'Call us',
        setting_key: '',
        description:
          'Allows users to initiate a phone call to your business through their mobiles or desktops',
      },
      {
        id: 1,
        icon: <ClockCircleOutlined />,
        isPlus: false,
        isEnabled: true,
        title: 'Openings',
        setting_key: '',
        description: 'Display your opening hours on your Pabau Connect website',
      },
      {
        id: 2,
        icon: <GlobalOutlined />,
        isPlus: false,
        isEnabled: true,
        title: 'Website',
        setting_key: '',
        description: 'Allows users to jump straight to your website',
      },
      {
        id: 3,
        icon: <EnvironmentOutlined />,
        isPlus: false,
        isEnabled: true,
        title: 'Location',
        setting_key: '',
        description: 'Displays a map of your location',
      },
    ],
  },
}

export const defaultStepData = [
  {
    step: 0,
    name: 'Basics',
    img: <HomeOutlined />,
    isActive: true,
    index: 0,
  },
  {
    step: 1,
    name: 'Widget',
    img: <EditOutlined />,
    isActive: false,
    index: 1,
  },
  {
    step: 2,
    name: 'Share',
    img: <ShareAltOutlined />,
    isActive: false,
    index: 2,
  },
]

export const defaultShareData = {
  clientPortalURL: 'https://live.loremipsum.com',
  addWordpressPlugin: '',
  sendCampaign: '',
  addConfirmationAndReminder: '',
  learnMore: '',
}
