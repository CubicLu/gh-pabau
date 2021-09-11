import React, { FC, useEffect, useRef, useState } from 'react'
import useDrivePicker from 'react-google-drive-picker'
import { gapi } from 'gapi-script'
import { Avatar, BasicModal, BasicModalProps, TabMenu } from '@pabau/ui'
import { tagList, TagModule, TagModuleItems } from '../merge-tag-modal/data'
import { FilePreviewerThumbnail } from 'react-file-previewer'
import {
  Dropdown,
  Menu,
  Button,
  Tabs,
  Modal,
  Progress,
  Typography,
  Select,
  Input,
  Tag,
  Popover,
  Tooltip,
  Badge,
} from 'antd'
import {
  PlusOutlined,
  CloudUploadOutlined,
  FileAddOutlined,
  CaretDownOutlined,
  PaperClipOutlined,
  CheckCircleFilled,
  UpOutlined,
} from '@ant-design/icons'
import { ReactComponent as PhotoIcon } from '../../assets/images/icon.svg'
import { ReactComponent as LabIcon } from '../../assets/images/lab-order.svg'
import { ReactComponent as PdfIcon } from '../../assets/images/pdfIcon.svg'
import styles from './AllTemplateModal.module.less'
import { useTranslation } from 'react-i18next'
import cn from 'classnames'
const { Option } = Select
const { TabPane } = Tabs
export interface AllTemplateProps {
  title: string
  category: string
  image: string
  id: string
}
export interface AllDocumentProps {
  key: number
  title: string
  category: string
  image: string
  url: string
}
export interface CategoryOptionsProps {
  key: number
  content: string
}
export interface TopCategoriesProps {
  key: number
  title: string
}
export interface mergeTagProps {
  tag: string
  value: string
}
export interface recipientProps {
  avatar: string
  firstName?: string
  lastName?: string
  company?: string
  email: string
  relationship: string
  mergeTag: mergeTagProps[]
}
interface Contract {
  name: string
  email: string
}

interface r1 {
  text: string
  matchCase: boolean
}
interface r2 {
  containsText: r1
  replaceText: string
}
interface requestProps {
  replaceAllText: r2
}
export interface AllTemplateModalProps extends BasicModalProps {
  title?: string
  visible?: boolean
  categoryOptions: CategoryOptionsProps[]
  topCategories: TopCategoriesProps[]
  tagModuleItems?: TagModuleItems
  selectedTag?: string
  recipientList: recipientProps[]
  allDocument?: AllDocumentProps[]
}

