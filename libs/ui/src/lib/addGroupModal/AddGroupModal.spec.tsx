import React from 'react'
import { render } from '@testing-library/react'
import AddGroupModal from './AddGroupModal'
import { groupData } from './AddGroupModal.stories'

describe('AddGroupModal', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <AddGroupModal groupData={groupData} isGroupModalVisible={true} />
    )
    expect(baseElement).toBeTruthy()
  })
})
