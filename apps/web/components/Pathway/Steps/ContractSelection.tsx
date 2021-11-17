import { GetConsentDocument } from '@pabau/graphql'
import { Button } from '@pabau/ui'
import React from 'react'

interface P {
  data?: Record<string, any>
  onSubmit?(data?: any): void
}

export const ContractSelectionStep = ({ onSubmit, data }: P) => {
  return (
    <>
      <h2>Select Consent Forms</h2>
      {/*<h3>Data: {JSON.stringify(data)}</h3>*/}
      <div style={{ display: 'flex' }}>
        <select multiple style={{ flex: 1 }}>
          {data?.['contract-selection']?.selectedConsents?.map((e) => (
            <option key={e.id} value={e.id}>
              {e.name}
            </option>
          ))}
        </select>
        <select multiple style={{ flex: 1 }}>
          {data?.['contract-selection']?.allConsents?.map((e) => (
            <option key={e.id} value={e.id}>
              {e.name}
            </option>
          ))}
        </select>
      </div>

      <Button onClick={() => window.history.back()}></Button>
      <Button onClick={() => onSubmit?.({ selectedConsentIds: [123] })}>
        Next
      </Button>
    </>
  )
}
ContractSelectionStep.loadData = {
  document: GetConsentDocument,
  variables: (e) => {
    console.log('ContractSelectionStep.loadData', e)
    return { formType: 'consent' }
  },
}
