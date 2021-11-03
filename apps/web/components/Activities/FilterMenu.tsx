import React, { FC, useEffect, useState } from 'react'
import { Select, Radio, InputNumber } from 'antd'
import { getData } from './FilterOptionData'
import { UserOutlined, CheckOutlined, AimOutlined } from '@ant-design/icons'
import { Input as FormikInput } from 'formik-antd'
import styles from './CreateFilterModal.module.less'
import { useTranslationI18 } from '../../hooks/useTranslationI18'
import { TFunction } from 'react-i18next'
import { ClientLeadSelect } from './ClientLeadSelectMenu'

export interface PersonList {
  id: number
  name: string
  avatarURL?: string
}

export interface SubjectMenuProps {
  value: string
  onChange: (item: string) => void
  disabled: boolean
}

export interface OptionList {
  id: number | string
  name: string
}

export interface ToggleMenuProps {
  options: OptionList[]
  value: string
  onChange: (item: string) => void
  disabled: boolean
}

export interface SelectMenuProps {
  optionList: OptionList[]
  defaultValue?: string
  value: string
  onChange: (item: string) => void
  disabled: boolean
}

export interface DateMenuProps {
  value: string
  onChange: (item: string) => void
  t: TFunction<'common'>
  disabled: boolean
}

const { Option, OptGroup } = Select

const DateMenu: FC<DateMenuProps> = ({ value, onChange, t, disabled }) => {
  const { dateMenu } = getData(t)
  return (
    <Select
      showSearch
      filterOption={true}
      menuItemSelectedIcon={<CheckOutlined />}
      dropdownClassName={styles.customDropdown}
      value={value}
      disabled={disabled}
      onChange={(value) => onChange(value)}
    >
      {dateMenu.map((item) => (
        <OptGroup label={item.groupName} key={item.groupName}>
          {item.groupOption.map((option) => (
            <Option key={option.key} value={option.key}>
              {option.label}
            </Option>
          ))}
        </OptGroup>
      ))}
    </Select>
  )
}

