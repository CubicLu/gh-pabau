import React from 'react'
import { render } from '@testing-library/react'

import Documents from './Documents'

const files = [
  {
    key: '0',
    status: 'active',
    name: 'Example file name',
    addedByDate: '2021-05-10 14:49:30',
    size: '2MB',
  },
]
const folders = [
  {
    name: 'Example folder 1',
    files: files,
  },
]

describe('Documents', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Documents
        headingLabel={'Example heading label'}
        folders={folders}
        handleUpload={() => {
          return true
        }}
      />
    )
    expect(baseElement).toBeTruthy()
  })
})
