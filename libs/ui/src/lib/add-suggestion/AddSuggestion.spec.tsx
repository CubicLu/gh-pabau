import React from 'react'
import { render } from '@testing-library/react'

import AddSuggestion from './AddSuggestion'

describe('AddSuggestion', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <AddSuggestion
        label={'Example label'}
        defaultSelected={[1, 2]}
        options={['Opt1', 'Opt2']}
        onChange={() => {
          return true
        }}
      />
    )
    expect(baseElement).toBeTruthy()
  })
})
