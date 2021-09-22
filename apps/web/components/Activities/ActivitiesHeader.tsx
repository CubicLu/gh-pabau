import React, { FC, useState, useEffect } from 'react'
import { Input, Popover, Divider } from 'antd'
import {
  DownOutlined,
  FilterOutlined,
  SearchOutlined,
  UpOutlined,
  UsergroupAddOutlined,
  PlusOutlined,
  CheckOutlined,
  EditOutlined,
} from '@ant-design/icons'
import { Button, TabMenu, Avatar, CustomScrollbar } from '@pabau/ui'
import { useTranslationI18 } from '../../hooks/useTranslationI18'
import styles from '../../pages/activities/index.module.less'
import { ActivitiesDataProps } from '../../pages/activities'
import classNames from 'classnames'
import { getImage } from '../Uploaders/UploadHelpers/UploadHelpers'
import { AuthenticatedUser, JwtUser } from '@pabau/yup'
import { useUserGroupForActivityQuery } from '@pabau/graphql'
import { PersonList } from './FilterMenu'
import { CreateFilterModal } from './CreateFilterModal'
import { OptionList } from './FilterMenu'

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
  loggedUser?: Partial<AuthenticatedUser> & JwtUser
  activityTypeOption?: OptionList[]
}

const UserWithIcon = ({
  image,
  name,
  id,
  filterValue,
  setFilterValue,
  isLoggedInUser = false,
}) => {
  return (
    <div
      className={classNames(
        styles.userContent,
        filterValue === id && styles.active
      )}
      onClick={() => setFilterValue(id)}
    >
      <div className={styles.userTab}>
        <Avatar src={image} name={name} size={28} />
        <h4>{name}</h4>
        {isLoggedInUser && <span className={styles.youText}>(You)</span>}
      </div>
      <span className={styles.checkIcon}>
        {filterValue === id && <CheckOutlined />}
      </span>
    </div>
  )
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
    loggedUser,
    activityTypeOption,
  }) => {
    const { t } = useTranslationI18()
    const [visible, setVisible] = useState(false)
    const [userGroup, setUserGroup] = useState([])
    const [filterOption, setFilterOption] = useState([
      {
        id: 1,
        name: '2  Month Report - Outstanding',
        isSelected: true,
      },
      {
        id: 2,
        name: 'All outstanding inbound leads',
        isSelected: false,
      },
      {
        id: 3,
        name: 'Deal created last month',
        isSelected: false,
      },
      {
        id: 4,
        name: 'FT View',
        isSelected: false,
      },
      {
        id: 5,
        name: 'FT View',
        isSelected: false,
      },
      {
        id: 6,
        name: 'FT View',
        isSelected: false,
      },
      {
        id: 7,
        name: 'FT View',
        isSelected: false,
      },
      {
        id: 8,
        name: 'FT View',
        isSelected: false,
      },
      {
        id: 9,
        name: 'FT View',
        isSelected: false,
      },
    ])
    const [userList, setUserList] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [searchValue, setSearchValue] = useState('')
    const [filterValue, setFilterValue] = useState<number>(0)

    const { data: userGroupData } = useUserGroupForActivityQuery()

    useEffect(() => {
      if (personsList.length > 0) {
        const userList = [...personsList].filter(
          (item) => item.id !== loggedUser.user
        )
        setUserList(userList)
      }
    }, [personsList, loggedUser])

    useEffect(() => {
      if (userGroupData?.findManyUserGroup) {
        const groupData = userGroupData.findManyUserGroup
          ?.map((item) => {
            if (item._count?.UserGroupMember !== 0) {
              return {
                id: item.id,
                name: item.group_name,
                memberCount: item._count?.UserGroupMember,
                userId: item.UserGroupMember?.map((member) => {
                  return member?.User?.id
                }).filter((item) => item),
              }
            }
            return null
          })
          .filter((item) => item)
        setUserGroup(groupData)
      }
    }, [userGroupData])

    const filterContent = () => {
      const UserGroupWithIcon = ({ name, memberCount, id }) => {
        return (
          <div
            className={classNames(
              styles.userSubWrapper,
              filterValue === id && styles.active
            )}
            onClick={() => setFilterValue(id)}
          >
            <div className={styles.subChildWrapper}>
              <div className={styles.avtarIcon}>
                <Avatar icon={<UsergroupAddOutlined />} size={28} />
              </div>
              <div className={styles.subChildContent}>
                <h6>{name}</h6>
                <span>
                  {t('activityList.filter.userGroup.memberCount', {
                    count: memberCount,
                  })}
                </span>
              </div>
            </div>
            <span className={styles.checkIcon}>
              {' '}
              {filterValue === id && <CheckOutlined />}
            </span>
          </div>
        )
      }

      const OnFilterOptionChange = (id) => {
        const filterValue = [...filterOption].map((item) => {
          if (item.id === id) {
            item.isSelected = true
          } else {
            item.isSelected = false
          }
          return item
        })
        setFilterOption(filterValue)
      }

      const ownerTabContent = (
        <>
          <CustomScrollbar
            autoHide={true}
            style={{ width: '300px', height: '300px' }}
          >
            <div className={styles.userContentList}>
              <div
                className={classNames(
                  styles.titleWrapper,
                  filterValue === 0 && styles.active
                )}
                onClick={() => setFilterValue(0)}
              >
                <h4>Everyone</h4>
                {filterValue === 0 && <CheckOutlined />}
              </div>
              <UserWithIcon
                image={loggedUser?.imageUrl && getImage(loggedUser?.imageUrl)}
                name={loggedUser?.fullName}
                id={10}
                filterValue={filterValue}
                setFilterValue={setFilterValue}
                isLoggedInUser={true}
              />
              <Divider />
              {userGroup.map((item) => (
                <div key={item.id}>
                  <UserGroupWithIcon
                    name={item.name}
                    memberCount={item.memberCount}
                    id={item.id}
                  />
                </div>
              ))}
              {userGroup.length > 0 && <Divider />}
              {userList.map((data) => (
                <div key={data.id}>
                  <UserWithIcon
                    id={data.id}
                    name={data.name}
                    image={data?.avatarURL && getImage(data?.avatarURL)}
                    filterValue={filterValue}
                    setFilterValue={setFilterValue}
                  />
                </div>
              ))}
            </div>
          </CustomScrollbar>
          <div className={styles.footerBtn}>
            <Button
              type="default"
              icon={<PlusOutlined />}
              onClick={() => setShowModal(true)}
            >
              Add new filter
            </Button>
          </div>
        </>
      )

      const filterTabContent = (
        <>
          <CustomScrollbar
            autoHide={true}
            style={{ width: '300px', height: '300px' }}
          >
            {filterOption.map((item) => (
              <div
                key={item.id}
                className={classNames(
                  styles.filterOption,
                  item.isSelected && styles.active
                )}
                onClick={() => OnFilterOptionChange(item.id)}
              >
                <span>{item.name}</span>
                <div
                  className={styles.iconWrapper}
                  onClick={() => setShowModal(true)}
                >
                  <EditOutlined />{' '}
                  <span className={styles.checkIcon}>
                    {item.isSelected && <CheckOutlined />}
                  </span>
                </div>
              </div>
            ))}
          </CustomScrollbar>
          <div className={styles.footerBtn}>
            <Button
              type="default"
              icon={<PlusOutlined />}
              onClick={() => setShowModal(true)}
            >
              Add new filter
            </Button>
          </div>
        </>
      )

      return (
        <div className={styles.filterBody}>
          <h5>Filter</h5>
          <Input
            allowClear
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            addonAfter={<SearchOutlined />}
            placeholder="Search owner or filter"
          />
          <TabMenu
            menuItems={['Owners', 'Filters']}
            tabPosition="top"
            minHeight="1px"
            // onChange={(activeTab) => handleChangeTab(activeTab)}
          >
            {ownerTabContent}
            {filterTabContent}
          </TabMenu>
          <CreateFilterModal
            showModal={showModal}
            setShowModal={() => setShowModal(false)}
            userList={userList}
            activityTypeOption={activityTypeOption}
            loggedUser={loggedUser}
          />
        </div>
      )
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
              <div className={styles.buttonFilter}>
                <Popover
                  content={filterContent}
                  trigger="click"
                  placement="bottomRight"
                  overlayClassName={styles.filterWrapper}
                  visible={visible}
                  onVisibleChange={(value) => setVisible(value)}
                >
                  <Button
                    icon={<FilterOutlined />}
                    className={styles.filterBtn}
                  >
                    Select a person
                    <span className={styles.upArrow}>
                      {visible ? <UpOutlined /> : <DownOutlined />}
                    </span>
                  </Button>
                </Popover>
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
              {/* <Select
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
              </Select> */}
              <Popover
                content={filterContent}
                trigger="click"
                placement="bottomRight"
                overlayClassName={styles.filterWrapper}
                visible={visible}
                onVisibleChange={() => setVisible(false)}
              >
                <Button type="primary">Click me</Button>
              </Popover>
            </div>
          </>
        )}
      </div>
    )
  }
)

export default ActivitiesHeader
