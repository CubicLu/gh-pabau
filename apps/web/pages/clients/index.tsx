import React, { FC, useEffect, useState } from 'react'
import LayoutComponent from '../../components/Layout/Layout'
import { Layout, Tabs } from 'antd'
import dayjs from 'dayjs'
import { useMedia } from 'react-use'
import styles from './clients.module.less'
import ClientsHeader from '../../components/Clients/ClientsHeader'
import LeftSideBar from '../../components/Clients/LeftSideBar'
import ContentComponent, {
  SourceDataProps,
} from '../../components/Clients/Content'
import CommonHeader from '../../components/CommonHeader'
import MergeComponent from '../../components/Clients/MergeComponent'
import { clientsList } from '../../mocks/ClientsList'
import { useTranslationI18 } from '../../hooks/useTranslationI18'
import { BasicModal, ClientCreate } from '@pabau/ui'
import { intersectionBy, differenceBy, groupBy } from 'lodash'
import confetti from 'canvas-confetti'
import {
  useGetContactsQuery,
  useClientListContactsCountQuery,
  useDuplicateContactsQuery,
  useGetLabelsLazyQuery,
  useAddLabelMutation,
  useGetContactsLabelsLazyQuery,
  useInsertContactsLabelsMutation,
} from '@pabau/graphql'
import { test } from 'shelljs'

const { TabPane } = Tabs
const { Sider, Content } = Layout

/* eslint-disable-next-line */
export interface ClientsProps {}

export interface Labels {
  label?: string
  count?: number
  color?: string
  id?: number
}

export const tab = {
  contacts: 'contacts',
  clients: 'clients',
  archived: 'archived',
  mergeFix: 'mergeFix',
  createLabel: 'createLabel',
  import: 'import',
  export: 'export',
  labels: 'labels',
}

