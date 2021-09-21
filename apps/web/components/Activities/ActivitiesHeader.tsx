import React, { FC } from 'react'
import { Input, Select } from 'antd'
import { FilterOutlined, SearchOutlined } from '@ant-design/icons'
import { Button } from '@pabau/ui'
import { useTranslationI18 } from '../../hooks/useTranslationI18'
import styles from '../../pages/activities/index.module.less'
import { ActivitiesDataProps } from '../../pages/activities'

const { Option } = Select

interface PersonList {
  id: number
  name: string
  avatarURL: string
}

interface ClientsHeaderProps {
  totalActivity: number
  sourceData?: ActivitiesDataProps[]
  searchText?: string
  setSearchText?: (term: string) => void
  createActivityVisible?: boolean
  toggleCreateActivityModal?: () => void
  selectFilterUser?: string
  setSelectFilterUser?: (val) => void
  personsList?: PersonList[]
  isMobile?: boolean
}

export const ActivitiesHeader: FC<ClientsHeaderProps> = React.memo(
  ({
    totalActivity,
    searchText,
    setSearchText,
    toggleCreateActivityModal,
    selectFilterUser,
    setSelectFilterUser,
    personsList,
    isMobile,
  }) => {
    const { t } = useTranslationI18()

    const onChange = (value) => {
      setSelectFilterUser?.(value)
    }

    return (
      <div className={styles.activitiesWrapper}>
        {!isMobile && (
          <>
            <div className={styles.displayMobileNone}>
              <div className={styles.header}>{t('activityList.header')}</div>
            </div>
            <div className={styles.activitiesWrapperRight}>
              <div className={styles.activitiesCircle}>
                {totalActivity > 0 && (
                  <h5>
                    {t('activityList.activity', {
                      total: totalActivity,
                    })}
                  </h5>
                )}
              </div>
              <div className={styles.dropdownCustom}>
                <FilterOutlined />
                <Select
                  showSearch
                  allowClear
                  onChange={onChange}
                  value={selectFilterUser || null}
                  placeholder={t('activityList.selectPerson.placeholder')}
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {personsList.map((data) => (
                    <Option key={data.id} value={data.id}>
                      {data.name}
                    </Option>
                  ))}
                </Select>
              </div>

              <Input
                allowClear
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                addonAfter={<SearchOutlined />}
                placeholder={t('activityList.search.placeholder')}
              />
              <Button
                className={styles.btnCreateClient}
                type={'primary'}
                onClick={toggleCreateActivityModal}
              >
                {t('activityList.createActivity')}
              </Button>
            </div>
          </>
        )}
        {isMobile && (
          <>
            <Input
              allowClear
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              addonAfter={<SearchOutlined />}
              placeholder={t('activityList.search.placeholder')}
            />
            <div className={styles.dropdownCustom}>
              <FilterOutlined />
              <Select
                showSearch
                allowClear
                onChange={onChange}
                value={selectFilterUser || null}
                placeholder={t('activityList.selectPerson.placeholder')}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {personsList.map((data) => (
                  <Option key={data.id} value={data.id}>
                    {data.name}
                  </Option>
                ))}
              </Select>
            </div>
          </>
        )}
      </div>
    )
  }
)

export default ActivitiesHeader
