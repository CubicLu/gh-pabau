import React from 'react'
import { render } from '@testing-library/react'

import FeaturePermission from './FeaturePermission'

const containerType = [
  {
    name: 'Container example type',
    value: true,
    key: 1,
  },
]

const permissionFields = [
  {
    name: 'Example permission 1',
    description: 'Example description for permission 1',
    key: 1,
    container: containerType,
  },
]

const feature = [
  {
    id: '1',
    title: 'Feature example 1',
    subtitle: 'Subtitle example 1',
    permissionFields: permissionFields,
  },
]

describe('FeaturePermission', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FeaturePermission feature={feature} />)
    expect(baseElement).toBeTruthy()
  })
})