export const AllTemplateModalDynamic: FC<AllTemplateModalProps> = ({
  title,
  visible,
  categoryOptions,
  topCategories,
  tagModuleItems = tagList,
  selectedTag = '',
  recipientList,
  allDocument,
}) => {
  const recipientProperty = {
    'family-member': {
      class: styles.familyMemberTag,
      name: 'Family',
    },
    'emergency-contact': {
      class: styles.emergencyContactTag,
      name: 'Patient',
    },
    'next-of-kin': {
      class: styles.nextOfKinTag,
      name: 'Patient',
    },
    practioner: {
      class: styles.practionerTag,
      name: 'GP',
    },
    'insurance-provider': {
      class: styles.insuranceProviderTag,
      name: 'Insurance Provider',
    },
    company: {
      class: styles.companyTag,
      name: 'Company',
    },
  }
  const { t } = useTranslation('common')
  const [openPicker, data] = useDrivePicker()
  const [templateList, setTemplateList] = useState<AllTemplateProps[]>([])
  const [isPreloaderVisible, setPreLoader] = useState<boolean>(false)
  const [isEditDocModal, setEditModal] = useState<boolean>(false)
  const [subject, setSubject] = useState('')
  const [fileName, setFileName] = useState('')
  const [isImportTemplate, setIsImportTemplate] = useState(false)
  const [isTemplateClicked, setIsTemplateClicked] = useState(false)
  const [isBlankTemplate, setIsBlankTemplate] = useState(false)
  const [docId, setDocId] = useState<string>('')
  const [newDocId, setNewDocId] = useState('')
  const [isUseToCreateLetter, setIsUseToCreateLetter] = useState(true)
  const [receipients, setReceipients] = useState('')
  const [showToPopover, setShowToPopover] = useState(false)
  const [showBccPopover, setShowBccPopover] = useState(false)
  const [showCcPopover, setShowCcPopover] = useState(false)
  const [sendToItem, setSendToItem] = useState('')
  const [sendTo, setSendTo] = useState<Contract[]>([])
  const [ccList, setCcList] = useState<Contract[]>([])
  const [ccItem, setCcItem] = useState('')
  const [bccList, setBccList] = useState<Contract[]>([])
  const [bccItem, setBccItem] = useState('')
  const [editCcList, setEditCcList] = useState(false)
  const [editBccList, setEditBccList] = useState(false)
  const recipRef = useRef<HTMLDivElement>(null)
  const [mergeTags, setMergeTags] = useState<mergeTagProps[]>([])
  const [isFooter, setIsFooter] = useState(false)
  const [category, setCategory] = useState('')
  const [templateName, setTemplateName] = useState('')
  const [isLinkModal, setIsLinkModal] = useState(false)
  const [webLink, setWeblink] = useState('')
  const [isAttachModal, setIsAttachModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedDocument, setSelectedDocument] = useState<AllDocumentProps[]>(
    []
  )
  const [currentTag, setCurrentTag] = useState('')
  const [isAttached, setIsAttached] = useState(false)

  useEffect(() => {
    if (data) {
      const selectedDocuments: AllTemplateProps[] = []
      gapi.client.drive.files
        .export({
          fileId: data.docs[0].id,
          mimeType: 'application/pdf',
        })
        .then(function (response) {
          const template = {
            title: data.docs[0].name,
            category: 'Uncategorized',
            image: btoa(response.body),
            id: data.docs[0].id,
          }
          selectedDocuments.push(template)
          setTemplateList((value) => [...value, ...selectedDocuments])
        })
    }
  }, [data])
  useEffect(() => {
    if (
      isImportTemplate ||
      (isTemplateClicked && docId) ||
      !isUseToCreateLetter ||
      isBlankTemplate
    ) {
      handleClick()
    }
  })
  useEffect(() => {
    setFileName(getFileName(subject))
  }, [subject])
  function getFileName(sub) {
    const now = new Date()
    const year = now.getFullYear()
    let month = (now.getMonth() + 1).toString()
    let day = now.getDate().toString()
    let hour = now.getHours().toString()
    let minute = now.getMinutes().toString()
    let second = now.getSeconds().toString()
    if (month.length === 1) {
      month = '0' + month
    }
    if (day.length === 1) {
      day = '0' + day
    }
    if (hour.length === 1) {
      hour = '0' + hour
    }
    if (minute.length === 1) {
      minute = '0' + minute
    }
    if (second.length === 1) {
      second = '0' + second
    }
    const fileName =
      sub +
      ' ' +
      day +
      '-' +
      month +
      '-' +
      year +
      ' ' +
      hour +
      ':' +
      minute +
      ':' +
      second
    return fileName
  }

  const handleSubjectInput = (e) => {
    setSubject(e.target.value)
  }
  const createTemplateMenu = [
    {
      title: t('ui.all-template-modal.create-new-first-option'),
      icon: <CloudUploadOutlined />,
    },
    {
      title: t('ui.all-template-modal.create-new-second-option'),
      icon: <FileAddOutlined />,
    },
  ]
  function copyFile() {
    setIsLoading(true)
    gapi.client
      .request({
        path: `drive/v3/files/${docId}/copy`,
        method: 'POST',
        body: {
          title: 'New Landmax SS from API 6',
        },
      })
      .then(function (response) {
        if (response.result) {
          setNewDocId(response.result.id)
          setSubject(response.result.name)
          setFileName(getFileName(response.result.name))
        }
        setEditModal(true)
        setIsLoading(false)
      })
    setIsTemplateClicked(false)
  }
  const handleCreateTemplate = () => {
    setFileName(getFileName('New Template'))
    setIsBlankTemplate(true)
    setIsFooter(true)
  }
  function createBlankTemplate() {
    setNewDocId('')
    setIsLoading(true)
    setIsBlankTemplate(false)
    const fileMetadata = {
      name: fileName,
      mimeType: 'application/vnd.google-apps.document',
    }
    gapi.client.drive.files
      .create({
        resource: fileMetadata,
        fields: '*',
      })
      .then(function (resp) {
        setTemplateName(resp.result.name)
        setNewDocId(resp.result.id)
        setEditModal(true)
        setIsLoading(false)
      })
  }
  const createTemplate = () => {
    gapi.client.drive.files
      .export({
        fileId: newDocId,
        mimeType: 'application/pdf',
      })
      .then(function (response) {
        const template = {
          title: templateName,
          image: btoa(response.body),
          id: newDocId,
          category: category,
        }
        const new_template: AllTemplateProps[] = []
        new_template.push(template)
        setTemplateList((value) => [...value, ...new_template])
      })
    setEditModal(false)
    setIsFooter(false)
  }
  const handleTemplateClick = (id) => {
    setIsTemplateClicked(true)
    setDocId(id)
  }
  const renderAllTemplate = (menuName) => {
    return templateList?.map(
      (item) =>
        (item.category === menuName || menuName === 'All') && (
          <div key={item.title} className={styles.subWrap}>
            <FilePreviewerThumbnail
              file={{
                data: item.image,
                mimeType: 'application/pdf',
              }}
              onClick={() => handleTemplateClick(item.id)}
              style={{
                border: '1px solid #CFCFD7',
                borderRadius: '4px',
                cursor: 'pointer',
                height: '138px',
                width: '120px',
              }}
            />
            <div className={styles.templateTitle}>{item.title}</div>
            <div className={styles.templateName}>{item.category}</div>
          </div>
        )
    )
  }
  const handleSelectDocument = (item: AllDocumentProps) => {
    const docs = [...selectedDocument]
    if (
      selectedDocument.find(
        (el) => el.title === item.title && el.image === item.image
      )
    ) {
      const index = selectedDocument.findIndex(
        (el) => el.title === item.title && el.image === item.image
      )
      docs.splice(index, 1)
      setSelectedDocument(docs)
    } else {
      setSelectedDocument([...selectedDocument, item])
    }
  }
  const renderAllDocument = (menuName) => {
    return allDocument?.map(
      (item) =>
        (item.category === menuName || menuName === 'All') && (
          <div key={item.key} className={styles.subWrap}>
            <div
              className={cn(
                styles.docItem,
                selectedDocument.find(
                  (el) => el.title === item.title && el.image === item.image
                )
                  ? styles.selected
                  : ''
              )}
              key={item.key}
              style={{ backgroundImage: `url(${item.image})` }}
              onClick={() => handleSelectDocument(item)}
            >
              <CheckCircleFilled className={styles.checkIcon} />
            </div>
            <div className={styles.templateTitle}>{item.title}</div>
            <div className={styles.templateName}>{item.category}</div>
          </div>
        )
    )
  }
  const renderAddCategory = () => {
    return (
      <Dropdown
        overlayClassName={styles.addCategoryWrapper}
        overlay={categorymenu}
        placement="bottomRight"
        arrow
      >
        <Button className={styles.addcategory}>
          <PlusOutlined />
          {t('ui.all-template-modal.add-category')}
        </Button>
      </Dropdown>
    )
  }
  const renderTopTabMenus = () => {
    return topCategories.map((menu) => (
      <TabPane tab={menu.title} key={menu.key}>
        <div className={styles.templateWrap}>
          {!isAttachModal
            ? renderAllTemplate(menu.title)
            : renderAllDocument(menu.title)}
        </div>
      </TabPane>
    ))
  }
  const renderTopTab = () => {
    return (
      <div className={styles.secoundtab}>
        <Tabs tabPosition={'top'} tabBarExtraContent={renderAddCategory()}>
          {renderTopTabMenus()}
        </Tabs>
      </div>
    )
  }
  const renderCreateTemplate = () => {
    return (
      <div>
        <Dropdown overlayClassName={styles.customCreateBtn} overlay={menu}>
          <Button className={styles.createnewbtn}>
            <PlusOutlined /> {t('ui.all-template-modal.create-new')}{' '}
            <CaretDownOutlined />
          </Button>
        </Dropdown>
      </div>
    )
  }
  const renderCreateNew = () => {
    return (
      <div>
        <Dropdown
          overlayClassName={styles.customCreateBtn}
          overlay={createNewMenu}
        >
          <Button className={styles.createnewbtn}>
            <PlusOutlined /> {t('ui.all-template-modal.create-new')}{' '}
            <CaretDownOutlined />
          </Button>
        </Dropdown>
      </div>
    )
  }

  const renderLeftTab = () => {
    return (
      <Tabs className={styles.maintab} tabPosition={'left'}>
        <TabPane tab={t('ui.all-template-modal.first-left-tab')} key="1">
          {renderTopTab()}
        </TabPane>
        <TabPane tab={t('ui.all-template-modal.second-left-tab')} key="2">
          {renderTopTab()}
        </TabPane>
        <TabPane tab={t('ui.all-template-modal.third-left-tab')} key="3">
          {renderTopTab()}
        </TabPane>
        <TabPane
          className={styles.buttab}
          disabled
          tab={!isAttachModal ? renderCreateTemplate() : renderCreateNew()}
          key="4"
        >
          create template
        </TabPane>
      </Tabs>
    )
  }

  const handleOpenPicker = () => {
    setIsImportTemplate(false)
    openPicker({
      clientId:
        '312504164675-a6m5avc8ampbs9dshepb3dkbgvqbtaqa.apps.googleusercontent.com',
      developerKey: 'AIzaSyB220K3PhuJAa14W5YmpJwzXBYgPyT0BGk',
      viewId: 'DOCUMENTS',
      supportDrives: true,
    })
  }

  const handleClickEvent = (e) => {
    if (e.key === 'Import templates') {
      setIsImportTemplate(true)
    } else if (e.key === 'Blank template') {
      handleCreateTemplate()
    }
  }
  const createNewMenu = (
    <Menu>
      {createTemplateMenu?.map((item) => (
        <Menu.Item key={item.title}>
          {item.icon} {item.title}
        </Menu.Item>
      ))}
    </Menu>
  )
  const menu = (
    <Menu onClick={handleClickEvent}>
      {createTemplateMenu?.map((item) => (
        <Menu.Item key={item.title}>
          {item.icon} {item.title}
        </Menu.Item>
      ))}
    </Menu>
  )
  const categorymenu = (
    <Menu>
      {categoryOptions?.map((item) => (
        <Menu.Item key={item.key} className={styles.addcategorydropdown}>
          {item.content}
        </Menu.Item>
      ))}
    </Menu>
  )

  function handleClick() {
    gapi.load('client:auth2', openDoc)
  }
  function openDoc() {
    const scopes =
      'https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/documents https://www.googleapis.com/auth/drive.readonly'
    gapi.client
      .init({
        apiKey: 'AIzaSyB220K3PhuJAa14W5YmpJwzXBYgPyT0BGk',
        clientId:
          '312504164675-a6m5avc8ampbs9dshepb3dkbgvqbtaqa.apps.googleusercontent.com',
        discoveryDocs: [
          'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest',
        ],
        scope: scopes,
      })
      .then(
        function () {
          const authToken = gapi.auth2
            .getAuthInstance()
            .currentUser.get()
            .getAuthResponse().access_token
          gapi.client.setToken({ access_token: authToken })
          gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus)
          updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get())
        },
        function (error) {
          console.log(error)
        }
      )
  }

  const updateSigninStatus = (isSignedIn) => {
    if (isSignedIn) {
      isImportTemplate && handleOpenPicker()
      isTemplateClicked && copyFile()
      !isUseToCreateLetter && changeFileName()
      isBlankTemplate && createBlankTemplate()
    } else {
      handleAuthClick()
    }
  }
  const handleAuthClick = () => {
    gapi.auth2.getAuthInstance().signIn()
  }
  const menuList = (tagModuleItems: TagModuleItems) => {
    const _temp: string[] = []
    for (let i = 0; i < Object.keys(tagModuleItems).length; i++) {
      _temp.push(tagModuleItems[Object.keys(tagModuleItems)[i]].displayName)
    }
    return _temp
  }
  const onClick = (tag: TagModule, key: string, index: number) => {
    navigator.clipboard.writeText(tag.tag)
    setCurrentTag(tag.tag)
    setTimeout(() => setCurrentTag(''), 2500)
  }
  const changeFileName = () => {
    const requests: requestProps[] = []
    for (const Merge_tag of mergeTags) {
      const request = {
        replaceAllText: {
          containsText: {
            text: Merge_tag.tag,
            matchCase: true,
          },
          replaceText: Merge_tag.value,
        },
      }
      requests.push(request)
    }
    gapi.client.drive.files
      .update({
        fileId: newDocId,
        resource: {
          name: fileName,
        },
      })
      .then(function (response) {
        return gapi.client
          .request({
            path: `https://docs.googleapis.com/v1/documents/${newDocId}:batchUpdate`,
            method: 'POST',
            body: {
              requests: requests,
            },
          })
          .then(function (response) {
            if (response) {
              setPreLoader(false)
            }
          })
      })
  }
  const createLetterHandler = () => {
    setPreLoader(true)
    setIsUseToCreateLetter(false)
    setEditModal(false)
  }
  const validateEmail = (email) => {
    const re = /^(([^\s"(),.:;<>@[\\\]]+(\.[^\s"(),.:;<>@[\\\]]+)*)|(".+"))@((\[(?:\d{1,3}\.){3}\d{1,3}])|(([\dA-Za-z]+\.)+[A-Za-z]{2,}))$/
    return re.test(email)
  }
  const addToItem = (e, recipient) => {
    e.preventDefault()
    const findIndex = sendTo.findIndex((el) => el.email === recipient.email)
    if (findIndex < 0) {
      const {
        company,
        firstName,
        lastName,
        relationship,
        email,
        mergeTag,
      } = recipient
      const item = {
        email,
        name:
          relationship === 'company' || relationship === 'insurance-provider'
            ? company
            : `${firstName} ${lastName}`,
      }
      const items = [item]
      setSendTo(items)
      setMergeTags(mergeTag)
    }
    setShowToPopover(false)
  }

  const addCcItem = (e, recipient) => {
    e.preventDefault()
    const findIndex = ccList.findIndex((el) => el.email === recipient.email)
    if (findIndex < 0) {
      const { company, firstName, lastName, relationship, email } = recipient
      const item = {
        email,
        name:
          relationship === 'company' || relationship === 'insurance-provider'
            ? company
            : `${firstName} ${lastName}`,
      }
      const items = [...ccList, item]
      setCcList(items)
    }
    setShowCcPopover(false)
  }

  const addBccItem = (e, recipient) => {
    e.preventDefault()
    const findIndex = bccList.findIndex((el) => el.email === recipient.email)
    if (findIndex < 0) {
      const { company, firstName, lastName, relationship, email } = recipient
      const item = {
        email,
        name:
          relationship === 'company' || relationship === 'insurance-provider'
            ? company
            : `${firstName} ${lastName}`,
      }
      const items = [...bccList, item]
      setBccList(items)
    }
    setShowBccPopover(false)
  }
  const recipientListContentForTo = (
    <div ref={recipRef}>
      {recipientList.map((recipient, index) => (
        <div
          key={`recipient-${index}`}
          className={styles.recipient}
          onClick={(e) => addToItem(e, recipient)}
        >
          <div>
            <Avatar src={recipient.avatar} size={32} />
          </div>
          <div>
            <div className={styles.name}>
              {recipient.relationship === 'company' ||
              recipient.relationship === 'insurance-provider'
                ? recipient.company
                : `${recipient.firstName} ${recipient.lastName}`}
            </div>
            <div className={styles.email}>{recipient.email}</div>
          </div>
          <div>
            <Tag className={recipientProperty[recipient.relationship].class}>
              {recipientProperty[recipient.relationship].name}
            </Tag>
          </div>
        </div>
      ))}
      <div className={styles.addRelationship}>
        Add a relationship to send to more parties
      </div>
    </div>
  )

  const recipientListContentForCc = (
    <div ref={recipRef}>
      {recipientList.map((recipient, index) => (
        <div
          key={`recipient-${index}`}
          className={styles.recipient}
          onClick={(e) => addCcItem(e, recipient)}
        >
          <div>
            <Avatar src={recipient.avatar} size={32} />
          </div>
          <div>
            <div className={styles.name}>
              {recipient.relationship === 'company' ||
              recipient.relationship === 'insurance-provider'
                ? recipient.company
                : `${recipient.firstName} ${recipient.lastName}`}
            </div>
            <div className={styles.email}>{recipient.email}</div>
          </div>
          <div>
            <Tag className={recipientProperty[recipient.relationship].class}>
              {recipientProperty[recipient.relationship].name}
            </Tag>
          </div>
        </div>
      ))}
      <div className={styles.addRelationship}>
        Add a relationship to send to more parties
      </div>
    </div>
  )

  const recipientListContentForBcc = (
    <div ref={recipRef}>
      {recipientList.map((recipient, index) => (
        <div
          key={`recipient-${index}`}
          className={styles.recipient}
          onClick={(e) => addBccItem(e, recipient)}
        >
          <div>
            <Avatar src={recipient.avatar} size={32} />
          </div>
          <div>
            <div className={styles.name}>
              {recipient.relationship === 'company' ||
              recipient.relationship === 'insurance-provider'
                ? recipient.company
                : `${recipient.firstName} ${recipient.lastName}`}
            </div>
            <div className={styles.email}>{recipient.email}</div>
          </div>
          <div>
            <Tag className={recipientProperty[recipient.relationship].class}>
              {recipientProperty[recipient.relationship].name}
            </Tag>
          </div>
        </div>
      ))}
      <div className={styles.addRelationship}>
        Add a relationship to send to more parties
      </div>
    </div>
  )
  const handleAddSendToList = () => {
    if (sendToItem) {
      setSendTo([...sendTo, { name: '', email: sendToItem }])
      setSendToItem('')
      setShowToPopover(false)
    }
  }
  const handleSendToClose = (e, index) => {
    e.preventDefault()
    const items = [...sendTo]
    items.splice(index, 1)
    setSendTo(items)
  }
  const handleAddCcList = () => {
    if (ccItem) {
      setCcList([...ccList, { name: '', email: ccItem }])
      setCcItem('')
      setShowCcPopover(false)
    }
  }

  const handleAddBccList = () => {
    if (bccItem) {
      setBccList([...bccList, { name: '', email: bccItem }])
      setBccItem('')
      setShowBccPopover(false)
    }
  }

  const handleCcClose = (e, index) => {
    e.preventDefault()
    const items = [...ccList]
    items.splice(index, 1)
    setCcList(items)
  }

  const handleBccClose = (e, index) => {
    e.preventDefault()
    const items = [...bccList]
    items.splice(index, 1)
    setBccList(items)
  }
  const getWebLink = () => {
    setWeblink(`http://localhost:4200/document?id=${newDocId}`)
    setIsLinkModal(true)
    setEditModal(false)
    setIsAttached(false)
    setSelectedDocument([])
    setIsUseToCreateLetter(true)
  }
  const copyLink = () => {
    navigator.clipboard.writeText(webLink)
    setIsLinkModal(false)
  }
  const closeHandler = () => {
    setEditModal(false)
    setIsFooter(false)
  }
  const handleClose = () => {
    setEditModal(false)
    setSelectedDocument([])
    setIsUseToCreateLetter(true)
    setIsAttached(false)
  }
  const saveMenu = (
    <Menu>
      <Menu.Item key="0">
        <span>
          <Tag color="red">Awaiting correction</Tag>
        </span>
      </Menu.Item>
      <Menu.Item key="1">
        <span>
          <Tag color="gold">Transcribing</Tag>
        </span>
      </Menu.Item>
      <Menu.Item key="2">
        <span>
          <Tag color="green">Completed</Tag>
        </span>
      </Menu.Item>
      <Menu.Item key="3">
        <span>
          <Tag color="cyan">Awaiting review</Tag>
        </span>
      </Menu.Item>
    </Menu>
  )

  const renderSaveDropdown = () => {
    return (
      <Dropdown
        overlayClassName={styles.saveMenuWrapper}
        overlay={saveMenu}
        placement="topRight"
        arrow
      >
        <Button
          style={{ borderRadius: '4px' }}
          type="primary"
          onClick={getWebLink}
        >
          {' '}
          Save <UpOutlined />
        </Button>
      </Dropdown>
    )
  }
  const iconCategorywise = [
    {
      category: 'Photos',
      icon: <PhotoIcon />,
    },
    {
      category: 'Lab results',
      icon: <LabIcon />,
    },
    {
      category: 'Forms',
      icon: <PdfIcon />,
    },
  ]
  const attachMenu = (
    <Menu>
      {selectedDocument?.map((item) =>
        iconCategorywise.map(
          (e) =>
            item.category === e.category && (
              <Menu.Item
                key={item.key}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                }}
              >
                {e.icon} &nbsp;&nbsp;&nbsp;{item.title}
              </Menu.Item>
            )
        )
      )}
    </Menu>
  )
  const renderAttchDropdown = () => {
    return (
      <Dropdown overlay={attachMenu} placement="topRight" arrow>
        <Button
          style={{ marginRight: '10px' }}
          size="middle"
          shape="circle"
          icon={
            <Badge
              count={selectedDocument.length}
              style={{ background: '#54B2D3' }}
              offset={[10, -3]}
            >
              <PaperClipOutlined />
            </Badge>
          }
        />
      </Dropdown>
    )
  }
  const handleAttachFile = () => {
    setIsAttachModal(false)
    let urlToBeMErge = ''
    selectedDocument.map(
      (e) => (urlToBeMErge += `<div><a href='${e.url}'>${e.url}</a></div>`)
    )
    gapi.client.drive.files
      .export({
        fileId: newDocId,
        mimeType: 'text/html',
      })
      .then(function (response) {
        const data = response.body + urlToBeMErge
        const boundary = '-------314159265358979323846'
        const delimiter = '\r\n--' + boundary + '\r\n'
        const close_delim = '\r\n--' + boundary + '--'
        const contentType = 'application/vnd.google-apps.document'
        const base64Data = btoa(data)
        const fileMetadata = {
          mimeType: contentType,
        }
        const multipartRequestBody =
          delimiter +
          'Content-Type: application/json\r\n\r\n' +
          JSON.stringify(fileMetadata) +
          delimiter +
          'Content-Type: ' +
          contentType +
          '\r\n' +
          'Content-Transfer-Encoding: base64\r\n' +
          '\r\n' +
          base64Data +
          close_delim
        gapi.client
          .request({
            path: '/upload/drive/v2/files/' + newDocId,
            method: 'PUT',
            params: { uploadType: 'multipart', alt: 'json' },
            headers: {
              'Content-Type': 'multipart/mixed; boundary="' + boundary + '"',
            },
            body: multipartRequestBody,
          })
          .then(function (resp) {
            setIsAttached(true)
          })
      })
  }
  return (
    <>
      <BasicModal
        className={styles.tempModal}
        visible={visible}
        title={title}
        modalWidth={936}
        footer={false}
      >
        <div>{renderLeftTab()}</div>
      </BasicModal>
      <Modal
        footer={null}
        visible={isPreloaderVisible}
        closable={false}
        width={'504px'}
        afterClose={() => setEditModal(true)}
      >
        <div className={styles.preloaderModal}>
          <Typography className={styles.preloaderTypography1}>
            Creating Document From Template...
          </Typography>
          <Typography className={styles.preloaderTypography2}>
            Please wait while a letter is created from the template
          </Typography>
          <Progress
            type="circle"
            percent={75}
            strokeColor="#FAAD14"
            width={80}
            strokeWidth={6}
          />
        </div>
      </Modal>
      <Modal
        width="1392"
        title={'Edit document'}
        visible={isEditDocModal}
        className={styles.customModalEdit}
        footer={[
          <span key="1">
            {!isFooter ? (
              <span>
                {isAttached ? renderAttchDropdown() : null}
                {!isUseToCreateLetter ? (
                  <Button
                    style={{
                      color: '#9292A3',
                      marginRight: '10px',
                      borderRadius: '4px',
                    }}
                    icon={<PaperClipOutlined />}
                    onClick={() => setIsAttachModal(true)}
                  >
                    Attach
                  </Button>
                ) : null}
                <Button
                  onClick={handleClose}
                  style={{
                    fontSize: '14px',
                    lineHeight: '20px',
                    color: '#9292A3',
                    marginRight: '16px',
                    borderRadius: '4px',
                  }}
                >
                  Close
                </Button>
                <span>
                  {isUseToCreateLetter ? (
                    <Button
                      type="primary"
                      style={{ borderRadius: '4px' }}
                      onClick={createLetterHandler}
                    >
                      Use to create letter
                    </Button>
                  ) : (
                    <span>{renderSaveDropdown()}</span>
                  )}
                </span>
              </span>
            ) : (
              <span>
                <Button
                  style={{
                    fontSize: '14px',
                    lineHeight: '20px',
                    color: '#9292A3',
                    marginRight: '16px',
                    borderRadius: '4px',
                  }}
                  onClick={closeHandler}
                >
                  Close
                </Button>
                <Button
                  type="primary"
                  style={{ borderRadius: '4px' }}
                  onClick={createTemplate}
                >
                  Save
                </Button>
              </span>
            )}
          </span>,
        ]}
        onCancel={isFooter ? closeHandler : handleClose}
      >
        <div className={styles.mainWrapperDoc}>
          <div className={styles.documentWrapper}>
            <div className={styles.categoryContent}>
              {fileName}
              <div style={{ display: isFooter ? 'block' : 'none' }}>
                <span className={styles.cate}>Document category</span>
                <Select
                  defaultValue="Proposals"
                  className={styles.documentCategory}
                  onChange={(value) => setCategory(value)}
                >
                  <Option value="Letters">Letters</Option>
                  <Option value="Quotes">Quotes</Option>
                  <Option value="Other">Other</Option>
                </Select>
              </div>
            </div>
            {!isLoading && (
              <iframe
                src={`https://docs.google.com/document/d/${newDocId}/edit?rm=embedded`}
                width="100%"
                height="638"
                title="title"
              ></iframe>
            )}
          </div>
          <div className={styles.pabauFieldsWrapper}>
            <div className={styles.formFields}>
              <div
                className={styles.toSubject}
                style={{ display: isFooter ? 'none' : 'block' }}
              >
                <fieldset>
                  <legend>Subject</legend>
                  <Input
                    onChange={handleSubjectInput}
                    value={subject}
                    type="text"
                  ></Input>
                </fieldset>
                <div className={styles.sendToSelect}>
                  {!receipients && (
                    <div className={styles.sendToSelectList}>
                      <div className={cn(styles.item, styles.itemTitle)}>
                        To
                      </div>
                      {sendTo.map((item, index) => (
                        <div
                          className={styles.item}
                          key={`send-to-item-${index}`}
                        >
                          <Tag
                            closable
                            onClose={(e) => handleSendToClose(e, index)}
                            color={
                              validateEmail(item.email) ? 'default' : '#f5222d'
                            }
                          >
                            {item.email || item.name}
                          </Tag>
                        </div>
                      ))}
                      <div className={styles.inputContainer}>
                        <Popover
                          visible={showToPopover}
                          onVisibleChange={(visible) =>
                            setShowToPopover(visible)
                          }
                          placement="bottomLeft"
                          content={recipientListContentForTo}
                          trigger="click"
                          overlayClassName={styles.recipientListContainer}
                        >
                          <Input
                            value={sendToItem}
                            onChange={(e) => setSendToItem(e.target.value)}
                            onFocus={(e) => {
                              setSendToItem('')
                            }}
                            onBlur={(e) => {
                              handleAddSendToList()
                            }}
                            onPressEnter={() => handleAddSendToList()}
                            required={true}
                          />
                        </Popover>
                      </div>
                    </div>
                  )}
                  {!receipients && editCcList && (
                    <div className={styles.sendToSelectList}>
                      <div className={cn(styles.item, styles.itemTitle)}>
                        Cc
                      </div>
                      {ccList.map((item, index) => (
                        <div
                          className={styles.item}
                          key={`send-to-item-${index}`}
                        >
                          <Tag
                            closable
                            onClose={(e) => handleCcClose(e, index)}
                            color={
                              validateEmail(item.email) ? 'default' : '#f5222d'
                            }
                          >
                            {item.email || item.name}
                          </Tag>
                        </div>
                      ))}
                      <div className={styles.inputContainer}>
                        <Popover
                          visible={showCcPopover}
                          onVisibleChange={(visible) =>
                            setShowCcPopover(visible)
                          }
                          placement="bottomLeft"
                          content={recipientListContentForCc}
                          trigger="click"
                          overlayClassName={styles.recipientListContainer}
                        >
                          <Input
                            value={ccItem}
                            onChange={(e) => setCcItem(e.target.value)}
                            onFocus={(e) => {
                              setCcItem('')
                            }}
                            onBlur={(e) => {
                              handleAddCcList()
                            }}
                            onPressEnter={() => handleAddCcList()}
                          />
                        </Popover>
                      </div>
                    </div>
                  )}
                  {!receipients && editBccList && (
                    <div className={styles.sendToSelectList}>
                      <div className={cn(styles.item, styles.itemTitle)}>
                        Bcc
                      </div>
                      {bccList.map((item, index) => (
                        <div
                          className={styles.item}
                          key={`send-to-item-${index}`}
                        >
                          <Tag
                            closable
                            onClose={(e) => handleBccClose(e, index)}
                            color={
                              validateEmail(item.email) ? 'default' : '#f5222d'
                            }
                          >
                            {item.email || item.name}
                          </Tag>
                        </div>
                      ))}
                      <div className={styles.inputContainer}>
                        <Popover
                          visible={showBccPopover}
                          onVisibleChange={(visible) =>
                            setShowBccPopover(visible)
                          }
                          placement="bottomLeft"
                          content={recipientListContentForBcc}
                          trigger="click"
                          overlayClassName={styles.recipientListContainer}
                        >
                          <Input
                            value={bccItem}
                            onChange={(e) => setBccItem(e.target.value)}
                            onFocus={(e) => {
                              setBccItem('')
                            }}
                            onBlur={(e) => {
                              handleAddBccList()
                            }}
                            onPressEnter={() => handleAddBccList()}
                          />
                        </Popover>
                      </div>
                    </div>
                  )}
                  {!receipients && (
                    <div className={styles.sendToCcSelect}>
                      {!editBccList && (
                        <span
                          onClick={() => {
                            setEditBccList(true)
                          }}
                        >
                          Bcc
                        </span>
                      )}
                      {!editCcList && (
                        <span
                          onClick={() => {
                            setEditCcList(true)
                          }}
                        >
                          Cc
                        </span>
                      )}
                    </div>
                  )}
                  {receipients && (
                    <div className={styles.receipients}>
                      <Input
                        className={styles.receipients}
                        value={receipients}
                        onFocus={(e) => {
                          setReceipients('')
                        }}
                      />
                    </div>
                  )}
                </div>
                <span className={styles.line} />
              </div>
              <h5>Pabau field</h5>
              <div className={styles.textData}>
                Click to copy a field and paste it in the document. It will be
                replaced with the deal data automatically
              </div>
            </div>
            <TabMenu menuItems={menuList(tagModuleItems)}>
              {Object.keys(tagModuleItems).map((key) => (
                <div key={key} className={styles.tagContent}>
                  {tagModuleItems[key].items.map((tag, _index) => (
                    <Tooltip
                      title={'Copied!'}
                      visible={tag.tag === currentTag}
                      key={_index}
                    >
                      <div
                        className={
                          tag.selected || tag.tag === selectedTag
                            ? styles.tagItemContentActive
                            : styles.tagItemContent
                        }
                        key={_index}
                        onClick={() => onClick(tag, key, _index)}
                      >
                        {tag.name}
                        {tag.selected || tag.tag === selectedTag
                          ? ' - clicked'
                          : null}
                      </div>
                    </Tooltip>
                  ))}
                </div>
              ))}
            </TabMenu>
          </div>
        </div>
      </Modal>
      <Modal
        width="100"
        className={styles.linkModal}
        visible={isLinkModal}
        footer={[
          <Button key="1" onClick={() => setIsLinkModal(false)}>
            Close
          </Button>,
        ]}
        onCancel={() => setIsLinkModal(false)}
      >
        <div className={styles.copyLink}>
          <Input value={webLink}></Input>
          <Button type="primary" onClick={copyLink}>
            Copy Link
          </Button>
        </div>
      </Modal>
      <Modal
        visible={isAttachModal}
        title={'All Templates'}
        footer={null}
        className={styles.tempModal1}
        width={936}
        onCancel={() => setIsAttachModal(false)}
      >
        <div>{renderLeftTab()}</div>
        <div className={styles.attchModalFooter}>
          <Button
            type="primary"
            disabled={selectedDocument.length === 0}
            onClick={handleAttachFile}
            className={styles.attchButton}
          >
            {selectedDocument.length === 0
              ? t('ui.all-template-modal.attach')
              : t('ui.all-template-modal.attachfile', {
                  count: selectedDocument.length,
                  unit: selectedDocument.length > 1 ? 'Files' : 'File',
                })}
          </Button>
        </div>
      </Modal>
    </>
  )
}

export default AllTemplateModalDynamic
