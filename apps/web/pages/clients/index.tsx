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
import {
  BasicModal,
  ClientCreate,
  Notification,
  NotificationType,
} from '@pabau/ui'
import { intersectionBy, differenceBy, groupBy } from 'lodash'
import confetti from 'canvas-confetti'
import {
  useGetContactsLazyQuery,
  useGetContactsQuery,
  useClientListContactsCountQuery,
  useClientListContactsCountLazyQuery,
  useDuplicateContactsQuery,
  useGetLabelsQuery,
  useGetContactsLabelsQuery,
  useGetLabelsLazyQuery,
  useFindManyCompanyDepartmentsLazyQuery,
  useAddLabelMutation,
  useGetContactsLabelsLazyQuery,
} from '@pabau/graphql'

const { TabPane } = Tabs
const { Sider, Content } = Layout

/* eslint-disable-next-line */
export interface ClientsProps {}

export interface Labels {
  label?: string
  count?: number
  color?: string
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

  //WORKING DO NOT DELETE
  const {
    data: getClientsCountData,
    loading: getClientsCountLoading,
    error: getClientsCountError,
  } = useClientListContactsCountQuery({ fetchPolicy: 'no-cache' })

  const {
    data: getDuplicateContactsData,
    loading: getDuplicateContactsLoading,
    error: getuDplicateContactsError,
  } = useDuplicateContactsQuery({ fetchPolicy: 'no-cache' })

  // const {
  //   data: getLabelsData,
  //   loading: getLabelsLoading,
  //   error: getLabelsError,
  // } = useGetLabelsQuery({ fetchPolicy: 'network-only' })

  // const [ getLabelsQuery,{
  //   data: getLabelsData,
  //   loading: getLabelsLoading,
  //   error: getLabelsError,
  // }] = useGetLabelsQuery({ fetchPolicy: 'network-only' })

  const [getLabelsQuery, { data: getLabelsData }] = useGetLabelsLazyQuery({
    fetchPolicy: 'network-only',
  })

  const [addLabelMutaton] = useAddLabelMutation({
    fetchPolicy: 'no-cache',
  })

  useEffect(() => {
    getLabelsQuery()
  }, [getLabelsQuery])

  // const {
  //   data: getContactsLabelsData,
  //   loading: geContactstLabelsLoading,
  //   error: getContactsLabelsError,
  // } = useGetContactsLabelsQuery({ fetchPolicy: 'no-cache' })

  const [
    getContactsLabelsQuery,
    {
      data: getContactsLabelsData,
      loading: geContactstLabelsLoading,
      error: getContactsLabelsError,
    },
  ] = useGetContactsLabelsLazyQuery({ fetchPolicy: 'no-cache' })

  console.log('getContactsLabelsData:', getContactsLabelsData)

  console.log('getLabelsData:', getLabelsData)

  useEffect(() => {
    getContactsLabelsQuery()
    console.log('calling query for get contactsLabels')
  }, [])

  // const [
  //   getLabels,
  //   { data: getLabelsData, loading: getLabelsLoading, error: getLabelsError },
  // ] = useGetLabelsLazyQuery()

  // console.log('getLabelsData:', getLabelsData)

  const [contactsLabels, setContactsLabels] = useState(getContactsLabelsData)

  // console.log('contactsLabels:', contactsLabels)

