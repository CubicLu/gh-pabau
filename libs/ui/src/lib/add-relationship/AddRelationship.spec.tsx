import { render } from '@testing-library/react'
import React from 'react'
import AddRelationship from './AddRelationship'

describe('AddRelationship', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <AddRelationship
        title="Add Relationship"
        visible={false}
        onClose={() => {
          return
        }}
        onOpenAddModal={(type) => {
          return
        }}
      />
    )
    expect(baseElement).toBeTruthy()
  })
})
