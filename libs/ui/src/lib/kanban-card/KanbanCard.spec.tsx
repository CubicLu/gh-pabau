import React from 'react'
import { render } from '@testing-library/react'
import KanbanCard from './KanbanCard'
import userImage from '../../assets/images/user.png'

describe('KanbanCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <KanbanCard
        leadTitle={'Lead Title'}
        onLeadTitleClickHandler={() => {
          return
        }}
        labels={['#Label1', '#Label2']}
        leadOwnerName={'Owner Name'}
        leadOwnerImg={userImage}
        contactName={'Contact Name'}
        contactImg={'contactImage'}
        activityStatus={'future activity scheduled'}
        leadStatus={'Open'}
      />
    )
    expect(baseElement).toBeTruthy()
  })
})
