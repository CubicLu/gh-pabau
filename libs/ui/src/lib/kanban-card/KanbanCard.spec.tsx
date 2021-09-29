import React from 'react'
import { render } from '@testing-library/react'
import KanbanCard from './KanbanCard'
import userImage from '../../assets/images/user.png'
import noUser from '../../assets/images/no-user-icon.svg'

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
        contactId={'contact id'}
        contactName={'Contact Name'}
        contactImg={noUser}
        activityStatus={'future activity scheduled'}
        leadStatus={'Open'}
      />
    )
    expect(baseElement).toBeTruthy()
  })
})
