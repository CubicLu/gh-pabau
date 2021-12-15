import React from 'react'
import { IntegrationCard } from './IntegrationCard'

export default {
  component: IntegrationCard,
  title: 'UI/Integration Card',
  args: {
    id: '',
    name: 'MailChimp',
    discription: 'Give your marketing efforts a boost',
    logo: '',
  },
  argTypes: {
    id: { control: { type: 'string' } },
    name: { control: { type: 'string' } },
    discription: { control: { type: 'string' } },
    logo: { control: { type: 'string' } },
    onClick: { action: 'clicked' },
  },
}

const integrationCardStory = ({ ...args }) => (
  <IntegrationCard
    id={''}
    name={'Mailchimp'}
    discription={'Give your marketing efforts a boost'}
    logo={''}
    {...args}
  />
)
export const integrationCardDefault = integrationCardStory.bind({})
