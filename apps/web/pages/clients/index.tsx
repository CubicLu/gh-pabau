import React, { useEffect, useState } from 'react'
import LayoutComponent from '../../components/Layout/Layout'
import { useUser } from '../../context/UserContext'
import useWindowSize from '../../hooks/useWindowSize'
import { Layout, Tabs } from 'antd'
import AddButton from '../../components/AddButton'
// import dayjs from 'dayjs'
import ClientsHeader from '../../components/Clients/ClientsHeader'
import LeftSideBar from '../../components/Clients/LeftSideBar'
import ContentComponent from '../../components/Clients/Content'
import CommonHeader from '../../components/CommonHeader'
import MergeComponent from '../../components/Clients/MergeComponent'
import { useTranslationI18 } from '../../hooks/useTranslationI18'
import { BasicModal, Notification, NotificationType } from '@pabau/ui'
import { intersectionBy, differenceBy } from 'lodash'
import confetti from 'canvas-confetti'
import {
  // // useGetContactsQuery,
  // useGetContactsLazyQuery,
  // useGetContactsByLabelLazyQuery,
  // // useClientListContactsCountQuery,
  // useClientListContactsCountLazyQuery,
  // useGetContactsByLabelCountLazyQuery,
  // // useDuplicateContactsQuery,
  useGetLabelsLazyQuery,
  useAddLabelMutation,
} from '@pabau/graphql'
import ClientCreate from '../../components/Clients/ClientCreate'
import router, { useRouter } from 'next/router'
import styles from './clients.module.less'

const { TabPane } = Tabs
const { Sider, Content } = Layout

//TODO: dont put this in pages
export interface Labels {
  label?: string
  text?: string
  count?: number
  color?: string
  id?: number
}

//TODO remove this
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

