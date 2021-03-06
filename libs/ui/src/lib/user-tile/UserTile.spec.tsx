import React from 'react'
import { render } from '@testing-library/react'
import UserTile from './UserTile'
import { mockUsers } from './mock'

describe('UserTile', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <UserTile
        name={mockUsers.name}
        title={mockUsers.title}
        vacation={mockUsers.vacation}
        available={mockUsers.available}
        active={mockUsers.active}
        admin={mockUsers.admin}
        owner={mockUsers.owner}
      />
    )
    expect(baseElement).toBeTruthy()
  })
})
