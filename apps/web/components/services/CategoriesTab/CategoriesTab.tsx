import React, { FC, useState, useEffect } from 'react'
import {
  Table,
  Avatar,
  BasicModal as CreateCategoryModal,
  Input,
  Button,
  Switch,
} from '@pabau/ui'
import classNames from 'classnames'
import { PlusOutlined } from '@ant-design/icons'
import styles from './categories_tab.module.less'

const data = [
  {
    id: 1,
    key: '1',
    name: 'Online Consulation',
    total_assigned: '4',
    index: 1,
    is_active: 1,
  },
  {
    id: 2,
    key: '2',
    name: 'ML Contour',
    total_assigned: '8',
    index: 2,
    is_active: 0,
  },
  {
    id: 3,
    key: '3',
    name: 'ML Contour',
    total_assigned: '12',
    index: 3,
    is_active: 0,
  },
  {
    id: 4,
    key: '4',
    name: 'Elemis peptide',
    total_assigned: '5',
    index: 4,
    is_active: 1,
  },
  {
    id: 5,
    key: '5',
    name: 'Filler',
    total_assigned: '4',
    index: 5,
    is_active: 1,
  },
  {
    id: 6,
    key: '6',
    name: 'Facebook',
    total_assigned: '8',
    index: 6,
    is_active: 0,
  },
  {
    id: 7,
    key: '7',
    name: 'Fresha',
    total_assigned: '10',
    index: 7,
    is_active: 1,
  },
]

const columns = [
  {
    title: 'Service Group',
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
    title: 'Services Assigned',
    dataIndex: 'total_assigned',
    visible: true,
    render: function renderSourceName(val) {
      return <span>{val || '0'}</span>
    },
  },
  {
    title: 'Status',
    dataIndex: 'is_active',
    visible: true,
  },
]

export interface NewCategory {
  name: string
  color: string
  is_active: boolean
}

export interface CP {
  perPage?: number
  searchTerm?: string
  modalShowState?: boolean
  totalRecords: (total: number) => void
  closeModal?: () => void
  categoriesUpdates?: (categories: NewCategory[]) => void
}

export const CateogriesTab: FC<CP> = ({
  perPage,
  searchTerm,
  modalShowState = false,
  totalRecords,
  closeModal,
  categoriesUpdates,
  ...rest
}) => {
  const appointmentColors = [
    '#7986cb',
    '#64b5f6',
    '#4dd0e1',
    '#9575cd',
    '#ba68c8',
    '#d46bd4',
    '#ff679b',
    '#fff176',
    '#a1887f',
    '#4db6ac',
    '#81c784',
    '#90a4ae',
    '#ffc38e',
    '#d2a3a3',
  ]

  const [sourceData, setSourceData] = useState(null)
  const [newCategoryData, setNewCategoryData] = useState<NewCategory>(null)

  useEffect(() => {
    if (!sourceData?.length) {
      setSourceData(data)
      totalRecords(data.length)
    }
  }, [sourceData, setSourceData, totalRecords])

  const inputHandler = (key, value) => {
    const data = { ...newCategoryData }
    data[key] = value
    setNewCategoryData(data)
  }

  const handleSubmitCategory = () => {
    const categories = [...sourceData]
    categories.push(newCategoryData)
    closeModal?.()
    setNewCategoryData(null)
    setSourceData(categories)
    categoriesUpdates?.([newCategoryData])
  }

  return (
    <div className={styles.categoriesTabMain}>
      <Table
        draggable={true}
        dataSource={sourceData?.map((e: { id }) => ({
          key: e.id,
          ...e,
        }))}
        scroll={{ x: 'max-content' }}
        columns={columns}
        pagination={false}
        searchTerm={searchTerm}
        noDataBtnText="Categories"
        noDataText="category"
      />
      <CreateCategoryModal
        visible={modalShowState}
        modalWidth={500}
        wrapClassName="addCategoryModal"
        title="Create service category"
        onCancel={() => closeModal?.()}
      >
        <div className="nameInput">
          <label>Name</label>
          <Input
            type="text"
            requiredMark={true}
            placeHolderText="Enter Category Name"
            reqiredMsg="Name is required"
            name="name"
            onChange={(val) => inputHandler('name', val)}
          />
        </div>
        <div className={styles.appointmentColor}>
          <p className={styles.appointmentColorTitle}>Appointment colour</p>
          <div className={styles.appointmentColorItems}>
            {appointmentColors.map((color) => (
              <div
                key={color}
                className={
                  color === newCategoryData?.color
                    ? classNames(
                        styles.appointmentColorItem,
                        styles.appointmentColorSelected
                      )
                    : styles.appointmentColorItem
                }
                onClick={() => inputHandler('color', color)}
              >
                <div
                  style={{
                    backgroundColor: color,
                  }}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="chooseImageInput">
          <label>Image</label>
          <Button type="default" size="small" className={styles.chooseImgBtn}>
            <PlusOutlined />
            Choose from Library
          </Button>
        </div>
        <div className="footerBtnInput">
          <div>
            <label>Active</label>
            <Switch
              size="small"
              defaultChecked={newCategoryData?.is_active}
              onChange={(check) => inputHandler('is_active', check)}
            />
          </div>
          <div>
            <Button type="default" size="large" onClick={() => closeModal?.()}>
              Cancel
            </Button>
          </div>
          <div>
            <Button
              type="primary"
              size="large"
              onClick={() => handleSubmitCategory()}
            >
              Create
            </Button>
          </div>
        </div>
      </CreateCategoryModal>
    </div>
  )
}

export default CateogriesTab
