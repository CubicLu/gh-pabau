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
      <h3>Data: {JSON.stringify(data)}</h3>

      <Button onClick={() => window.history.back()}></Button>
      <Button onClick={() => onSubmit?.()}>Next</Button>
    </>
  )
}
ContractSelectionStep.loadData = {
  document: GetConsentDocument,
  variables: () => ({ formType: 'consent' }),
}
