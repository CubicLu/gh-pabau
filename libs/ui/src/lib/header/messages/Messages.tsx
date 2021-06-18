import React, { FC, useEffect, useState, MouseEvent } from 'react'
import { Drawer, Input } from 'antd'
import styles from './Messages.module.less'
import { CloseOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons'
import {
  BasicModal,
  Switch,
  GroupList,
  ChatsList,
  AddGroupModal,
  AddPeopleModal,
  MessageContainer,
  ChatMessage,
} from '@pabau/ui'
import classNames from 'classnames'
import { DrawerProps } from 'antd/es/drawer'

export type MessagesProps = {
  /** Combined list of channels and DM's */
  chatList?: ChatMessage[]

  /** ?? */
  closeDrawer: () => void

  onCreateChannel?: (
    name: string,
    description: string,
    isPrivate: boolean
  ) => void
  onMessageType?: (e: MouseEvent<HTMLElement>) => void
} & Pick<DrawerProps, 'visible'>

export const PabauMessages: FC<MessagesProps> = ({
  closeDrawer,
  onMessageType,
  onCreateChannel,
  chatList = [],
  ...props
}) => {
  const WidthEnum = {
    MessageBox: 392,
    ChatBox: 522,
  }
  const [selectedContact, setSelectedContact] = useState<Contact>()
  const [drawerWidth, setDrawerWidth] = useState(WidthEnum.MessageBox)
  const [view, setView] = useState<'dm' | 'group'>()
  const [showGlobalSearch, setGlobalSearch] = useState(false)
  const [selectedGroup, setSelectedGroup] = useState('general')
  const [isGroupModalVisible, setIsGroupModalVisible] = useState(false)
  const [isAddModalVisible, setIsAddModalVisible] = useState(false)
  // const [memberModalTitle, setMemberModalTitle] = useState('')

  const [globalSearchValue, setGlobalSearchValue] = useState('')
  const [typingContact, setTypingContact] = useState<Contact>()

  //createChaneel
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [isPrivate, setIsPrivate] = useState(false)
  const [isCreateChannel, setIsCreateChannel] = useState(false)

  //new DM
  const [isNewDm, setIsNewDm] = useState(false)

  const handleNameChange = (e): void => {
    if (e.target.value.length < 80) {
      setName(e.target.value)
    }
  }

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value)
  }

  const onChangeToPrivate = (checked) => {
    setIsPrivate(checked)
  }

  const onCreate = async () => {
    onCreateChannel
      ? await onCreateChannel(name, description, isPrivate)
      : toggleCreateChannel()
    toggleCreateChannel()
  }
  const toggleCreateChannel = () => {
    setIsCreateChannel(!isCreateChannel)
  }

  const toggleNewDm = () => {
    setShowChatBox(false)
    setShowGroupChatBox(false)
    setIsNewDm(true)
    setDrawerWidth(WidthEnum.MessageBox + WidthEnum.ChatBox)
  }

  const closeNewDm = () => {
    setIsNewDm(false)
    closeDrawer()
  }

  // useEffect(() => {
  //   if (selectedGroup !== '') {
  //     setMemberModalTitle(
  //       Object.keys(groupData[selectedGroup]).length +
  //         ' Members In #' +
  //         selectedGroup.charAt(0).toUpperCase() +
  //         selectedGroup.slice(1)
  //     )
  //   }
  // }, [selectedGroup])

  const handleGroupClick = () => {
    setShowGroupChatBox(true)
    setShowChatBox(false)
    setIsNewDm(false)
    setSelectedGroup(type)
    setDrawerWidth(WidthEnum.ChatBox + WidthEnum.MessageBox)
  }

  const handleClick = (e) => {
    setSelectedContact(e)
    setShowGroupChatBox(false)
    setShowChatBox(true)
    setIsNewDm(false)
    setDrawerWidth(WidthEnum.MessageBox + WidthEnum.ChatBox)
  }

  const handleOk = () => {
    setIsGroupModalVisible(false)
  }

  const handleAddOk = () => {
    setIsAddModalVisible(false)
  }

  const onAddMembers = () => {
    setIsAddModalVisible(false)
  }

  const handleCancel = () => {
    setIsGroupModalVisible(false)
  }

  const handleAddCancel = () => {
    setIsAddModalVisible(false)
  }

  const handleAddClick = () => {
    setIsAddModalVisible(true)
  }

  // const handleMessageType = (e) => {
  //   if (isNewDm || showGroupChatBox) {
  //     setTypingContact(undefined)
  //   } else {
  //     e.target.value !== ''
  //       ? setTypingContact(selectedContact)
  //       : setTypingContact(undefined)
  //   }
  //   onMessageType?.(e)
  // }

  const globalSearch = () => {
    setGlobalSearch((e) => !e)
  }

  const onHandleGlobalSearch = (value: string) => {
    // const reg = new RegExp(value.split('').join('\\w*').replace(/\W/, ''), 'i')
    // const resultData = chatListData.filter((person) => {
    //   if (reg.test(person.userName)) {
    //     return person
    //   }
    // })
    setGlobalSearchValue(value)
    //TODO: setChatMessage(resultData)
  }

  return (
    <Drawer
      {...props}
      width={drawerWidth}
      placement="right"
      closable={false}
      onClose={() => alert('TODO 65498')}
      className={styles.messagesDrawer}
    >
      <div className={styles.messageBox}>
        <div
          className={
            showGlobalSearch
              ? classNames(styles.chatSpace, styles.globalSearch)
              : styles.chatSpace
          }
        >
          {showGlobalSearch ? (
            <Input
              size="large"
              allowClear
              value={globalSearchValue}
              prefix={
                <SearchOutlined
                  className={classNames(
                    styles.grayTextColor,
                    styles.pr5,
                    styles.chatIconStyle
                  )}
                />
              }
              onChange={(e) => onHandleGlobalSearch(e.target.value)}
              onBlur={() => globalSearch()}
            />
          ) : (
            <div className={styles.messagesAlign}>
              <div>
                <h1>Chat</h1>
              </div>
              <div>
                <EditOutlined
                  onClick={toggleNewDm}
                  className={classNames(
                    styles.grayTextColor,
                    styles.pr5,
                    styles.chatIconStyle
                  )}
                />
                <SearchOutlined
                  className={classNames(
                    styles.grayTextColor,
                    styles.pr5,
                    styles.chatIconStyle
                  )}
                  onClick={globalSearch}
                />
                {view && ['dm', 'group'].includes(view) && (
                  <>
                    <h1>???</h1>
                    <CloseOutlined
                      className={classNames(
                        styles.grayTextColor,
                        styles.chatIconStyle,
                        styles.closeIcon
                      )}
                      onClick={closeDrawer}
                    />
                  </>
                )}
              </div>
            </div>
          )}
        </div>
        <div className={styles.chatPanel}>
          {showGlobalSearch && (
            <div
              className={classNames(styles.channelsText, styles.channelsHead)}
            >
              <p className={classNames(styles.grayTextColor, styles.textSm)}>
                chats &amp; channels
              </p>
            </div>
          )}
          <GroupList
            onClick={handleGroupClick}
            // showChatBox={showChatBox}
            isNewDm={isNewDm}
            onCreateModalClick={toggleCreateChannel}
            isHeaderShow={!showGlobalSearch}
            messages={chatList.filter((e) => e.userName.startsWith('#'))}
          />
          <ChatsList
            chatMessages={chatList.filter((e) => !e.userName.startsWith('#'))}
            onClick={handleClick}
            // showGroupChatBox={showGroupChatBox}
            // showChatBox={showChatBox}
            isNewDm={isNewDm}
            selectedContact={selectedContact}
            isHeaderShow={!showGlobalSearch}
          />
        </div>

        <BasicModal
          modalWidth={682}
          centered={true}
          title="create A Channel"
          newButtonText={'Create'}
          className={styles.createChannelModal}
          newButtonDisable={name.length <= 0}
          onOk={() => onCreate()}
          dangerButtonText={`Cancel`}
          onCancel={toggleCreateChannel}
          onDelete={toggleCreateChannel}
          visible={isCreateChannel}
        >
          <div className={styles.content}>
            Channels are where your team communicates. They’re best when
            organized around a topic – #marketing, for example.
          </div>
          <div className={styles.textControl}>
            <div>Name</div>
            <Input
              className={styles.nameInput}
              placeholder="# e.g. plan-budget"
              onChange={handleNameChange}
              value={name}
              suffix={80 - name.length}
            />
          </div>
          <div className={styles.textControl}>
            <div>Description</div>
            <Input
              placeholder="What’s this channel about?"
              onChange={handleDescriptionChange}
            />
          </div>
          <div>
            <div>Make private</div>
            <div className={styles.switchContent}>
              <div className={styles.switchText}>
                When a channel is set to private, it can be only be viewed or
                joined by invitation.
              </div>
              <div className={styles.switch}>
                <Switch onChange={onChangeToPrivate} />
              </div>
            </div>
          </div>
        </BasicModal>
      </div>
      {view === 'dm' && (
        <MessageContainer
          selectedContact={selectedContact}
          onClick={closeDrawer}
        />
      )}
      {view === 'group' && (
        <div className={styles.chatBoxContainer}>
          <MessageContainer
            onClick={closeDrawer}
            // groupData={groupData}
            selectedGroup={selectedGroup}
            onModalOpen={() => setIsGroupModalVisible(true)}
          />
          <AddGroupModal
            memberModalTitle={memberModalTitle}
            groupData={groupData}
            selectedGroup={selectedGroup}
            isGroupModalVisible={isGroupModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            onClick={handleAddClick}
          />
          <AddPeopleModal
            /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
            // @ts-ignore
            groupData={groupData}
            isAddModalVisible={isAddModalVisible}
            members={members}
            selectedGroup={selectedGroup}
            onOk={handleAddOk}
            onAddMembers={onAddMembers}
            onCancel={handleAddCancel}
          />
        </div>
      )}
      {isNewDm && (
        <MessageContainer
          isNewDm={isNewDm}
          members={members}
          messages={[]}
          onCloseNewDm={closeNewDm}
          onMessageType={handleMessageType}
        />
      )}
    </Drawer>
  )
}

export default PabauMessages
