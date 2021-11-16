import {
  FilterOutlined,
  PlusSquareFilled,
  AppstoreOutlined,
  MenuOutlined,
} from '@ant-design/icons'
import { useFindManyCompanyStaffUsersQuery } from '@pabau/graphql'
import { Pagination, TabMenu, UserProps, UserTile, GridVsList } from '@pabau/ui'
import { Image } from 'antd'
import classNames from 'classnames'
import moment from 'moment'
import { useRouter } from 'next/router'
import React, { FunctionComponent, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useMedia } from 'react-use'
import searchEmpty from '../../../../../libs/ui/src/assets/images/empty.png'
import addButtonStyles from '../../../components/AddButton.module.less'
import CommonHeader from '../../../components/CommonHeader'
import Layout from '../../../components/Layout/Layout'
import {
  Filter,
  GroupPermission,
  ListView,
} from '../../../components/team/Users'
import { useUser } from '../../../context/UserContext'
import { getImage } from '../../../components/Uploaders/UploadHelpers/UploadHelpers'
import styles from './index.module.less'
import dayjs from 'dayjs'

export interface userDataProps extends UserProps {
  lastActivity: string
  mobile: string
  email: string
  location: string
  userGroup: string
}

const Index: FunctionComponent = () => {
  const user = useUser()
  const { t } = useTranslation('common')
  const router = useRouter()
  const isMobile = useMedia('(max-width: 767px)', false)
  const [currentDate] = useState(
    Number.parseFloat(dayjs().format('YYYYMMDDHHmmss'))
  )
  const [userView, setUserView] = useState<string>('Grid')
  const [tabValue, setTabValue] = useState<string | number>(0)
  const [isNewGroup, setIsNewGroup] = useState<boolean>(false)
  const [mobFilterDrawer, setMobFilterDrawer] = useState(false)
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
        locationId: Number.parseInt(location),
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

  const { data, loading } = useFindManyCompanyStaffUsersQuery(getQueryVariables)
  const [userTileData, setUserTitleData] = useState<UserProps[]>()

  useEffect(() => {
    if (data?.staffList?.staffList) {
      const user = data.staffList.staffList.map((user) => {
        let vacationDetail
        const userHoliday = data.onVacationUsers.find(
          (thread) => thread.uid === user.staff_id
        )
        if (userHoliday) {
          vacationDetail = {
            startDate: dayjs((userHoliday?.start).toString()).format(
              'DD-MM-YYYY'
            ),
            endDate: dayjs((userHoliday?.end).toString()).format('DD-MM-YYYY'),
          }
        }

        return {
          id: user.id,
          name: user.full_name,
          title: user.job_title,
          vacation: vacationDetail,
          active: isOnline(user.last_login),
          available: userHoliday && !userHoliday.sickness,
          isPending: !user.last_login || user.created === user.last_login,
          owner: user.main_contact,
          img: user.image && getImage(user.image),
          admin: user.admin,
          isSick: userHoliday && userHoliday.sickness === 1,
        }
      })
      setUserTitleData(user)
    }
  }, [data])

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

  const isOnline = (lastLogin: string) => {
    const now = moment().utc()
    const end = moment(lastLogin).utc()
    const minutes = now.diff(end, 'minutes')
    return minutes <= 5
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
      <div
        className={classNames(
          addButtonStyles.marketingIcon,
          addButtonStyles.desktopViewNone,
          styles.mobileViewIcons
        )}
      >
        <FilterOutlined
          className={addButtonStyles.marketingIconStyle}
          onClick={() => setMobFilterDrawer((e) => !e)}
        />
        <GridVsList
          onChange={onViewChange}
          selectedValue={userView}
          displayTypes={[
            {
              title: 'Grid',
              icon: <AppstoreOutlined />,
            },
            {
              title: 'List',
              icon: <MenuOutlined />,
            },
          ]}
        />
        <PlusSquareFilled
          className={addButtonStyles.plusIconStyle}
          onClick={() => onNewStaffMemberClick?.()}
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
        <PlusSquareFilled
          className={addButtonStyles.plusIconStyle}
          onClick={onNewGroupClick}
        />
      </div>
    )
  }

  return (
    <div className={styles.userMainWrapper}>
      <Layout {...user}>
        <CommonHeader
          isShowSearch={tabValue.toString() === '0' ? true : false}
          handleSearch={(e) => handleSearch(e)}
          searchInputPlaceHolder={t('team.user.header.search.placeholder')}
          isLeftOutlined
          reversePath="/team"
          title={'Users'}
          searchValue={searchValue}
        >
          <MobileHeaderButtonJsx />
        </CommonHeader>
        <div className={styles.header}>
          <div className={styles.headerTitle}>
            {!isMobile && (
              <div style={{ display: 'flex' }}>
                {/* <Breadcrumb
                  items={[
                    {
                      path: 'team',
                      breadcrumbName: t('team.user.breadcrumb.team'),
                    },
                    {
                      path: 'team/users',
                      breadcrumbName: t('team.user.breadcrumb.users'),
                    },
                  ]}
                /> */}
                <h4>{t('team.user.title')}</h4>
                <h3
                  style={{
                    marginLeft: '10px',
                    color: '#54b2d3',
                    borderRadius: '50%',
                    backgroundColor: '#f0f2f5',
                    fontWeight: 'bold',
                  }}
                >
                  {paginateData.total}
                </h3>
              </div>
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
              searchValue={searchValue}
            >
              {t('team.user.filter.button')}
            </Filter>
          </div>
        </div>
        <div className={styles.tabWrapper}>
          <TabMenu
            menuItems={[
              t('team.user.tab.staff.member'),
              t('team.user.tab.group.permission'),
            ]}
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
                    : userTileData?.length > 0
                    ? userTileData.map((user) => {
                        return (
                          <UserTile
                            key={user.id}
                            isLoading={loading}
                            {...user}
                          />
                        )
                      })
                    : !loading &&
                      (searchValue || location || department || admin) && (
                        <div className={styles.noSearchResult}>
                          <Image src={searchEmpty} preview={false} />
                          <p className={styles.noResultsText}>
                            {t('team.user.header.search.no.results')}
                          </p>
                          <p className={styles.tryAdjustText}>
                            {t('team.user.header.search.try.adjust')}
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
                        img: user.image && getImage(user.image),
                        title: user.job_title,
                        lastActivity:
                          !(
                            !user.last_login || user.created === user.last_login
                          ) && dayjs(user.last_login).format('DD-MM-YYYY'),
                        mobile: user.CellPhone,
                        email: user.Email,
                        location: user.location,
                        userGroup: user.admin ? 'Staff' : 'User',
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
