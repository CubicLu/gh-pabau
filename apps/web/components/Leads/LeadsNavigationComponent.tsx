import React, { FC, useState, useEffect } from 'react'
import { action } from '@storybook/addon-actions'
import { LeadsNavigation } from '@pabau/ui'
import { useGetCmLeadCountLazyQuery } from '@pabau/graphql'

export const LeadsNavigationComponent: FC = () => {
  const [leadCount, setLeadCount] = useState(0)
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

  const [
    getCmLeadCount,
    {
      called: calledCmLeadCount,
      loading: cmLeadCountLoading,
      data: countObj,
      error: cmLeadCountError,
    },
  ] = useGetCmLeadCountLazyQuery({ fetchPolicy: 'network-only' })

  useEffect(() => {
    if (
      calledCmLeadCount &&
      !cmLeadCountLoading &&
      countObj &&
      !cmLeadCountError &&
      leadCount !== countObj.findManyCmLeadCount
    )
      setLeadCount(countObj.findManyCmLeadCount)
  }, [
    calledCmLeadCount,
    cmLeadCountLoading,
    countObj,
    cmLeadCountError,
    leadCount,
  ])

  useEffect(() => {
    const companyId = 8119
    const pipelineId = 1
    getCmLeadCount({
      variables: {
        pipeline_id: pipelineId,
        company_id: companyId,
      },
    })
  }, [getCmLeadCount])

  return (
    <LeadsNavigation
      onProjectClickHandler={() => {
        console.log('onProjectClickHandler')
      }}
      onMenuClickHandler={() => {
        console.log('onMenuClickHandler')
      }}
      onSelectLeadsHandler={action('onLeadsSelect')}
      leadCount={leadCount}
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
