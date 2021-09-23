import React, { useState, FC } from 'react'
import { Formik } from 'formik'
import { Dropdown, Menu, Radio, Space } from 'antd'
import { BasicModal, Button, DropdownWithCheck } from '@pabau/ui'
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
  t: TFunction<'common'>
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
  t,
}) => {
  const { activityItemNames, manageOperandBasedOnColumn, activity } = getData(t)
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
      if (value === 'Status') {
        data[index].menuOption = 'Pending'
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
            className={styles.selectOperand}
            onChange={(value: string) =>
              activityItemChange(value, index, 'operand')
            }
            dropdownItems={manageOperandBasedOnColumn?.[item.filterColumn]}
            showSearch
            filterOption={true}
          />
          <div className={styles.filterMenuWrapper}>
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
          </div>
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
  const { t } = useTranslationI18()
  const { visibilityMenuOption } = getData(t)

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
      validationSchema={Yup.object().shape({
        name: Yup.string()
          .required(t('create.filter.modal.filter.name.required'))
          .max(50, t('create.filter.modal.filter.name.max.validation.message')),
      })}
      onSubmit={onSubmit}
    >
      {({ setFieldValue, values, resetForm }) => (
        <BasicModal
          className={styles.filterModalWrapper}
          visible={showModal}
          centered
          title={t('create.filter.modal.title')}
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
              <h5>{t('create.filter.modal.all.condition.title')}</h5>
              {console.log('values-----------', values)}
              <RenderFilterMenu
                items={values.andFilterOption}
                setFieldValue={setFieldValue}
                fieldName="andFilterOption"
                userList={userList}
                activityTypeOption={activityTypeOption}
                loggedUser={loggedUser}
                t={t}
              />
              <Button
                className={styles.btnAdd}
                type="default"
                icon={<PlusOutlined />}
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
                t={t}
              />
              <Button
                className={styles.btnAdd}
                type="default"
                icon={<PlusOutlined />}
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
                  placeholder={t('create.filter.modal.filter.name.placeholder')}
                />
              </Form.Item>
              <Form.Item
                label={t('create.filter.modal.visibility.label')}
                name={'visibility'}
              >
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
                      {visibilityVisible ? <UpOutlined /> : <DownOutlined />}
                    </span>
                  </Button>
                </Dropdown>
              </Form.Item>
            </div>
            <Checkbox name="saveFilter">
              {t('create.filter.modal.save.filter.checkbox.label')}
            </Checkbox>
            <div className={styles.btnWrapper}>
              {false && (
                <Button className={styles.btnDanger} type="primary" danger>
                  {t('create.filter.modal.delete.button.label')}
                </Button>
              )}
              <span className={styles.previewWrapper}>
                <Button type="default">
                  {t('create.filter.modal.preview.button.label')}
                </Button>
                <SubmitButton type="primary" className={styles.submitBtn}>
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
