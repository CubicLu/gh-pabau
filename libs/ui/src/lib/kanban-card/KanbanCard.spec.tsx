import React from 'react'

import { render } from '@testing-library/react'

import KanbanCard from './KanbanCard'

describe('KanbanCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<KanbanCard />)
    expect(baseElement).toBeTruthy()
  })
})
