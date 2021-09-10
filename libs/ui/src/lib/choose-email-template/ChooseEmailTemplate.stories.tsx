import React, { FC, useState } from 'react'
import emailTemplate1 from '../../assets/images/emailTemplate1.png'
import emailTemplate2 from '../../assets/images/emailTemplate2.png'
import emailTemplate3 from '../../assets/images/emailTemplate3.png'
import emailTemplate4 from '../../assets/images/emailTemplate4.png'
import emailTemplate5 from '../../assets/images/emailTemplate5.png'
import ChooseEmailTemplate, {
  ChooseEmailTemplateProps,
  emailTemplateProps,
} from './ChooseEmailTemplate'

export default {
  component: ChooseEmailTemplate,
  title: 'Choose Email Template',
  args: {
    modalVisible: true,
    templateList: [
      {
        id: 1,
        templateHTML: (
          <div>
            <img src={emailTemplate1} alt="emailTemplate" />
          </div>
        ),
        category: ['Marketing'],
      },
      {
        id: 2,
        templateHTML: (
          <div>
            <img src={emailTemplate2} alt="emailTemplate" />
          </div>
        ),
        category: ['Medical'],
      },
      {
        id: 3,
        templateHTML: (
          <div>
            <img src={emailTemplate3} alt="emailTemplate" />
          </div>
        ),
        category: ['Medical'],
      },
      {
        id: 4,
        templateHTML: (
          <div>
            <img src={emailTemplate4} alt="emailTemplate" />
          </div>
        ),
        category: ['Leads'],
      },
      {
        id: 5,
        templateHTML: (
          <div>
            <img src={emailTemplate5} alt="emailTemplate" />
          </div>
        ),
        category: ['Marketing'],
      },
      {
        id: 6,
        templateHTML: (
          <div>
            <img src={emailTemplate1} alt="emailTemplate" />
          </div>
        ),
        category: ['Financial'],
      },
      {
        id: 7,
        templateHTML: (
          <div>
            <img src={emailTemplate2} alt="emailTemplate" />
          </div>
        ),
        category: ['Leads'],
      },
      {
        id: 8,
        templateHTML: (
          <div>
            <img src={emailTemplate3} alt="emailTemplate" />
          </div>
        ),
        category: ['Financial'],
      },
      {
        id: 9,
        templateHTML: (
          <div>
            <img src={emailTemplate4} alt="emailTemplate" />
          </div>
        ),
        category: ['Medical'],
      },
      {
        id: 10,
        templateHTML: (
          <div>
            <img src={emailTemplate5} alt="emailTemplate" />
          </div>
        ),
        category: ['Marketing'],
      },
    ],
  },
}

const ChooseEmailTemplateStory: FC<ChooseEmailTemplateProps> = ({
  modalVisible,
  templateList,
}) => {
  const [searchText, setSearchText] = useState('')
  const [selectTemplate, setSelectTemplate] = useState('All Templates')
  const [chooseEmailTemplate, setChooseEmailTemplate] =
    useState<emailTemplateProps>()
  return (
    <ChooseEmailTemplate
      modalVisible={modalVisible}
      searchText={searchText}
      onSearchTextChange={(e) => setSearchText(e.target.value)}
      selectTemplate={selectTemplate}
      onSelectTemplate={setSelectTemplate}
      templateList={templateList}
      onChooseEmailTemplate={setChooseEmailTemplate}
      chooseEmailTemplate={chooseEmailTemplate}
    />
  )
}

export const EmailTemplate = ChooseEmailTemplateStory.bind({})