const SelectMenu: FC<SelectMenuProps> = ({
  optionList,
  defaultValue,
  value,
  onChange,
  disabled,
}) => {
  return (
    <Select
      showSearch
      allowClear
      disabled={disabled}
      filterOption={(input, option) =>
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
      menuItemSelectedIcon={<CheckOutlined />}
      dropdownClassName={styles.customDropdown}
      defaultValue={defaultValue}
      value={value}
      onChange={(value) => onChange(value)}
    >
      {optionList.map((data) => (
        <Option key={data.id} value={data.id?.toString()}>
          {data.name}
        </Option>
      ))}
    </Select>
  )
}

const SubjectMenu: FC<SubjectMenuProps> = ({ value, onChange, disabled }) => {
  return (
    <div className={styles.subjectInput}>
      <FormikInput
        name="subject"
        value={value}
        disabled={disabled}
        onChange={(item) => onChange(item.target.value)}
      />
    </div>
  )
}

const NumberMenu: FC<SubjectMenuProps> = ({ value, onChange, disabled }) => {
  return (
    <div className={styles.subjectInput}>
      <InputNumber
        min={1}
        value={Number(value)}
        disabled={disabled}
        onChange={(item) => onChange(item.toString())}
      />
    </div>
  )
}

const ToggleMenu: FC<ToggleMenuProps> = ({
  options,
  value,
  onChange,
  disabled,
}) => {
  return (
    <Radio.Group
      className={styles.customRadioWrapper}
      value={value}
      disabled={disabled}
      onChange={(item) => onChange(item.target.value)}
    >
      {options.map((item) => (
        <Radio.Button value={item.id} key={item.id}>
          {item.name}
        </Radio.Button>
      ))}
    </Radio.Group>
  )
}

interface FilterMenuProps {
  columnName: string
  personsList: PersonList[]
  value: string
  onChange: (value: string) => void
  activityTypeOption: OptionList[]
  userId: number
  disabled: boolean
  isEdit: boolean
  leadSourceData: OptionList[]
  leadStageData: OptionList[]
  pipelineData: OptionList[]
  locationData: OptionList[]
}

export const FilterMenu: FC<FilterMenuProps> = ({
  columnName,
  personsList,
  value,
  onChange,
  activityTypeOption,
  userId,
  disabled,
  isEdit,
  leadSourceData,
  leadStageData,
  pipelineData,
  locationData,
}) => {
  const { t } = useTranslationI18()
  const [userList, setUserList] = useState<PersonList[]>([])

  const { statusMenu, freeBusyOption, doneOption, leadStatusOption } = getData(
    t
  )

  useEffect(() => {
    if (personsList.length > 0) {
      setUserList([
        {
          id: userId,
          name: 'Current user',
        },
        ...personsList,
      ])
    }
  }, [personsList, userId])

  const renderMenu = () => {
    switch (columnName) {
      case 'Add time':
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
        return (
          <DateMenu
            value={value}
            onChange={onChange}
            t={t}
            disabled={disabled}
          />
        )
        break
      }
      case 'Assigned to user':
      case 'Creator':
      case 'Lead owner':
      case 'Won by':
      case 'Lead creator': {
        return (
          <SelectMenu
            optionList={userList}
            value={value}
            onChange={onChange}
            disabled={disabled}
          />
        )
        break
      }
      case 'Client name': {
        return (
          <ClientLeadSelect
            name="client"
            isEdit={isEdit}
            value={value}
            onChange={onChange}
            icon={<UserOutlined />}
            disabled={disabled}
          />
        )
        break
      }
      case 'Lead name':
      case 'Title': {
        return (
          <ClientLeadSelect
            name="lead"
            isEdit={isEdit}
            value={value}
            onChange={onChange}
            icon={<AimOutlined />}
            disabled={disabled}
          />
        )
        break
      }
      case 'Done': {
        return (
          <ToggleMenu
            options={doneOption}
            value={value}
            onChange={onChange}
            disabled={disabled}
          />
        )
        break
      }
      case 'Type': {
        return (
          <SelectMenu
            optionList={activityTypeOption}
            value={value}
            onChange={onChange}
            disabled={disabled}
          />
        )
        break
      }
      case 'Subject':
      case 'Lead email':
      case 'Lead phone':
      case 'Lead lost reason':
      case 'Lead descriptions': {
        return (
          <SubjectMenu value={value} onChange={onChange} disabled={disabled} />
        )
        break
      }
      case 'Due date': {
        return (
          <DateMenu
            value={value}
            onChange={onChange}
            t={t}
            disabled={disabled}
          />
        )
        break
      }
      case 'Free/busy': {
        return (
          <ToggleMenu
            options={freeBusyOption}
            value={value}
            onChange={onChange}
            disabled={disabled}
          />
        )
        break
      }
      case 'Status': {
        return (
          <SelectMenu
            optionList={statusMenu}
            defaultValue={'Pending'}
            value={value === '' ? undefined : value}
            onChange={onChange}
            disabled={disabled}
          />
        )
        break
      }
      case 'Lead source': {
        return (
          <SelectMenu
            optionList={leadSourceData}
            defaultValue={'Pending'}
            value={value === '' ? undefined : value}
            onChange={onChange}
            disabled={disabled}
          />
        )
        break
      }
      case 'Lead stage': {
        return (
          <SelectMenu
            optionList={leadStageData}
            defaultValue={'Pending'}
            value={value === '' ? undefined : value}
            onChange={onChange}
            disabled={disabled}
          />
        )
        break
      }
      case 'Pipeline': {
        return (
          <SelectMenu
            optionList={pipelineData}
            value={value === '' ? undefined : value}
            onChange={onChange}
            disabled={disabled}
          />
        )
        break
      }
      case 'Location': {
        return (
          <SelectMenu
            optionList={locationData}
            value={value === '' ? undefined : value}
            onChange={onChange}
            disabled={disabled}
          />
        )
        break
      }
      case 'Lead status': {
        return (
          <ToggleMenu
            options={leadStatusOption}
            value={value}
            onChange={onChange}
            disabled={disabled}
          />
        )
        break
      }
      case 'Lead done activities':
      case 'Activities to do':
      case 'Email messages count':
      case 'Lead total activities':
      case 'Lead last activity (days)': {
        return (
          <NumberMenu value={value} onChange={onChange} disabled={disabled} />
        )
        break
      }
    }
  }

  return renderMenu()
}

export default FilterMenu
