import { FilterOutlined } from '@ant-design/icons'
import { Button, FormType, LanguageDropdown } from '@pabau/ui'
import { Popover } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import styles from './MedicalFilter.module.less'

export interface MedicalFilterType {
  language: string
  status: 'active' | 'inactive' | 'require_setup'
  formtype: {
    medicalHistory: boolean
    consent: boolean
    treatment: boolean
    epaper: boolean
    prescription: boolean
    lab: boolean
  }
}

export interface MedicalFilterProps {
  filter?: MedicalFilterType
  mobileView?: boolean
  onApply?(val: MedicalFilterType): void
}

const defaultFilter: MedicalFilterType = {
  language: 'English (UK)',
  status: 'active',
  formtype: {
    medicalHistory: false,
    consent: false,
    treatment: false,
    epaper: false,
    prescription: false,
    lab: false,
  },
}

export const MedicalFilter: FC<MedicalFilterProps> = ({
  filter = defaultFilter,
  mobileView = false,
  onApply = () => {
    return true
  },
}) => {
  const [filters, setFilters] = useState<MedicalFilterType>(defaultFilter)
  const [visible, setVisible] = useState(false)
  const handleChangeSetting = (val) => {
    const filterSetting = { ...filters }
    filterSetting.formtype = val
    setFilters({ ...filterSetting })
  }
  const handleChangeStatus = (val) => {
    const filterSetting = { ...filters }
    filterSetting.status = val
    setFilters({ ...filterSetting })
  }
  const handleChangeLanguage = (val) => {
    const filterSetting = { ...filters }
    filterSetting.language = val
    setFilters({ ...filterSetting })
  }
  const handleApply = () => {
    setVisible(false)
    onApply(filters)
  }
  useEffect(() => {
    setFilters(filter)
  }, [filter])
  const FilterViewer = () => (
    <div className={styles.filterViewerContainer}>
      <p
        className={styles.filterViewerReset}
        onClick={() => setFilters(defaultFilter)}
      >
        Reset
      </p>
      <p className={styles.filterViewerTitle}>Filter by</p>
      <p className={styles.filterViewerSubTitle}>Status</p>
      <div className={styles.filterViewerStatusContainer}>
        <Button
          type={filters.status === 'active' ? 'primary' : 'default'}
          onClick={() => handleChangeStatus('active')}
        >
          Active
        </Button>
        <Button
          type={filters.status === 'inactive' ? 'primary' : 'default'}
          onClick={() => handleChangeStatus('inactive')}
        >
          Inactive
        </Button>
        <Button
          type={filters.status === 'require_setup' ? 'primary' : 'default'}
          onClick={() => handleChangeStatus('require_setup')}
        >
          Require Setup
        </Button>
      </div>
      <p className={styles.filterViewerSubTitle}>Form type</p>
      <FormType
        medicalFormType=""
        onChangeSetting={(val) => handleChangeSetting(val)}
      />
      <p className={styles.filterViewerSubTitle}>Language</p>
      <LanguageDropdown
        value={filters.language}
        onSelected={(val) => handleChangeLanguage(val)}
      />
      <Button block onClick={() => handleApply()} style={{ marginTop: '1rem' }}>
        Apply
      </Button>
    </div>
  )
  return (
    <div>
      <Popover
        placement="bottomRight"
        content={FilterViewer}
        trigger="click"
        visible={visible}
        onVisibleChange={(val) => {
          setVisible(val)
        }}
      >
        {mobileView ? (
          <FilterOutlined className={styles.marketingIconStyle} />
        ) : (
          <Button icon={<FilterOutlined />}>Filter</Button>
        )}
      </Popover>
    </div>
  )
}

export default MedicalFilter
