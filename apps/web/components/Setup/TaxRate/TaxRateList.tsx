import { FileAddOutlined } from '@ant-design/icons'
import {
  BasicModal,
  Button,
  Notification,
  NotificationType,
  Table,
} from '@pabau/ui'
import {
  GetTaxesDocument,
  useUpdateOneTaxRateMutation,
  useDeleteOneTaxRateMutation,
} from '@pabau/graphql'
import { Card, Typography } from 'antd'
import React, { useState } from 'react'
import { useTranslationI18 } from '../../../hooks/useTranslationI18'
import CreateTaxRateModal from './CreateTaxRateModal'
import styles from './TaxRateComponents.module.less'

export interface TaxRateProps {
  isLoading: boolean
  searchTerm: string
  dataSource: {
    id?: string
    name?: string
    value?: number
    glCode?: string
    is_active?: boolean
  }[]
  onCreateTaxRate: () => void
  paginateData?: {
    total: number
    offset: number
    limit: number
    currentPage: number
    showingRecords: number
  }
}

export function TaxRate({
  isLoading,
  dataSource,
  searchTerm,
  onCreateTaxRate,
  paginateData,
}: TaxRateProps) {
  const { t } = useTranslationI18()

  const renderActiveButton = (isActive) => {
    return (
      <Button
        className={isActive ? styles.activeBtn : styles.disableSourceBtn}
        disabled={!isActive}
      >
        {isActive
          ? t('basic-crud-table-button-active')
          : t('basic-crud-table-button-inactive')}
      </Button>
    )
  }

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
      width: '20%',
      render: function renderTableSource(value) {
        return <span>{value + '%'}</span>
      },
    },
    {
      title: t('setup.taxrate.table.column3'),
      dataIndex: 'is_active',
      className: 'drag-visible',
      visible: true,
      width: '20%',
      render: function renderTableSource(value) {
        return renderActiveButton(!value)
      },
    },
  ]
  const [showModal, setShowModal] = useState(false)
  const [editData, setEditData] = useState(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const [editMutation] = useUpdateOneTaxRateMutation({
    onCompleted() {
      setShowModal(false)
      setEditData(null)
      Notification(NotificationType.success, t('setup.taxrate.edit.success'))
    },
    onError() {
      Notification(NotificationType.error, t('setup.taxrate.edit.error'))
    },
  })

  const [deleteMutation] = useDeleteOneTaxRateMutation({
    onCompleted() {
      Notification(NotificationType.success, t('setup.taxrate.delete.success'))
    },
    onError() {
      Notification(NotificationType.error, t('setup.taxrate.delete.error'))
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
      },
      optimisticResponse: {},
      update: (proxy) => {
        const existing = proxy.readQuery({
          query: GetTaxesDocument,
        })
        if (existing) {
          const key = Object.keys(existing)[0]
          proxy.writeQuery({
            query: GetTaxesDocument,
            data: {
              [key]: [...existing[key], values],
            },
          })
        }
      },
    })
  }

  const onTaxDelete = async () => {
    await deleteMutation({
      variables: { id: editData?.id },
      optimisticResponse: {},
      update: (proxy) => {
        const existing = proxy.readQuery({
          query: GetTaxesDocument,
        })
        if (existing) {
          const key = Object.keys(existing)[0]
          proxy.writeQuery({
            query: GetTaxesDocument,
            data: {
              [key]: [...existing[key], dataSource],
            },
          })
        }
      },
    })
    setShowModal(false)
    setShowDeleteModal(false)
    setEditData(null)
  }

  return (
    <>
      <Card bodyStyle={{ padding: 0 }} style={{ borderTopWidth: 0 }}>
        <div className={styles.marketingSourcesTableContainer}>
          <Table
            columns={taxRateColumns}
            loading={isLoading}
            searchTerm={searchTerm}
            dataSource={dataSource?.map((e: { id: string }) => ({
              key: e.id,
              ...e,
            }))}
            onRowClick={onRowClick}
            onAddTemplate={onCreateTaxRate}
            noDataText={t('setup.taxrate.notax')}
            noDataBtnText={t('setup.taxrate.newbtn')}
            noDataIcon={<FileAddOutlined />}
            rowKey="key"
            style={{ height: '100%' }}
          />
        </div>
      </Card>
      {showModal && (
        <CreateTaxRateModal
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
          title={t('setup.taxrate.deletemodal.title')}
          centered={true}
          visible={showDeleteModal}
          onCancel={() => {
            setShowModal(true)
            setShowDeleteModal(false)
          }}
        >
          <div style={{ paddingBottom: 40 }}>
            <Typography.Paragraph>
              {editData?.name} {t('setup.taxrate.deletemodal.para')}
            </Typography.Paragraph>
            <div style={{ textAlign: 'right', marginTop: 20 }}>
              <Button type="primary" onClick={onTaxDelete}>
                {t('setup.taxrate.deletemodal.deletebtn')}
              </Button>
            </div>
          </div>
        </BasicModal>
      )}
    </>
  )
}

export default TaxRate
