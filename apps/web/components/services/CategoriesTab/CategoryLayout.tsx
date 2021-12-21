import React, { FC, useEffect, useState, useRef } from 'react'
import {
  ServiceCategoriesDocument,
  ServiceCategoriesAggregateDocument,
  useServiceCategoriesQuery,
  useServiceCategoriesAggregateQuery,
  useInsertServiceCategoriesOneMutation,
  useUpdateServiceCategoriesByPkMutation,
  useDeleteServiceCategoriesByPkMutation,
  useUpdateServiceCategoriesMutation,
} from '@pabau/graphql'
import { Avatar, Notification, NotificationType } from '@pabau/ui'
import { useTranslationI18 } from '../../../hooks/useTranslationI18'
import Categories from './Categories'
import styles from './CategoriesTab.module.less'

export interface NewCategory {
  name: string
  color: string
  is_active: boolean
}

export interface CategoryLayoutProps {
  perPage?: number
  searchTerm?: string
  modalShowState?: boolean
  openModal?: () => void
  closeModal?: () => void
  categoriesUpdates?: (categories: NewCategory[]) => void
}

const CategoryLayout: FC<CategoryLayoutProps> = ({
  perPage,
  searchTerm,
  modalShowState = false,
  openModal,
  closeModal,
  categoriesUpdates,
  ...rest
}) => {
  const { t } = useTranslationI18()
  const [isLoading, setIsLoading] = useState(true)
  const [sourceData, setSourceData] = useState(null)
  const [editData, setEditData] = useState(null)
  const [openDeleteModal, setDeleteModal] = useState(false)
  const [showImageSelector, setShowImageSelector] = useState(false)

  const [paginateData, setPaginateData] = useState({
    total: 0,
    offset: 0,
    limit: 50,
    currentPage: 1,
    showingRecords: 0,
  })
  const categoryTableRef = useRef(null)

  const columns = [
    {
      title: t('setup.services.categoriestab.fields.servicegroup'),
      dataIndex: 'name',
      visible: true,
      className: 'categoryGroup',
      render: function renderSourceName(val) {
        return (
          <div className={styles.categoryGroup}>
            <span>
              <Avatar name={`${val}`} />
            </span>
            <span>{val}</span>
          </div>
        )
      },
    },
    {
      title: t('setup.services.categoriestab.fields.servicesassigned'),
      dataIndex: 'assigned',
      visible: true,
      render: function renderSourceName(val) {
        return <span>{val || '0'}</span>
      },
    },
    {
      title: t('setup.services.categoriestab.fields.status'),
      dataIndex: 'is_active',
      visible: true,
    },
  ]

  const [addMutation] = useInsertServiceCategoriesOneMutation({
    onCompleted() {
      Notification(
        NotificationType.success,
        t('setup.services.categoriestab.createcategorysuccessfullymessage')
      )
    },
    onError() {
      Notification(
        NotificationType.error,
        t('setup.services.categoriestab.createcategoryerrormessages')
      )
    },
  })

  const [editMutation] = useUpdateServiceCategoriesByPkMutation({
    onCompleted() {
      Notification(
        NotificationType.success,
        t('setup.services.categoriestab.updatecategorysuccessfullymessage')
      )
    },
    onError() {
      Notification(
        NotificationType.error,
        t('setup.services.categoriestab.updatecategoryerrormessages')
      )
    },
  })

  const [deleteMutation] = useDeleteServiceCategoriesByPkMutation({
    onCompleted() {
      Notification(
        NotificationType.success,
        t('setup.services.categoriestab.deletecategorysuccessfullymessage')
      )
    },
    onError() {
      Notification(
        NotificationType.error,
        t('setup.services.categoriestab.deletecategoryerrormessages')
      )
    },
  })

  const listQueryVariables = () => {
    return {
      variables: {
        offset: paginateData.offset,
        limit: paginateData.limit,
        searchTerm: '%' + searchTerm + '%',
      },
    }
  }

  const listAggregateQueryVariables = () => {
    return {
      variables: {
        searchTerm: '%' + searchTerm + '%',
      },
    }
  }

  const { data, loading } = useServiceCategoriesQuery(listQueryVariables())
  const { data: aggregateData } = useServiceCategoriesAggregateQuery(
    listAggregateQueryVariables()
  )

  const [updateOrderMutation] = useUpdateServiceCategoriesMutation({
    onError() {
      Notification(
        NotificationType.error,
        t('setup.services.categoriestab.updateorder.error')
      )
    },
  })

  useEffect(() => {
    if (data) {
      setSourceData(data?.service_categories)
    }
    if (aggregateData?.service_categories_aggregate?.aggregate?.count) {
      setPaginateData((prevPaginateData) => {
        return {
          ...prevPaginateData,
          total: aggregateData?.service_categories_aggregate.aggregate.count,
          showingRecords: data?.service_categories.length,
        }
      })
    }
    if (!loading && data) setIsLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, aggregateData, loading])

  useEffect(() => {
    if (categoryTableRef.current) {
      categoryTableRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [paginateData.currentPage, paginateData.limit])

  const onPaginationChange = (currentPage, limit) => {
    const offset = paginateData.limit * (currentPage - 1)
    setPaginateData({
      ...paginateData,
      offset,
      limit,
      currentPage: currentPage,
    })
  }

  const updateOrder = async (values) => {
    await updateOrderMutation({
      variables: values,
      optimisticResponse: {},
      refetchQueries: [
        {
          query: ServiceCategoriesDocument,
          ...listQueryVariables(),
        },
      ],
    })
  }

  const handleSubmitCategory = async (values, { resetForm }) => {
    !editData?.id
      ? await addMutation({
          variables: values,
          optimisticResponse: {},
          refetchQueries: [
            {
              query: ServiceCategoriesDocument,
              ...listQueryVariables(),
            },
            {
              query: ServiceCategoriesAggregateDocument,
              ...listAggregateQueryVariables(),
            },
          ],
        })
      : await editMutation({
          variables: values,
          optimisticResponse: {},
          refetchQueries: [
            {
              query: ServiceCategoriesDocument,
              ...listQueryVariables(),
            },
            {
              query: ServiceCategoriesAggregateDocument,
              ...listAggregateQueryVariables(),
            },
          ],
        })
    resetForm()
    setEditData(null)
    closeModal?.()
  }

  return (
    <Categories
      editData={editData}
      handleSubmitCategory={handleSubmitCategory}
      categoryTableRef={categoryTableRef}
      isLoading={isLoading}
      sourceData={sourceData}
      columns={columns}
      searchTerm={searchTerm}
      openModal={openModal}
      setEditData={setEditData}
      updateOrder={updateOrder}
      setSourceData={setSourceData}
      paginateData={paginateData}
      onPaginationChange={onPaginationChange}
      setPaginateData={setPaginateData}
      modalShowState={modalShowState}
      closeModal={closeModal}
      showImageSelector={showImageSelector}
      setShowImageSelector={setShowImageSelector}
      openDeleteModal={openDeleteModal}
      setDeleteModal={setDeleteModal}
      deleteMutation={deleteMutation}
      listQueryVariables={listQueryVariables}
      listAggregateQueryVariables={listAggregateQueryVariables}
    />
  )
}

export default CategoryLayout
