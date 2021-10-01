import React, { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { CloseCircleFilled, SearchOutlined } from '@ant-design/icons'
import { Input } from 'antd'
import styles from './SetupChip.module.less'

export interface SetupSearchProps {
  onChange?: (newText: string) => void
  placeholder?: string
  searchValue?: string
}

export const SetupSearchInput: FC<SetupSearchProps> = ({
  onChange,
  placeholder = 'Search by report name',
  searchValue,
}) => {
  const { t } = useTranslation('common')
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearchTerm = (e) => {
    setSearchTerm(e.target.value)
    onChange?.(e.target.value)
  }

  useEffect(() => {
    setSearchTerm(searchValue || '')
  }, [searchValue])

  return (
    <Input
      className={styles.searchInputStyle}
      placeholder={placeholder ?? t('setup.reports.search.text.placeholder')}
      value={searchTerm}
      onChange={(e) => handleSearchTerm(e)}
      suffix={
        <>
          <SearchOutlined className={styles.searchIcon} />
          {searchTerm && (
            <CloseCircleFilled
              className={styles.closeIcon}
              onClick={() => {
                setSearchTerm('')
                onChange?.('')
              }}
            />
          )}
        </>
      }
    />
  )
}

export default SetupSearchInput
