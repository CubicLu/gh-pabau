import React, { FC } from 'react'

import LeadCreateComponent, { LeadCreateProps } from './LeadCreate'

export default {
  component: LeadCreateComponent,
  title: 'UI/LeadCreate',
}

const LeadCreateStory: FC<LeadCreateProps> = ({ modalVisible }) => {
  return <LeadCreate modalVisible={modalVisible} />
}

export const LeadCreate = LeadCreateStory.bind({})
