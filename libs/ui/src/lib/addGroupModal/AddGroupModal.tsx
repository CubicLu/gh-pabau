import React, { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Input } from 'antd'
import { Button, BasicModal, Avatar } from '../../index'
import { SearchOutlined, PlusOutlined } from '@ant-design/icons'
import styles from './AddGroupModal.module.less'
import { Participant } from '../groupList/GroupList'

interface Member {
  userName: string
  profileURL: string
}

interface P {
  groupData?: Participant[]
  searchMember?: Member[]
  isGroupModalVisible: boolean
  memberModalTitle?: string
  searchMemberText?: string
  selectedGroup?: string
  onClick?: () => void
  onOk?: () => void
  onCancel?(): void
  onChange?(): void
}

export const AddGroupModal: FC<P> = ({ ...props }) => {
  const { t } = useTranslation('common')
  const {
    groupData,
    selectedGroup,
    memberModalTitle,
    isGroupModalVisible,
    onOk,
    onCancel,
    onChange,
    onClick,
  } = props

  const [searchMember, setSearchMember] = useState<Member[]>([])
  const [searchMemberText, setSearchMemberText] = useState('')

  const searchGroupMember = (value) => {
    const results = new Array<Member>()
    if (groupData && selectedGroup) {
      for (const v of groupData[selectedGroup]) {
        if (value !== '' && v.userName.includes(value)) {
          results.push(v)
        }
      }
      setSearchMember(results)
    }
  }

  const handleChange: Input['handleChange'] = (e) => {
    setSearchMemberText(e.target.value)
    searchGroupMember(e.target.value)
    onChange?.()
  }

  return (
    <div>
      <BasicModal
        centered
        title={memberModalTitle}
        visible={isGroupModalVisible}
        onOk={onOk}
        onCancel={() => onCancel?.()}
        width={680}
        className={styles.memberModal}
        footer={false}
      >
        <Button
          className={styles.modalAddButton}
          type="default"
          icon={<PlusOutlined />}
          size="middle"
          onClick={() => onClick?.()}
        >
          {t('addgroup.add')}
        </Button>
        <Input
          className={styles.modalSearchInput}
          size="large"
          placeholder={t('addgroup.input.placeholder')}
          prefix={<SearchOutlined />}
          onChange={handleChange}
        />
        {searchMemberText === '' &&
          selectedGroup &&
          groupData?.[selectedGroup].map(({ userName, profileURL }) => (
            <div key={userName} className={styles.modalMember}>
              <div className={styles.memberInfo}>
                <Avatar
                  className={styles.memberAvatar}
                  size={32}
                  src={profileURL}
                />
                <span className={styles.memberName}>{userName}</span>
              </div>
              <Button type="default" size="middle">
                {t('addgroup.remove')}
              </Button>
            </div>
          ))}
        {searchMemberText !== '' &&
          searchMember?.map(({ userName, profileURL }) => (
            <div key={userName} className={styles.modalMember}>
              <div className={styles.memberInfo}>
                <Avatar
                  className={styles.memberAvatar}
                  size={32}
                  src={profileURL}
                />
                <span className={styles.memberName}>{userName}</span>
              </div>
              <Button type="default" size="middle">
                {t('addgroup.remove')}
              </Button>
            </div>
          ))}
      </BasicModal>
    </div>
  )
}

export default AddGroupModal
