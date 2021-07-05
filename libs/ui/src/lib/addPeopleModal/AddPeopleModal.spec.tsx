import React from 'react'
import { render } from '@testing-library/react'
import AddPeopleModal from './AddPeopleModal'
import { groupData } from '../addGroupModal/AddGroupModal.stories'

describe('AddPeopleModal', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <AddPeopleModal isAddModalVisible={true} members={groupData} />
    )
    expect(baseElement).toBeTruthy()
  })
})
