import { gql } from '@apollo/client'
import React, { useState } from 'react'
import {
  Switch,
  Input,
  InputNumber,
  FullScreenReportModal,
  OperationType,
  LocationList,
  LocationDataProps,
  CheckboxTree,
  TreeDataType,
  BasicModal as Modal,
} from '@pabau/ui'
import { Collapse, Checkbox } from 'antd'
import {
  DollarOutlined,
  PercentageOutlined,
  CheckCircleFilled,
} from '@ant-design/icons'
import classNames from 'classnames'
import CrudLayout from '../../../components/CrudLayout/CrudLayout'

import styles from './rooms.module.less'
const { Panel } = Collapse

const treeData: TreeDataType[] = [
  {
    title: 'Travel Clinic',
    key: 'Travel Clinic',
    children: [
      {
        title: 'Subcategory 1',
        key: 'Travel Clinic - Subcategory 1',
        children: [],
      },
      {
        title: 'Subcategory 2',
        key: 'Travel Clinic - Subcategory 2',
        children: [],
      },
      {
        title: 'Subcategory 3',
        key: 'Travel Clinic - Subcategory 3',
        children: [],
      },
    ],
  },
  {
    title: 'Vaccination Services',
    key: 'Vaccination Services',
    children: [
      {
        title: 'Subcategory 1',
        key: 'Vaccination Services - Subcategory 1',
        children: [],
      },
      {
        title: 'Subcategory 2',
        key: 'Vaccination Services - Subcategory 2',
        children: [],
      },
      {
        title: 'Subcategory 3',
        key: 'Vaccination Services - Subcategory 3',
        children: [],
      },
    ],
  },
  {
    title: 'COVID-19 Antibody Testing System',
    key: 'COVID-19 Antibody Testing System',
    children: [],
  },
  {
    title: 'Period Delay Service',
    key: 'Period Delay Service',
    children: [],
  },
  {
    title: 'Mole Screening Service',
    key: 'Mole Screening Service',
    children: [],
  },
  {
    title: 'Health Checks',
    key: 'Health Checks',
    children: [],
  },
  {
    title: 'Aesthetic Services',
    key: 'Aesthetic Services',
    children: [],
  },
  {
    title: 'Sexual Health Services',
    key: 'Sexual Health Services',
    children: [],
  },
]

const schema: Schema = {
  full: 'Rooms',
  fullLower: 'rooms',
  short: 'Room',
  shortLower: 'room',
  createButtonLabel: 'Create Room',
  deleteDescField: 'deleteDescField',
  messages: {
    create: {
      success: 'You have successfully created a room',
      error: 'While creating a room',
    },
    update: {
      success: 'You have successfully updated a room',
      error: 'While updating a room',
    },
    delete: {
      success: 'You have successfully deleted a room',
      error: 'While deleting a room',
    },
  },
  fields: {
    room_name: {
      full: 'Room Name',
      fullLower: 'room name',
      short: 'Room Name',
      shortLower: 'room name',
      min: 2,
      example: 'Surgical lab',
      cssWidth: 'max',
      type: 'string',
    },
    location: {
      full: 'Location',
      fullLower: 'location',
      short: 'Location',
      shortLower: 'location',
      min: 2,
      type: 'string',
      cssWidth: 'max',
    },
    is_active: {
      full: 'Status',
      type: 'boolean',
      defaultvalue: true,
    },
  },
}
/* eslint-disable graphql/template-strings */
export const LIST_QUERY = gql`
  query rooms($isActive: Boolean = true, $offset: Int, $limit: Int) {
    rooms(
      offset: $offset
      limit: $limit
      order_by: { id: desc }
      where: { is_active: { _eq: $isActive } }
    ) {
      __typename
      id
      room_name
      location
      is_active
    }
  }
`
const LIST_AGGREGATE_QUERY = gql`
  query rooms_aggregate($isActive: Boolean = true) {
    rooms_aggregate(where: { is_active: { _eq: $isActive } }) {
      aggregate {
        count
      }
    }
  }
`
const DELETE_MUTATION = gql`
  mutation delete_Labs_by_pk($id: uuid!) {
    delete_Labs_by_pk(id: $id) {
      __typename
      id
    }
  }
`
const ADD_MUTATION = gql`
  mutation insert_departments_one($name: String!, $is_active: Boolean) {
    insert_departments_one(object: { name: $name, is_active: $is_active }) {
      __typename
      id
    }
  }
`
const EDIT_MUTATION = gql`
  mutation update_Labs_by_pk($id: uuid!, $name: String!, $is_active: Boolean) {
    update_Labs_by_pk(
      pk_columns: { id: $id }
      _set: { name: $name, is_active: $is_active }
    ) {
      __typename
      id
      is_active
      order
    }
  }
`
const UPDATE_ORDER_MUTATION = gql`
  mutation update_departments_order($id: uuid!, $order: Int) {
    update_departments(where: { id: { _eq: $id } }, _set: { order: $order }) {
      affected_rows
    }
  }
`

