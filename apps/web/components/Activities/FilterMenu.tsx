import React, { FC, useEffect, useState } from 'react'
import { Select, Radio } from 'antd'
import { getData } from './FilterOptionData'
import { UserOutlined, CheckOutlined, AimOutlined } from '@ant-design/icons'
import { FormikInput } from '@pabau/ui'
import styles from './CreateFilterModal.module.less'
import { useTranslationI18 } from '../../hooks/useTranslationI18'
import { TFunction } from 'react-i18next'

export interface PersonList {
  id: number
  name: string
  avatarURL?: string
}

export interface SubjectMenuProps {
  value: string | number
  onChange: (item: string | number) => void
}

export interface OptionList {
  id: number | string
  name: string
}

export interface ToggleMenuProps {
  options: OptionList[]
  value: string | number
  onChange: (item: string | number) => void
}

export interface SelectMenuProps {
  optionList: OptionList[]
  defaultValue?: number | string
  value: string | number
  onChange: (item: string | number) => void
}

export interface DateMenuProps {
  value: string | number
  onChange: (item: string | number) => void
  t: TFunction<'common'>
}

const { Option, OptGroup } = Select

const DateMenu: FC<DateMenuProps> = ({ value, onChange, t }) => {
  const { dateMenu } = getData(t)
  return (
    <Select
      showSearch
      filterOption={(input, option) =>
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
      menuItemSelectedIcon={<CheckOutlined />}
      dropdownClassName={styles.customDropdown}
      value={value}
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
}) => {
  return (
    <Select
      showSearch
      allowClear
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
        <Option key={data.id} value={data.id}>
          {data.name}
        </Option>
      ))}
    </Select>
  )
}

const ClientLeadMenu = ({ icon }) => {
  return (
    <div className={styles.clientWrapper}>
      <div className={styles.icon}>{icon}</div>
      <Select
        showSearch
        allowClear
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        menuItemSelectedIcon={<CheckOutlined />}
        dropdownClassName={styles.customDropdown}
      ></Select>
    </div>
  )
}

const SubjectMenu: FC<SubjectMenuProps> = ({ value, onChange }) => {
  return (
    <div className={styles.subjectInput}>
      <FormikInput
        name="subject"
        value={value}
        onChange={(item) => onChange(item.target.value)}
      />
    </div>
  )
}

const ToggleMenu: FC<ToggleMenuProps> = ({ options, value, onChange }) => {
  return (
    <Radio.Group
      className={styles.customRadioWrapper}
      value={value}
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
  value: string | number
  onChange: (value: string | number) => void
  activityTypeOption: OptionList[]
  userId: number
}

export const FilterMenu: FC<FilterMenuProps> = ({
  columnName,
  personsList,
  value,
  onChange,
  activityTypeOption,
  userId,
}) => {
  const { t } = useTranslationI18()
  const [userList, setUserList] = useState<PersonList[]>([])
  const { statusMenu, freeBusyOption, doneOption } = getData(t)
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
      case 'Add time': {
        return <DateMenu value={value} onChange={onChange} t={t} />
        break
      }
      case 'Assigned to user': {
        return (
          <SelectMenu optionList={userList} value={value} onChange={onChange} />
        )
        break
      }
      case 'Client name': {
        return <ClientLeadMenu icon={<UserOutlined />} />
        break
      }
      case 'Creator': {
        return (
          <SelectMenu optionList={userList} value={value} onChange={onChange} />
        )
        break
      }
      case 'Lead name': {
        return <ClientLeadMenu icon={<AimOutlined />} />
        break
      }
      case 'Done': {
        return (
          <ToggleMenu options={doneOption} value={value} onChange={onChange} />
        )
        break
      }
      case 'Type': {
        return (
          <SelectMenu
            optionList={activityTypeOption}
            value={value}
            onChange={onChange}
          />
        )
        break
      }
      case 'Subject': {
        return <SubjectMenu value={value} onChange={onChange} />
        break
      }
      case 'Due date': {
        return <DateMenu value={value} onChange={onChange} t={t} />
        break
      }
      case 'Free/busy': {
        return (
          <ToggleMenu
            options={freeBusyOption}
            value={value}
            onChange={onChange}
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
          />
        )
        break
      }
    }
  }

  return renderMenu()
}

export default FilterMenu
