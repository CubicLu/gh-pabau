import React, { FC, useState } from 'react'

import ChooseSMSTemplate, {
  ChooseSMSTemplateProps,
  smsTemplateProps,
} from './ChooseSMSTemplate'

export default {
  component: ChooseSMSTemplate,
  title: 'Choose SMS Template',
  args: {
    modalVisible: true,
    templateList: [
      {
        id: 1,
        message:
          'Hi Shopia, this is a friendly reminder about your appointment with Pabau Care for 15/12/2021. Manage booking: URL://CONNECTURL',
        name: 'Appointment Reminder',
      },
      {
        id: 2,
        message:
          'Hi Shopia, this is a friendly reminder about your appointment with Pabau Care for 15/12/2021. Manage booking: URL://CONNECTURL',
        name: 'Appointment Reminder',
      },
      {
        id: 3,
        message:
          'Hi Shopia, this is a friendly reminder about your appointment with Pabau Care for 15/12/2021. Manage booking: URL://CONNECTURL',
        name: 'Appointment Reminder',
      },
      {
        id: 4,
        message:
          'Hi Shopia, this is a friendly reminder about your appointment with Pabau Care for 15/12/2021. Manage booking: URL://CONNECTURL',
        name: 'Appointment Reminder',
      },
      {
        id: 5,
        message:
          'Hi Shopia, this is a friendly reminder about your appointment with Pabau Care for 15/12/2021. Manage booking: URL://CONNECTURL',
        name: 'Appointment Reminder',
      },
      {
        id: 6,
        message:
          'Hi Shopia, this is a friendly reminder about your appointment with Pabau Care for 15/12/2021. Manage booking: URL://CONNECTURL',
        name: 'Appointment Reminder',
      },
      {
        id: 7,
        message:
          'Hi Shopia, this is a friendly reminder about your appointment with Pabau Care for 15/12/2021. Manage booking: URL://CONNECTURL',
        name: 'Appointment Reminder',
      },
      {
        id: 8,
        message:
          'Hi Shopia, this is a friendly reminder about your appointment with Pabau Care for 15/12/2021. Manage booking: URL://CONNECTURL',
        name: 'Appointment Reminder',
      },
      {
        id: 9,
        message:
          'Hi Shopia, this is a friendly reminder about your appointment with Pabau Care for 15/12/2021. Manage booking: URL://CONNECTURL',
        name: 'Appointment Reminder',
      },
      {
        id: 10,
        message:
          'Hi Shopia, this is a friendly reminder about your appointment with Pabau Care for 15/12/2021. Manage booking: URL://CONNECTURL',
        name: 'Appointment Reminder',
      },
    ],
  },
}

const ChooseSMSTemplateStory: FC<ChooseSMSTemplateProps> = ({
  modalVisible,
  templateList,
}) => {
  const [searchText, setSearchText] = useState('')
  const [selectTemplate, setSelectTemplate] = useState('All Templates')
  const [chooseSmsTemplate, setChooseSmsTemplate] = useState<smsTemplateProps>()
  return (
    <ChooseSMSTemplate
      modalVisible={modalVisible}
      searchText={searchText}
      onSearchTextChange={(e) => setSearchText(e.target.value)}
      selectTemplate={selectTemplate}
      onSelectTemplate={setSelectTemplate}
      templateList={templateList}
      onChooseSmsTemplate={setChooseSmsTemplate}
      chooseSmsTemplate={chooseSmsTemplate}
    />
  )
}

export const SMSTemplate = ChooseSMSTemplateStory.bind({})
