import React, { FC, useState } from 'react'
import { Popover } from 'antd'
import { FilterOutlined } from '@ant-design/icons'
import { IWebinar } from '@pabau/ui'
import { Button } from '@pabau/ui'
import { SimpleDropdown } from '../simple-dropdown/SimpleDropdown'
import { useTranslation } from 'react-i18next'
import styles from './ViewSchedule.module.less'

interface IFilterOptions {
  name: string
  category: string
  length: string
  difficulty: string
}

export interface IFilter {
  trainer: string | null
  category: string | null
  difficulty: string | null
  length: { min: number; max: number } | null
}

interface P {
  schedule?: Partial<IWebinar>[]
  webinarList: Partial<IWebinar>[]
  handleShowResult: (filters: IFilter) => void
  onClear: () => void
}

const initialFilters: IFilterOptions = {
  name: 'Select',
  category: 'Select',
  length: 'Select',
  difficulty: 'Select',
}

export const Filter: FC<P> = ({ webinarList, onClear, handleShowResult }) => {
  const { t } = useTranslation('common')
  const [filterObj, setFilterObj] = useState<IFilterOptions>(initialFilters)
  const [filters, setFilters] = useState<string[]>([])
  const [trainer, setTrainer] = useState<string | null>()
  const [category, setCategory] = useState<string | null>()
  const [difficulty, setDifficulty] = useState<string | null>()
  const [length, setLength] = useState<{ min: number; max: number } | null>()
  const filterOptions = [
    {
      key: 1,
      id: 'length',
      label: 'Length',
      options: [
        'Select',
        'Below 20 minutes',
        '20 to 40 minutes',
        '40 to 60 minutes',
        'Above 60 minutes',
      ],
    },
    {
      key: 2,
      id: 'category',
      label: 'Category',
      options: [
        'Select',
        ...new Set(webinarList?.map((webinar) => webinar?.category)),
      ],
    },
    {
      key: 3,
      id: 'name',
      label: 'Trainer',
      options: [
        'Select',
        ...new Set(webinarList?.map((webinar) => webinar?.name)),
      ],
    },
    {
      key: 4,
      id: 'difficulty',
      label: 'Difficulty',
      options: [
        'Select',
        ...new Set(webinarList?.map((webinar) => webinar?.difficulty)),
      ],
    },
  ]

  const handleClear = (): void => {
    setFilterObj(initialFilters)
    setFilters([])
    setCategory(null)
    setTrainer(null)
    setLength(null)
    setDifficulty(null)
    onClear()
  }

  const handleFilter = () => {
    handleShowResult({
      trainer: trainer ?? null,
      category: category ?? null,
      difficulty: difficulty ?? null,
      length: length ?? null,
    })
  }

  const handleSelect = (key: string, value: string): void => {
    setFilterObj({ ...filterObj, [key]: value })
    if (filters?.includes(key) && value === 'Select') {
      const data = filters?.splice(filters?.indexOf(key), 1)
      setFilters(data)
    } else if (filters && !filters?.includes(key)) {
      filters.push(key)
      setFilters(filters)
    }
    switch (key) {
      case 'name':
        setTrainer(value !== 'Select' ? value : null)
        break
      case 'category':
        setCategory(value !== 'Select' ? value : null)
        break
      case 'difficulty':
        setDifficulty(value !== 'Select' ? value : null)
        break
      case 'length':
        console.log('value', value)
        setLength(value !== 'Select' ? checkWebinarLength(value) : null)
        break
    }
  }

  const filterPopoverContent = (): JSX.Element => {
    return (
      <div className={styles.filterContainer}>
        <div className={styles.header}>
          <strong>{t('team.user.filter.label')}</strong>
          <Button type={'text'} onClick={handleClear}>
            {t('timeline.clearAll')}
          </Button>
        </div>
        <div className={styles.dropdownList}>
          {filterOptions?.map(({ key, id, label, options }) => (
            <div className={styles.dropdown} key={`filter-${id}`}>
              <SimpleDropdown
                key={key}
                label={label}
                value={filterObj[id]}
                dropdownItems={(options as unknown) as string[]}
                onSelected={(val) => handleSelect(id, val)}
              />
            </div>
          ))}
        </div>
        <div className={styles.showResultBtn}>
          <Button
            type={'primary'}
            disabled={filters?.length === 0}
            onClick={() => handleFilter()}
          >
            {t('setup.page.webinar.modal.register.show')}
          </Button>
        </div>
      </div>
    )
  }

  return (
    <Popover
      placement={'bottomRight'}
      content={filterPopoverContent()}
      trigger={'click'}
    >
      <span className={styles.filterBtn}>
        <FilterOutlined /> Filter
      </span>
    </Popover>
  )
}

function checkWebinarLength(
  length: string
): { min: number; max: number } | null {
  switch (length) {
    case '20 to 40 minutes':
      return { min: 20, max: 40 }
    case '40 to 60 minutes':
      return { min: 40, max: 60 }
    case 'Bellow 20 minutes':
      return { min: 0, max: 20 }
    case 'Above 60 minutes':
      return { min: 60, max: 200 }
    default:
      return null
  }
}
