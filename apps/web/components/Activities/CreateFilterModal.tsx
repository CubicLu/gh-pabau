import React, { useState, FC, useEffect } from 'react'
import { Formik } from 'formik'
import { Dropdown, Menu, Radio, Space } from 'antd'
import {
  BasicModal,
  Button,
  DropdownWithCheck,
  Notification,
  NotificationType,
} from '@pabau/ui'
import { Checkbox, Form, Input as FormikInput, SubmitButton } from 'formik-antd'
import { getData } from './FilterOptionData'
import { FilterMenu, PersonList, OptionList } from './FilterMenu'
import {
  PlusOutlined,
  UpOutlined,
  DownOutlined,
  LockOutlined,
  UnlockOutlined,
  MinusOutlined,
} from '@ant-design/icons'
import styles from './CreateFilterModal.module.less'
import { LabeledValue } from 'antd/lib/tree-select'
import { AuthenticatedUser, JwtUser } from '@pabau/yup'
import { useTranslationI18 } from '../../hooks/useTranslationI18'
import { TFunction } from 'react-i18next'
import * as Yup from 'yup'
import classNames from 'classnames'
import { DisplayDate } from '../../hooks/displayDate'
import { MutationFunction } from '@apollo/client'
import {
  useDeleteActivityUserFilterMutation,
  FilterOptionForActivityDocument,
  useCreateActivityFilterMutation,
  useUpdateActivityFilterMutation,
} from '@pabau/graphql'
import { v4 as uuidv4, validate as uuidValidate } from 'uuid'

export interface FilterOptionItemType {
  id: number
  name: string
  shared: boolean
  userId: number
  owner?: string
  updated_at?: Date
  isFilterOwner: boolean
  columns: string[]
  andFilterOption: FilterOptionType[]
  orFilterOption: FilterOptionType[]
}

export interface FilterDataObjectType {
  name: string
  shared: boolean
  andFilterOption: FilterOptionType[]
  orFilterOption: FilterOptionType[]
  column: string[]
}

export interface FilterDataProps {
  id?: number
  type?: string
  filter?: FilterDataObjectType
}

export interface FilterOptionType {
  type: string
  filterColumn: string
  operand: string
  menuOption: string
}

export interface InitialValueTypes {
  id: number
  name: string
  visibility: string
  isFilterOwner: boolean
  saveFilter: boolean
  andFilterOption: FilterOptionType[]
  orFilterOption: FilterOptionType[]
  creatorName?: string
  lastUpdatedDate?: Date
}

interface FilterMenuProps {
  items: FilterOptionType[]
  setFieldValue: (
    fieldName: string,
    value: string | FilterOptionType[] | boolean
  ) => void
  fieldName: string
  userList: PersonList[]
  isFilterOwner: boolean
  activityTypeOption: OptionList[]
  loggedUser: Partial<AuthenticatedUser> & JwtUser
  isEdit: boolean
  t: TFunction<'common'>
  leadSourceData: OptionList[]
  leadStageData: OptionList[]
  pipelineData: OptionList[]
  locationData: OptionList[]
  services: OptionList[]
}

interface CreateFilterModalProps {
  showModal: boolean
  setShowModal: (value: boolean) => void
  userList: PersonList[]
  activityTypeOption: OptionList[]
  loggedUser: Partial<AuthenticatedUser> & JwtUser
  selectedColumn: string[]
  upsertActiveColumn: MutationFunction
  setSelectFilterUser: (item: string[]) => void
  setFilterValue: (item: number) => void
  setFilterGroupValue: (item: number) => void
  setActiveFilterId: (item: number) => void
  activeFilterId: number
  filterData: FilterDataProps
  setFilterDataObject: (value: FilterDataObjectType) => void
  setFilterOption: (
    value:
      | FilterOptionItemType[]
      | ((preValue: FilterOptionItemType[]) => FilterOptionItemType[])
  ) => void
  data?: InitialValueTypes
  leadSourceData: OptionList[]
  leadStageData: OptionList[]
  pipelineData: OptionList[]
  locationData: OptionList[]
  services: OptionList[]
}
const defaultValue: InitialValueTypes = {
  name: '',
  id: undefined,
  visibility: 'private',
  isFilterOwner: true,
  saveFilter: false,
  andFilterOption: [],
  orFilterOption: [],
  creatorName: '',
  lastUpdatedDate: undefined,
}

