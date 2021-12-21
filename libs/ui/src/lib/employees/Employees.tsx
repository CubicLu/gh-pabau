import { CheckCircleFilled, SearchOutlined } from '@ant-design/icons'
import { Avatar, Button } from '@pabau/ui'
import { Input as AntInput } from 'antd'
import classNames from 'classnames'
import React, { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './Employees.module.less'

export interface Employee {
  id?: number | string
  avatar?: string
  name: string
  selected: boolean
}

export interface EmployeesProps {
  title?: string
  description?: string
  searchPlaceholder?: string
  showLessText?: string
  showMoreText?: string
  employees: Employee[]
  onSelected?: (items: Employee[]) => void
  multiple?: boolean
}

export const Employees: FC<EmployeesProps> = ({
  employees,
  onSelected,
  title,
  description,
  searchPlaceholder,
  showLessText,
  showMoreText,
  multiple = true,
}) => {
  const { t } = useTranslation('common')
  const [searchQuery, setSearchQuery] = useState('')
  const [employeeItems, setEmployeeItems] = useState<Employee[]>([])
  const [loadMore, setLoadMore] = useState(false)
  const handleSelectEmployeeBasedOnName = (employee) => {
    const items: Employee[] = multiple
      ? [...employeeItems]
      : employees.map((item) => ({ ...item, selected: false }))
    for (const item of items) {
      if (item.name === employee.name) item.selected = !item.selected
    }
    setEmployeeItems([...items])
    onSelected?.(items.filter((item) => item.selected === true))
  }
  const handleSelectEmployeeBasedOnId = (employee) => {
    const items: Employee[] = multiple
      ? [...employeeItems]
      : employees.map((item) => ({ ...item, selected: false }))
    for (const item of items) {
      if (item.id === employee.id) item.selected = !item.selected
    }
    setEmployeeItems([...items])
    onSelected?.(items.filter((item) => item.selected === true))
  }
  const handleChangeSearchQuery = (e) => {
    setEmployeeItems(
      employees
        .filter((employee) =>
          employee.name.toLowerCase().includes(e.target.value.toLowerCase())
        )
        .map((item) => ({ ...item, selected: false }))
    )
  }
  useEffect(() => {
    setEmployeeItems([...employees])
    setLoadMore(false)
  }, [employees])
  return (
    <div className={styles.employeesContainer}>
      <h2>{title || t('employees.title.label')}</h2>
      <h3>{description || t('employees.description.text')}</h3>
      <div>
        <AntInput
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onPressEnter={(e) => handleChangeSearchQuery(e)}
          prefix={<SearchOutlined style={{ color: '#bfbfbf' }} />}
          placeholder={searchPlaceholder || t('employees.search.label')}
        />
      </div>
      <div className={styles.employeeItems}>
        {employeeItems
          .slice(
            0,
            loadMore
              ? employeeItems.length
              : employeeItems.length <= 10
              ? employeeItems.length
              : 10
          )
          .map((item) => (
            <div
              className={
                item.selected
                  ? classNames(styles.employeeItem, styles.selectedItem)
                  : item.name
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase()) && searchQuery !== ''
                  ? classNames(styles.employeeItem, styles.possibleItem)
                  : styles.employeeItem
              }
              key={item.name}
              onClick={() =>
                item?.id
                  ? handleSelectEmployeeBasedOnId(item)
                  : handleSelectEmployeeBasedOnName(item)
              }
            >
              <div>
                <Avatar src={item?.avatar} name={item.name} size={24} />
              </div>
              <div>
                <span>{item.name}</span>
                <div className={styles.employeeItemChecked}>
                  <CheckCircleFilled />
                </div>
              </div>
            </div>
          ))}
      </div>
      {employeeItems.length > 10 && (
        <div className={styles.loadMore}>
          <Button onClick={() => setLoadMore(!loadMore)}>
            {loadMore
              ? showLessText || t('employees.show.less.button.label')
              : showMoreText || t('employees.load.more.button.label')}
          </Button>
        </div>
      )}
    </div>
  )
}

export default Employees
