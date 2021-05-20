import { FileAddOutlined } from '@ant-design/icons'
import { DocumentNode, gql, useMutation } from '@apollo/client'
import {
  BasicModal,
  Button,
  Notification,
  NotificationType,
  Table,
  useLiveQuery,
} from '@pabau/ui'
import { Card, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { useTranslationI18 } from '../../../hooks/useTranslationI18'
import CreateTaxRateModal from './CreateTaxRateModal'

export interface TaxRateProps {
  listQuery: DocumentNode
  onCreateTaxRate: () => void
}

const EDIT_MUTATION = gql`
  mutation update_tax_rates_by_pk(
    $id: uuid!
    $name: String
    $value: Float
    $isActive: Boolean = true
    $glCode: String
  ) {
    update_tax_rates_by_pk(
      pk_columns: { id: $id }
      _set: {
        name: $name
        value: $value
        is_active: $isActive
        glCode: $glCode
      }
    ) {
      id
    }
  }
`

const DELETE_MUTATION = gql`
  mutation delete_tax_rates_by_pk($id: uuid!) {
    delete_tax_rates_by_pk(id: $id) {
      id
    }
  }
`

const UPDATE_ORDER_MUTATION = gql`
  mutation update_tax_order($id: uuid!, $order: Int) {
    update_tax_rates(where: { id: { _eq: $id } }, _set: { order: $order }) {
      affected_rows
    }
  }
`

export function TaxRate({ listQuery, onCreateTaxRate }: TaxRateProps) {
  const { t } = useTranslationI18()
  const taxRateColumns = [
    {
      title: t('setup.taxrate.table.column1'),
      dataIndex: 'name',
      className: 'drag-visible',
      visible: true,
      width: '60%',
    },
    {
      title: t('setup.taxrate.table.column2'),
      dataIndex: 'value',
      className: 'drag-visible',
      visible: true,
      render: function renderTableSource(value) {
        return <span>{value}%</span>
      },
      width: '20%',
    },
    {
      title: t('setup.taxrate.table.column3'),
      dataIndex: 'is_active',
      className: 'drag-visible',
      visible: true,
      width: '20%',
    },
  ]
  const [showModal, setShowModal] = useState(false)
  const [editData, setEditData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [taxes, setTaxes] = useState(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const { data, error, loading } = useLiveQuery(listQuery, {})

  const [editMutation] = useMutation(EDIT_MUTATION, {
    onCompleted() {
      Notification(
        NotificationType.success,
        t('setup.taxrate.notification.edit.success')
      )
    },
    onError() {
      Notification(
        NotificationType.error,
        t('setup.taxrate.notification.edit.error')
      )
    },
  })

  const [deleteMutation] = useMutation(DELETE_MUTATION, {
    onCompleted() {
      Notification(
        NotificationType.success,
        t('setup.taxrate.notification.delete.success')
      )
    },
    onError() {
      Notification(
        NotificationType.error,
        t('setup.taxrate.notification.delete.error')
      )
    },
  })

  const [updateOrderMutation] = useMutation(UPDATE_ORDER_MUTATION, {
    onError(err) {
      Notification(
        NotificationType.error,
        t('setup.taxrate.notification.order.error')
      )
    },
  })

  const onRowClick = (data) => {
    setEditData(data)
    setShowModal(true)
  }

  const onTaxEdit = async (values) => {
    await editMutation({
      variables: {
        ...editData,
        ...values,
        value: Number.parseFloat(values.value),
      },
      optimisticResponse: {},
      refetchQueries: [
        {
          query: listQuery,
        },
      ],
    })
  }

  const onTaxDelete = async () => {
    await deleteMutation({
      variables: { id: editData?.id },
      optimisticResponse: {},
      refetchQueries: [
        {
          query: listQuery,
        },
      ],
    })
    setShowModal(false)
    setShowDeleteModal(false)
    setEditData(null)
  }

  const updateOrder = async (values) => {
    await updateOrderMutation({
      variables: values,
      optimisticResponse: {},
      update: (proxy) => {
        if (listQuery) {
          const existing = proxy.readQuery({
            query: listQuery,
          })
          if (existing) {
            const key = Object.keys(existing)[0]
            proxy.writeQuery({
              query: listQuery,
              data: {
                [key]: [...existing[key], values],
              },
            })
          }
        }
      },
    })
  }

  useEffect(() => {
    if (!loading && data) {
      setIsLoading(false)
      setTaxes(data)
    }
  }, [data, loading])

  const onReorder = ({ newData, oldIndex, newIndex }) => {
    newData = newData.map((d, i) => {
      d.order = data[i].order
      return d
    })
    if (oldIndex > newIndex) {
      for (let i = newIndex; i <= oldIndex; i++) updateOrder(newData[i])
    } else {
      for (let i = oldIndex; i <= newIndex; i++) updateOrder(newData[i])
    }
  }

  if (error) {
    return (
      <Typography.Paragraph type="danger">{error.message}</Typography.Paragraph>
    )
  }

  return (
    <>
      <Card bodyStyle={{ padding: 0 }} style={{ borderTopWidth: 0 }}>
        <Table
          columns={taxRateColumns}
          loading={isLoading}
          dataSource={taxes?.map((e: { id: string }) => ({ key: e.id, ...e }))}
          onRowClick={onRowClick}
          onAddTemplate={onCreateTaxRate}
          noDataText={t('setup.taxrate.notax')}
          noDataBtnText={t('setup.taxrate.newbtn')}
          noDataIcon={<FileAddOutlined />}
          rowKey="key"
          style={{ height: '100%' }}
          updateDataSource={onReorder}
        />
      </Card>
      {showModal && (
        <CreateTaxRateModal
          isEdit={true}
          editData={editData}
          visible={showModal}
          onCancel={() => setShowModal(false)}
          onSave={onTaxEdit}
          onDelete={() => {
            setShowDeleteModal(true)
            setShowModal(false)
          }}
        />
      )}
      {showDeleteModal && (
        <BasicModal
          footer={false}
          width={682}
          title={t('setup.taxrate.notification.deletemodal.title')}
          centered={true}
          visible={showDeleteModal}
          onCancel={() => {
            setShowModal(true)
            setShowDeleteModal(false)
          }}
        >
          <div style={{ paddingBottom: 40 }}>
            <Typography.Paragraph>
              {editData?.name}{' '}
              {t('setup.taxrate.notification.deletemodal.para')}
            </Typography.Paragraph>
            <div style={{ textAlign: 'right', marginTop: 20 }}>
              <Button type="primary" onClick={onTaxDelete}>
                {t('setup.taxrate.notification.deletemodal.deletebtn')}
              </Button>
            </div>
          </div>
        </BasicModal>
      )}
    </>
  )
}

export default TaxRate