const RenderFilterMenu: FC<FilterMenuProps> = ({
  items,
  setFieldValue,
  fieldName,
  userList,
  activityTypeOption = [],
  loggedUser,
  isFilterOwner,
  isEdit,
  t,
  leadSourceData,
  leadStageData,
  pipelineData,
  locationData,
  services,
}) => {
  const { manageOperandBasedOnColumn, activity, activityTypeMapper } = getData(
    t
  )
  const activityItemChange = (
    value: string | number | LabeledValue,
    index: number,
    key: string
  ) => {
    const data = [...items]
    data[index][key] = value
    if (key === 'filterColumn') {
      data[index].operand = 'is'
      data[index].menuOption = ''
      switch (value) {
        case 'Assigned to user':
        case 'Creator':
        case 'Lead owner':
        case 'Won by':
        case 'Lead creator': {
          data[index].menuOption = loggedUser?.user?.toString()
          break
        }
        case 'Done': {
          data[index].menuOption = 'To do'
          break
        }
        case 'Free/busy':
        case 'Type': {
          data[index].menuOption = '1'
          break
        }
        case 'Status': {
          data[index].menuOption = 'Pending'
          break
        }
        case 'Lead source': {
          data[index].menuOption = leadSourceData?.[0]?.id?.toString()
          break
        }
        case 'Lead stage': {
          data[index].menuOption = leadStageData?.[0]?.id?.toString()
          break
        }
        case 'Lead status': {
          data[index].menuOption = 'Open'
          break
        }
        case 'Add time':
        case 'Due date':
        case 'Lead created date':
        case 'Won time':
        case 'Lead closed on':
        case 'First activity time':
        case 'Lead last activity date':
        case 'Lead lost time':
        case 'Date of entering stage':
        case 'Update time':
        case 'Last email received':
        case 'Last email sent':
        case 'Next activity date': {
          data[index].menuOption = 'last quarter'
          break
        }
        case 'Pipeline': {
          data[index].menuOption = pipelineData?.[0]?.id?.toString()
          break
        }
        case 'Location': {
          data[index].menuOption = locationData?.[0]?.id?.toString()
          break
        }
        case 'Services added': {
          data[index].menuOption = services?.[0]?.id?.toString()
          break
        }
      }
    } else if (key === 'type') {
      if (value === 'Activity') {
        data[index]['filterColumn'] = 'Add time'
      }
      if (value === 'Lead') {
        data[index]['filterColumn'] = 'Lead name'
        data[index].menuOption = ''
      }
    }
    setFieldValue(fieldName, data)
  }

  const removeFilterMenu = (filterIndex: number) => {
    const data = [...items].filter((record, index) => index !== filterIndex)
    setFieldValue(fieldName, data)
  }
  return (
    <>
      {items.map((item, index) => (
        <div className={styles.customActivity} key={index}>
          <DropdownWithCheck
            defaultValue={'Activity'}
            dropdownItems={activity}
            value={item.type}
            className={styles.activityDropdown}
            disabled={!(isFilterOwner || loggedUser.admin)}
            onSelect={(value) => activityItemChange(value, index, 'type')}
          />
          <DropdownWithCheck
            dropdownClassName={styles.filterColumnWrap}
            defaultValue={'Add time'}
            value={item.filterColumn}
            defaultActiveFirstOption
            onSelect={(value) =>
              activityItemChange(value, index, 'filterColumn')
            }
            showSearch
            filterOption={true}
            disabled={!(isFilterOwner || loggedUser.admin)}
            dropdownItems={activityTypeMapper[item.type]}
          />
          <DropdownWithCheck
            defaultValue={'is'}
            value={item.operand}
            className={styles.selectOperand}
            onChange={(value: string) =>
              activityItemChange(value, index, 'operand')
            }
            dropdownItems={manageOperandBasedOnColumn?.[item.filterColumn]}
            showSearch
            disabled={!(isFilterOwner || loggedUser.admin)}
            filterOption={true}
          />
          <div className={styles.filterMenuWrapper}>
            {!(
              item.operand === 'is not empty' || item.operand === 'is empty'
            ) && (
              <FilterMenu
                columnName={item.filterColumn}
                personsList={userList}
                activityTypeOption={activityTypeOption}
                value={item.menuOption}
                onChange={(value: string) =>
                  activityItemChange(value, index, 'menuOption')
                }
                userId={loggedUser.user}
                disabled={!(isFilterOwner || loggedUser.admin)}
                isEdit={isEdit}
                leadSourceData={leadSourceData}
                leadStageData={leadStageData}
                pipelineData={pipelineData}
                locationData={locationData}
                services={services}
              />
            )}
          </div>
          <div
            onClick={() =>
              (isFilterOwner || loggedUser.admin) && removeFilterMenu(index)
            }
            className={classNames(
              styles.minusBlock,
              !(isFilterOwner || loggedUser.admin) && styles.disable
            )}
          >
            <MinusOutlined />
          </div>
        </div>
      ))}
    </>
  )
}