export const Clients = () => {
  const urlRouter = useRouter()
  const appVersion = urlRouter?.query['app']
  const version = '1'
  const [searchText, setSearchText] = useState('')
  const [labelsList, setLabelsList] = useState([])
  // const [isLoading, setIsLoading] = useState(true)
  const [isLabelLoading, setIsLabelLoading] = useState(true)
  // const [countFilterLabels, setCountFilterLabels] = useState(null)
  const [filterIds, setFilterIds] = useState([])
  const [contactsSourceData, setContactsSourceData] = useState(null)

  const [
    getLabelsQuery,
    { data: labelData, loading: labelDataLoading },
  ] = useGetLabelsLazyQuery({
    fetchPolicy: 'no-cache',
    onError(error) {
      console.error(error)
    },
  })

  useEffect(() => {
    if (labelData?.findManyCmLabel) {
      const labelCounts = getAllLabelsCount(labelData?.findManyCmLabel)
      setLabelsList(labelCounts)
    }
    if (!labelDataLoading && labelData?.findManyCmLabel)
      setIsLabelLoading(false)
  }, [labelData, labelDataLoading])

  const getAllLabelsCount = (data) => {
    const labels = [...data]
    let cnt
    return labels.map((item) => {
      const { CmContactLabel } = item
      cnt = 0
      for (const l of CmContactLabel) {
        if (!!l.CmContact.is_active === true) {
          cnt++
        }
      }
      return { ...item, count: cnt }
    })
  }

  // const getCountVariables = useMemo(() => {
  //   const queryVariables = {
  //     // fetchPolicy: 'no-cache',
  //     variables: {
  //       searchTerm: '%' + searchText + '%',
  //     },
  //   }
  //   return queryVariables
  // }, [searchText])

  // const { data: getClientsCountData } = useClientListContactsCountQuery({
  //   ...getCountVariables,
  //   fetchPolicy: 'no-cache',
  // })

  // const [
  //   getContactListCount,
  //   { data: getClientsCountData, loading: contactsListCountLoading },
  // ] = useClientListContactsCountLazyQuery({
  //   ...getCountVariables,
  //   fetchPolicy: 'no-cache',
  // })

  // const { data: getDuplicateContactsData } = useDuplicateContactsQuery({
  //   fetchPolicy: 'no-cache',
  // })
  const duplicateContactsData = []

  // const [getContactsLabelsQuery] = useGetContactsLabelsLazyQuery({
  //   fetchPolicy: 'no-cache',
  //   onCompleted(response) {
  //     setContactsLabels(response.contacts_labels)
  //   },
  //   onError(error) {
  //     console.error(error)
  //   },
  // })

  const [addLabelMutation] = useAddLabelMutation({
    fetchPolicy: 'no-cache',
    onCompleted(response) {
      // const responseLabel = {
      //   id: response.createOneCmLabel.id,
      //   name: response.createOneCmLabel.name,
      //   color: response.createOneCmLabel.color,
      // }
      // setLabelsList([...labelsList, responseLabel])
      // const newCount = [...countFilterLabels]
      // newCount.push({
      //   id: response.createOneCmLabel.id,
      //   count: response.createOneCmLabel._count.CmContactLabel,
      // })
      // setCountFilterLabels(newCount)
      getLabelsQuery()
      Notification(NotificationType.success, t('client.label.create.message'))
    },
    onError(error) {
      console.error(error)
      Notification(
        NotificationType.error,
        t('client.label.create.error.message')
      )
    },
  })

  // const [contactsLabels, setContactsLabels] = useState([])

  // const variables = useMemo(() => {
  //   return {
  //     offset: paginateData.offset,
  //     limit: paginateData.limit,
  //     searchTerm: '%' + searchText + '%',
  //   }
  // }, [paginateData.offset, paginateData.limit, searchText])

  // const getQueryVariables = useMemo(() => {
  //   const queryOptions = {
  //     fetchPolicy: 'no-cache',
  //     variables: variables,
  //   }
  //   return queryOptions
  // }, [variables])

  // const getFilterQueryVariables = useMemo(() => {
  //   const queryOptions = {
  //     // fetchPolicy: 'no-cache',
  //     variables: {
  //       ...variables,
  //       labelIds: filterIds,
  //     },
  //   }
  //   return queryOptions
  // }, [filterIds, variables])

  // const getFilterCountQueryVariables = useMemo(() => {
  //   const queryOptions = {
  //     // fetchPolicy: 'no-cache',
  //     variables: {
  //       searchTerm: '%' + searchText + '%',
  //       labelIds: filterIds,
  //     },
  //   }
  //   return queryOptions
  // }, [searchText, filterIds])

  // const { data: getContactsData } = useGetContactsQuery({
  //   ...getQueryVariables,
  //   fetchPolicy: 'no-cache',
  // })
  // const [  //to be removed
  //   getContactList,
  //   { data: getContactsData, loading: contactsLoading },
  // ] = useGetContactsLazyQuery({
  //   ...getQueryVariables,
  //   fetchPolicy: 'no-cache',
  //   onCompleted() {
  //     // setDataLoaded(true)
  //   },
  // })

  // const [ // to be removed
  //   getContactsByLabel,
  //   { data: getfilteredContacts, loading: filteredContactsLoading },
  // ] = useGetContactsByLabelLazyQuery({
  //   ...getFilterQueryVariables,
  //   fetchPolicy: 'no-cache',
  // })
  // const [
  //   getContactsByLabelCount,
  //   { data: getfilteredContactsCount, loading: filteredCountLoading },
  // ] = useGetContactsByLabelCountLazyQuery({
  //   ...getFilterCountQueryVariables,
  //   fetchPolicy: 'no-cache',
  // })

  useEffect(() => {
    // getContactList()
    getLabelsQuery()
    // getContactListCount()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // useEffect(() => {
  //   if (getContactsData) {
  //     const contactsData = mapContactData(getContactsData)
  //     setContactsSourceData(contactsData)
  //   }
  //   if (getClientsCountData) {
  //     setPaginateData((d) => ({
  //       ...d,
  //       total: getClientsCountData?.findManyCmContactCount,
  //       showingRecords: getContactsData?.findManyCmContact?.length,
  //     }))
  //   }
  //   if (!contactsLoading && !contactsListCountLoading && getContactsData)
  //     setIsLoading(false)
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [getContactsData, contactsLoading, contactsListCountLoading])

  // useEffect(() => { to be removed
  //   if (getfilteredContacts) {
  //     const filterData = mapContactData(getfilteredContacts)
  //     setContactsSourceData(filterData)
  //     // setDataLoaded(true)
  //   }
  //   if (getfilteredContactsCount) {
  //     setPaginateData((d) => ({
  //       ...d,
  //       total: getfilteredContactsCount?.findManyCmContactCount,
  //       showingRecords: getfilteredContacts?.findManyCmContact?.length,
  //     }))
  //   }
  //   if (
  //     !filteredContactsLoading &&
  //     !filteredCountLoading &&
  //     getfilteredContacts
  //   )
  //     setIsLoading(false)
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [
  //   getfilteredContacts,
  //   getfilteredContactsCount,
  //   filteredContactsLoading,
  //   filteredCountLoading,
  // ])

  // const mapContactData = (data) => {
  //   return data?.findManyCmContact.map((d) => ({
  //     id: d.ID,
  //     avatar: d.Avatar,
  //     firstName: d.Fname,
  //     lastName: d.Lname,
  //     email: d.Email,
  //     mobileNumber: d.Mobile,
  //     is_active: d.is_active,
  //     clientLabel: d.CmContactLabel.map((itm) => {
  //       return labelsList.find((i) => i.id === itm.label_id)
  //     }),
  //   }))
  // }

  // const onPaginationChange = (currentPage) => {
  //   const offset = paginateData.limit * (currentPage - 1)
  //   setPaginateData({
  //     ...paginateData,
  //     offset,
  //     currentPage,
  //   })
  // }

  // const [sourceData, setSourceData] = useState()
  const [selectedTab, setSelectedTab] = useState(tab.clients)
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
  // const [editedValues, setEditedValues] = useState()
  // const [active, setActive] = useState(true)
  // const [duplicateDataList, setDuplicateDataList] = useState([])
  // const [duplicateContactsData, setDuplicateContactsData] = useState(
  //   getDuplicateContactsData
  // )
  // const [countLabelS, setCountLabelS] = useState(contactsLabels)
  // const [responseLabels, setResponseLabels] = useState(false)

  const { t } = useTranslationI18()
  const size = useWindowSize()
  const user = useUser()
  // useEffect(() => {
  //   setSourceData(clientsList)
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [clientsList])

  // useEffect(() => {
  //   setDuplicateContactsData(getDuplicateContactsData)
  // }, [getDuplicateContactsData])

  // useEffect(() => {
  // const duplicateList = []
  // const newList = sourceData.filter((data) => !data.is_dismissed)
  // const data = groupBy(newList, (data) => {
  //   return `${data.firstName}_${data.lastName}` || data.email
  // })
  // const dataKeysOfName = Object.keys(data)
  // const uniqDataWithName = []
  // const uniqData = []
  // for (const key of dataKeysOfName) {
  //   if (data[key].length === 1) {
  //     uniqDataWithName.push(...data[key])
  //   } else {
  //     duplicateList.push(data[key])
  //   }
  // }
  // const data1 = groupBy(uniqDataWithName, (item) => {
  //   return item.email
  // })
  // const dataKeysOfEmail = Object.keys(data1)
  // for (const key of dataKeysOfEmail) {
  //   if (data1[key].length === 1) {
  //     uniqData.push(...data1[key])
  //   } else {
  //     duplicateList.push(data1[key])
  //   }
  // }
  // setDuplicateDataList(duplicateList)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [sourceData])

  useEffect(() => {
    selectedTab === tab.archived ? setIsArchived(true) : setIsArchived(false)
    if (selectedTab === tab.clients || selectedTab === tab.archived) {
      setSelectedRowKeys([])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTab])

  const intersectMany = (arrs) => {
    let res = arrs[0]
    for (let i = 1; i < arrs.length; i++) {
      res = intersectionBy(res, arrs[i], 'label')
    }
    return res
  }

  // useEffect(() => {
  //   console.log(
  //     'the use effect of filter-=-=-=-=-=-=-=-=-=-=',
  //     contactsSourceData
  //   )
  //   let filteredData = contactsSourceData
  //   if (selectedTab === tab.contacts || selectedTab === tab.clients) {
  //     filteredData = contactsSourceData
  //   } else if (selectedTab === tab.archived) {
  //     filteredData = contactsSourceData.filter((item) => item.is_active === 0)
  //   } else if (
  //     selectedTab === tab.contacts ||
  //     selectedTab === tab.mergeFix ||
  //     selectedTab === tab.createLabel ||
  //     selectedTab === tab.import ||
  //     selectedTab === tab.export
  //   ) {
  //     filteredData = [...filteredData]
  //   } else {
  //     filteredData = contactsSourceData?.filter((item) =>
  //       item.clientLabel.some((x) => selectedTab.includes(x.name))
  //     )
  //   }
  //   // if (searchText) {
  //   //   const filterObject = []
  //   //   for (const data of filteredData) {
  //   //     for (const key of Object.keys(data)) {
  //   //       if (
  //   //         (key === 'firstName' ||
  //   //           key === 'lastName' ||
  //   //           key === 'email' ||
  //   //           key === 'mobileNumber') &&
  //   //         `${data[key]}`.toLowerCase().includes(searchText.toLowerCase())
  //   //       ) {
  //   //         filterObject.push(data)
  //   //         break
  //   //       }
  //   //     }
  //   //   }
  //   //   filteredData = filterObject
  //   // }
  //   console.log('the filter-=-=-=-=-=-=-=-=-=-=', filteredData)
  //   // setSourceFilteredData(filteredData)
  //   // if (dataLoaded)
  //   // if (contactsSourceData?.length) setIsLoading(false)
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [searchText, selectedTab, contactsSourceData])

  useEffect(() => {
    const selectedData = contactsSourceData?.filter((item) =>
      selectedRowKeys?.includes(item.id)
    )
    const labelsArray = selectedData?.map((data) => {
      return data.clientLabel
    })
    if (labelsArray) {
      const data = intersectMany(labelsArray) || []
      setSelectedLabels(data)
      setDefaultSelectedLabels(data)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    selectedRowKeys,
    contactsSourceData,
    // contactsLabels
  ])

  // useEffect(() => {
  //   if (clientRef.current) {
  //     clientRef.current.scrollIntoView({ behavior: 'smooth' })
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [paginateData.currentPage, paginateData.limit])

  const handleLabelClick = (e, label, id) => {
    if (e) e.stopPropagation()
    let selectedList = selectedTab.split(',')
    let selectedfilterIds = [...filterIds]
    if (labelsList?.find((item) => selectedList.includes(item.name))) {
      if (selectedList.includes(label)) {
        selectedList.splice(selectedList.indexOf(label), 1)
        selectedfilterIds.splice(selectedfilterIds.indexOf(id), 1)
      } else {
        selectedList.push(label)
        selectedfilterIds.push(id)
      }
    } else {
      selectedList = [label]
      selectedfilterIds = [id]
    }
    setSelectedTab(selectedList.join(','))
    // setSelectedTab((val) => {
    //   // if (labelsList?.find((item) => val.includes(item.name))) {
    //   //   return val + ',' + label
    //   // } else {
    //   //   return label
    //   // }
    // })
    // setSelectedTab(label)
    // const newIds = [...filterIds, id]
    setFilterIds(selectedfilterIds)
    // setIsLoading((val) => !val)
    // setDataLoaded((val) => !val)
    // getContactsByLabel()
    // getContactsByLabelCount()
  }

  const handleDeleteToggle = () => {
    setDeleteModal((e) => !e)
  }

  const toggleCreateClientModal = () => {
    setCreateClientModalVisible((e) => !e)
  }

  const closeEditModal = () => {
    setIsEdit(false)
    // setActive(false)
  }

  const uniqLabel = (oldLabelList, selectedLabelList) => {
    const newList = [...selectedLabelList]
    const removedLabel = differenceBy(defaultSelectedLabels, selectedLabelList)
    const uniqData = oldLabelList.filter((data) => {
      return (
        !newList.some((item) => item.clientLabel === data.clientLabel) &&
        !removedLabel.some((item) => item.clientLabel === data.clientLabel)
      )
    })
    return [...newList, ...uniqData]
  }

  // useEffect(() => { // to be removed
  //   setCountLabelS(contactsLabels)
  // }, [contactsLabels])

  const handleApplyLabel = (selectedLabelList) => {
    const newData = contactsSourceData?.map((data) => {
      const temp = { ...data }
      if (selectedRowKeys.includes(data.id)) {
        temp.clientLabel = uniqLabel(data.clientLabel, selectedLabelList)
      }
      return temp
    })
    setContactsSourceData(newData)
  }

  // const handleRowClick = (value) => {
  //   setEditedValues(value)
  //   setActive(!!value.is_active)
  //   setIsEdit((e) => !e)
  // }

  const handleRecoverClick = (recoverData) => {
    // const newSourceData = sourceData.map((data) => {
    //   const temp = { ...data }
    //   if (data.id === recoverData.id) {
    //     temp.is_active = 1
    //   }
    //   return temp
    // })
    // setSourceData(newSourceData)
  }

  const handleDismiss = (dismissData) => {
    // const newSourceData = sourceData.map((data) => {
    //   const temp = { ...data }
    //   if (data.id === dismissData[1].id) {
    //     temp.is_dismissed = true
    //   }
    //   return temp
    // })
    // setSourceData(newSourceData)
  }

  const handleRowClick = ({ id }) => {
    router.push('/clients/[id]', `/clients/${id}`, { scroll: true })
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

  const showDeleteConfirm = () => {
    // let newSourceData = []
    // if (isEdit) {
    //   newSourceData = sourceData.filter((data) => {
    //     return data.id !== editedValues.id
    //   })
    //   setIsEdit(false)
    // } else if (!isArchived) {
    //   newSourceData = sourceData.map((data) => {
    //     const temp = { ...data }
    //     if (selectedRowKeys.includes(temp.id)) {
    //       temp.is_active = 0
    //       temp.date_archived = dayjs().format('DD-MM-YYYY, h:mm:ss a')
    //     }
    //     return temp
    //   })
    // } else {
    //   newSourceData = sourceData.filter((data) => {
    //     return !selectedRowKeys.includes(data.id)
    //   })
    // }
    // setSourceData(newSourceData)
    // setSelectedRowKeys([])
    // setDeleteModal(false)
  }

  const handleCreateClient = (values) => {
    // if (isEdit) {
    //   const activeValue = active ? 1 : 0
    //   const editedClient = {
    //     id: editedValues.id,
    //     firstName: values.firstName,
    //     lastName: values.lastName,
    //     email: values.email,
    //     mobileNumber: values.phoneNumber,
    //     label: values.selectedLabels,
    //     is_active: activeValue,
    //     date_archived:
    //       editedValues.is_active === 1 && activeValue === 0
    //         ? dayjs().format('DD-MM-YYYY, h:mm:ss a')
    //         : editedValues.date_archived,
    //     dob: dayjs(values.dateOfBirth).format('DD-MM-YYYY'),
    //     postal: values.postCode,
    //     city: values.city,
    //     priceQuote: editedValues.priceQuote,
    //     orderNotes: editedValues.orderNotes,
    //     setupFee: editedValues.setupFee,
    //   }
    //   const editedIndex = sourceData.findIndex(
    //     (data) => data.id === editedValues.id
    //   )
    //   const data = [...sourceData]
    //   data.splice(editedIndex, 1, editedClient)
    //   setSourceData(data)
    //   setIsEdit(false)
    // } else {
    //   const newClient = {
    //     id: sourceData.length + 1,
    //     firstName: values.firstName,
    //     lastName: values.lastName,
    //     email: values.email,
    //     mobileNumber: values.phoneNumber,
    //     label: values.selectedLabels,
    //     is_active: 1,
    //     date_archived: '',
    //     dob: dayjs(values.dateOfBirth).format('DD-MM-YYYY'),
    //     postal: values.postCode,
    //     city: values.city,
    //     priceQuote: '',
    //     orderNotes: '',
    //     setupFee: '',
    //   }
    //   setSourceData((prevState) => [...prevState, newClient])
    //   setCreateClientModalVisible(false)
    // }
  }

  // const countLabels = () => { // to be removed
  //   const tempArr = []
  //   if (responseLabels) {
  //     countLabelS.map((item) => tempArr.push(item.label_id)) //handle
  //   } else {
  //     contactsLabels.map((item) => tempArr.push(item.label_id)) //handle
  //   }

  //   tempArr.sort()
  //   let current = null
  //   let cnt = 0
  //   const tempObj = {}
  //   for (const element of tempArr) {
  //     if (element !== current) {
  //       if (cnt > 0) {
  //         tempObj[current] = cnt
  //       }
  //       current = element
  //       cnt = 1
  //     } else {
  //       cnt++
  //     }
  //   }
  //   if (cnt > 0) {
  //     tempObj[current] = cnt
  //   }
  //   return tempObj
  // }

  // countLabels()

  // const labelCountAll = countLabels()

  const renderContentTable = (
    <ContentComponent
      searchText={searchText}
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
      // paginateData={paginateData}
      // onPaginationChange={onPaginationChange}
      // getClientsCountLoading={isLoading}
      // setPaginateData={setPaginateData}
      labelsList={labelsList}
      setLabelsList={setLabelsList}
      addLabelMutation={addLabelMutation}
      selectedTab={selectedTab}
      filterLabelIds={filterIds}
      appVersion={appVersion}
      version={version}
      // contactsLabels={contactsLabels}
      // getContactsLabelsQuery={getContactsLabelsQuery}
      // getLabelsQuery={getLabelsQuery}
      // insertContactsLabelsMutaton={insertContactsLabelsMutaton}
    />
  )

  const renderMergeComponent = (
    <MergeComponent
      // duplicateData={duplicateDataList}
      onDismiss={handleDismiss}
      onMerge={handleMerge}
      onMergeAll={handleMergeAll}
      duplicateContactsData={duplicateContactsData}
    />
  )

  const clientPageContent = () => {
    return (
      <>
        <CommonHeader
          isShowSearch
          searchInputPlaceHolder={t('clients.header.search.placeHolder')}
          handleSearch={(searchTerm) => setSearchText(searchTerm)}
          title={t('clients.commonHeader')}
          searchValue={searchText}
          // displayCreateButton={true}
          // handleCreate={toggleCreateClientModal}
        >
          <AddButton
            onClick={toggleCreateClientModal}
            onFilterSource={() => false}
            addFilter={true}
            schema={{
              createButtonLabel: t('setup.taxrate.newbtn'),
            }}
            tableSearch={false}
            needTranslation={true}
            showMobHeaderOnDesktop={appVersion === version ? true : false}
          />
        </CommonHeader>
        <div
          className={
            appVersion === version ? styles.appViewContentDesktop : null
          }
        >
          {(size.width < 768 || appVersion === version) && (
            <Tabs
              style={{ minHeight: '0vh' }}
              className={styles.tabContentWrap}
              onChange={(val) => setSelectedTab(val)}
              defaultActiveKey={selectedTab}
            >
              {/*<div>*/}
              {/*  <ClientsHeader*/}
              {/*    searchText={searchText}*/}
              {/*    setSearchText={setSearchText}*/}
              {/*    toggleCreateClientModal={toggleCreateClientModal}*/}
              {/*  />*/}
              {/*</div>*/}
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
          {size.width > 767 && appVersion !== version && (
            <div>
              <ClientsHeader
                searchText={searchText}
                setSearchText={setSearchText}
                toggleCreateClientModal={toggleCreateClientModal}
              />
              <Layout className={styles.clientBodyWrap}>
                <Sider>
                  <LeftSideBar
                    setSelectedTab={(e) => {
                      setSelectedTab(e)
                    }}
                    selectedTab={selectedTab}
                    labels={labels}
                    labelsList={labelsList}
                    labelLoading={isLabelLoading}
                    setLabels={setLabels}
                    setLabelsList={setLabelsList}
                    selectedLabels={selectedLabels}
                    setSelectedLabels={setSelectedLabels}
                    // sourceData={sourceFilteredData}
                    handleLabelClick={handleLabelClick}
                    // duplicateData={duplicateDataList}
                    // getClientsCountData={getClientsCountData}
                    duplicateContactsCount={duplicateContactsData}
                    addLabelMutation={addLabelMutation}
                    handleApplyLabel={handleApplyLabel}
                    // labelCountAll={countFilterLabels}
                    // contactsLabels={contactsLabels}
                    selectedRowKeys={selectedRowKeys}
                    searchText={searchText}
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
      </>
    )
  }

  return (
    <div>
      {appVersion !== version || size.width < 768 ? (
        <LayoutComponent
          active={'clients'}
          isDisplayingFooter={false}
          {...user}
        >
          {clientPageContent()}
        </LayoutComponent>
      ) : (
        clientPageContent()
      )}
      {(createClientModalVisible || isEdit) && (
        <ClientCreate
          modalVisible={createClientModalVisible || isEdit}
          handleClose={isEdit ? closeEditModal : toggleCreateClientModal}
          handleSubmit={handleCreateClient}
          isEdit={isEdit}
          contactId={0}
          // activated={active}
          // onActivated={(val) => setActive(val)}
          // editedValues={
          //   isEdit && {
          //     Fname: editedValues?.firstName,
          //     Lname: editedValues?.lastName,
          //     gender: t('quickCreate.client.modal.general.gender.other'),
          //     MarketingSource: t(
          //       'quickCreate.client.modal.general.hearOption.selectOption'
          //     ),
          //     DOB: dayjs(editedValues?.dob, 'DD-MM-YYYY'),
          //     Email: editedValues?.email,
          //     Mobile: editedValues?.mobileNumber,
          //     Phone: '',
          //     MailingCity: editedValues?.city,
          //     MailingPostal: editedValues?.postal,
          //   }
          // }
          handleDelete={handleDeleteToggle}
          deleteModalVisible={deleteModal}
          onDelete={showDeleteConfirm}
          // defaultLabels={isEdit ? editedValues.label : labels}
          // defaultSelectedLabels={isEdit && editedValues.label}
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
