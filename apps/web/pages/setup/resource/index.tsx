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
import { useTranslationI18 } from '../../../hooks/useTranslationI18'
import { CountEquipmentDocument, ListEquipmentDocument } from '@pabau/graphql'

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
  const { t } = useTranslationI18()
  const [showModal, setShowModal] = useState(false)
  const [active, setActive] = useState(true)
  const [isCreate, setIsCreate] = useState(false)
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
  const schema: Schema = {
    full: t('setup.resource.title'),
    fullLower: t('setup.resource.title.lower'),
    short: t('setup.resource.title.short'),
    shortLower: t('setup.resource.title.short.lower'),
    createButtonLabel: t('setup.resource.createbutton'),
    deleteDescField: 'deleteDescField',
    messages: {
      create: {
        success: t('setup.resource.notification.create.success'),
        error: t('setup.resource.notification.create.error'),
      },
      update: {
        success: t('setup.resource.notification.edit.success'),
        error: t('setup.resource.notification.edit.error'),
      },
      delete: {
        success: t('setup.resource.notification.delete.success'),
        error: t('setup.resource.notification.delete.error'),
      },
    },
    fields: {
      name: {
        full: t('setup.resource.fields.name'),
        fullLower: t('setup.resource.fields.name.lower'),
        short: t('setup.resource.fields.name.short'),
        shortLower: t('setup.resource.fields.name.short.lower'),
        min: 2,
        example: t('setup.resource.fields.name.example'),
        cssWidth: 'max',
        type: 'string',
      },
      location: {
        full: t('setup.resource.fields.location'),
        fullLower: t('setup.resource.fields.location.lower'),
        short: t('setup.resource.fields.location.short'),
        shortLower: t('setup.resource.fields.location.short.lower'),
        min: 2,
        type: 'string',
        cssWidth: 'max',
      },
      is_active: {
        full: t('setup.resource.fields.location.isactive'),
        type: 'boolean',
        defaultvalue: true,
      },
    },
    filter: {
      primary: {
        name: 'public',
        type: 'number',
        default: 1,
        active: 1,
        inactive: 0,
      },
    },
  }

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
    setIsCreate(true)
  }

  const selectAllEmployeeServices = (isChecked) => {
    if (isChecked) {
      const data = treeData.map((tree) =>
        tree.children && tree.children.length > 0
          ? tree.children.map((child) => child.key as string)
          : [tree.key as string]
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
    setIsCreate(false)
  }

  return (
    <div>
      <CrudLayout
        schema={schema}
        tableSearch={false}
        addQuery={ADD_MUTATION}
        deleteQuery={DELETE_MUTATION}
        listQuery={ListEquipmentDocument}
        editQuery={EDIT_MUTATION}
        aggregateQuery={CountEquipmentDocument}
        updateOrderQuery={UPDATE_ORDER_MUTATION}
        createPage={true}
        createPageOnClick={createPageOnClick}
        setEditPage={handleEditPage}
      />
      <FullScreenReportModal
        title={
          isCreate
            ? t('setup.resource.fullscreenmodal.title.create')
            : t('setup.resource.fullscreenmodal.title.edit')
        }
        visible={showModal}
        operations={
          isCreate
            ? [OperationType.active, OperationType.cancel, OperationType.create]
            : [
                OperationType.active,
                OperationType.cancel,
                OperationType.delete,
                OperationType.create,
              ]
        }
        createBtnText={
          isCreate ? t('common-label-create') : t('common-label-save')
        }
        deleteBtnText={t('common-label-delete')}
        activeBtnText={
          active ? t('common-label-active') : t('common-label-inactive')
        }
        enableCreateBtn
        activated={active}
        subMenu={[
          t('setup.resource.fullscreenmodal.tab.details'),
          t('setup.resource.fullscreenmodal.tab.location'),
        ]}
        onBackClick={() => setShowModal(false)}
        onDelete={() => setShowDeleteModal(true)}
        onActivated={(val) => setActive(val)}
        footer={true}
      >
        <div className={styles.createServiceGeneral}>
          <div className={styles.createServiceSection}>
            <h2 className={styles.createServiceSectionTitle}>
              {t('setup.resource.details')}
            </h2>
            <div className={styles.createServiceSectionItem} />
            <div className={styles.createServiceSectionItem}>
              <Input
                label={t('setup.resource.details.resourcename.label')}
                placeHolderText={t(
                  'setup.resource.details.resourcename.placeholder'
                )}
              />
            </div>
            <div className={styles.createServiceSectionItem}>
              <Switch
                size="small"
                className={styles.switchBtn}
                checked={allServicesSelected}
                onChange={(isSelected) => setAllServicesSelected(isSelected)}
              />
              <span className={styles.subtitle}>
                {t('setup.resource.details.allservices')}
              </span>
            </div>
          </div>
          {!allServicesSelected && (
            <div className={styles.createServiceSection}>
              <div className={styles.servicesContent}>
                <div className={styles.servicesTitleHead}>
                  <h5>{t('setup.resource.services.title')}</h5>
                  <div className={styles.desc}>
                    {t('setup.resource.services.description')}
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
                    {t('setup.resource.services.selectall')}
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
                description={t('setup.resource.locationlist.description')}
                locationData={locations}
                handleLocationChange={handleLocationChange}
                selectAll={selectAll}
                onCheckAllChange={onCheckAllChange}
                checkBtnText={
                  selectAll
                    ? t('ui.locationlist.uncheckall')
                    : t('ui.locationlist.checkall')
                }
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
        title={t('setup.resource.deletemodal.title', { what: schema.short })}
        newButtonText={
          schema.deleteBtnLabel || t('setup.resource.deletemodal.button')
        }
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
          {t('setup.resource.deletemodal.message')}
        </span>
      </Modal>
    </div>
  )
}

export default Resource