export const CreateFilterModal: FC<CreateFilterModalProps> = ({
  showModal,
  setShowModal,
  userList,
  activityTypeOption,
  loggedUser,
  data,
  selectedColumn,
  upsertActiveColumn,
  setSelectFilterUser,
  filterData,
  setFilterValue,
  setActiveFilterId,
  activeFilterId,
  setFilterDataObject,
  setFilterGroupValue,
  setFilterOption,
  leadSourceData,
  leadStageData,
  pipelineData,
  locationData,
  services,
}) => {
  const [visibilityVisible, setVisibilityVisible] = useState(false)
  const [initialValue, setInitialValue] = useState<InitialValueTypes>(
    defaultValue
  )
  const { t } = useTranslationI18()
  const { visibilityMenuOption } = getData(t)

  const [deleteMutation] = useDeleteActivityUserFilterMutation({
    onCompleted() {
      Notification(
        NotificationType.success,
        `Success! ${t('create.filter.modal.deleted.filter.message')}`
      )
    },
    onError() {
      Notification(
        NotificationType.error,
        `Error! ${t('create.filter.modal.deleted.filter.error.message')}`
      )
    },
  })

  const [addMutation] = useCreateActivityFilterMutation({
    async onCompleted(data) {
      if (data?.createOneActivityUserFilter) {
        const id = data?.createOneActivityUserFilter?.id
        setActiveFilterId(id)
        setFilterValue(null)
        setFilterGroupValue(null)
        await upsertActiveColumn({
          variables: {
            userId: loggedUser?.user,
            companyId: loggedUser?.company,
            update: {
              user_filter: { set: null },
              user_group_filter: { set: null },
              ActivityUserFilter: { connect: { id: id } },
            },
            create: {
              User: {
                connect: { id: loggedUser?.user },
              },
              Company: {
                connect: { id: loggedUser?.company },
              },
              ActivityUserFilter: {
                connect: { id: id },
              },
            },
          },
        })
      }
      Notification(
        NotificationType.success,
        `Success! ${t('create.filter.modal.create.filter.message')}`
      )
    },
    onError() {
      Notification(
        NotificationType.error,
        `Error! ${t('create.filter.modal.create.filter.error.message')}`
      )
    },
  })

  const [editMutation] = useUpdateActivityFilterMutation({
    async onCompleted(data) {
      if (data?.updateOneActivityUserFilter) {
        const id = data?.updateOneActivityUserFilter?.id
        setActiveFilterId(id)
        setFilterValue(null)
        setFilterGroupValue(null)
        await upsertActiveColumn({
          variables: {
            userId: loggedUser?.user,
            companyId: loggedUser?.company,
            update: {
              user_filter: { set: null },
              user_group_filter: { set: null },
              ActivityUserFilter: { connect: { id: id } },
            },
            create: {
              User: {
                connect: { id: loggedUser?.user },
              },
              Company: {
                connect: { id: loggedUser?.company },
              },
              ActivityUserFilter: {
                connect: { id: id },
              },
            },
          },
        })
      }
      Notification(
        NotificationType.success,
        `Success! ${t('create.filter.modal.edit.filter.message')}`
      )
    },
    onError() {
      Notification(
        NotificationType.error,
        `Error! ${t('create.filter.modal.edit.filter.error.message')}`
      )
    },
  })

  useEffect(() => {
    if (data?.id) {
      setInitialValue(data)
    } else {
      setInitialValue(defaultValue)
    }
  }, [data])

  const visibilityMenu = (
    setFieldValue: (field: string, value: string | boolean) => void,
    values: InitialValueTypes
  ) => {
    const onRadioBtnChange = (e) => {
      setVisibilityVisible(false)
      setFieldValue('visibility', e.target.value)
    }
    return (
      <Menu>
        <Menu.Item key="1">
          <Radio.Group
            onChange={onRadioBtnChange}
            value={values.visibility}
            name="visibility"
          >
            <Space direction="vertical">
              {visibilityMenuOption.map((menuItem) => (
                <Radio
                  value={menuItem.value}
                  className={styles.radioBtn}
                  key={menuItem.value}
                >
                  <div className={styles.menuWrapper}>
                    <span className={styles.icon}>
                      {menuItem.value === 'private' ? (
                        <LockOutlined />
                      ) : (
                        <UnlockOutlined />
                      )}
                    </span>
                    <span className={styles.title}>{menuItem.label}</span>
                  </div>
                  <span className={styles.desc}>{menuItem.description}</span>
                </Radio>
              ))}
            </Space>
          </Radio.Group>
        </Menu.Item>
      </Menu>
    )
  }

  const AddConditionClick = (
    values: InitialValueTypes,
    setFieldValue,
    fieldName: string
  ) => {
    setFieldValue(fieldName, [
      ...values[fieldName],
      {
        type: 'Activity',
        filterColumn: 'Add time',
        operand: 'is',
        menuOption: 'last quarter',
      },
    ])
  }

  const onSubmit = async (values: InitialValueTypes) => {
    const data = {
      name: values.name,
      data: JSON.stringify({
        andFilterOption: values.andFilterOption,
        orFilterOption: values.orFilterOption,
      }),
      shared: values.visibility === 'private' ? false : true,
      columns: values.saveFilter
        ? JSON.stringify({ columns: selectedColumn })
        : null,
    }
    await (values.id && !uuidValidate(values.id)
      ? editMutation({
          variables: {
            id: values.id,
            ...data,
          },
          refetchQueries: [
            {
              query: FilterOptionForActivityDocument,
              variables: {
                userId: loggedUser.user,
              },
            },
          ],
        })
      : addMutation({
          variables: data,
          refetchQueries: [
            {
              query: FilterOptionForActivityDocument,
              variables: {
                userId: loggedUser.user,
              },
            },
          ],
        }))
    setFilterDataObject({
      andFilterOption: values.andFilterOption,
      column: values.saveFilter ? selectedColumn : null,
      name: values.name,
      orFilterOption: values.orFilterOption,
      shared: values.visibility === 'private' ? false : true,
    })
    setShowModal(false)
  }

  const onDeleteFilter = async (values) => {
    setShowModal(false)
    if (uuidValidate(values.id)) {
      setFilterOption((item) => {
        const newItem = item.filter((record) => record.id !== values.id)
        return newItem
      })
      if (activeFilterId === values.id) {
        setFilterValue(0)
        setActiveFilterId(null)
        setFilterDataObject(null)
        setSelectFilterUser([])
      }
    } else {
      await deleteMutation({
        variables: {
          id: values.id,
        },
        optimisticResponse: {},
        refetchQueries: [
          {
            query: FilterOptionForActivityDocument,
            variables: {
              userId: loggedUser.user,
            },
          },
        ],
      })
      if (activeFilterId === values.id) {
        setSelectFilterUser([])
        await upsertActiveColumn({
          variables: {
            userId: loggedUser?.user,
            companyId: loggedUser?.company,
            update: {
              user_filter: { set: 0 },
              user_group_filter: { set: null },
              ActivityUserFilter: { disconnect: true },
            },
            create: {
              User: {
                connect: { id: loggedUser?.user },
              },
              Company: {
                connect: { id: loggedUser?.company },
              },
              user_filter: 0,
            },
          },
        })
        setFilterDataObject(null)
        setFilterValue(0)
      }
    }
  }

  const onPreview = (values: InitialValueTypes, resetForm) => {
    const shared = values.visibility === 'private' ? false : true
    setFilterDataObject({
      andFilterOption: values.andFilterOption,
      column: values.saveFilter ? selectedColumn : null,
      name: values.name,
      orFilterOption: values.orFilterOption,
      shared,
    })
    if (values.id) {
      setActiveFilterId(values.id)
    } else {
      const id = uuidv4()
      setActiveFilterId(id)
      setFilterOption((item) => {
        return [
          ...item,
          {
            id: id,
            name: values.name,
            shared,
            userId: loggedUser?.user,
            isFilterOwner: true,
            columns: values.saveFilter ? selectedColumn : null,
            andFilterOption: values.andFilterOption,
            orFilterOption: values.orFilterOption,
          },
        ]
      })
    }
    setFilterValue(null)
    setFilterGroupValue(null)
    setShowModal(false)
    resetForm()
  }

  return (
    <Formik
      initialValues={initialValue}
      enableReinitialize={true}
      validationSchema={Yup.object().shape({
        name: Yup.string()
          .required(t('create.filter.modal.filter.name.required'))
          .max(50, t('create.filter.modal.filter.name.max.validation.message')),
      })}
      onSubmit={async (values, { resetForm }) => {
        await onSubmit(values)
        resetForm()
      }}
    >
      {({ setFieldValue, values, resetForm }) => (
        <BasicModal
          className={styles.filterModalWrapper}
          visible={showModal}
          hasScroll={true}
          centered
          title={
            values.id
              ? t('edit.activity.filter.modal.title', {
                  name: values.name,
                })
              : t('create.filter.modal.title')
          }
          onCancel={() => {
            setShowModal(false)
            resetForm()
          }}
          modalWidth={1000}
          isValidate={true}
          footer={false}
        >
          <Form layout="vertical">
            <div className={styles.filterContentMain}>
              <div className={styles.filterContentWrap}>
                <h5>{t('create.filter.modal.all.condition.title')}</h5>
                <RenderFilterMenu
                  items={values.andFilterOption}
                  setFieldValue={setFieldValue}
                  fieldName="andFilterOption"
                  userList={userList}
                  activityTypeOption={activityTypeOption}
                  loggedUser={loggedUser}
                  isFilterOwner={values.isFilterOwner}
                  isEdit={!!values.id}
                  t={t}
                  leadSourceData={leadSourceData}
                  leadStageData={leadStageData}
                  pipelineData={pipelineData}
                  locationData={locationData}
                  services={services}
                />
                <Button
                  className={classNames(
                    styles.btnAdd,
                    !(values.isFilterOwner || loggedUser.admin) &&
                      styles.disable
                  )}
                  type="default"
                  icon={<PlusOutlined />}
                  disabled={!(values.isFilterOwner || loggedUser.admin)}
                  onClick={() =>
                    AddConditionClick(values, setFieldValue, 'andFilterOption')
                  }
                >
                  {t('create.filer.modal.add.condition.btn')}
                </Button>
              </div>
              <div className={styles.filterContentWrap}>
                <h5>{t('create.filter.modal.any.condition.title')}</h5>
                <RenderFilterMenu
                  items={values.orFilterOption}
                  setFieldValue={setFieldValue}
                  fieldName="orFilterOption"
                  userList={userList}
                  activityTypeOption={activityTypeOption}
                  loggedUser={loggedUser}
                  isFilterOwner={values.isFilterOwner}
                  isEdit={!!values.id}
                  t={t}
                  leadSourceData={leadSourceData}
                  leadStageData={leadStageData}
                  pipelineData={pipelineData}
                  locationData={locationData}
                  services={services}
                />
                <Button
                  className={classNames(
                    styles.btnAdd,
                    !(values.isFilterOwner || loggedUser.admin) &&
                      styles.disable
                  )}
                  type="default"
                  icon={<PlusOutlined />}
                  disabled={!(values.isFilterOwner || loggedUser.admin)}
                  onClick={() =>
                    AddConditionClick(values, setFieldValue, 'orFilterOption')
                  }
                >
                  {t('create.filer.modal.add.condition.btn')}
                </Button>
              </div>
              <div className={styles.filterField}>
                <Form.Item
                  label={t('create.filter.modal.filter.name.label')}
                  name={'name'}
                >
                  <FormikInput
                    name={'name'}
                    disabled={!(values.isFilterOwner || loggedUser.admin)}
                    placeholder={t(
                      'create.filter.modal.filter.name.placeholder'
                    )}
                  />
                </Form.Item>
                <Form.Item
                  label={t('create.filter.modal.visibility.label')}
                  name={'visibility'}
                >
                  <span
                    className={classNames(
                      !(values.isFilterOwner || loggedUser.admin) &&
                        styles.btnProvider
                    )}
                  >
                    <Dropdown
                      trigger={['click']}
                      overlay={visibilityMenu(setFieldValue, values)}
                      visible={visibilityVisible}
                      disabled={!(values.isFilterOwner || loggedUser.admin)}
                      onVisibleChange={(value) => setVisibilityVisible(value)}
                      getPopupContainer={(node) => node}
                      overlayClassName={styles.visibilityMenu}
                    >
                      <Button
                        className={classNames(
                          !(values.isFilterOwner || loggedUser.admin),
                          styles.disable
                        )}
                      >
                        <span className={styles.visibilityWrapper}>
                          {values.visibility === 'private' ? (
                            <div className={styles.iconText}>
                              <LockOutlined />
                              <span>
                                {t('create.filter.modal.visibility.private')}
                              </span>
                            </div>
                          ) : (
                            <div className={styles.iconText}>
                              <UnlockOutlined />
                              <span>
                                {t('create.filter.modal.visibility.shared')}
                              </span>
                            </div>
                          )}
                          {visibilityVisible ? (
                            <UpOutlined />
                          ) : (
                            <DownOutlined />
                          )}
                        </span>
                      </Button>
                    </Dropdown>
                  </span>
                </Form.Item>
              </div>
              <Checkbox
                name="saveFilter"
                disabled={!(values.isFilterOwner || loggedUser.admin)}
              >
                {t('create.filter.modal.save.filter.checkbox.label')}
              </Checkbox>
              {values.id && (
                <div className={styles.creatorWrapper}>
                  <span>
                    {t('create.filter.modal.creator.name', {
                      name: values.creatorName,
                    })}
                  </span>
                  <div className={styles.circle} />
                  <span>
                    {t('create.filter.modal.last.modified.label', {
                      date: DisplayDate(values.lastUpdatedDate),
                    })}
                  </span>
                </div>
              )}
            </div>
            <div className={styles.btnWrapper}>
              {(values.isFilterOwner || loggedUser.admin) && values.id && (
                <Button
                  className={styles.btnDanger}
                  type="primary"
                  danger
                  onClick={() => onDeleteFilter(values)}
                >
                  {t('create.filter.modal.delete.button.label')}
                </Button>
              )}
              <span className={styles.previewWrapper}>
                <Button
                  type="default"
                  disabled={!(values.isFilterOwner || loggedUser.admin)}
                  className={classNames(
                    !(values.isFilterOwner || loggedUser.admin) &&
                      styles.disable
                  )}
                  onClick={() => onPreview(values, resetForm)}
                >
                  {t('create.filter.modal.preview.button.label')}
                </Button>
                <SubmitButton
                  type="primary"
                  className={classNames(
                    styles.submitBtn,
                    !(values.isFilterOwner || loggedUser.admin) &&
                      styles.disable
                  )}
                  disabled={!(values.isFilterOwner || loggedUser.admin)}
                >
                  {t('create.filter.modal.save.button.label')}
                </SubmitButton>
              </span>
            </div>
          </Form>
        </BasicModal>
      )}
    </Formik>
  )
}
