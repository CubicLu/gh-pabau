import React, { FC } from 'react'
import { CommunicationLetterPreview } from './CommunicationLetterPreview'

export default {
  title: 'UI/Create Template Preview',
  component: CommunicationLetterPreview,
  args: {},
  argTypes: {
    actions: { argTypesRegex: '^on[A-Z].*' },
  },
}
export const CommunicationTemplateLetter: FC = () => {
  return <CommunicationLetterPreview />
}

// export const CreateLetterTemplate = CreateLetterTemplateBarStory.bind({})