  const [paginateData, setPaginateData] = useState({
    total: 0,
    offset: 0,
    limit: 10,
    currentPage: 1,
    showingRecords: 0,
  })
  const {
    data: getContactsData,
    loading: getContactsLoading,
    error: getCContactsError,
  } = useGetContactsQuery({
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

  useEffect(() => {
    if (getContactsData) {
      setTestData(contactsData)
    }
  }, [getContactsData])

  // DO NOT DELETE WORKINGGGGGGGG UPDATING CONTACTS WITH CUSTOM LABEL

  // useEffect(() => {
  //   setTestData(
  //     contactsData?.map((field) =>
  //       field.id === 23302410 ? { ...field, labelTest: 'final test' } : field
  //     )
  //   )
  // }, [getContactsData])

  // useEffect(() => {
  //   const tempContact = contactsData?.map((fieldContact) => {
  //     const tempCON = []
  //     for (const fieldCL of contactsLabels?.contacts_labels) {
  //       console.log('fieldCL:', fieldCL)
  //       console.log('fieldContact:', fieldContact)
  //
  //       if (fieldCL.contact_id === fieldContact.id) {
  //         // ...fieldContact, labelTest: labelTest.push(fieldCL.label)
  //         fieldContact.labelTest.push(fieldCL.label.text)
  //       }
  //     }
  //   })
  //   console.log('tempContact:', tempContact)
  //   // setTestData(tempContact)
  // }, [getContactsData])

  useEffect(() => {
    contactsData?.map((fieldContact) => {
      const tempCON = []
      for (const fieldCL of contactsLabels?.contacts_labels) {
        // console.log('fieldCL:', fieldCL)
        // console.log('fieldContact:', fieldContact)

        if (fieldCL.contact_id === fieldContact.id) {
          // ...fieldContact, labelTest: labelTest.push(fieldCL.label)
          // let labelComplete = {fieldCL.label.text, }
          const labelComplete = {}
          labelComplete['text'] = fieldCL.label.text
          labelComplete['color'] = fieldCL.label.color
          // labelComplete['label'] = fieldCL.label?.text
          // labelComplete['color'] = fieldCL.label?.color

          console.log('labelComplete:', labelComplete)

          fieldContact.labelTest.push(labelComplete)
          // ...fieldContact, labelTest: 'final test'
        }
      }
    })
    // console.log('tempContact:', tempContact)
    // setTestData(tempContact)
  }, [getContactsData])

  useEffect(() => {
    if (getContactsLabelsData) {
      setContactsLabels(getContactsLabelsData)
    }
  }, [getContactsLabelsData])

  const onPaginationChange = (currentPage) => {
    const offset = paginateData.limit * (currentPage - 1)
    setPaginateData({
      ...paginateData,
      offset,
      currentPage,
    })
  }

  console.log(getContactsData, 'getContactsData')

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

  // console.log(contactsData, 'contactsData')

  // const [searchText, setSearchText] = useState('')
  const [sourceData, setSourceData] = useState<SourceDataProps[]>(clientsList)
  const [selectedTab, setSelectedTab] = useState(tab.clients)
  const [sourceFilteredData, setSourceFilteredData] = useState<
    SourceDataProps[]
  >(clientsList)
  const [isArchived, setIsArchived] = useState(false)
  const [labels, setLabels] = useState<Labels[]>([])
  // const [selectedLabels, setSelectedLabels] = useState<Labels[]>([])
  const [selectedLabels, setSelectedLabels] = useState([])

  // const [defaultSelectedLabels, setDefaultSelectedLabels] = useState<Labels[]>(
  //   []
  // )
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

  const [testLabels, setTestLabels] = useState(getLabelsData)
  const { t } = useTranslationI18()
  // console.log('duplicateContactsTest:', duplicateContactsTest)
  const isMobile = useMedia('(max-width: 768px)', false)

  // console.log(searchText, 'searchText')

  useEffect(() => {
    setTestLabels(getLabelsData)
  }, [getLabelsData])

  useEffect(() => {
    setSourceData(clientsList)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientsList])

  /// useeffect for adding labels according to id >>>> DO NOT DELETE
  // useEffect(() => {
  //   testData.map((item) => {
  //     if (item.id === 23302410) {
  //       //
  //       console.log('item.id', item.id)
  //       setTestData((prevState) => ({
  //         ...prevState,
  //       }))
  //     } else return item
  //   })
  // }, [getContactsData, testData])

  // testData?.map((item) => {
  //   console.log('testdataitem', item)
  //   for (const labItem of contactsLabels.contacts_labels) {
  //     const tempItem = []
  //
  //     console.log('labItem:', labItem)
  //     if (labItem.contact_id === item.id) {
  //       // item.labelTest = labItem.label.text
  //       tempItem.push(labItem.label.text)
  //       setTestData((prevState) => ({
  //         ...prevState,
  //         labelTest: tempItem,
  //       }))
  //     } else {
  //       return null
  //     }
  //     console.log('tempItem:', tempItem)
  //     return tempItem
  //   }
  // })

  // console.log('getLabelsData:', getLabelsData)
  // console.log('testLabels STATE:', testLabels)

  // if (selectedRowKeys && selectedRowKeys.length > 0) {
  //   for (const selContact of selectedRowKeys) {
  //     console.log('selContact', selContact)
  //   }
  // }

  console.log(defaultSelectedLabels, 'defaultSelectedLabels')

  useEffect(() => {
    setDuplicateContactsTest(getDuplicateContactsData)
  }, [getDuplicateContactsData])

  // DO NOT DELETEEEEEE IMPORTANT
  useEffect(() => {
    setSourceFilteredData(sourceData)
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

  // useEffect(() => {
  //   setSourceFilteredData(contactsData)
  //   const duplicateList = []
  //   const newList = contactsData?.filter((data) => data)
  //   const data = groupBy(newList, (data) => {
  //     return `${data.firstName}_${data.lastName}` || data.email
  //   })
  //   const dataKeysOfName = Object.keys(data)
  //   const uniqDataWithName = []
  //   const uniqData = []
  //   for (const key of dataKeysOfName) {
  //     if (data[key].length === 1) {
  //       uniqDataWithName.push(...data[key])
  //     } else {
  //       duplicateList.push(data[key])
  //     }
  //   }
  //   const data1 = groupBy(uniqDataWithName, (item) => {
  //     return item.email
  //   })
  //   const dataKeysOfEmail = Object.keys(data1)
  //   for (const key of dataKeysOfEmail) {
  //     if (data1[key].length === 1) {
  //       uniqData.push(...data1[key])
  //     } else {
  //       duplicateList.push(data1[key])
  //     }
  //   }
  //   setDuplicateDataList(duplicateList)
  // }, [])

  // console.log(getDuplicateContactsData, 'getDuplicateContactsData')

  // useEffect(() => {
  //   const uniqLabel = countsLabel()
  //   setLabels(uniqLabel)
  //   setSelectedLabels(uniqLabel)
  //
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [sourceData])

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

  console.log('selectedRowKeys', selectedRowKeys)

  useEffect(() => {
    let filteredData = [...sourceData]
    if (selectedTab === tab.clients) {
      filteredData = sourceData
    } else if (selectedTab === tab.archived) {
      filteredData = sourceData.filter((item) => item.is_active === 0)
    } else if (
      selectedTab === tab.contacts ||
      selectedTab === tab.mergeFix ||
      selectedTab === tab.createLabel ||
      selectedTab === tab.import ||
      selectedTab === tab.export
    ) {
      filteredData = [...filteredData]
    } else {
      filteredData = sourceData.filter((item) =>
        item.label.some((x) => x.label === selectedTab)
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
  }, [searchText, selectedTab, sourceData])

  // ORIGINAL
  // useEffect(() => {
  //   const selectedData = sourceData.filter((item) =>
  //     selectedRowKeys?.includes(item.id)
  //   )
  //   const labelsArray = selectedData.map((data) => {
  //     return data.label
  //   })
  //   console.log('labelsArray:', labelsArray)
  //   console.log('selectedData', selectedData)
  //   const data = intersectMany(labelsArray) || []
  //   setSelectedLabels(data)
  //   setDefaultSelectedLabels(data)
  //   console.log('sourceData', sourceData)
  //
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [selectedRowKeys, sourceData])

  useEffect(() => {
    const selectedData = testData?.filter((item) =>
      selectedRowKeys?.includes(item.id)
    )
    const labelsArray = selectedData?.map((data) => {
      return data.labelTest
    })
    console.log('selectedData:', selectedData)
    console.log('labelsArray:', labelsArray)
    // console.log('defaultSelectedLabels:', defaultSelectedLabels)
    if (labelsArray) {
      const data = intersectMany(labelsArray) || []
      setSelectedLabels(data)
      setDefaultSelectedLabels(data)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRowKeys, testData, contactsLabels])

  console.log('contactsLabels:', contactsLabels)

  const countsLabel = () => {
    const labelsWithCount = sourceData.reduce((p, c) => {
      for (const label of c.label) {
        const name = label.label
        if (!Object.prototype.hasOwnProperty.call(p, name)) {
          p[name] = { count: 0, color: label.color }
        }
        p[name].count = p[name].count + 1
      }
      return p
    }, {})
    const formatLabels = Object.keys(labelsWithCount).map((k) => {
      return {
        label: k,
        count: labelsWithCount[k].count,
        color: labelsWithCount[k].color,
      }
    })
    return formatLabels
  }

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

  // ORIGINAL VERSION
  // const uniqLabel = (oldLabelList, selectedLabelList) => {
  //   const newList = [...selectedLabelList]
  //   const removedLabel: Labels[] = differenceBy(
  //     defaultSelectedLabels,
  //     selectedLabelList
  //   )
  //   const uniqData = oldLabelList.filter((data) => {
  //     return (
  //       !newList.some((item) => item.label === data.label) &&
  //       !removedLabel.some((item) => item.label === data.label)
  //     )
  //   })
  //   return [...newList, ...uniqData]
  // }

  // ORIGINAL VERSION
  // const handleApplyLabel = (selectedLabelList) => {
  //   const newData = sourceData.map((data) => {
  //     const temp: SourceDataProps = { ...data }
  //
  //     if (selectedRowKeys.includes(data.id)) {
  //       temp.label = uniqLabel(data.label, selectedLabelList)
  //     }
  //     return temp
  //   })
  //   setSourceData(newData)
  // }

  const uniqLabel = (oldLabelList, selectedLabelList) => {
    const newList = [...selectedLabelList]
    const removedLabel = differenceBy(defaultSelectedLabels, selectedLabelList)
    console.log('selectedLabelList before remove', selectedLabelList)
    console.log('removedLabel', removedLabel)
    const uniqData = oldLabelList.filter((data) => {
      return (
        !newList.some((item) => item.labelTest === data.labelTest) &&
        !removedLabel.some((item) => item.labelTest === data.labelTest)
        // !newList.some(
        //   (item) =>
        //     item.label === data.label || item.labelTest === data.labelTest
        // ) &&
        // !removedLabel.some(
        //   (item) =>
        //     item.label === data.label || item.labelTest === data.labelTest
        // )
      )
    })
    return [...newList, ...uniqData]
  }

  const handleApplyLabel = (selectedLabelList) => {
    const newData = testData?.map((data) => {
      console.log('sourceData:', sourceData)
      // const temp: SourceDataProps = { ...data }
      const temp = { ...data }

      if (selectedRowKeys.includes(data.id)) {
        temp.labelTest = uniqLabel(data.labelTest, selectedLabelList)
      }
      console.log('temp', temp)
      console.log('testData', testData)
      console.log('selectedLabelList', selectedLabelList)

      return temp
    })
    // setSourceData(newData)
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
  // console.log('getClientsCountData:', getClientsCountData)
  console.log('selectedLabels:', selectedLabels)

  const handleMerge = (data) => {
    displayConfetti()
  }

  const handleMergeAll = (data) => {
    displayConfetti()
  }

  const renderContentTable = (
    <ContentComponent
      searchText={searchText}
      // sourceData={sourceFilteredData}
      sourceData={testData}
      // handleLabelClick={handleLabelClick}
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
      addLabelMutaton={addLabelMutaton}
      getContactsLabelsData={getContactsLabelsData}
      getContactsLabelsQuery={getContactsLabelsQuery}
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

  // console.log('testData:', testData)
  // console.log('contactsData:', contactsData)

  return (
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
                    sourceData={sourceData}
                    // sourceData={testData}
                    handleLabelClick={handleLabelClick}
                    duplicateData={duplicateDataList}
                    getClientsCountData={getClientsCountData}
                    duplicateContactsCount={duplicateContactsTest}
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
  )
}

export default Clients
