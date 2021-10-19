import React, { FC } from 'react'
import { action } from '@storybook/addon-actions'
import { LeadsNavigation } from '@pabau/ui'

export const LeadsNavigationComponent: FC = () => {
  const leadsItems = [
    {
      key: 'leads1',
      label: 'leads1',
    },
    {
      key: 'leads2',
      label: 'leads2',
    },
  ]

  const InboundLeadsItems = [
    {
      key: 'inboundLeads1',
      label: 'inboundLeads1',
    },
    {
      key: 'inboundLeads2',
      label: 'inboundLeads2',
    },
  ]

  const optionItems = [
    {
      key: 'optionItems1',
      label: 'optionItems1',
    },
    {
      key: 'optionItems2',
      label: 'optionItems2',
    },
  ]

  return (
    <LeadsNavigation
      onProjectClickHandler={() => {
        console.log('onProjectClickHandler')
      }}
      onMenuClickHandler={() => {
        console.log('onMenuClickHandler')
      }}
      onSelectLeadsHandler={action('onLeadsSelect')}
      leadsItems={leadsItems}
      onSelectInboundLeadsHandler={action('onInboundLeadsSelect')}
      InboundLeadsItems={InboundLeadsItems}
      onInputChange={action('onInputChange')}
      onSelectOptionHandler={action('onOptionSelect')}
      optionItems={optionItems}
      onCreateLeadHandler={() => {
        console.log('onCreateLeadHandler')
      }}
    />
  )
}

export default LeadsNavigationComponent
