import React from 'react'
import { render } from '@testing-library/react'
import { MergeTagModal } from '@pabau/ui'

describe('MergeTagModal', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MergeTagModal disabledTags={[]} />)
    expect(baseElement).toBeTruthy()
  })
})
