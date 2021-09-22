import React, { useState, FC } from 'react'
import { Formik } from 'formik'
import { Dropdown, Menu, Radio, Space } from 'antd'
import { BasicModal, Button, DropdownWithCheck } from '@pabau/ui'
import { Checkbox, Form, Input as FormikInput } from 'formik-antd'
import {
  activityItemNames,
  manageOperandBasedOnColumn,
  visibilityMenuOption,
  activity,
} from './FilterOptionData'
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

interface FilterOptionType {
  type: string
  filterColumn: string
  operand: string
  menuOption: string | number
}
interface InitialValueTypes {
  name: string
  visibility: string
  saveFilter: boolean
  andFilterOption: FilterOptionType[]
  orFilterOption: FilterOptionType[]
}

interface FilterMenuProps {
  items: FilterOptionType[]
  setFieldValue: (
    fieldName: string,
    value: string | FilterOptionType[] | boolean
  ) => void
  fieldName: string
  userList: PersonList[]
  activityTypeOption: OptionList[]
  loggedUser: Partial<AuthenticatedUser> & JwtUser
}

interface CreateFilterModalProps {
  showModal: boolean
  setShowModal: (value: boolean) => void
  userList: PersonList[]
  activityTypeOption: OptionList[]
  loggedUser: Partial<AuthenticatedUser> & JwtUser
}
const defaultValue: InitialValueTypes = {
  name: '',
  visibility: 'private',
  saveFilter: false,
  andFilterOption: [],
  orFilterOption: [],
}

const RenderFilterMenu: FC<FilterMenuProps> = ({
  items,
  setFieldValue,
  fieldName,
  userList,
  activityTypeOption = [],
  loggedUser,
}) => {
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
      if (value === 'Assigned to user' || value === 'Creator') {
        data[index].menuOption = loggedUser?.user
      }
      if (value === 'Done') {
        data[index].menuOption = 'To do'
      }
      if (value === 'Free/busy') {
        data[index].menuOption = 'Free'
      }
      if (value === 'Type') {
        data[index].menuOption = 1
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
          />
          <DropdownWithCheck
            dropdownClassName={styles.filterColumnWrap}
            defaultValue={'Add time'}
            value={item.filterColumn}
            onSelect={(value) =>
              activityItemChange(value, index, 'filterColumn')
            }
            showSearch
            filterOption={true}
            dropdownItems={activityItemNames}
          />
          <DropdownWithCheck
            defaultValue={'is'}
            value={item.operand}
            onChange={(value: string) =>
              activityItemChange(value, index, 'operand')
            }
            dropdownItems={manageOperandBasedOnColumn?.[item.filterColumn]}
            showSearch
            filterOption={true}
          />
          <FilterMenu
            columnName={item.filterColumn}
            personsList={userList}
            activityTypeOption={activityTypeOption}
            value={item.menuOption}
            onChange={(value: string) =>
              activityItemChange(value, index, 'menuOption')
            }
            userId={loggedUser.user}
          />
          <span
            onClick={() => removeFilterMenu(index)}
            className={styles.minusBlock}
          >
            <MinusOutlined />
          </span>
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
}) => {
  const [visibilityVisible, setVisibilityVisible] = useState(false)
  // const [initialValue, setInitialValue] = useState<InitialValueTypes>(
  //   defaultValue
  // )

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
        menuOption: '',
      },
    ])
  }

  const onSubmit = () => {
    console.log('Submit call')
  }

  return (
    <Formik
      initialValues={defaultValue}
      enableReinitialize={true}
      onSubmit={onSubmit}
    >
      {({ setFieldValue, values, resetForm }) => (
        <BasicModal
          className={styles.filterModalWrapper}
          visible={showModal}
          centered
          title={'Create Filter'}
          onCancel={() => {
            setShowModal(false)
            resetForm()
          }}
          modalWidth={926}
          isValidate={true}
          footer={false}
        >
          <Form layout="vertical">
            <div className={styles.filterContentWrap}>
              <h5>Show activities that match ALL of these conditions:</h5>
              <RenderFilterMenu
                items={values.andFilterOption}
                setFieldValue={setFieldValue}
                fieldName="andFilterOption"
                userList={userList}
                activityTypeOption={activityTypeOption}
                loggedUser={loggedUser}
              />
              <Button
                className={styles.btnAdd}
                type="default"
                icon={<PlusOutlined />}
                onClick={() =>
                  AddConditionClick(values, setFieldValue, 'andFilterOption')
                }
              >
                Add Condition
              </Button>
            </div>
            <div className={styles.filterContentWrap}>
              <h5>And match ANY of these conditions:</h5>
              <RenderFilterMenu
                items={values.orFilterOption}
                setFieldValue={setFieldValue}
                fieldName="orFilterOption"
                userList={userList}
                activityTypeOption={activityTypeOption}
                loggedUser={loggedUser}
              />
              <Button
                className={styles.btnAdd}
                type="default"
                icon={<PlusOutlined />}
                onClick={() =>
                  AddConditionClick(values, setFieldValue, 'orFilterOption')
                }
              >
                Add Condition
              </Button>
            </div>
            <div className={styles.filterField}>
              <Form.Item label={'Filter Name'} name={'name'}>
                <FormikInput name={'name'} placeholder="Enter Filter Name" />
              </Form.Item>
              <Form.Item label={'Visibility'} name={'visibility'}>
                <Dropdown
                  trigger={['click']}
                  overlay={visibilityMenu(setFieldValue, values)}
                  visible={visibilityVisible}
                  onVisibleChange={(value) => setVisibilityVisible(value)}
                  getPopupContainer={(node) => node}
                  overlayClassName={styles.visibilityMenu}
                >
                  <Button>
                    <span className={styles.visibilityWrapper}>
                      {values.visibility === 'private' ? (
                        <div className={styles.iconText}>
                          <LockOutlined />
                          <span>Private</span>
                        </div>
                      ) : (
                        <div className={styles.iconText}>
                          <UnlockOutlined />
                          <span>Shared</span>
                        </div>
                      )}
                      {visibilityVisible ? <UpOutlined /> : <DownOutlined />}
                    </span>
                  </Button>
                </Dropdown>
              </Form.Item>
            </div>
            <Checkbox name="saveFilter">
              Save selected columns with the filter
            </Checkbox>
            <div className={styles.btnWrapper}>
              {false && (
                <Button className={styles.btnDanger} type="primary" danger>
                  Delete
                </Button>
              )}
              <span>
                <Button type="default">Preview</Button>
                <Button type="primary">Save</Button>
              </span>
            </div>
          </Form>
        </BasicModal>
      )}
    </Formik>
  )
}
