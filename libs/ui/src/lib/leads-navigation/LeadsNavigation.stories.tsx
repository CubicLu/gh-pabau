import React, { FC } from 'react'
import { LeadsNavigation, LeadsNavigationProps } from './LeadsNavigation'
import { action } from '@storybook/addon-actions'

export default {
  component: LeadsNavigation,
  title: 'LeadsNavigation',
  args: {
    onProjectClickHandler: () => {
      console.log('onProjectClickHandler')
    },
    onMenuClickHandler: () => {
      console.log('onMenuClickHandler')
    },
    leadCount: 4,
    leadsItems: [
      {
        key: 'leads1',
        label: 'leads1',
      },
      {
        key: 'leads2',
        label: 'leads2',
      },
    ],
    InboundLeadsItems: [
      {
        key: 'inboundLeads1',
        label: 'inboundLeads1',
      },
      {
        key: 'inboundLeads2',
        label: 'inboundLeads2',
      },
    ],
    optionItems: [
      {
        key: 'optionItems1',
        label: 'optionItems1',
      },
      {
        key: 'optionItems2',
        label: 'optionItems2',
      },
    ],
    onCreateLeadHandler: () => {
      console.log('onCreateLeadHandler')
    },
  },
}

const LeadsNavigationComponent: FC<LeadsNavigationProps> = ({
  onProjectClickHandler,
  onMenuClickHandler,
  leadCount,
  leadsItems,
  InboundLeadsItems,
  optionItems,
  onCreateLeadHandler,
}) => {
  return (
    <LeadsNavigation
      onProjectClickHandler={onProjectClickHandler}
      onMenuClickHandler={onMenuClickHandler}
      onSelectLeadsHandler={action('onLeadsSelect')}
      leadCount={leadCount}
      leadsItems={leadsItems}
      onSelectInboundLeadsHandler={action('onInboundLeadsSelect')}
      InboundLeadsItems={InboundLeadsItems}
      onInputChange={action('onInputChange')}
      onSelectOptionHandler={action('onOptionSelect')}
      optionItems={optionItems}
      onCreateLeadHandler={onCreateLeadHandler}
    />
  )
}

export const LeadsNavigationComponentStory = LeadsNavigationComponent.bind({})
