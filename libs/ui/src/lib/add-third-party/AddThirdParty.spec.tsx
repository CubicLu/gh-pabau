import { render } from '@testing-library/react'
import React from 'react'
import AddThirdParty from './AddThirdParty'

describe('AddThirdParty', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <AddThirdParty
        visible={false}
        thirdPartyType="practice"
        onClose={() => {
          return
        }}
        onAddRelationship={(relationship) => {
          return
        }}
      />
    )
    expect(baseElement).toBeTruthy()
  })
})