export const Clients: FC<ClientsProps> = () => {
  const [searchText, setSearchText] = useState('')
  const [testLabels, setTestLabels] = useState([])
  const [dataLoaded, setDataLoaded] = useState(false)
  const [insertContactsLabelsMutaton] = useInsertContactsLabelsMutation({
    onCompleted(response) {
      const tempLab = response.insert_contacts_labels.returning[0]
      // setTestLabels([tempLab])
      // setContactsLabels([...contactsLabels, tempLab])
      setResponseLabels(true)
      setCountLabelS(() => [...countLabelS, tempLab])
      getContactsLabelsQuery()
    },
    onError() {
      console.log('not added contactslabels')
    },
  })

  //WORKING DO NOT DELETE
  const {
    data: getClientsCountData,
    loading: getClientsCountLoading,
    // error: getClientsCountError,
  } = useClientListContactsCountQuery({ fetchPolicy: 'no-cache' })

  const {
    data: getDuplicateContactsData,
    // loading: getDuplicateContactsLoading,
    // error: getuDplicateContactsError,
  } = useDuplicateContactsQuery({ fetchPolicy: 'no-cache' })

  const [getLabelsQuery] = useGetLabelsLazyQuery({
    fetchPolicy: 'no-cache',
    onCompleted(response) {
      setTestLabels(response?.labels)
      setDataLoaded(true)
    },
    onError(error) {
      console.error(error)
    },
  })

  const [getContactsLabelsQuery] = useGetContactsLabelsLazyQuery({
    fetchPolicy: 'no-cache',
    onCompleted(response) {
      setContactsLabels(response.contacts_labels)
    },
    onError(error) {
      console.error(error)
    },
  })

  const [addLabelMutation] = useAddLabelMutation({
    fetchPolicy: 'no-cache',
    onCompleted(response) {
      const responseLabel = {
        id: response.insert_labels_one.id,
        text: response.insert_labels_one.text,
        color: response.insert_labels_one.color,
      }
      setTestLabels([...testLabels, responseLabel])

      if (selectedRowKeys.length > 0) {
        setSelectedLabels([...selectedLabels, responseLabel])

        const tempData = testData.map((contact) => {
          if (selectedRowKeys.includes(contact.id)) {
            //insert to db
            insertContactsLabelsMutaton({
              variables: {
                contact_id: contact.id,
                label_id: responseLabel.id,
              },
            })

            return {
              ...contact,
              labelTest: [responseLabel],
            }
          }

          return contact
        })
        // setTestData(tempData)
        // getLabelsQuery()
        setTestData(tempData)
      }
      return responseLabel
    },
    onError(error) {
      console.log(error)
    },
  })

  useEffect(() => {
    getContactsLabelsQuery()
  }, [])

  const [contactsLabels, setContactsLabels] = useState([])

  const [paginateData, setPaginateData] = useState({
    total: 0,
    offset: 0,
    limit: 10,
    currentPage: 1,
    showingRecords: 0,
  })
  const { data: getContactsData } = useGetContactsQuery({
    fetchPolicy: 'no-cache',
    variables: {
      offset: paginateData.offset,
      limit: paginateData.limit,
      searchTerm: searchText,
    },
  })

  useEffect(() => {
    if (getClientsCountData) {
      setPaginateData((d) => ({
        ...d,
        total: getClientsCountData?.cmContactsCount,
        showingRecords: getContactsData?.cmContacts.length,
      }))
    }
  }, [getContactsData, getClientsCountData])

  const contactsData = getContactsData?.cmContacts.map((d) => ({
    id: d.ID,
    avatar: d.Avatar,
    firstName: d.Fname,
    lastName: d.Lname,
    email: d.Email,
    mobileNumber: d.Mobile,
    is_active: d.is_active,
    labelTest: [],
  }))

  useEffect(() => {
    if (getContactsData) {
      setTestData(contactsData)
    }
  }, [getContactsData])

  // WORKING
  useEffect(() => {
    contactsData?.map((fieldContact) => {
      // const tempCON = []
      for (const fieldCL of contactsLabels) {
        if (fieldCL.contact_id === fieldContact.id) {
          const labelComplete = {}
          // labelComplete['id'] = ''
          labelComplete['id'] = fieldCL.label.id
          labelComplete['text'] = fieldCL.label.text
          labelComplete['color'] = fieldCL.label.color
          fieldContact.labelTest.push(labelComplete)
          // setContactsLabels([...contactsLabels, labelComplete])
          // return fieldContact
        }
      }
    })
  }, [getContactsData])

  // console.log('contactsLabels', contactsLabels)

  const onPaginationChange = (currentPage) => {
    const offset = paginateData.limit * (currentPage - 1)
    setPaginateData({
      ...paginateData,
      offset,
      currentPage,
    })
  }

  const [sourceData, setSourceData] = useState<SourceDataProps[]>(clientsList)
  const [selectedTab, setSelectedTab] = useState(tab.clients)
  const [sourceFilteredData, setSourceFilteredData] = useState<
    SourceDataProps[]
  >(contactsData)
  const [isArchived, setIsArchived] = useState(false)
  const [labels, setLabels] = useState<Labels[]>([])
  const [selectedLabels, setSelectedLabels] = useState([])
  const [defaultSelectedLabels, setDefaultSelectedLabels] = useState([])
  const [createClientModalVisible, setCreateClientModalVisible] = useState(
    false
  )
  const [deleteModal, setDeleteModal] = useState(false)
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [isEdit, setIsEdit] = useState(false)
  const [editedValues, setEditedValues] = useState<SourceDataProps>()
  const [active, setActive] = useState(true)
  const [duplicateDataList, setDuplicateDataList] = useState<
    SourceDataProps[][]
  >([])
  const [testData, setTestData] = useState(contactsData)
  const [duplicateContactsTest, setDuplicateContactsTest] = useState(
    getDuplicateContactsData
  )
  const [countLabelS, setCountLabelS] = useState(contactsLabels)
  const [responseLabels, setResponseLabels] = useState(false)

  const { t } = useTranslationI18()
  const isMobile = useMedia('(max-width: 768px)', false)

  useEffect(() => {
    getLabelsQuery()
  }, [getLabelsQuery])

  useEffect(() => {
    setSourceData(clientsList)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientsList])

  useEffect(() => {
    setDuplicateContactsTest(getDuplicateContactsData)
  }, [getDuplicateContactsData])

  useEffect(() => {
    // setSourceFilteredData(sourceData)
    setSourceFilteredData(contactsData)
    // setSourceFilteredData(testData)

    const duplicateList = []
    const newList = sourceData.filter((data) => !data.is_dismissed)
    const data = groupBy(newList, (data) => {
      return `${data.firstName}_${data.lastName}` || data.email
    })
    const dataKeysOfName = Object.keys(data)
    const uniqDataWithName = []
    const uniqData = []
    for (const key of dataKeysOfName) {
      if (data[key].length === 1) {
        uniqDataWithName.push(...data[key])
      } else {
        duplicateList.push(data[key])
      }
    }
    const data1 = groupBy(uniqDataWithName, (item) => {
      return item.email
    })
    const dataKeysOfEmail = Object.keys(data1)
    for (const key of dataKeysOfEmail) {
      if (data1[key].length === 1) {
        uniqData.push(...data1[key])
      } else {
        duplicateList.push(data1[key])
      }
    }
    setDuplicateDataList(duplicateList)
  }, [sourceData])

  useEffect(() => {
    selectedTab === tab.archived ? setIsArchived(true) : setIsArchived(false)
    if (selectedTab === tab.clients || selectedTab === tab.archived) {
      setSelectedRowKeys([])
    }
  }, [selectedTab])

  const intersectMany = (arrs) => {
    let res = arrs[0]
    for (let i = 1; i < arrs.length; i++) {
      res = intersectionBy(res, arrs[i], 'label')
    }
    return res
  }

  // if (selectedRowKeys.length > 2) {
  //   setDefaultSelectedLabels([])
  // }

  useEffect(() => {
    let filteredData = testData?.map((a) => ({ ...a }))
    if (selectedTab === tab.clients) {
      filteredData = testData
    } else if (selectedTab === tab.archived) {
      filteredData = testData.filter((item) => item.is_active === 0)
    } else if (
      selectedTab === tab.contacts ||
      selectedTab === tab.mergeFix ||
      selectedTab === tab.createLabel ||
      selectedTab === tab.import ||
      selectedTab === tab.export
    ) {
      filteredData = [...filteredData]
    } else {
      filteredData = testData?.filter((item) =>
        item.labelTest.some((x) => x.text === selectedTab)
      )
    }

    if (searchText) {
      const filterObject = []
      for (const data of filteredData) {
        for (const key of Object.keys(data)) {
          if (
            (key === 'firstName' ||
              key === 'lastName' ||
              key === 'email' ||
              key === 'mobileNumber') &&
            `${data[key]}`.toLowerCase().includes(searchText.toLowerCase())
          ) {
            filterObject.push(data)
            break
          }
        }
      }
      filteredData = filterObject
    }
    setSourceFilteredData(filteredData)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText, selectedTab, testData])

  useEffect(() => {
    const selectedData = testData?.filter((item) =>
      selectedRowKeys?.includes(item.id)
    )
    const labelsArray = selectedData?.map((data) => {
      return data.labelTest
    })
    if (labelsArray) {
      const data = intersectMany(labelsArray) || []
      setSelectedLabels(data)
      setDefaultSelectedLabels(data)
    }
    // if (selectedRowKeys.length > 1) {
    //   setDefaultSelectedLabels([])
    // }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRowKeys, testData, contactsLabels])

  const handleLabelClick = (e, label) => {
    if (e) {
      e.stopPropagation()
    }
    setSelectedTab(label)
  }

  const handleDeleteToggle = () => {
    setDeleteModal((e) => !e)
  }

  const showDeleteConfirm = () => {
    let newSourceData = []
    if (isEdit) {
      newSourceData = sourceData.filter((data) => {
        return data.id !== editedValues.id
      })
      setIsEdit(false)
    } else if (!isArchived) {
      newSourceData = sourceData.map((data) => {
        const temp = { ...data }
        if (selectedRowKeys.includes(temp.id)) {
          temp.is_active = 0
          temp.date_archived = dayjs().format('DD-MM-YYYY, h:mm:ss a')
        }
        return temp
      })
    } else {
      newSourceData = sourceData.filter((data) => {
        return !selectedRowKeys.includes(data.id)
      })
    }
    setSourceData(newSourceData)
    setSelectedRowKeys([])
    setDeleteModal(false)
  }

  const handleCreateClient = (values) => {
    if (isEdit) {
      const activeValue = active ? 1 : 0
      const editedClient = {
        id: editedValues.id,
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        mobileNumber: values.phoneNumber,
        label: values.selectedLabels,
        is_active: activeValue,
        date_archived:
          editedValues.is_active === 1 && activeValue === 0
            ? dayjs().format('DD-MM-YYYY, h:mm:ss a')
            : editedValues.date_archived,
        dob: dayjs(values.dateOfBirth).format('DD-MM-YYYY'),
        postal: values.postCode,
        city: values.city,
        priceQuote: editedValues.priceQuote,
        orderNotes: editedValues.orderNotes,
        setupFee: editedValues.setupFee,
      }
      const editedIndex = sourceData.findIndex(
        (data) => data.id === editedValues.id
      )
      const data = [...sourceData]
      data.splice(editedIndex, 1, editedClient)
      setSourceData(data)
      setIsEdit(false)
    } else {
      const newClient = {
        id: sourceData.length + 1,
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        mobileNumber: values.phoneNumber,
        label: values.selectedLabels,
        is_active: 1,
        date_archived: '',
        dob: dayjs(values.dateOfBirth).format('DD-MM-YYYY'),
        postal: values.postCode,
        city: values.city,
        priceQuote: '',
        orderNotes: '',
        setupFee: '',
      }
      setSourceData((prevState) => [...prevState, newClient])
      setCreateClientModalVisible(false)
    }
  }

  const toggleCreateClientModal = () => {
    setCreateClientModalVisible(!createClientModalVisible)
  }

  const closeEditModal = () => {
    setIsEdit(false)
    setActive(false)
  }

  const uniqLabel = (oldLabelList, selectedLabelList) => {
    const newList = [...selectedLabelList]
    const removedLabel = differenceBy(defaultSelectedLabels, selectedLabelList)
    const uniqData = oldLabelList.filter((data) => {
      return (
        !newList.some((item) => item.labelTest === data.labelTest) &&
        !removedLabel.some((item) => item.labelTest === data.labelTest)
      )
    })

    return [...newList, ...uniqData]
  }

  useEffect(() => {
    setCountLabelS(contactsLabels)
  }, [contactsLabels])

  const handleApplyLabel = (selectedLabelList) => {
    const newData = testData?.map((data) => {
      const temp = { ...data }
      if (selectedRowKeys.includes(data.id)) {
        temp.labelTest = uniqLabel(data.labelTest, selectedLabelList)
      }
      return temp
    })
    setTestData(newData)
  }

  const handleRowClick = (value) => {
    setEditedValues(value)
    setActive(!!value.is_active)
    setIsEdit((e) => !e)
  }

  const handleRecoverClick = (recoverData) => {
    const newSourceData = sourceData.map((data) => {
      const temp = { ...data }
      if (data.id === recoverData.id) {
        temp.is_active = 1
      }
      return temp
    })
    setSourceData(newSourceData)
  }

  const handleDismiss = (dismissData) => {
    const newSourceData = sourceData.map((data) => {
      const temp = { ...data }
      if (data.id === dismissData[1].id) {
        temp.is_dismissed = true
      }
      return temp
    })
    setSourceData(newSourceData)
  }

  const randomInRange = (min, max) => {
    return Math.random() * (max - min) + min
  }

  const displayConfetti = () => {
    confetti({
      angle: randomInRange(55, 125),
      spread: randomInRange(50, 70),
      particleCount: randomInRange(50, 100),
      origin: { y: 0.6, x: 0.6 },
    })
  }

  const handleMerge = (data) => {
    displayConfetti()
  }

  const handleMergeAll = (data) => {
    displayConfetti()
  }

  const countLabels = () => {
    const tempArr = []
    if (responseLabels) {
      countLabelS.map((item) => tempArr.push(item.label_id))
    } else {
      contactsLabels.map((item) => tempArr.push(item.label_id))
    }

    tempArr.sort()
    let current = null
    let cnt = 0
    const tempObj = {}
    // const tempFinalArr = []
    for (const element of tempArr) {
      if (element !== current) {
        if (cnt > 0) {
          tempObj[current] = cnt
        }
        current = element
        cnt = 1
      } else {
        cnt++
      }
    }
    if (cnt > 0) {
      tempObj[current] = cnt
    }
    return tempObj
  }

  countLabels()

  const labelCountAll = countLabels()

  const renderContentTable = (
    <ContentComponent
      searchText={searchText}
      sourceData={sourceFilteredData}
      // sourceData={testData}
      handleLabelClick={handleLabelClick}
      isArchived={isArchived}
      labels={labels}
      setLabels={setLabels}
      selectedLabels={selectedLabels}
      setSelectedLabels={setSelectedLabels}
      handleDeleteClick={handleDeleteToggle}
      selectedRowKeys={selectedRowKeys}
      setSelectedRowKeys={setSelectedRowKeys}
      defaultSelectedLabels={defaultSelectedLabels}
      setDefaultSelectedLabels={setDefaultSelectedLabels}
      handleApplyLabel={handleApplyLabel}
      handleRowClick={handleRowClick}
      handleRecoverClick={handleRecoverClick}
      paginateData={paginateData}
      onPaginationChange={onPaginationChange}
      getClientsCountLoading={getClientsCountLoading}
      setPaginateData={setPaginateData}
      testLabels={testLabels}
      setTestLabels={setTestLabels}
      addLabelMutation={addLabelMutation}
      contactsLabels={contactsLabels}
      getContactsLabelsQuery={getContactsLabelsQuery}
      getLabelsQuery={getLabelsQuery}
      insertContactsLabelsMutaton={insertContactsLabelsMutaton}
    />
  )

  const renderMergeComponent = (
    <MergeComponent
      duplicateData={duplicateDataList}
      onDismiss={handleDismiss}
      onMerge={handleMerge}
      onMergeAll={handleMergeAll}
      duplicateContactsTest={duplicateContactsTest}
    />
  )

  return dataLoaded ? (
    <div>
      <CommonHeader
        title={t('clients.commonHeader')}
        isShowSearch={false}
        displayCreateButton={true}
        handleCreate={toggleCreateClientModal}
      />
      <LayoutComponent active={'clients'} isDisplayingFooter={false}>
        <div>
          {isMobile && (
            <Tabs
              style={{ minHeight: '0vh' }}
              className={styles.tabContentWrap}
              onChange={(val) => setSelectedTab(val)}
              defaultActiveKey={selectedTab}
            >
              <div>
                <ClientsHeader
                  searchText={searchText}
                  setSearchText={setSearchText}
                  toggleCreateClientModal={toggleCreateClientModal}
                />
              </div>
              <TabPane tab={t('clients.leftSidebar.clients')} key={tab.clients}>
                {renderContentTable}
              </TabPane>
              <TabPane
                tab={t('clients.leftSidebar.contacts')}
                key={tab.contacts}
              >
                {renderContentTable}
              </TabPane>
              <TabPane
                tab={t('clients.leftSidebar.mergeFix')}
                key={tab.mergeFix}
              >
                {renderMergeComponent}
              </TabPane>
              <TabPane
                tab={t('clients.leftSidebar.archived')}
                key={tab.archived}
              >
                {renderContentTable}
              </TabPane>
            </Tabs>
          )}
          {!isMobile && (
            <div>
              <ClientsHeader
                searchText={searchText}
                setSearchText={setSearchText}
                toggleCreateClientModal={toggleCreateClientModal}
              />
              <Layout className={styles.clientBodyWrap}>
                <Sider>
                  <LeftSideBar
                    setSelectedTab={setSelectedTab}
                    selectedTab={selectedTab}
                    labels={labels}
                    testLabels={testLabels}
                    setLabels={setLabels}
                    setTestLabels={setTestLabels}
                    selectedLabels={selectedLabels}
                    setSelectedLabels={setSelectedLabels}
                    // sourceData={sourceData}
                    sourceData={testData}
                    handleLabelClick={handleLabelClick}
                    duplicateData={duplicateDataList}
                    getClientsCountData={getClientsCountData}
                    duplicateContactsCount={duplicateContactsTest}
                    addLabelMutation={addLabelMutation}
                    handleApplyLabel={handleApplyLabel}
                    labelCountAll={labelCountAll}
                    contactsLabels={contactsLabels}
                    selectedRowKeys={selectedRowKeys}
                  />
                </Sider>
                <Content>
                  {selectedTab === tab.mergeFix ? (
                    <div className={styles.mergeComponentWrap}>
                      {renderMergeComponent}
                    </div>
                  ) : (
                    <div>{renderContentTable}</div>
                  )}
                </Content>
              </Layout>
            </div>
          )}
        </div>
      </LayoutComponent>
      {(createClientModalVisible || isEdit) && (
        <ClientCreate
          modalVisible={createClientModalVisible || isEdit}
          handleClose={isEdit ? closeEditModal : toggleCreateClientModal}
          handleSubmit={handleCreateClient}
          isEdit={isEdit}
          activated={active}
          onActivated={(val) => setActive(val)}
          editedValues={
            isEdit && {
              firstName: editedValues?.firstName,
              lastName: editedValues?.lastName,
              gender: t('quickCreate.client.modal.general.gender.other'),
              hearOption: t(
                'quickCreate.client.modal.general.hearOption.selectOption'
              ),
              dateOfBirth: dayjs(editedValues?.dob, 'DD-MM-YYYY'),
              email: editedValues?.email,
              phoneNumber: editedValues?.mobileNumber,
              telePhone: '',
              address: '',
              city: editedValues?.city,
              postCode: editedValues?.postal,
            }
          }
          handleDelete={handleDeleteToggle}
          deleteModalVisible={deleteModal}
          onDelete={showDeleteConfirm}
          defaultLabels={isEdit ? editedValues.label : labels}
          defaultSelectedLabels={isEdit && editedValues.label}
        />
      )}
      {!isEdit && (
        <BasicModal
          modalWidth={682}
          centered={true}
          visible={deleteModal}
          title={t('clients.content.delete.title')}
          newButtonText={t('clients.content.delete.confirm.yes')}
          onOk={showDeleteConfirm}
          onCancel={handleDeleteToggle}
        >
          <span
            style={{
              fontFamily: 'Circular-Std-Book',
              fontWeight: 'normal',
              fontSize: '16px',
              lineHeight: '20px',
              color: '#9292A3',
            }}
          >
            {t('clients.content.delete.confirmMessage')}
          </span>
        </BasicModal>
      )}
    </div>
  ) : (
    <div>Not loaded</div>
  )
}

export default Clients
