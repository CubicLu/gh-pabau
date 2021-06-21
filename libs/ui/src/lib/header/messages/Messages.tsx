import React, { useState, MouseEvent, useEffect } from 'react'
import { Input, Drawer } from 'antd'
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
  Participant,
  Group,
} from '@pabau/ui'
import classNames from 'classnames'
import { DrawerProps } from 'antd/es/drawer'
import { Formik, FormikErrors } from 'formik'
import { Form, FormItem } from 'formik-antd'
import { useCreateChannelMutation } from '@pabau/graphql'

interface FormikProps {
  name: string
  description: string
}

export type MessagesProps = {
  /** DMs */
  chatList?: ChatMessage[]

  /** Rooms */
  roomList?: Group[]

  /** The focused channel */
  chatHistory?: {
    name: string
    chats?: ChatMessage[]
  }

  /** Close the whole chat panel */
  closeDrawer: () => void

  /** When the user opens a new conversation, we need to fetch more messages */
  onLoadMessages?(topic: Group | Participant): void

  /** User creating a new channel */
  onCreateChannel?: (
    name: string,
    description: string
    // isPrivate: boolean
  ) => void

  onMessageType?: (e: MouseEvent<HTMLElement>) => void
} & Pick<DrawerProps, 'visible'>

export const PabauMessages = ({
  closeDrawer,
  onMessageType,
  onCreateChannel,
  chatList = [],
  roomList,
  chatHistory,
  onLoadMessages,
  ...props
}: MessagesProps) => {
  const WidthEnum = {
    MessageBox: 392,
    ChatBox: 522,
  }
  const [drawerWidth, setDrawerWidth] = useState(WidthEnum.MessageBox)
  const [view, setView] = useState<Participant | Group | 'new-dm'>()
  const [showGlobalSearch, setGlobalSearch] = useState(false)
  // const [selectedGroup, setSelectedGroup] = useState('general')
  const [isGroupModalVisible, setIsGroupModalVisible] = useState(false)
  const [isAddModalVisible, setIsAddModalVisible] = useState(false)
  const [globalSearchValue, setGlobalSearchValue] = useState('')
  // const [typingContact, setTypingContact] = useState<Contact>()

  //createChannel
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [isPrivate, setIsPrivate] = useState(false)
  const [isCreateChannel, setIsCreateChannel] = useState(false)

  const [
    createChannelMutation,
    createChannelMutationResult,
  ] = useCreateChannelMutation({})

  const handleNameChange = (e): void => {
    if (e.target.value.length < 80) {
      const prefix = e.target.value.startsWith('#') ? '' : '#'
      setName(prefix + e.target.value)
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
    setView('new-dm')
    setDrawerWidth(WidthEnum.MessageBox + WidthEnum.ChatBox)
  }

  const closeNewDm = () => {
    closeDrawer()
  }

  useEffect(() => {
    typeof view === 'object' && onLoadMessages?.(view)
  }, [view])
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

  const handleGroupClick = (e) => {
    setView(e)
    setDrawerWidth(WidthEnum.ChatBox + WidthEnum.MessageBox)
  }

  const handleClick = (e) => {
    setView(e)
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
            onCreateModalClick={toggleCreateChannel}
            isHeaderShow={!showGlobalSearch}
            groups={roomList}
            active={typeof view === 'object' && 'participants' in view && view}
          />
          <ChatsList
            messages={chatList.filter((e) => !e.userName.startsWith('#'))}
            onClick={handleClick}
            // showGroupChatBox={showGroupChatBox}
            // showChatBox={showChatBox}
            // isNewDm={isNewDm}
            active={typeof view === 'object' && 'from' in view && view}
            isHeaderShow={!showGlobalSearch}
          />
        </div>

        <Formik
          initialValues={{ name: '', description: '' }}
          validate={(props) => {
            const { name, description } = props
            const errors: FormikErrors<FormikProps> = {}
            if (!name) errors.name = 'Required'
            if (!description) errors.description = 'Required'
            return errors
          }}
          onSubmit={async ({ name, description }, { setSubmitting }) => {
            setSubmitting(true)
            await onCreateChannel?.(name, description)
            setSubmitting(false)
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            isValid,
            /* and other goodies */
          }) => (
            <BasicModal
              modalWidth={682}
              centered={true}
              title="Create A Channel"
              newButtonText={'Create'}
              className={styles.createChannelModal}
              onOk={handleSubmit as any}
              isValidate={isValid}
              dangerButtonText={`Cancel`}
              onCancel={toggleCreateChannel}
              onDelete={toggleCreateChannel}
              visible={isCreateChannel}
            >
              <div className={styles.content}>
                Channels are where your team communicates. They’re best when
                organized around a topic – #marketing, for example.
              </div>

              <Form
              // style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}
              // labelCol={{ xs: 4 }}
              // wrapperCol={{ xs: 20 }}
              >
                <div className={styles.textControl}>
                  <div>Name</div>
                  <FormItem
                    name="firstName"
                    label="Firstname"
                    required={true}
                    //validate={() => false}
                  >
                    <Input
                      className={styles.nameInput}
                      placeholder="# e.g. plan-budget"
                      onChange={handleChange}
                      name="name"
                      suffix={80 - values.name.length}
                      prefix="#"
                      autoFocus
                    />
                  </FormItem>
                  {errors.name && touched.name && errors.name}
                </div>
                <div className={styles.textControl}>
                  <div>Description</div>
                  <Input
                    placeholder="What’s this channel about?"
                    name="description"
                    onChange={handleChange}
                  />
                </div>
                <div style={{ display: 'none' }}>
                  <div>Make private</div>
                  <div className={styles.switchContent}>
                    <div className={styles.switchText}>
                      When a channel is set to private, it can be only be viewed
                      or joined by invitation.
                    </div>
                    <div className={styles.switch}>
                      <Switch onChange={onChangeToPrivate} />
                    </div>
                  </div>
                </div>
              </Form>
            </BasicModal>
          )}
        </Formik>
      </div>
      {view === 'dm' && (
        <MessageContainer
          selectedContact={selectedContact}
          onClick={closeDrawer}
        />
      )}
      {view && typeof view === 'object' && 'participants' in view && (
        <div className={styles.chatBoxContainer}>
          <MessageContainer
            onClick={closeDrawer}
            messages={[
              ...((view.name.substring(1) === chatHistory?.name &&
                chatHistory.chats) ||
                []),
            ]}
            members={view.participants}
            // groupData={{}}
            // selectedGroup={view}
            onModalOpen={() => setIsGroupModalVisible(true)}
          />
          <AddGroupModal
            memberModalTitle={view.name}
            // groupData={groupData}
            // selectedGroup={selectedGroup}
            isGroupModalVisible={isGroupModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            onClick={handleAddClick}
          />
          <AddPeopleModal
            isAddModalVisible={isAddModalVisible}
            // members={members}
            // selectedGroup={selectedGroup}
            onOk={handleAddOk}
            onAddMembers={onAddMembers}
            onCancel={handleAddCancel}
          />
        </div>
      )}
      {view === 'new-dm' && (
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
