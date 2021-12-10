import React, { FC, useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import { NextPage } from 'next'
import CrudLayout from '../../../components/CrudLayout/CrudLayout'
import {
  FullScreenReportModal,
  OperationType,
  Switch,
  Employees,
  SimpleDropdown,
  Button,
  ButtonTypes,
  CheckboxTree,
  Notification,
  NotificationType,
  BasicModal as Modal,
} from '@pabau/ui'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { Collapse, Radio, InputNumber } from 'antd'
import { Form, Input } from 'formik-antd'
import {
  PercentageOutlined,
  TagOutlined,
  CheckCircleFilled,
} from '@ant-design/icons'
import classNames from 'classnames'
import { useTranslationI18 } from '../../../hooks/useTranslationI18'
import styles from './index.module.less'
import { CountDiscountDocument, GetDiscountsDocument } from '@pabau/graphql'
import { useUser } from '../../../context/UserContext'
import stringToCurrencySignConverter from '../../../helper/stringToCurrencySignConverter'

const { Panel } = Collapse

interface InitialDiscountProps {
  id: string
  name: string
  amount: number
  code: string
  date: boolean
  type: string
  isActive: boolean
  reciept: string
  discountRate: string
  employees: string[]
  services: string[]
  locations: string[]
  products: string[]
}

interface TabProps {
  value: InitialDiscountProps
  setFieldValue(
    field: keyof InitialDiscountProps,
    value: string | string[] | boolean | number
  ): void
  // eslint-disable-next-line @typescript-eslint/ban-types
  t?: Function
}

interface EmployeeListProps {
  name: string
  selected: boolean
}

const DELETE_MUTATION = gql`
  mutation delete_Discounts_by_pk($id: uuid!) {
    delete_Discounts_by_pk(id: $id) {
      __typename
      id
    }
  }
`
const ADD_MUTATION = gql`
  mutation insert_Discounts(
    $name: String!
    $amount: String!
    $code: String
    $date: Boolean!
    $isActive: Boolean!
    $employees: json
    $locations: json
    $services: json
    $reciept: String!
    $type: String!
    $discountRate: String!
  ) {
    insert_Discounts_one(
      object: {
        name: $name
        amount: $amount
        code: $code
        date: $date
        discount_rate: $discountRate
        employees: $employees
        is_active: $isActive
        locations: $locations
        services: $services
        show_on_reciept: $reciept
        type: $type
      }
    ) {
      id
    }
  }
`
const EDIT_MUTATION = gql`
  mutation update_Discounts_by_pk(
    $id: uuid!
    $name: String!
    $amount: String!
    $code: String
    $date: Boolean!
    $isActive: Boolean!
    $employees: json
    $locations: json
    $services: json
    $reciept: String!
    $type: String!
    $discountRate: String!
  ) {
    update_Discounts_by_pk(
      pk_columns: { id: $id }
      _set: {
        name: $name
        amount: $amount
        code: $code
        date: $date
        discount_rate: $discountRate
        employees: $employees
        is_active: $isActive
        locations: $locations
        services: $services
        show_on_reciept: $reciept
        type: $type
      }
    ) {
      __typename
      id
      name
      code
      amount
      is_active
      order
      discount_rate
      show_on_reciept
      date
      employees
      locations
      services
      type
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

const GeneralTab: FC<TabProps> = ({ value, setFieldValue, t }) => {
  return (
    <div className={styles.generalFormWrapper}>
      <Form
        name="basic"
        initialValues={{
          remember: true,
        }}
        layout="vertical"
      >
        <div className={styles.generalSection}>
          <h4>{t('setup.discount.data.general')}</h4>
          <Form.Item
            label={t('setup.discount.data.discountnamelabel')}
            name="name"
          >
            <Input
              name="name"
              autoComplete="off"
              placeholder={t('setup.discount.data.enterdiscountname')}
            />
          </Form.Item>
          <Form.Item
            label={
              value.type === 'percentage'
                ? t('setup.discount.data.percentageamount')
                : t('setup.discount.data.flaterate')
            }
            name="amount"
          >
            <InputNumber
              value={value.amount}
              placeholder={
                value.type === 'percentage'
                  ? t('setup.discount.data.egpercentage')
                  : t('setup.discount.data.egpaund')
              }
              formatter={(data) =>
                value.type === 'percentage' ? `${data}%` : `£ ${data}`
              }
              parser={(data) =>
                value.type === 'percentage'
                  ? Number(data.replace(/%\s?|(,*)/g, ''))
                  : Number(data.replace(/£\s?|(,*)/g, ''))
              }
              onChange={(data) => setFieldValue('amount', data)}
            />
          </Form.Item>
          <Form.Item label={t('setup.discount.data.discountcode')} name="code">
            <Input
              value={value.code}
              name="code"
              autoComplete="off"
              placeholder={t('setup.discount.data.enterdiscountcode')}
              onChange={(e) =>
                setFieldValue('code', e.target.value.toUpperCase())
              }
            />
          </Form.Item>
        </div>
        <div className={styles.generalSection}>
          <h4>{t('setup.discount.data.type')}</h4>
          <div className={styles.typeWrapper}>
            <div
              className={
                value.type === 'percentage'
                  ? classNames(styles.percentageWrapper, styles.active)
                  : styles.percentageWrapper
              }
              onClick={() => {
                setFieldValue('type', 'percentage')
                setFieldValue('discountRate', 'Percentage')
              }}
            >
              <PercentageOutlined />
              <span className={styles.verify}>
                <CheckCircleFilled />
              </span>
              <h5>{t('setup.discount.data.percentage')}</h5>
            </div>
            <div
              className={
                value.type === 'flatRate'
                  ? classNames(styles.percentageWrapper, styles.active)
                  : styles.percentageWrapper
              }
              onClick={() => {
                setFieldValue('type', 'flatRate')
                setFieldValue('discountRate', 'Fixed')
              }}
            >
              <span className={styles.verify}>
                <CheckCircleFilled />
              </span>
              <TagOutlined />
              <h5>{t('setup.discount.data.flaterate')}</h5>
            </div>
          </div>
        </div>
        <div className={styles.advanceSettingOpen}>
          <Collapse ghost>
            <Panel header={t('setup.discount.data.advancedsettings')} key="1">
              <div className={styles.generalSection}>
                <h4>{t('setup.discount.data.reciept')}</h4>
                <span className={styles.reciept}>
                  <Switch
                    checked={value.reciept === 'No' ? false : true}
                    onChange={(data) =>
                      setFieldValue('reciept', data ? 'Yes' : 'No')
                    }
                  />
                  <p>{t('setup.discount.data.showonrecieptlabel')}</p>{' '}
                </span>
              </div>
            </Panel>
          </Collapse>
        </div>
      </Form>
    </div>
  )
}

const RulesTab: FC<TabProps> = ({ value, setFieldValue, t, children }) => {
  const [expandedKeys, setExpandedKeys] = useState(['Accent prime'])
  const [autoExpandParent, setAutoExpandParent] = useState(true)

  const [expandedLocationKeys, setExpandedLocationsKeys] = useState([
    'location-all',
  ])
  const [autoExpandLocationsParent, setAutoExpandLocationsParent] = useState(
    true
  )

  const onExpand = (expandedKeysValue: string[]) => {
    setExpandedKeys(expandedKeysValue)
    setAutoExpandParent(false)
  }

  const onCheck = (checkedKeysValue: string[]) => {
    setFieldValue('services', checkedKeysValue)
  }

  const onExpandLocations = (expandedKeysValue: string[]) => {
    setExpandedLocationsKeys(expandedKeysValue)
    setAutoExpandLocationsParent(false)
  }

  const onCheckLocations = (checkedLocationsKeys: string[]) => {
    setFieldValue('locations', checkedLocationsKeys)
  }

  return (
    <div className={styles.generalFormWrapper}>
      <Form
        name="basic"
        initialValues={{
          remember: true,
        }}
        layout="vertical"
      >
        <div className={styles.generalSection}>
          <h4>{t('ui.report-help-sidebar.performance-services-title')}</h4>
          <p className={styles.subTitle}>
            {t('setup.discount.data.chooseservicediscount')}
          </p>
          <CheckboxTree
            onExpand={onExpand}
            expandedKeys={expandedKeys}
            autoExpandParent={autoExpandParent}
            onCheck={onCheck}
            checkedKeys={value.services}
            treeData={[
              {
                key: 'all',
                title: t('setup.discount.data.selectall'),
                children: [
                  {
                    children: [
                      {
                        key: 'Accent prime - Subcategory 1',
                        title: t('setup.discount.data.subtitle1'),
                      },
                      {
                        key: 'Accent prime - Subcategory 2',
                        title: t('setup.discount.data.subtitle2'),
                      },
                      {
                        key: 'Accent prime - Subcategory 3',
                        title: t('setup.discount.data.subtitle3'),
                      },
                    ],
                    key: 'Accent prime',
                    title: t('setup.discount.data.accentprime'),
                  },
                  {
                    children: [
                      {
                        key: 'All-inclusive - Subcategory 1',
                        title: t('setup.discount.data.subtitle1'),
                      },
                      {
                        key: 'All-inclusive - Subcategory 2',
                        title: t('setup.discount.data.subtitle2'),
                      },
                      {
                        key: 'All-inclusive - Subcategory 3',
                        title: t('setup.discount.data.subtitle3'),
                      },
                    ],
                    key: 'All-inclusive',
                    title: t('setup.discount.data.allinclusive'),
                  },
                  {
                    children: [
                      {
                        key: 'Botox - Subcategory 1',
                        title: t('setup.discount.data.subtitle1'),
                      },
                      {
                        key: 'Botox - Subcategory 2',
                        title: t('setup.discount.data.subtitle2'),
                      },
                      {
                        key: 'Botox - Subcategory 3',
                        title: t('setup.discount.data.subtitle3'),
                      },
                    ],
                    key: 'Botox',
                    title: t('setup.discount.data.botox'),
                  },
                  {
                    children: [
                      {
                        key: 'CO2-Laser - Subcategory 1',
                        title: t('setup.discount.data.subtitle1'),
                      },
                      {
                        key: 'CO2-Laser - Subcategory 2',
                        title: t('setup.discount.data.subtitle2'),
                      },
                      {
                        key: 'CO2-Laser - Subcategory 3',
                        title: t('setup.discount.data.subtitle3'),
                      },
                    ],
                    key: 'CO2-Laser',
                    title: t('setup.discount.data.co2laser'),
                  },
                  {
                    children: [
                      {
                        key: 'Consultation - Subcategory 1',
                        title: t('setup.discount.data.subtitle1'),
                      },
                      {
                        key: 'Consultation - Subcategory 2',
                        title: t('setup.discount.data.subtitle2'),
                      },
                      {
                        key: 'Consultation - Subcategory 3',
                        title: t('setup.discount.data.subtitle3'),
                      },
                    ],
                    key: 'Consultation',
                    title: t('setup.discount.data.consultation'),
                  },
                  {
                    children: [
                      {
                        key: 'Cooltech - Subcategory 1',
                        title: t('setup.discount.data.subtitle1'),
                      },
                      {
                        key: 'Cooltech - Subcategory 2',
                        title: t('setup.discount.data.subtitle2'),
                      },
                      {
                        key: 'Cooltech - Subcategory 3',
                        title: t('setup.discount.data.subtitle3'),
                      },
                    ],
                    key: 'Cooltech',
                    title: t('setup.discount.data.cooltech'),
                  },
                  {
                    children: [
                      {
                        key: 'Cooltech +Accent Prime - Subcategory 1',
                        title: t('setup.discount.data.subtitle1'),
                      },
                      {
                        key: 'Cooltech+Accent Prime - Subcategory 2',
                        title: t('setup.discount.data.subtitle2'),
                      },
                      {
                        key: 'Cooltech+Accent Prime - Subcategory 3',
                        title: t('setup.discount.data.subtitle3'),
                      },
                    ],
                    key: 'Cooltech+Accent Prime',
                    title: t('setup.discount.data.cooltech+accentprime'),
                  },
                  {
                    children: [
                      {
                        key: 'Dermalux - Subcategory 1',
                        title: t('setup.discount.data.subtitle1'),
                      },
                      {
                        key: 'Dermalux - Subcategory 2',
                        title: t('setup.discount.data.subtitle2'),
                      },
                      {
                        key: 'Dermalux - Subcategory 3',
                        title: t('setup.discount.data.subtitle3'),
                      },
                    ],
                    key: 'Dermalux',
                    title: t('setup.discount.data.dermalux'),
                  },
                ],
              },
            ]}
          />
        </div>
        <div className={styles.generalSection}>
          <h4>{t('setup.discount.data.products')}</h4>
          <p className={styles.subTitle}>
            {t('setup.discount.data.chooseproductsdiscount')}
          </p>
          <CheckboxTree
            onExpand={onExpand}
            expandedKeys={expandedKeys}
            autoExpandParent={autoExpandParent}
            onCheck={onCheck}
            checkedKeys={value.products}
            treeData={[
              {
                key: 'all',
                title: t('setup.discount.data.selectall'),
                children: [
                  {
                    children: [
                      {
                        key: 'Accent prime - Subcategory 1',
                        title: t('setup.discount.data.subtitle1'),
                      },
                      {
                        key: 'Accent prime - Subcategory 2',
                        title: t('setup.discount.data.subtitle2'),
                      },
                      {
                        key: 'Accent prime - Subcategory 3',
                        title: t('setup.discount.data.subtitle3'),
                      },
                    ],
                    key: 'Accent prime',
                    title: t('setup.discount.data.accentprime'),
                  },
                  {
                    children: [
                      {
                        key: 'All-inclusive - Subcategory 1',
                        title: t('setup.discount.data.subtitle1'),
                      },
                      {
                        key: 'All-inclusive - Subcategory 2',
                        title: t('setup.discount.data.subtitle2'),
                      },
                      {
                        key: 'All-inclusive - Subcategory 3',
                        title: t('setup.discount.data.subtitle3'),
                      },
                    ],
                    key: 'All-inclusive',
                    title: t('setup.discount.data.allinclusive'),
                  },
                  {
                    children: [
                      {
                        key: 'Botox - Subcategory 1',
                        title: t('setup.discount.data.subtitle1'),
                      },
                      {
                        key: 'Botox - Subcategory 2',
                        title: t('setup.discount.data.subtitle2'),
                      },
                      {
                        key: 'Botox - Subcategory 3',
                        title: t('setup.discount.data.subtitle3'),
                      },
                    ],
                    key: 'Botox',
                    title: t('setup.discount.data.botox'),
                  },
                  {
                    children: [
                      {
                        key: 'CO2-Laser - Subcategory 1',
                        title: t('setup.discount.data.subtitle1'),
                      },
                      {
                        key: 'CO2-Laser - Subcategory 2',
                        title: t('setup.discount.data.subtitle2'),
                      },
                      {
                        key: 'CO2-Laser - Subcategory 3',
                        title: t('setup.discount.data.subtitle3'),
                      },
                    ],
                    key: 'CO2-Laser',
                    title: t('setup.discount.data.co2laser'),
                  },
                  {
                    children: [
                      {
                        key: 'Consultation - Subcategory 1',
                        title: t('setup.discount.data.subtitle1'),
                      },
                      {
                        key: 'Consultation - Subcategory 2',
                        title: t('setup.discount.data.subtitle2'),
                      },
                      {
                        key: 'Consultation - Subcategory 3',
                        title: t('setup.discount.data.subtitle3'),
                      },
                    ],
                    key: 'Consultation',
                    title: t('setup.discount.data.consultation'),
                  },
                  {
                    children: [
                      {
                        key: 'Cooltech - Subcategory 1',
                        title: t('setup.discount.data.subtitle1'),
                      },
                      {
                        key: 'Cooltech - Subcategory 2',
                        title: t('setup.discount.data.subtitle2'),
                      },
                      {
                        key: 'Cooltech - Subcategory 3',
                        title: t('setup.discount.data.subtitle3'),
                      },
                    ],
                    key: 'Cooltech',
                    title: t('setup.discount.data.cooltech'),
                  },
                  {
                    children: [
                      {
                        key: 'Cooltech +Accent Prime - Subcategory 1',
                        title: t('setup.discount.data.subtitle1'),
                      },
                      {
                        key: 'Cooltech+Accent Prime - Subcategory 2',
                        title: t('setup.discount.data.subtitle2'),
                      },
                      {
                        key: 'Cooltech+Accent Prime - Subcategory 3',
                        title: t('setup.discount.data.subtitle3'),
                      },
                    ],
                    key: 'Cooltech+Accent Prime',
                    title: t('setup.discount.data.cooltech+accentprime'),
                  },
                  {
                    children: [
                      {
                        key: 'Dermalux - Subcategory 1',
                        title: t('setup.discount.data.subtitle1'),
                      },
                      {
                        key: 'Dermalux - Subcategory 2',
                        title: t('setup.discount.data.subtitle2'),
                      },
                      {
                        key: 'Dermalux - Subcategory 3',
                        title: t('setup.discount.data.subtitle3'),
                      },
                    ],
                    key: 'Dermalux',
                    title: t('setup.discount.data.dermalux'),
                  },
                ],
              },
            ]}
          />
        </div>
        <div className={styles.generalSection}>
          <h4>{t('setup.discount.data.location')}</h4>
          <p>{t('setup.discount.data.chooselocationdiscount')}</p>
          <CheckboxTree
            onExpand={onExpandLocations}
            expandedKeys={expandedLocationKeys}
            autoExpandParent={autoExpandLocationsParent}
            onCheck={onCheckLocations}
            checkedKeys={value.locations}
            treeData={[
              {
                children: [
                  {
                    key: 'London-Road,London,England',
                    title: t('setup.discount.data.londonroad,london,england'),
                  },
                  {
                    key: 'Lorem-Street,Liverpool,England',
                    title: t(
                      'setup.discount.data.loremstreet,liverpool,england'
                    ),
                  },
                ],
                key: 'location-all',
                title: t('setup.discount.data.selectall'),
              },
            ]}
          />
        </div>
      </Form>
      {children}
    </div>
  )
}

const defaultValue: InitialDiscountProps = {
  id: '',
  name: '',
  amount: undefined,
  code: '',
  date: false,
  type: 'percentage',
  isActive: true,
  reciept: 'No',
  discountRate: 'Percentage',
  employees: [],
  services: [],
  locations: [],
  products: [],
}

export const Discount: NextPage = () => {
  const { me } = useUser()

  const { t } = useTranslationI18()

  const employeeList = [
    {
      name: t('setup.discount.data.jessicawinter'),
      selected: false,
    },
    {
      name: t('setup.discount.data.jeffhackley'),
      selected: false,
    },
    {
      name: t('setup.discount.data.alexanderwang'),
      selected: false,
    },
    {
      name: t('setup.discount.data.lindadavis'),
      selected: false,
    },
    {
      name: t('setup.discount.data.williamtyson'),
      selected: false,
    },
    {
      name: t('setup.discount.data.maxstarck'),
      selected: false,
    },
    {
      name: t('setup.discount.data.kylewalsh'),
      selected: false,
    },
    {
      name: t('setup.discount.data.owenphillips'),
      selected: false,
    },
    {
      name: t('setup.discount.data.aidankelly'),
      selected: false,
    },
    {
      name: t('setup.discount.data.ewanmorgan'),
      selected: false,
    },
    {
      name: t('setup.discount.data.jordanmartin'),
      selected: false,
    },
    {
      name: t('setup.discount.data.grantdudley'),
      selected: false,
    },
  ]
  const schema: Schema = {
    full: t('setup.discount.data.capitalizediscount'),
    fullLower: t('setup.discount.data.lowercasediscount'),
    short: t('setup.discount.data.capitalizediscount'),
    shortLower: t('setup.discount.data.lowercasediscount'),
    createButtonLabel: t('setup.discount.data.creatediscount'),
    messages: {
      create: {
        success: t('setup.discount.data.creatediscountsuccessmessage'),
        error: t('setup.discount.data.creatediscounterrormessage'),
      },
      update: {
        success: t('setup.discount.data.updatediscountsuccessmessage'),
        error: t('setup.discount.data.updatediscounterrormessage'),
      },
      delete: {
        success: t('setup.discount.data.deletediscountsuccessmessage'),
        error: t('setup.discount.data.deletediscounterrormessage'),
      },
    },
    fields: {
      name: {
        full: t('marketingsource-name'),
        fullLower: t('marketingsource-name-lower'),
        short: t('marketingsource-name'),
        shortLower: t('marketingsource-name-lower'),
        min: 2,
        max: 50,
        example: 'Student Discount',
        cssWidth: 'max',
        type: 'string',
      },
      amount: {
        full: t('setup.discount.data.capitalizeamount'),
        fullLower: t('setup.discount.data.lowercaseamount'),
        short: t('setup.discount.data.capitalizeamount'),
        shortLower: t('setup.discount.data.lowercaseamount'),
        min: 2,
        max: 50,
        example: 15,
        cssWidth: 'min',
        type: 'string',
        render: (amount, { type }: InitialDiscountProps) => {
          return (
            <div>
              {Math.abs(amount as number)}{' '}
              {type === '1' ? (
                <PercentageOutlined />
              ) : (
                stringToCurrencySignConverter(me.currency)
              )}
            </div>
          )
        },
      },
      discount_rate: {
        full: t('setup.discount.data.capitalizediscountrate'),
        fullLower: t('setup.discount.data.lowercasediscountrate'),
        short: t('setup.discount.data.capitalizediscountrate'),
        shortLower: t('setup.discount.data.lowercasediscountrate'),
        min: 2,
        max: 50,
        example: 'Fixed',
        cssWidth: 'min',
        type: 'string',
        render: (_, { type }: InitialDiscountProps) => {
          return (
            <div>
              {type === '1'
                ? t('setup.discount.data.percentage')
                : t('setup.discount.data.fixed')}
            </div>
          )
        },
      },
      code: {
        full: t('setup.discount.data.capitalizecode'),
        fullLower: t('setup.discount.data.lowercasecode'),
        short: t('setup.discount.data.capitalizecode'),
        shortLower: t('setup.discount.data.lowercasecode'),
        min: 2,
        max: 50,
        example: 'No',
        required: true,
        cssWidth: 'min',
        type: 'string',
      },
      is_active: {
        full: 'Status',
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

  const [showModal, setShowModal] = useState<boolean>(false)
  const [employeeListData, setEmployeeListData] = useState<EmployeeListProps[]>(
    employeeList
  )
  const [initialValue, setInitialValue] = useState<InitialDiscountProps>(
    defaultValue
  )
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)

  const [addMutation] = useMutation(ADD_MUTATION, {
    onCompleted(data) {
      Notification(
        NotificationType.success,
        t('setup.discount.data.creatediscountsuccessfullymessage')
      )
    },
    onError(err) {
      Notification(
        NotificationType.error,
        t('setup.discount.data.creatediscounterrormessages')
      )
    },
  })
  const [deleteMutation] = useMutation(DELETE_MUTATION, {
    onCompleted(data) {
      Notification(
        NotificationType.success,
        t('setup.discount.data.deletediscountsuccessmessages')
      )
    },
    onError(err) {
      Notification(
        NotificationType.error,
        t('setup.discount.data.deletediscounterrormessages')
      )
    },
  })
  const [editMutation] = useMutation(EDIT_MUTATION, {
    onCompleted(data) {
      Notification(
        NotificationType.success,
        t('setup.discount.data.updatediscountsuccessmessages')
      )
    },
    onError(err) {
      Notification(
        NotificationType.error,
        t('setup.discount.data.updatediscounterrormessages')
      )
    },
  })

  const handleOperations = () => {
    return !initialValue.id
      ? [OperationType.active, OperationType.create]
      : [OperationType.active, OperationType.delete, OperationType.save]
  }

  const createPageOnClick = () => {
    setShowModal(true)
    const data = employeeList.map((value) => {
      return {
        ...value,
        selected: false,
      }
    })
    setEmployeeListData(data)
    setInitialValue(defaultValue)
  }

  const handleFullScreenModalBackClick = (handleReset) => {
    setShowModal(false)
    handleReset()
  }

  const showDeleteConfirmDialog = () => {
    setShowModal(false)
    setShowDeleteModal(true)
  }

  const handleSetEditPage = (value) => {
    setInitialValue({
      ...value,
      amount:
        value.type === 'percentage'
          ? Number.parseInt(value.amount.replace(' %', ''))
          : Number.parseInt(value.amount.replace('£ ', '')),
      isActive: value.is_active,
      reciept: value.show_on_reciept,
      discountRate: value.discount_rate,
    })
    setShowModal(true)
  }

  const setEmployeeData = (records: string[]) => {
    const data = employeeList.map((value) => {
      if (records.includes(value.name)) {
        value.selected = true
      }
      return value
    })
    return data
  }

  const prepareEmployeeList = (value, setFieldValue) => {
    const record = []
    for (const item of value) {
      if (item.selected) {
        record.push(item.name)
      }
    }
    setFieldValue('employees', record)
  }

  const customFilter = () => {
    return (
      <Formik
        enableReinitialize={true}
        initialValues={{
          status: 'active',
          ByLocation: '',
          ByService: '',
          ByProduct: '',
          ByEmployee: '',
        }}
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onSubmit={() => {}}
      >
        {({ setFieldValue, handleReset, values, handleSubmit }) => (
          <div className={styles.popover}>
            <div className={styles.title}>
              <div className={styles.divider}>
                {t('basic-crud-table-button-filter')}
              </div>
            </div>
            <div>
              <div className={styles.status}>
                {t('basic-crud-table-text-status')}
              </div>
              <div>
                <Radio.Group
                  onChange={(e) => setFieldValue('status', e.target.value)}
                  value={values.status}
                  className={styles.radio}
                >
                  <Radio value={'active'} className={styles.active}>
                    {t('marketingsource-status-label')}
                  </Radio>
                  <Radio value={'inactive'} className={styles.inactive}>
                    {t('basic-crud-table-button-inactive')}
                  </Radio>
                </Radio.Group>
              </div>
            </div>
            <div className={styles.box}>
              <SimpleDropdown
                name={'ByLocation'}
                value={values.ByLocation}
                label={t('setup.discount.data.location')}
                dropdownItems={[
                  t('setup.discount.data.londonroad,london,england'),
                  t('setup.discount.data.loremstreet,liverpool,england'),
                ]}
                onSelected={(val) => setFieldValue('ByLocation', val)}
                placeHolderText={t('setup.discount.data.selectlocation')}
              />
            </div>
            <div className={styles.box}>
              <SimpleDropdown
                name={'ByService'}
                value={values.ByService}
                label={t('setup.discount.data.service')}
                dropdownItems={[
                  t('setup.discount.data.accentprime'),
                  t('setup.discount.data.allinclusive'),
                  t('setup.discount.data.botox'),
                  t('setup.discount.data.co2laser'),
                  t('setup.discount.data.consultation'),
                  t('setup.discount.data.cooltech'),
                  t('setup.discount.data.cooltech+accentprime'),
                  t('setup.discount.data.dermalux'),
                ]}
                onSelected={(val) => setFieldValue('ByService', val)}
                placeHolderText={'Select service'}
              />
            </div>
            <div className={styles.box}>
              <SimpleDropdown
                name="ByProduct"
                value={values.ByProduct}
                label={t('ui.report-help-sidebar.kpis-products-title')}
                dropdownItems={[
                  t('setup.discount.data.subtitle1'),
                  t('setup.discount.data.subtitle2'),
                  t('setup.discount.data.subtitle3'),
                ]}
                onSelected={(val) => setFieldValue('ByProduct', val)}
                placeHolderText={t('setup.discount.data.selectproduct')}
                placeholder={t('setup.discount.data.selectproduct')}
              />
            </div>
            <div className={styles.box}>
              <SimpleDropdown
                name="ByEmployee"
                value={values.ByEmployee}
                label={t('setup.discount.data.employeelabel')}
                dropdownItems={[
                  t('setup.discount.data.jessicawinter'),
                  t('setup.discount.data.jeffhackley'),
                  t('setup.discount.data.alexanderwang'),
                  t('setup.discount.data.lindadavis'),
                  t('setup.discount.data.williamtyson'),
                  t('setup.discount.data.maxstarck'),
                  t('setup.discount.data.kylewalsh'),
                  t('setup.discount.data.owenphillips'),
                  t('setup.discount.data.aidankelly'),
                  t('setup.discount.data.ewanmorgan'),
                  t('setup.discount.data.jordanmartin'),
                  t('setup.discount.data.grantdudley'),
                ]}
                onSelected={(val) => setFieldValue('ByEmployee', val)}
                placeHolderText={t('setup.discount.data.selectemployee')}
              />
            </div>
            <div className={styles.btngroup}>
              <Button onClick={handleReset}>
                {t('setup.discount.data.clearallbutton')}
              </Button>
              <Button
                type={ButtonTypes.primary}
                className={styles.btn}
                onClick={() => handleSubmit()}
              >
                {t('setup.discount.data.applyfilterbutton')}
              </Button>
            </div>
          </div>
        )}
      </Formik>
    )
  }
  return (
    <>
      <CrudLayout
        schema={schema}
        tableSearch={false}
        addQuery={ADD_MUTATION}
        deleteQuery={DELETE_MUTATION}
        listQuery={GetDiscountsDocument}
        editQuery={EDIT_MUTATION}
        aggregateQuery={CountDiscountDocument}
        updateOrderQuery={UPDATE_ORDER_MUTATION}
        draggable={false}
        createPage={true}
        createPageOnClick={createPageOnClick}
        isCustomFilter={true}
        customFilter={customFilter}
        setEditPage={handleSetEditPage}
      />
      <Formik
        initialValues={initialValue}
        enableReinitialize={true}
        validationSchema={Yup.object().shape({
          name: Yup.string()
            .required(t('setup.discount.data.namerequired'))
            .max(50, t('setup.discount.data.namemaxlength'))
            .matches(
              /^[\w!#$%&()*+.=@^-\s]+$/g,
              t('setup.discount.data.namematch')
            ),
          amount: Yup.number().required(
            t('setup.discount.data.amountrequired')
          ),
          code: Yup.string()
            .max(50, t('setup.discount.data.codemaxlength'))
            .matches(
              /^[\w!#$%&()*+.=@^-\s]+$/g,
              t('setup.discount.data.codematch')
            ),
          type: Yup.string().required(t('setup.discount.data.typerequired')),
        })}
        onSubmit={async (values, { resetForm }) => {
          const finalValue = {
            ...values,
            amount:
              values.type === 'percentage'
                ? `${values.amount} %`
                : `£ ${values.amount}`,
          }
          initialValue.id
            ? await editMutation({
                variables: finalValue,
                optimisticResponse: {},
              })
            : await addMutation({
                variables: finalValue,
                optimisticResponse: {},
              })
          setShowModal(false)
          resetForm()
        }}
      >
        {({ setFieldValue, handleSubmit, values, handleReset }) => (
          <>
            <FullScreenReportModal
              operations={handleOperations()}
              title={
                values.id
                  ? t('setup.discount.data.editdiscount')
                  : t('setup.discount.data.creatediscount')
              }
              visible={showModal}
              onBackClick={() => handleFullScreenModalBackClick(handleReset)}
              activated={true}
              enableCreateBtn={true}
              createBtnText={t('marketingsource-create-button')}
              onActivated={(value) => setFieldValue('isActive', value)}
              onCreate={handleSubmit}
              onSave={handleSubmit}
              onDelete={showDeleteConfirmDialog}
              subMenu={[
                t('setup.discount.data.general'),
                t('setup.discount.data.rules'),
              ]}
              footer={true}
            >
              <GeneralTab value={values} setFieldValue={setFieldValue} t={t} />
              <RulesTab setFieldValue={setFieldValue} value={values} t={t}>
                <div className={styles.empSection}>
                  <Employees
                    description={t('setup.discount.data.employeesubtitle')}
                    employees={
                      initialValue.id
                        ? setEmployeeData(initialValue.employees)
                        : employeeListData
                    }
                    onSelected={(value) =>
                      prepareEmployeeList(value, setFieldValue)
                    }
                    title={t('setup.discount.data.employees')}
                  />
                </div>
              </RulesTab>
            </FullScreenReportModal>
            <Modal
              modalWidth={682}
              centered={true}
              onCancel={() => {
                setShowDeleteModal(false)
              }}
              onOk={async () => {
                await deleteMutation({
                  variables: {
                    id: initialValue.id,
                  },
                  optimisticResponse: {},
                })
                setShowModal(false)
                setShowDeleteModal(false)
              }}
              visible={showDeleteModal}
              title={t('setup.discount.data.deletediscounttitle')}
              newButtonText={
                schema.deleteBtnLabel || t('setup.discount.data.yesdelete')
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
                {initialValue?.name} {t('setup.discount.data.deletedaction')}
              </span>
            </Modal>
          </>
        )}
      </Formik>
    </>
  )
}

export default Discount
