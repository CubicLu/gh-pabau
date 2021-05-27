import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { useMedia } from 'react-use'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'
import {
  FilterOutlined,
  PlusSquareFilled,
  SearchOutlined,
} from '@ant-design/icons'
import { gql } from '@apollo/client'
import moment from 'moment'

import Layout from '../../../components/Layout/Layout'
import { UserContext } from '../../../context/UserContext'
import {
  Breadcrumb,
  Pagination,
  TabMenu,
  useLiveQuery,
  UserProps,
  UserTile,
} from '@pabau/ui'
import {
  Filter,
  ListView,
  GroupPermission,
} from '../../../components/team/Users'
import styles from './index.module.less'
import addButtonStyles from '../../../components/AddButton.module.less'
import CommonHeader from '../../../components/CommonHeader'
import { Image, Input } from 'antd'
import searchEmpty from '../../../../../libs/ui/src/assets/images/empty.png'
import { ReactComponent as CloseIcon } from '../../../assets/images/close-icon.svg'

export interface userDataProps extends UserProps {
  lastActivity: string
  mobile: string
  email: string
  location: string
  userGroup: string
}

const LOCATION_FILTER_LIST_USERS = gql`
  query get_company_users(
    $searchTerm: String
    $offset: Int!
    $limit: Int!
    $active: Int!
    $currentDate: DateTime
    $department: String
    $locationId: Int
    $admin: Int
  ) {
    staffList(
      offset: $offset
      limit: $limit
      active: $active
      searchTerm: $searchTerm
      department: $department
      locationId: $locationId
      admin: $admin
    ) {
      count
      staffList {
        id
        staff_id
        full_name
        Email
        admin
        CellPhone
        main_contact
        job_title
        image
        last_login
        City
      }
    }
    onVacationUsers: holidayRequests(
      where: {
        holiday_from: { lte: $currentDate }
        AND: { holiday_to: { gte: $currentDate } }
      }
    ) {
      staff_id
      holiday_from
      holiday_to
      leave_type
      status
    }
    pendingVacationUsers: holidayRequests(
      where: { holiday_from: { gt: $currentDate } }
    ) {
      staff_id
      holiday_from
      holiday_to
      leave_type
      status
    }
  }
`