export function Rooms() {
  const [showModal, setShowModal] = useState(false)
  const [advancedSetting, setAdvancedSetting] = useState('currency')
  const [allServicesSelected, setAllServicesSelected] = useState(true)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectAll, setSelectAll] = useState<boolean>(false)
  const [locations, setLocations] = useState<LocationDataProps[]>([
    {
      key: '1',
      location: 'Accent prime',
      checked: false,
    },
    {
      key: '2',
      location: 'All-inclusive',
      checked: true,
    },
    {
      key: '3',
      location: 'Exclusive',
      checked: true,
    },
    {
      key: '4',
      location: 'Others',
      checked: true,
    },
  ])

  //services
  const [expandedKeys, setExpandedKeys] = useState(['Travel Clinic'])
  const [checkedKeys, setCheckedKeys] = useState([
    'Travel Clinic - Subcategory 1',
  ])
  const [autoExpandParent, setAutoExpandParent] = useState(true)
  const [
    allEmployeeServicesSelected,
    setAllEmployeeServicesSelected,
  ] = useState(false)

  const onExpand = (expandedKeysValue: string[]) => {
    setExpandedKeys(expandedKeysValue)
    setAutoExpandParent(false)
  }

  const onCheck = (checkedKeysValue: string[]) => {
    setAllEmployeeServicesSelected(checkedKeysValue.length > 0)
    setCheckedKeys(checkedKeysValue)
  }

  const handleLocationChange = (checked: boolean, locationKey: string) => {
    const mappedLocation: LocationDataProps[] = locations.map((location) => {
      if (location.key === locationKey) {
        return {
          ...location,
          checked,
        }
      }
      return location
    })
    setLocations([...mappedLocation])
    if (mappedLocation.every((loc) => loc.checked)) {
      setSelectAll(true)
    } else {
      setSelectAll(false)
    }
  }

  const onCheckAllChange = (checked: boolean) => {
    const mappedLocations = locations.map((location) => {
      return {
        ...location,
        checked,
      }
    })
    setLocations([...mappedLocations])
    setSelectAll(checked)
  }

  const createPageOnClick = () => {
    setShowModal(true)
  }

  const selectAllEmployeeServices = (isChecked) => {
    if (isChecked) {
      const data = treeData.map((tree) =>
        tree.children && tree.children.length > 0
          ? tree.children.map((child) => child.key)
          : [tree.key]
      )
      setCheckedKeys(data.flat())
      setAllEmployeeServicesSelected(true)
    } else {
      setCheckedKeys([])
      setAllEmployeeServicesSelected(false)
    }
  }

  const handleSetEditPage = () => {
    setShowModal(true)
  }

  return (
    <div>
      <CrudLayout
        schema={schema}
        tableSearch={false}
        addQuery={ADD_MUTATION}
        deleteQuery={DELETE_MUTATION}
        listQuery={LIST_QUERY}
        editQuery={EDIT_MUTATION}
        aggregateQuery={LIST_AGGREGATE_QUERY}
        updateOrderQuery={UPDATE_ORDER_MUTATION}
        showNotificationBanner={true}
        createPage={true}
        createPageOnClick={createPageOnClick}
        setEditPage={handleSetEditPage}
      />
      <FullScreenReportModal
        title="Create Rooms"
        visible={showModal}
        operations={[
          OperationType.active,
          OperationType.cancel,
          OperationType.delete,
          OperationType.create,
        ]}
        enableCreateBtn
        activated={true}
        subMenu={['Details', 'Location']}
        onBackClick={() => setShowModal(false)}
        onCancel={() => setShowModal(false)}
        onDelete={() => setShowDeleteModal(true)}
      >
        <div className={styles.createServiceGeneral}>
          <div className={styles.createServiceSection}>
            <h2 className={styles.createServiceSectionTitle}>Details</h2>
            <div className={styles.createServiceSectionItem} />
            <div className={styles.createServiceSectionItem}>
              <Input label="Room Name" placeHolderText="eg. Room 1" />
            </div>
            <div className={styles.createServiceSectionItem}>
              <Switch
                size="small"
                className={styles.switchBtn}
                checked={allServicesSelected}
                onChange={(isSelected) => setAllServicesSelected(isSelected)}
              />
              <span className={styles.subtitle}>
                All services can be performed in this room
              </span>
            </div>
          </div>

          {!allServicesSelected && (
            <div className={styles.createServiceSection}>
              <div className={styles.servicesContent}>
                <div className={styles.servicesTitleHead}>
                  <h5>Services</h5>
                  <div className={styles.desc}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </div>
                </div>
                <div className={styles.selectAllCheckbox}>
                  <Checkbox
                    onChange={(event) =>
                      selectAllEmployeeServices?.(event.target.checked)
                    }
                    checked={allEmployeeServicesSelected}
                    className={styles.selectAll}
                  >
                    Select all
                  </Checkbox>
                </div>
                <CheckboxTree
                  onExpand={onExpand}
                  expandedKeys={expandedKeys}
                  autoExpandParent={autoExpandParent}
                  onCheck={onCheck}
                  checkedKeys={checkedKeys}
                  treeData={treeData}
                />
              </div>
            </div>
          )}

          <div className={styles.advancedSettings}>
            <Collapse ghost>
              <Panel
                header={
                  <span className={styles.header}>Advanced settings</span>
                }
                key="advanced-settings"
              >
                <div className={styles.createServiceSection}>
                  <h2 className={styles.createServiceSectionTitle}>Advanced</h2>
                  <div className={styles.typeWrapper}>
                    <div
                      className={
                        advancedSetting === 'percentage'
                          ? classNames(styles.percentageWrapper, styles.active)
                          : styles.percentageWrapper
                      }
                      onClick={() => {
                        setAdvancedSetting('percentage')
                      }}
                    >
                      <PercentageOutlined />
                      <span className={styles.verify}>
                        <CheckCircleFilled />
                      </span>
                      <h5>Percentage</h5>
                    </div>
                    <div
                      className={
                        advancedSetting === 'currency'
                          ? classNames(styles.percentageWrapper, styles.active)
                          : styles.percentageWrapper
                      }
                      onClick={() => {
                        setAdvancedSetting('currency')
                      }}
                    >
                      <span className={styles.verify}>
                        <CheckCircleFilled />
                      </span>
                      <DollarOutlined />
                      <h5>Fixed</h5>
                    </div>
                  </div>
                  <div
                    className={`${styles.createServiceSectionItem} ${styles.roomFeeInput}`}
                  >
                    <InputNumber
                      label="Room Fee"
                      placeHolderText="$ 50"
                      showCurrency
                      currency={advancedSetting === 'currency' ? '£' : '%'}
                    />
                  </div>
                </div>
              </Panel>
            </Collapse>
          </div>
        </div>
        <div className={styles.createServicePricing}>
          <div className={styles.createServiceSection}>
            {/* Location List Start */}
            <div className={styles.checkboxWrapper}>
              <LocationList
                description="Choose the locations where this room can be booked"
                locationData={locations}
                handleLocationChange={handleLocationChange}
                selectAll={selectAll}
                onCheckAllChange={onCheckAllChange}
              />
            </div>
          </div>
          {/* Location list End */}
        </div>
      </FullScreenReportModal>
      <Modal
        modalWidth={682}
        centered={true}
        onCancel={() => {
          setShowDeleteModal(false)
        }}
        onOk={async () => {
          setShowDeleteModal(false)
        }}
        visible={showDeleteModal}
        title={`Delete ${schema.short}?`}
        newButtonText={schema.deleteBtnLabel || 'Yes, Delete'}
        isValidate={true}
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
          This record will be deleted. This action is irreversable
        </span>
      </Modal>
    </div>
  )
}

export default Rooms
