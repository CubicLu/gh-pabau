import React, { FC, useState, useEffect } from 'react'
import { Input, Button, Tabs, Table, Tag } from 'antd'
import {
  WarningOutlined,
  EditOutlined,
  FontSizeOutlined,
  SearchOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons'
import moment from 'moment'
import { prescriptionData } from './mock'
import styles from './CreatePrescription.module.less'

const { TabPane } = Tabs

export interface PrescriptionProps {
  signature: string
}

export interface PrescriptionDataProps {
  id: string
  date: string
  title: string
  clientData: {
    firstName: string
    lastName: string
    dob: string
    mobile: string
    email: string
    street: string
    city: string
    postcode: string
  }
  medications: {
    name: string
    dosage: string
    comments: string
    category: string
  }[]
  tabs: {
    title: string
    contents: {
      title: string
      content: string[]
    }[]
  }[]
}

export interface CreatePrescriptionComponentProps {
  draft: PrescriptionProps
  prescriptionData: PrescriptionDataProps
  onSave: (presciption: PrescriptionProps) => void
  onSaveDraft?: (draft: PrescriptionProps) => void
}

const CreatePrescriptionComponent: FC<CreatePrescriptionComponentProps> = ({
  draft,
  prescriptionData,
  onSave,
  onSaveDraft,
}) => {
  const [countForAllergies, setCountForAllergies] = useState(0)
  const [medicationValue, setMedicationValue] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const medicationTableColumn = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Dosage',
      dataIndex: 'dosage',
      key: 'dosage',
    },
    {
      title: 'Comments',
      dataIndex: 'comments',
      key: 'comments',
    },
  ]

  const handleCloseTag = (e, tagIndex) => {
    e.preventDefault()
    const tagItems = [...tags]
    tagItems.splice(tagIndex, 1)
    setTags(tagItems)
  }

  useEffect(() => {
    if (prescriptionData.medications.length > 0) {
      setCountForAllergies(
        prescriptionData.medications.filter((el) => el.category === 'allergy')
          .length
      )
      setTags(prescriptionData.medications.map((el) => el.name))
    }
  }, [prescriptionData])

  return (
    <div className={styles.createPrescriptionComponentContainer}>
      <div>
        <p className={styles.prescriptionTitle}>{prescriptionData.title}</p>
        <div className={styles.prescriptionDetails}>
          <p>{prescriptionData.id}</p>
          <p>{moment(prescriptionData.date).format('MM/DD/YYYY')}</p>
        </div>
        <div className={styles.clientInformation}>
          <p>{`${prescriptionData.clientData.firstName} ${prescriptionData.clientData.lastName}`}</p>
          <p>{prescriptionData.clientData.street}</p>
          <p>{prescriptionData.clientData.city}</p>
          <p>{prescriptionData.clientData.postcode}</p>
          <p>{`DOB: ${moment(prescriptionData.clientData.dob).format(
            'MM/DD/YYYY'
          )}`}</p>
          <p>{`Mobile phone: ${prescriptionData.clientData.mobile}`}</p>
          <p>{`Email address: ${prescriptionData.clientData.email}`}</p>
        </div>
        <div className={styles.medicationContainer}>
          <div className={styles.title}>Medication</div>
          <div className={styles.description}>Manage medications</div>
          {countForAllergies > 0 && (
            <div className={styles.alertsForAllergies}>
              <WarningOutlined className={styles.warningIcon} />
              <span className={styles.count}>
                {`Allergies: ${countForAllergies}`}
              </span>
            </div>
          )}
        </div>
        <div className={styles.medicationInput}>
          <Input
            placeholder="Type a medication you wish to prescrive"
            prefix={<SearchOutlined style={{ color: '#bfbfbf' }} />}
            value={medicationValue}
            onChange={(e) => setMedicationValue(e.target.value)}
          />
        </div>
        <div className={styles.medicationTableContainer}>
          <Table
            columns={medicationTableColumn}
            dataSource={prescriptionData.medications}
            pagination={false}
          />
        </div>
        <div className={styles.signatureContainer}>
          <p className={styles.title}>Signature</p>
          <div className={styles.signatureInput}>
            <Tabs tabPosition="top" defaultActiveKey={'0'}>
              <TabPane tab={<EditOutlined />} key="0">
                <div className={styles.tabPaneItem}></div>
              </TabPane>
              <TabPane tab={<FontSizeOutlined />} key="1">
                <div className={styles.tabPaneItem}></div>
              </TabPane>
            </Tabs>
          </div>
        </div>
        <div>
          <Button type="primary">Save Changes</Button>
        </div>
      </div>
      <div>
        <div className={styles.tabsContainer}>
          <Tabs tabPosition="top" defaultActiveKey={'0'}>
            {prescriptionData.tabs.map((item, index) => (
              <TabPane tab={item.title} key={`${index}`}>
                <div className={styles.tabPaneItem}>
                  <div>
                    {tags.length > 0 && (
                      <div className={styles.tagsContainer}>
                        {tags.map((tag, tagIndex) => (
                          <Tag
                            key={`tag-element-${tagIndex}`}
                            closable
                            onClose={(e) => handleCloseTag(e, tagIndex)}
                            className={styles.tagItem}
                          >
                            {tag}
                          </Tag>
                        ))}
                      </div>
                    )}
                  </div>
                  <div>
                    {item.contents.map((content, contentIndex) => (
                      <div
                        className={styles.contentItem}
                        key={`content-item-${contentIndex}`}
                      >
                        <div className={styles.contentItemHeader}>
                          <div>
                            <ExclamationCircleOutlined />
                          </div>
                          <span>{content.title}</span>
                        </div>
                        <div className={styles.contentItemBody}>
                          {content.content.map((el, contentElIndex) => (
                            <p key={`content-element-${contentElIndex}`}>
                              {el}
                            </p>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabPane>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  )
}

interface DraftContent {
  receiverData: string
  draft?: PrescriptionProps
}

interface CreatePrescriptionProps {
  receiverData: string
  client: {
    id: string
    name: string
    email: string
  }
}

export const CreatePrescription: FC<CreatePrescriptionProps> = ({
  receiverData,
  client,
}) => {
  const [contentItems, setContentItems] = useState<DraftContent[]>([])
  const [draft, setDraft] = useState<PrescriptionProps>({
    signature: '',
  })

  const handleSaveDraft = (draft) => {
    const content = [...contentItems]
    const findIndex = contentItems.findIndex(
      (el) => el.receiverData === receiverData
    )
    if (findIndex >= 0) {
      content[findIndex].draft = draft
      window.localStorage.setItem('pabau_content', JSON.stringify(content))
    }
    setDraft(draft)
  }

  useEffect(() => {
    const items =
      JSON.parse(window.localStorage.getItem('pabau_content') || '{}') || []
    if (Array.isArray(items) && items.length > 0) {
      setContentItems(items)
      const findItem = items.find((item) => item.receiverData === receiverData)
      if (findItem) {
        setDraft(findItem.draft)
      } else {
        setContentItems([
          ...items,
          {
            receiverData,
            draft: {
              signature: '',
            },
          },
        ])
        setDraft({ signature: '' })
      }
    }
  }, [receiverData])

  return (
    <div className={styles.createPrescriptionContainer}>
      <CreatePrescriptionComponent
        draft={draft}
        prescriptionData={prescriptionData}
        onSaveDraft={(draft) => handleSaveDraft(draft)}
        onSave={(prescription) => {
          return
        }}
      />
    </div>
  )
}

export default CreatePrescription
