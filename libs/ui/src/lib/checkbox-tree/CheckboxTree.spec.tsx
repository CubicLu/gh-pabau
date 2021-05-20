import React from 'react'
import { render } from '@testing-library/react'

import CheckboxTree from './CheckboxTree'

describe('CheckboxTree', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <CheckboxTree
        treeData={[{ title: 'Example 1', key: '0' }]}
        expandedKeys={['example expanded string key']}
        checkedKeys={['0']}
      />
    )
    expect(baseElement).toBeTruthy()
  })
})
