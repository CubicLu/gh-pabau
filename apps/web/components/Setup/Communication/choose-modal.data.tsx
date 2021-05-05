import React from 'react'
import { MailOutlined, MessageOutlined, RightOutlined } from '@ant-design/icons'
import {
  chooseModalEmailItems,
  ChooseModalItem,
  chooseModalSMSItems,
} from '@pabau/ui'
// import notificationBannerImage from '../../../assets/images/notification-image.png'
import { ReactComponent as LetterOutlined } from '../../../assets/images/form-type/consent-selected.svg'

/*--- Choose Modal Props ---*/
const addOnStyle = {
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  border: '1px solid var(--border-color-base)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: 'var(--grey-text-color)',
  fontSize: '16px',
}

export const chooseModalTypeItems: ChooseModalItem[] = [
  {
    title: 'Email',
    icon: <MailOutlined />,
    addonIcon: (
      <div style={addOnStyle}>
        <RightOutlined />
      </div>
    ),
  },
  {
    title: 'SMS',
    icon: <MessageOutlined />,
    addonIcon: (
      <div style={addOnStyle}>
        <RightOutlined />
      </div>
    ),
  },
  {
    title: 'Letter',
    icon: <LetterOutlined />,
    addonIcon: (
      <div style={addOnStyle}>
        <RightOutlined />
      </div>
    ),
  },
]

export const chooseTemplateStepArgs = [
  {
    SelectType: {
      title: 'Select the type of template you wish to create',
      subTitle: 'Step 1 of 2',
      items: chooseModalTypeItems,
    },
  },
  {
    Email: {
      title: 'What type of email template are you creating',
      subTitle: 'Step 2 of 2',
      items: chooseModalEmailItems,
    },
    SMS: {
      title: 'What type of sms template are you creating',
      subTitle: 'Step 2 of 2',
      items: chooseModalSMSItems,
    },
    Letter: {
      title: 'What type of letter template are you creating',
      subTitle: 'Step 2 of 2',
      items: chooseModalTypeItems,
    },
  },
]

export interface ChooseTemplateState {
  _step: number
  _type: string
}

export const defaultChooseTemplateState: ChooseTemplateState = {
  _step: 0,
  _type: 'SelectType',
}

export default defaultChooseTemplateState
/*--- Choose Modal Props End ---*/
