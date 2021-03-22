import { gql } from '@apollo/client'
import React, { useState } from 'react'
import {
  BasicModal as Modal,
  CheckboxTree,
  FullScreenReportModal,
  Input,
  LocationDataProps,
  LocationList,
  OperationType,
  Switch,
  TreeDataType,
} from '@pabau/ui'
import CrudLayout from '../../../components/CrudLayout/CrudLayout'
import styles from './resource.module.less'
import { Checkbox } from 'antd'

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
  full: 'Resources',
  fullLower: 'resources',
  short: 'Resource',
  shortLower: 'resource',
  createButtonLabel: 'Create Resource',
  deleteDescField: 'deleteDescField',
  messages: {
    create: {
      success: 'You have successfully created a resource',
      error: 'While creating a resource',
    },
    update: {
      success: 'You have successfully updated a resource',
      error: 'While updating a resource',
    },
    delete: {
      success: 'You have successfully deleted a resource',
      error: 'While deleting a resource',
    },
  },
  fields: {
    name: {
      full: 'resource Name',
      fullLower: 'resource name',
      short: 'Name',
      shortLower: 'name',
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
export const LIST_QUERY = gql`
  query resources($isActive: Boolean = true, $offset: Int, $limit: Int) {
    resources(
      offset: $offset
      limit: $limit
      order_by: { id: desc }
      where: { is_active: { _eq: $isActive } }
    ) {
      __typename
      id
      name
      is_active
      location
    }
  }
`
const LIST_AGGREGATE_QUERY = gql`
  query resources_aggregate($isActive: Boolean = true) {
    resources_aggregate(where: { is_active: { _eq: $isActive } }) {
      aggregate {
        count
      }
    }
  }
`
const DELETE_MUTATION = gql`
  mutation delete_resources_by_pk($id: uuid!) {
    delete_resources_by_pk(id: $id) {
      __typename
      id
    }
  }
`
const ADD_MUTATION = gql`
  mutation insert_resources_one($name: String!, $is_active: Boolean) {
    insert_resources_one(object: { name: $name, is_active: $is_active }) {
      __typename
      id
    }
  }
`
const EDIT_MUTATION = gql`
  mutation update_resources_by_pk(
    $id: uuid!
    $name: String!
    $is_active: Boolean
  ) {
    update_resources_by_pk(
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
  mutation update_resources_order($id: uuid!, $order: Int) {
    update_resources(where: { id: { _eq: $id } }, _set: { order: $order }) {
      affected_rows
    }
  }
`

export function Resource() {
  const [showModal, setShowModal] = useState(false)
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

  const handleEditPage = () => {
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
        createPage={true}
        createPageOnClick={createPageOnClick}
        setEditPage={handleEditPage}
      />
      <FullScreenReportModal
        title="Create Resource"
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
        footer={true}
      >
        <div className={styles.createServiceGeneral}>
          <div className={styles.createServiceSection}>
            <h2 className={styles.createServiceSectionTitle}>Details</h2>
            <div className={styles.createServiceSectionItem} />
            <div className={styles.createServiceSectionItem}>
              <Input label="Resource Name" placeHolderText="eg. Resource 1" />
            </div>
            <div className={styles.createServiceSectionItem}>
              <Switch
                size="small"
                className={styles.switchBtn}
                checked={allServicesSelected}
                onChange={(isSelected) => setAllServicesSelected(isSelected)}
              />
              <span className={styles.subtitle}>
                All services can be performed in this resource
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
        </div>
        <div className={styles.createServicePricing}>
          <div className={styles.createServiceSection}>
            {/* Location List Start */}
            <div className={styles.checkboxWrapper}>
              <LocationList
                description="Choose the locations where this resource can be booked"
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

export default Resource
