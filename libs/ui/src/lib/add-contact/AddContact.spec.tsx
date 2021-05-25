import { render } from '@testing-library/react'
import React from 'react'
import AddContact from './AddContact'

describe('AddContact', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <AddContact
        visible={false}
        appointments={[]}
        contactType="family-member"
        onClose={() => {
          return
        }}
        onAddRelationship={(val) => {
          return
        }}
      />
    )
    expect(baseElement).toBeTruthy()
  })
})
