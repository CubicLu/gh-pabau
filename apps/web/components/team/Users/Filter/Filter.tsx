import {
  AppstoreOutlined,
  FilterOutlined,
  MenuOutlined,
  SearchOutlined,
} from '@ant-design/icons'
import {
  useFindManyCompanyBranchesLazyQuery,
  useFindManyCompanyDepartmentsLazyQuery,
} from '@pabau/graphql'
import { Button, GridVsList } from '@pabau/ui'
import {
  Checkbox,
  Drawer,
  Input,
  Popover,
  Radio,
  Select,
  Skeleton,
  Tooltip,
  Layout as AntLayout,
} from 'antd'
import classNames from 'classnames'
import React, { FunctionComponent, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import addButtonStyles from '../../../AddButton.module.less'
import styles from './Filter.module.less'
const { Header: AntHeader } = AntLayout

interface P {
  onNewStaffMemberClick?: () => void
  onNewGroupClick?: () => void
  onSearch: (term: string) => void
  onViewChange: (type: string) => void
  tabValue?: string | number
  userView?: string
  mobFilterDrawer?: boolean
  onCancelFilterDrawer?: () => void
  onApply?: (
    active: boolean,
    location: string,
    department: string,
    admin: string
  ) => void
  onReset: () => void
  searchValue?: string
}

export const Filter: FunctionComponent<P> = ({
  onNewStaffMemberClick,
  onNewGroupClick,
  onSearch,
  onViewChange,
  tabValue,
  userView,
  mobFilterDrawer,
  onCancelFilterDrawer,
  onApply,
  onReset,
  searchValue,
}) => {
  const { t } = useTranslation('common')
  const [isActive, setIsActive] = useState(true)
  const [departmentValue, setDepartment] = useState('')
  const [locationValue, setLocation] = useState('')
  const [adminValue, setAdmin] = useState('')

  const [
    getDepartment,
    {
      called: departmentCalled,
      data: companyDepartments,
      loading: departmentLoader,
    },
  ] = useFindManyCompanyDepartmentsLazyQuery()

  const [
    getLocation,
    { called: locationCalled, data: locationData, loading: locationLoader },
  ] = useFindManyCompanyBranchesLazyQuery()

  useEffect(() => {
    if (mobFilterDrawer) {
      getDepartment()
      getLocation()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mobFilterDrawer])

  const handleApply = () => {
    onApply?.(isActive, locationValue, departmentValue, adminValue)
  }

  const handleReset = () => {
    setIsActive(true)
    setLocation('')
    setDepartment('')
    setAdmin('')
    onReset?.()
  }

  const filterContent = (isMobile = false) => (
    <div className={addButtonStyles.filterContent}>
      <div className={classNames(addButtonStyles.filterHeader)}>
        {!isMobile && <h6>{t('team.user.filter.label')}</h6>}
        <p>{t('team.user.filter.status.label')}</p>
      </div>
      <div className={addButtonStyles.radioTextStyle}>
        <Radio.Group
          onChange={(e) => {
            setIsActive(e.target.value)
          }}
          value={isActive}
        >
          <Radio value={true}>
            <span>{t('team.user.filter.active.label')}</span>
          </Radio>
          <Radio value={false}>
            <span>{t('team.user.filter.inactive.label')}</span>
          </Radio>
        </Radio.Group>
      </div>
      <div
        className={classNames(
          addButtonStyles.filterHeader,
          styles.filterContent
        )}
      >
        <p>{t('team.user.filter.department.label')}</p>
        {departmentLoader ? (
          <Skeleton.Input
            style={{ width: 200 }}
            active={true}
            size={'default'}
          />
        ) : (
          departmentCalled &&
          !departmentLoader &&
          companyDepartments?.findManyCompanyDepartment?.length > 0 && (
            <Select
              className={styles.locationDropdown}
              value={departmentValue}
              onSelect={(value) => setDepartment(value)}
            >
              <Select.Option key={'all'} value={''}>
                Select
              </Select.Option>
              {companyDepartments?.findManyCompanyDepartment?.map((item) => (
                <Select.Option key={item.department} value={item.department}>
                  {item.department}
                </Select.Option>
              ))}
            </Select>
          )
        )}
      </div>
      <div
        className={classNames(
          addButtonStyles.filterHeader,
          styles.filterContent
        )}
      >
        <p>{t('team.user.filter.location.label')}</p>
        {locationLoader ? (
          <Skeleton.Input
            style={{ width: 200 }}
            active={true}
            size={'default'}
          />
        ) : (
          locationCalled &&
          !locationLoader &&
          locationData?.findManyCompanyBranch?.length > 0 && (
            <Select
              className={styles.locationDropdown}
              value={locationValue}
              onSelect={(value) => setLocation(value)}
            >
              <Select.Option key={'all'} value={''}>
                ALL
              </Select.Option>
              {locationData?.findManyCompanyBranch?.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          )
        )}
      </div>
      <div className={styles.filterContent}>
        <Checkbox
          onChange={(e) => setAdmin(e.target.checked ? '1' : '0')}
          value={adminValue}
        >
          {t('team.user.filter.admin.label')}
        </Checkbox>
      </div>
      {!isMobile && (
        <div className={styles.filterContent}>
          <Button
            type={'primary'}
            className={styles.applyButton}
            onClick={handleApply}
          >
            {t('team.user.filter.apply.button')}
          </Button>
          <Button className={styles.resetButton} onClick={handleReset}>
            {t('team.user.filter.reset.button')}
          </Button>
        </div>
      )}
    </div>
  )

  return (
    <div className={styles.mainWrapper}>
      {/* Mobile header */}
      <Drawer
        visible={mobFilterDrawer}
        className={addButtonStyles.mobFilterDrawer}
        closable={false}
      >
        <AntHeader className={addButtonStyles.marketingSourceFilterHeader}>
          <div className={addButtonStyles.allContentAlignMobile}>
            <div className={addButtonStyles.marketingTextStyle}>
              <span onClick={handleReset}>
                {t('team.user.filter.reset.button')}
              </span>
              <p> {t('team.user.filter.button')}</p>
              <span onClick={onCancelFilterDrawer}>
                {t('team.user.filter.cancel.button')}
              </span>
            </div>
          </div>
        </AntHeader>
        <div style={{ marginTop: '91px', padding: '0 24px' }}>
          {filterContent(true)}
        </div>
        <Button
          type="primary"
          className={addButtonStyles.applyButton}
          onClick={handleApply}
        >
          {t('team.user.filter.apply.button')}
        </Button>
      </Drawer>
      {/* Desktop header */}
      <div
        className={classNames(
          addButtonStyles.marketingSource,
          addButtonStyles.mobileViewNone,
          styles.headerCRUD
        )}
      >
        {tabValue.toString() === '0' ? (
          <div>
            <Input
              value={searchValue}
              className={addButtonStyles.searchMarketingStyle}
              placeholder={t('team.user.header.search.placeholder')}
              onChange={(e) => onSearch?.(e.target.value)}
              suffix={<SearchOutlined style={{ color: '#8C8C8C' }} />}
              autoFocus
            />
            <Popover
              trigger="click"
              content={filterContent}
              placement="bottomRight"
              overlayClassName={classNames(
                addButtonStyles.filterPopover,
                styles.filterPopover
              )}
            >
              <Button
                className={addButtonStyles.filterBtn}
                onClick={() => {
                  getDepartment()
                  getLocation()
                }}
              >
                <FilterOutlined /> {t('team.user.filter.button')}
              </Button>
            </Popover>
            <span className={styles.GridVsList}>
              <Tooltip title="Grid View" placement="top">
                <span className={styles.toolTip}>
                  <GridVsList
                    onChange={onViewChange}
                    selectedValue={userView}
                    displayTypes={[
                      {
                        title: 'Grid',
                        icon: <AppstoreOutlined className={styles.GridIcons} />,
                      },
                    ]}
                  />
                </span>
              </Tooltip>
              <Tooltip placement="top" title="List View">
                <span className={styles.toolTip}>
                  <GridVsList
                    onChange={onViewChange}
                    selectedValue={userView}
                    displayTypes={[
                      {
                        title: 'List',
                        icon: (
                          <MenuOutlined
                            style={{ paddingBottom: 300 }}
                            className={styles.GridIcons}
                          />
                        ),
                      },
                    ]}
                  />
                </span>
              </Tooltip>
            </span>
            <Button
              className={addButtonStyles.createSourceBtn}
              style={{ marginLeft: 0 }}
              type="primary"
              onClick={() => onNewStaffMemberClick?.()}
            >
              {t('team.user.header.new.staff.member.button')}
            </Button>
          </div>
        ) : (
          <Button
            className={addButtonStyles.createSourceBtn}
            style={{ marginLeft: 0 }}
            type="primary"
            onClick={onNewGroupClick}
          >
            {t('team.user.header.new.group.button')}
          </Button>
        )}
      </div>
    </div>
  )
}
