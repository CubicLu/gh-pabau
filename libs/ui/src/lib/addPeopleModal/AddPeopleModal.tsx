import React, { useState } from 'react'
import { Select } from 'antd'
import { BasicModal, Button, Avatar, Participant } from '@pabau/ui'
import styles from './AddPeopleModal.module.less'

const { Option } = Select

export interface P {
  searchAddMember?: Participant[]
  members: Participant[]
  selectedGroup?: string
  isAddModalVisible: boolean
  onOk?: () => void
  onCancel?: () => void
  onAddMembers?: (value: string[]) => void
}

export const AddPeopleModal = ({
  selectedGroup,
  isAddModalVisible,
  onOk,
  onCancel,
  members,
  onAddMembers,
}: P): JSX.Element => {
  const [searchAddMember, setSearchAddMember] = useState<string[]>([])
  const [isCancelWarning, setIsCancelWarning] = useState<boolean>(false)

  const handleAddMemberChange = (value) => {
    setSearchAddMember(value)
  }

  const handleAddMemberClick = () => {
    onAddMembers?.(searchAddMember)
  }

  const toggleCancelWarning = () => {
    setIsCancelWarning(!isCancelWarning)
  }

  const handleCancelWarningClose = () => {
    setIsCancelWarning(false)
    onCancel?.()
  }

  return (
    <div>
      <BasicModal
        centered
        title="Add People"
        visible={isAddModalVisible}
        onOk={onOk}
        onCancel={() => onCancel?.()}
        width={680}
        className={styles.addMemberModal}
        footer={false}
      >
        <span>#{selectedGroup}</span>
        <div className={styles.peopleSearch}>
          <Select
            mode="multiple"
            style={{ width: '100%' }}
            placeholder="Type the name of a channel or people"
            onChange={handleAddMemberChange}
          >
            {members?.map(({ id, name, avatarURL }) => (
              <Option key={id} value={id} label={name}>
                <div>
                  <span role="img">
                    <Avatar
                      className={styles.memberAvatar}
                      size={32}
                      src={avatarURL}
                    />
                  </span>
                  {name}
                </div>
              </Option>
            ))}
          </Select>
        </div>
        <div className={styles.modalBtn}>
          <Button
            type="default"
            size="middle"
            onClick={toggleCancelWarning}
            className={styles.cancelBtn}
          >
            Cancel
          </Button>
          <div className={styles.addBtnWrapper}>
            <Button
              type="default"
              size="middle"
              onClick={handleAddMemberClick}
              disabled={searchAddMember.length <= 0}
              className={styles.addBtn}
            >
              Add
            </Button>
          </div>
        </div>
      </BasicModal>
      {isCancelWarning && (
        <BasicModal
          modalWidth={682}
          centered={true}
          title="Close without adding anyone to this channel?"
          newButtonText={'Close'}
          className={styles.warningModel}
          onOk={handleCancelWarningClose}
          dangerButtonText={`Keep adding`}
          onCancel={toggleCancelWarning}
          onDelete={toggleCancelWarning}
          visible={isCancelWarning}
        />
      )}
    </div>
  )
}

export default AddPeopleModal