const Index: FunctionComponent = () => {
  const user = useContext(UserContext)
  const { t } = useTranslation('common')
  const router = useRouter()
  const isMobile = useMedia('(max-width: 767px)', false)

  const [currentDate] = useState(moment().utc())
  const [userView, setUserView] = useState<string>('Grid')
  const [tabValue, setTabValue] = useState<string | number>(0)
  const [isNewGroup, setIsNewGroup] = useState<boolean>(false)
  const [mobFilterDrawer, setMobFilterDrawer] = useState(false)
  const [isMobileSearch, setMobileSearch] = useState(false)
  const [searchValue, setSearchValue] = useState<string>('')
  const [isActive, setIsActive] = useState(0)
  const [department, setDepartment] = useState('')
  const [location, setLocation] = useState('')
  const [admin, setAdmin] = useState('')
  const [paginateData, setPaginateData] = useState({
    total: 0,
    offset: 0,
    limit: 50,
    currentPage: 1,
    showingRecords: 0,
  })

  const getQueryVariables = useMemo(() => {
    const queryOptions = {
      variables: {
        currentDate: currentDate,
        searchTerm: searchValue,
        active: isActive,
        offset: paginateData.offset,
        limit: paginateData.limit,
        department: department,
        locationId: location,
        admin: Number.parseInt(admin),
      },
    }
    if (!department) {
      delete queryOptions.variables.department
    }
    if (!location) {
      delete queryOptions.variables.locationId
    }
    if (!admin) {
      delete queryOptions.variables.admin
    }
    return queryOptions
  }, [
    currentDate,
    paginateData.offset,
    paginateData.limit,
    searchValue,
    isActive,
    department,
    location,
    admin,
  ])

  const { data, loading } = useLiveQuery(
    LOCATION_FILTER_LIST_USERS,
    getQueryVariables
  )

  useEffect(() => {
    setPaginateData((paginateData) => ({
      ...paginateData,
      total: data?.staffList?.count ? data?.staffList?.count : 0,
      showingRecords: data?.staffList?.staffList.length
        ? data?.staffList?.staffList.length
        : 0,
    }))
  }, [data])

  const onPaginationChange = (currentPage) => {
    const offset = paginateData.limit * (currentPage - 1)
    setPaginateData({
      ...paginateData,
      offset,
      currentPage,
    })
  }

  const resetPagination = () => {
    setPaginateData({
      ...paginateData,
      offset: 0,
      currentPage: 1,
    })
  }

  const handleSearch = (value) => {
    resetPagination()
    setSearchValue(value)
  }

  const isOnline = (lastLogin: Date) => {
    const now = moment().utc()
    const end = moment(lastLogin).utc()
    const minutes = now.diff(end, 'minutes')
    return minutes <= 5
  }

  const isAvailable = (staffId?: number) => {
    if (staffId) {
      if (data?.onVacationUsers.length > 0) {
        const userHoliday = data.onVacationUsers.find(
          (thread) => thread.staff_id === staffId
        )
        if (userHoliday) {
          return false
        }
      }
      return true
    }
    return true
  }
  const isPending = (staffId?: number) => {
    if (staffId) {
      if (data?.pendingVacationUsers.length > 0) {
        const userPendingHoliday = data.pendingVacationUsers.find(
          (thread) => thread.staff_id === staffId
        )
        if (userPendingHoliday) {
          return true
        }
      }
      return false
    }
    return false
  }

  const getVacation = (staffId?: number) => {
    const userHoliday = data?.onVacationUsers.find(
      (thread) => thread.staff_id === staffId
    )
    return {
      startDate: moment(userHoliday.holiday_from).format('DD-MM-YYYY'),
      endDate: moment(userHoliday.holiday_to).format('DD-MM-YYYY'),
    }
  }

  const onViewChange = (type: string) => {
    setUserView(type)
  }

  const onNewStaffMemberClick = async () => {
    await router.push('/team/create')
  }

  const onNewGroupClick = () => {
    setIsNewGroup(true)
  }

  const onNewGroupCancel = () => {
    setIsNewGroup(false)
  }

  const handleReset = () => {
    setIsActive(0)
    setLocation('')
    setDepartment('')
    setAdmin('')
    setMobFilterDrawer(false)
    resetPagination()
  }

  const handleApply = (
    isActive: boolean,
    locationValue: string,
    departmentValue: string,
    adminValue: string
  ) => {
    if (isActive) {
      setIsActive(0)
    } else {
      setIsActive(1)
    }
    setLocation(locationValue)
    setDepartment(departmentValue)
    setAdmin(adminValue)
    setMobFilterDrawer(false)
    resetPagination()
  }

  const MobileHeaderButtonJsx = () => {
    return tabValue.toString() === '0' ? (
      isMobileSearch ? (
        <div className={styles.mobileSearchInput}>
          <Input
            className={styles.searchMarketingStyle}
            placeholder={t('team.user.header.search.placeHolder')}
            value={searchValue}
            onChange={(e) => handleSearch(e.target.value)}
            suffix={
              <CloseIcon
                onClick={() => {
                  setSearchValue('')
                  setMobileSearch(false)
                }}
              />
            }
            autoFocus
          />
        </div>
      ) : (
        <div
          className={classNames(
            addButtonStyles.marketingIcon,
            addButtonStyles.desktopViewNone,
            styles.mobileViewIcons
          )}
        >
          <SearchOutlined
            className={addButtonStyles.marketingIconStyle}
            onClick={() => {
              setMobileSearch(true)
            }}
          />
          <FilterOutlined
            className={addButtonStyles.marketingIconStyle}
            onClick={() => setMobFilterDrawer((e) => !e)}
          />
          <PlusSquareFilled
            className={addButtonStyles.plusIconStyle}
            onClick={() => onNewStaffMemberClick?.()}
          />
        </div>
      )
    ) : (
      <div
        className={classNames(
          addButtonStyles.marketingIcon,
          addButtonStyles.desktopViewNone,
          styles.mobileViewIcons
        )}
      >
        <PlusSquareFilled
          className={addButtonStyles.plusIconStyle}
          onClick={onNewGroupClick}
        />
      </div>
    )
  }

  return (
    <div className={styles.userMainWrapper}>
      <CommonHeader
        title={'Users'}
        isContent={true}
        ContentJsx={MobileHeaderButtonJsx}
      />
      <Layout {...user}>
        <div className={styles.header}>
          <div className={styles.headerTitle}>
            {!isMobile && (
              <>
                <Breadcrumb
                  breadcrumbItems={[
                    {
                      path: '/team',
                      breadcrumbName: t('team.user.breadcrumb.team'),
                    },
                    {
                      path: '/team/users',
                      breadcrumbName: t('team.user.breadcrumb.users'),
                    },
                  ]}
                />
                <h4>{t('team.user.title')}</h4>
              </>
            )}
          </div>
          <div className={styles.headerFilter}>
            <Filter
              onSearch={handleSearch}
              onViewChange={onViewChange}
              tabValue={tabValue}
              userView={userView}
              onNewStaffMemberClick={onNewStaffMemberClick}
              onNewGroupClick={onNewGroupClick}
              mobFilterDrawer={mobFilterDrawer}
              onCancelFilterDrawer={() => setMobFilterDrawer(false)}
              onReset={handleReset}
              onApply={handleApply}
            >
              {t('team.user.filter.button')}
            </Filter>
          </div>
        </div>
        <div className={styles.tabWrapper}>
          <TabMenu
            menuItems={[t('team.user.tabOne'), t('team.user.tabTwo')]}
            tabPosition={'top'}
            minHeight={'0'}
            onChange={(key) => setTabValue(key)}
            activeKey={tabValue.toString()}
          >
            <div>
              {userView === 'Grid' ? (
                <div className={styles.container}>
                  {loading
                    ? [...Array.from({ length: 16 })].map((value, index) => {
                        return (
                          <UserTile
                            key={index}
                            name={''}
                            title={''}
                            isLoading={loading}
                          />
                        )
                      })
                    : data?.staffList?.staffList.length > 0
                    ? data.staffList.staffList.map((user) => {
                        return (
                          <UserTile
                            key={user.id}
                            name={user.full_name}
                            title={user.job_title}
                            vacation={
                              !isAvailable(user.staff_id) &&
                              getVacation(user.staff_id)
                            }
                            active={isOnline(user.last_login)}
                            available={isAvailable(user.staff_id)}
                            isPending={
                              isAvailable(user.staff_id) &&
                              isPending(user.staff_id)
                            }
                            owner={user.main_contact}
                            // img={user.image}
                            admin={user.admin}
                            isLoading={loading}
                          />
                        )
                      })
                    : !loading &&
                      (searchValue || location || department || admin) && (
                        <div className={styles.noSearchResult}>
                          <Image src={searchEmpty} preview={false} />
                          <p className={styles.noResultsText}>
                            {t('team.user.header.search.noSearchResults')}
                          </p>
                          <p className={styles.tryAdjustText}>
                            {t('team.user.header.search.tryAdjustSearch')}
                          </p>
                        </div>
                      )}
                </div>
              ) : (
                data?.staffList?.staffList.length > 0 && (
                  <ListView
                    users={data?.staffList?.staffList.map((user) => {
                      return {
                        id: user.id,
                        name: user.full_name,
                        // img: user.image
                        title: user.job_title,
                        lastActivity: moment(user.last_login).format(
                          'DD-MM-YYYY'
                        ),
                        mobile: user.CellPhone,
                        email: user.Email,
                        location: user.City,
                        userGroup: user.admin === 1 ? 'Staff' : 'User',
                      }
                    })}
                  />
                )
              )}
            </div>
            <GroupPermission
              isNewGroupValue={isNewGroup}
              onNewGroupCancel={onNewGroupCancel}
              setTabValue={setTabValue}
            />
          </TabMenu>
        </div>
        {tabValue.toString() === '0' && (
          <div className={styles.footer}>
            <Pagination
              total={paginateData.total}
              defaultPageSize={50}
              showSizeChanger={false}
              pageSizeOptions={['10', '25', '50', '100']}
              onChange={onPaginationChange}
              pageSize={paginateData.limit}
              current={paginateData.currentPage}
              showingRecords={paginateData.showingRecords}
              onPageSizeChange={(pageSize) => {
                setPaginateData({
                  ...paginateData,
                  offset: 0,
                  limit: pageSize,
                })
              }}
            />
          </div>
        )}
      </Layout>
    </div>
  )
}

export default Index