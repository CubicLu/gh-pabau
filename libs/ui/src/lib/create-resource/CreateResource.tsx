import React, { FC, useState, useEffect } from 'react'
import {
  Switch,
  Input,
  FullScreenReportModal,
  OperationType,
  LocationList,
  InputNumber,
  LocationDataProps,
  CheckboxTree,
  TreeDataType,
} from '@pabau/ui'
import { Collapse, Radio, Typography, Select, Checkbox } from 'antd'
import {
  CheckOutlined,
  DollarOutlined,
  PercentageOutlined,
} from '@ant-design/icons'
import styles from './CreateResource.module.less'

const { Panel } = Collapse
const { Paragraph } = Typography
export interface CreateResourceProps {
  visible: boolean
  onClose: () => void
  onCreate?: () => void
  onDelete?: () => void
}

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

export const CreateResource: FC<CreateResourceProps> = ({
  visible,
  onClose,
  onCreate,
  onDelete,
}) => {
  const [showModal, setShowModal] = useState(false)
  const [advancedSetting, setAdvancedSetting] = useState('currency')
  const [allServicesSelected, setAllServicesSelected] = useState(true)
  // const [services, setServices] = useState<ServiceDataProps[]>(serviceData)
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
  useEffect(() => {
    setShowModal(visible)
  }, [visible])

  // Services
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

  return (
    <FullScreenReportModal
      visible={showModal}
      title={`Create Resource`}
      operations={[
        OperationType.active,
        OperationType.delete,
        OperationType.create,
      ]}
      activated={true}
      createBtnText="Create"
      enableCreateBtn
      subMenu={['Details', 'Location']}
      onBackClick={() => {
        setShowModal(false)
        onClose()
      }}
      onCreate={() => {
        onCreate?.()
      }}
      onDelete={() => onDelete?.()}
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
        {allServicesSelected && (
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
              header={<span className={styles.header}>Advanced settings</span>}
              key="advanced-settings"
            >
              <div className={styles.createServiceSection}>
                <h2
                  className={styles.createServiceSectionTitle}
                  style={{ margin: 0 }}
                >
                  Advanced
                </h2>
                <Radio.Group
                  value={advancedSetting}
                  onChange={(e) => setAdvancedSetting(e.target.value)}
                  size="large"
                >
                  {[
                    {
                      label: 'Percentage',
                      icon: PercentageOutlined,
                      value: 'percent',
                    },
                    {
                      label: 'Currency',
                      icon: DollarOutlined,
                      value: 'currency',
                    },
                  ].map((item, index) => {
                    const { label, icon: Icon } = item
                    return (
                      <Radio.Button
                        style={{
                          height: 100,
                          width: 200,
                          backgroundColor:
                            item.value === advancedSetting
                              ? '#EEF7FB'
                              : 'white',
                        }}
                        key={index}
                        value={item.value}
                      >
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            textAlign: 'center',
                            marginTop: 24,
                          }}
                        >
                          {item.value === advancedSetting && (
                            <CheckOutlined
                              style={{
                                position: 'absolute',
                                right: 12,
                                top: 12,
                              }}
                            />
                          )}
                          <Icon style={{ fontSize: 30 }} />
                          <Paragraph>{label}</Paragraph>
                        </div>
                      </Radio.Button>
                    )
                  })}
                </Radio.Group>
                <div
                  className={
                    styles.createServiceSectionItem + ' ' + styles.roomFeeInput
                  }
                >
                  <InputNumber
                    label="Room Fee"
                    placeHolderText="$ 50"
                    showCurrency
                    currency="$"
                  />
                </div>
              </div>
            </Panel>
          </Collapse>
        </div>
      </div>
      <div className={styles.createServicePricing}>
        <div className={styles.createServiceSection}>
          <div className={styles.label}>Primary Location</div>
          <Select
            style={{ width: '100%' }}
            placeholder="Select a location"
            optionFilterProp="children"
          >
            {[].map(({ value, name }, index) => (
              <Select.Option key={index} value={value}>
                {name}
              </Select.Option>
            ))}
          </Select>
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
      </div>
    </FullScreenReportModal>
  )
}

export default CreateResource
