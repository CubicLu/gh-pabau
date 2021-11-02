import React, { FC, useState, useEffect } from 'react'
import { Input, Popover, Divider, Tooltip } from 'antd'
import {
  DownOutlined,
  FilterOutlined,
  SearchOutlined,
  UpOutlined,
  UsergroupAddOutlined,
  PlusOutlined,
  CheckOutlined,
  EditOutlined,
  LockOutlined,
  UnlockOutlined,
} from '@ant-design/icons'
import {
  Button,
  TabMenu,
  Avatar,
  CustomScrollbar,
  SetupSearchInput,
} from '@pabau/ui'
import { useTranslationI18 } from '../../hooks/useTranslationI18'
import styles from '../../pages/activities/index.module.less'
import { ActivitiesDataProps } from '../../pages/activities'
import classNames from 'classnames'
import { getImage } from '../Uploaders/UploadHelpers/UploadHelpers'
import { AuthenticatedUser, JwtUser } from '@pabau/yup'
import {
  useUserGroupForActivityQuery,
  useUpsertOneActivityUserStateMutation,
  useFilterOptionForActivityQuery,
} from '@pabau/graphql'
import { PersonList, OptionList } from './FilterMenu'
import {
  CreateFilterModal,
  InitialValueTypes,
  FilterDataProps,
  FilterDataObjectType,
  FilterOptionItemType,
} from './CreateFilterModal'
import Highlighter from 'react-highlight-words'
import { TFunction } from 'react-i18next'
import { validate as uuidValidate } from 'uuid'

interface ClientsHeaderProps {
  totalActivity: number
  selectedColumn: string[]
  filterData: FilterDataProps
  setFilterDataObject: (value: FilterDataObjectType) => void
  userColumns: string[]
  setUserActiveColumn: (value: string[]) => void
  sourceData?: ActivitiesDataProps[]
  searchText?: string
  setSearchText?: (term: string) => void
  toggleCreateActivityModal?: () => void
  selectFilterUser?: number[]
  setSelectFilterUser?: (val) => void
  personsList?: PersonList[]
  isMobile?: boolean
  loggedUser?: Partial<AuthenticatedUser> & JwtUser
  activityTypeOption?: OptionList[]
  leadSourceData: OptionList[]
  leadStageData: OptionList[]
  pipelineData: OptionList[]
  locationData: OptionList[]
}

interface UserWithIconProps {
  image: string
  name: string
  id: number
  filterValue: number
  setFilterValue: (value: number) => void
  t: TFunction<'common'>
  isLoggedInUser?: boolean
  needHighlighter?: boolean
  searchValue?: string
}

const UserWithIcon: FC<UserWithIconProps> = ({
  image,
  name,
  id,
  filterValue,
  setFilterValue,
  t,
  isLoggedInUser = false,
  needHighlighter = false,
  searchValue,
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
        {needHighlighter ? (
          <h4>
            <Highlighter
              highlightClassName={styles.highlight}
              searchWords={[searchValue]}
              textToHighlight={name}
            />
          </h4>
        ) : (
          <h4>{name}</h4>
        )}
        {isLoggedInUser && (
          <span className={styles.youText}>
            {t('activity.filter.popover.user.you.label')}
          </span>
        )}
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
    filterData,
    selectedColumn,
    setFilterDataObject,
    userColumns,
    setUserActiveColumn,
    leadSourceData,
    leadStageData,
    pipelineData,
    locationData,
  }) => {
    const { t } = useTranslationI18()
    const [visible, setVisible] = useState(false)
    const [userGroup, setUserGroup] = useState([])
    const [filterOption, setFilterOption] = useState<FilterOptionItemType[]>([])
    const [userList, setUserList] = useState<PersonList[]>([])
    const [showModal, setShowModal] = useState(false)
    const [searchValue, setSearchValue] = useState('')
    const [filterValue, setFilterValue] = useState<number>(0)
    const [filterGroupValue, setFilterGroupValue] = useState<number>()
    const [activeFilterId, setActiveFilterId] = useState<number>()
    const [filterUserList, setFilterUserList] = useState<PersonList[]>([])
    const [filterUserGroup, setFilterUserGroup] = useState([])
    const [filterOptionItem, setFilterOptionItem] = useState<
      FilterOptionItemType[]
    >([])
    const [searchItemCount, setSearchItemCount] = useState<number>(0)
    const [filterModalData, setFilterModalData] = useState<InitialValueTypes>()
    const [isFilterSet, setIsFilterSet] = useState<boolean>(false)

    const { data: userGroupData } = useUserGroupForActivityQuery()
    const { data: userFilterData } = useFilterOptionForActivityQuery({
      variables: {
        userId: loggedUser?.user,
      },
    })
    const [upsertActiveColumn] = useUpsertOneActivityUserStateMutation()

    useEffect(() => {
      if (filterData.type === 'user') {
        setFilterValue(filterData.id)
        setSelectFilterUser([filterData.id])
      } else if (filterData.type === 'userGroup') {
        setFilterGroupValue(filterData.id)
        setFilterValue(null)
        const item =
          userGroup.find((group) => group.id === filterData.id)?.userId ?? []
        setSelectFilterUser([...item])
      } else if (filterData.type === 'filter') {
        setFilterValue(null)
        setActiveFilterId(filterData.id)
        setFilterDataObject(filterData?.filter)
        if (filterData?.filter?.column?.length > 0) {
          setUserActiveColumn(filterData?.filter?.column)
        }
        setIsFilterSet(true)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterData, userGroup])

    useEffect(() => {
      if (filterOption && isFilterSet) {
        const item = filterOption?.find((item) => item.id === activeFilterId)
        if (!item) {
          setFilterValue(0)
          setIsFilterSet(false)
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterOption, isFilterSet])

    useEffect(() => {
      if (personsList.length > 0) {
        const userList = [...personsList].filter(
          (item) => item.id !== loggedUser.user
        )
        setUserList(userList)
      }
    }, [personsList, loggedUser])

    useEffect(() => {
      if (userGroupData?.userGroup) {
        const groupData = userGroupData.userGroup
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

    useEffect(() => {
      if (userFilterData?.filterOption) {
        const filterData = userFilterData.filterOption
          ?.map((item) => {
            return {
              id: item.id,
              name: item.name,
              shared: item.shared,
              userId: item.user_id,
              owner: item.User?.full_name,
              updated_at: item.updated_at,
              isFilterOwner: item.user_id === loggedUser?.user,
              columns: JSON.parse(item.columns)?.columns ?? [],
              andFilterOption: JSON.parse(item.data)?.andFilterOption ?? [],
              orFilterOption: JSON.parse(item.data)?.orFilterOption ?? [],
            }
          })
          .filter((item) => item)
        setFilterOption(filterData)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userFilterData])

    useEffect(() => {
      if (searchValue) {
        const userSearchResult = personsList
          .map((item) => {
            if (item?.name?.toLowerCase().includes(searchValue.toLowerCase())) {
              return item
            }
            return undefined
          })
          .filter((item) => item)
        const userGroupSearchResult = userGroup
          .map((item) => {
            if (item?.name?.toLowerCase().includes(searchValue.toLowerCase())) {
              return item
            }
            return undefined
          })
          .filter((item) => item)
        const filterSearchResult = filterOption
          .map((item) => {
            if (item?.name?.toLowerCase().includes(searchValue.toLowerCase())) {
              return item
            }
            return undefined
          })
          .filter((item) => item)
        const totalCount =
          userSearchResult.length +
          userGroupSearchResult.length +
          filterSearchResult.length
        setSearchItemCount(totalCount)
        setFilterUserList(userSearchResult)
        setFilterUserGroup(userGroupSearchResult)
        setFilterOptionItem(filterSearchResult)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchValue])

    const filterContent = () => {
      const UserGroupWithIcon = ({
        name,
        memberCount,
        id,
        userId,
        needHighlighter = false,
      }) => {
        return (
          <div
            className={classNames(
              styles.userSubWrapper,
              filterGroupValue === id && styles.active
            )}
            onClick={async () => {
              setFilterGroupValue(id)
              setFilterValue(null)
              setActiveFilterId(null)
              setFilterDataObject(null)
              setUserActiveColumn(userColumns)
              setSelectFilterUser([...userId])
              await upsertActiveColumn({
                variables: {
                  userId: loggedUser?.user,
                  companyId: loggedUser?.company,
                  update: {
                    user_group_filter: { set: id },
                    user_filter: { set: null },
                    ActivityUserFilter: { disconnect: true },
                  },
                  create: {
                    User: {
                      connect: { id: loggedUser?.user },
                    },
                    Company: {
                      connect: { id: loggedUser?.company },
                    },
                    user_group_filter: id,
                  },
                },
              })
            }}
          >
            <div className={styles.subChildWrapper}>
              <div className={styles.avtarIcon}>
                <Avatar icon={<UsergroupAddOutlined />} size={28} />
              </div>
              <div className={styles.subChildContent}>
                {needHighlighter ? (
                  <h6>
                    <Highlighter
                      highlightClassName={styles.highlight}
                      searchWords={[searchValue]}
                      textToHighlight={name}
                    />
                  </h6>
                ) : (
                  <h6>{name}</h6>
                )}
                <span className={styles.countText}>
                  {t('activityList.filter.userGroup.memberCount', {
                    count: memberCount,
                  })}
                </span>
              </div>
            </div>
            <span className={styles.checkIcon}>
              {' '}
              {filterGroupValue === id && <CheckOutlined />}
            </span>
          </div>
        )
      }

      const onUserClick = async (id: number) => {
        setFilterValue(id)
        setFilterGroupValue(null)
        setActiveFilterId(null)
        setFilterDataObject(null)
        setUserActiveColumn(userColumns)
        await upsertActiveColumn({
          variables: {
            userId: loggedUser?.user,
            companyId: loggedUser?.company,
            update: {
              user_filter: { set: id },
              user_group_filter: { set: null },
              ActivityUserFilter: { disconnect: true },
            },
            create: {
              User: {
                connect: { id: loggedUser?.user },
              },
              Company: {
                connect: { id: loggedUser?.company },
              },
              user_filter: id,
            },
          },
        })
      }

      const ownerTabContent = (
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
              onClick={async () => {
                await onUserClick(0)
                setSelectFilterUser([])
              }}
            >
              <h4>{t('activity.filter.popover.owner.everyone.label')}</h4>
              {filterValue === 0 && <CheckOutlined />}
            </div>
            <UserWithIcon
              image={loggedUser?.imageUrl && getImage(loggedUser?.imageUrl)}
              name={loggedUser?.fullName}
              id={loggedUser?.user}
              filterValue={filterValue}
              setFilterValue={async (id) => {
                await onUserClick(id)
                setSelectFilterUser([id])
              }}
              isLoggedInUser={true}
              t={t}
            />
            <Divider />
            {userGroup.map((item) => (
              <div key={item.id}>
                <UserGroupWithIcon
                  name={item.name}
                  memberCount={item.memberCount}
                  id={item.id}
                  userId={item.userId}
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
                  setFilterValue={async (id) => {
                    await onUserClick(id)
                    setSelectFilterUser([id])
                  }}
                  t={t}
                />
              </div>
            ))}
          </div>
        </CustomScrollbar>
      )

      const onEditIconClick = (item) => {
        const modalData = {
          name: item.name,
          isFilterOwner: item.isFilterOwner,
          andFilterOption: item.andFilterOption,
          orFilterOption: item.orFilterOption,
          id: item.id,
          visibility: item.shared ? 'shared' : 'private',
          saveFilter: item.columns?.length > 0,
          creatorName: item.owner,
          lastUpdatedDate: item.updated_at,
        }
        setFilterModalData(modalData)
        setShowModal(true)
      }

      const renderFilter = (items, needHighlighter = false) => {
        return items.map((item) => (
          <div
            key={item.id}
            className={classNames(
              styles.filterOption,
              activeFilterId === item.id && styles.active
            )}
          >
            <div
              className={styles.filterCategory}
              onClick={async () => {
                setActiveFilterId(item.id)
                setFilterGroupValue(null)
                setFilterValue(null)
                setFilterDataObject({
                  andFilterOption: item.andFilterOption,
                  orFilterOption: item.orFilterOption,
                  name: item.name,
                  shared: item.shared,
                  column: item.columns,
                })
                if (item?.columns?.length > 0) {
                  setUserActiveColumn(item?.columns)
                } else {
                  setUserActiveColumn(userColumns)
                }
                if (!uuidValidate(item.id)) {
                  await upsertActiveColumn({
                    variables: {
                      userId: loggedUser?.user,
                      companyId: loggedUser?.company,
                      update: {
                        user_filter: { set: null },
                        user_group_filter: { set: null },
                        ActivityUserFilter: { connect: { id: item.id } },
                      },
                      create: {
                        User: {
                          connect: { id: loggedUser?.user },
                        },
                        Company: {
                          connect: { id: loggedUser?.company },
                        },
                        ActivityUserFilter: {
                          connect: { id: item.id },
                        },
                      },
                    },
                  })
                }
              }}
            >
              <div>{item.shared ? <UnlockOutlined /> : <LockOutlined />}</div>
              <span className={styles.itemName}>
                {needHighlighter ? (
                  <Highlighter
                    highlightClassName={styles.highlight}
                    searchWords={[searchValue]}
                    textToHighlight={item.name}
                  />
                ) : (
                  item.name
                )}
              </span>
            </div>
            <div
              className={styles.iconWrapper}
              onClick={() => onEditIconClick(item)}
            >
              {item.userId === loggedUser.user || loggedUser.admin ? (
                <EditOutlined />
              ) : (
                <div className={styles.strikeWrapper}>
                  <Tooltip
                    title={t('create.filter.modal.shared.filter.tooltip', {
                      name: item.owner,
                    })}
                  >
                    <div className={styles.strikeLine}>
                      <EditOutlined />
                    </div>
                  </Tooltip>
                </div>
              )}{' '}
              <span className={styles.checkIcon}>
                {activeFilterId === item.id && <CheckOutlined />}
              </span>
            </div>
          </div>
        ))
      }

      const filterTabContent = (
        <CustomScrollbar
          autoHide={true}
          style={{ width: '300px', height: '300px' }}
        >
          {renderFilter(filterOption)}
        </CustomScrollbar>
      )

      return (
        <div className={styles.filterBody}>
          <h5>{t('activity.filter.popover.title')}</h5>
          <div className={styles.searchInput}>
            <SetupSearchInput
              onChange={(e) => setSearchValue(e)}
              placeholder={t(
                'activity.filter.popover.search.input.placeholder'
              )}
            />
          </div>
          {searchValue ? (
            !searchItemCount ? (
              <div className={styles.filterNotFound}>
                <h5>{t('create.filter.modal.no.search.label')}</h5>
                <h6>{t('create.filter.modal.no.search.desc')}</h6>
              </div>
            ) : (
              <CustomScrollbar
                autoHide={true}
                style={{ width: '300px', height: '300px' }}
              >
                <div className={styles.filterLabel}>
                  {t('create.filter.modal.search.result.match.label', {
                    count: searchItemCount,
                  })}
                </div>
                {filterUserGroup.length > 0 && (
                  <div className={styles.filterUserGroup}>
                    {filterUserGroup.map((item) => (
                      <div key={item.id}>
                        <UserGroupWithIcon
                          name={item.name}
                          memberCount={item.memberCount}
                          id={item.id}
                          userId={item.userId}
                          needHighlighter={true}
                        />
                      </div>
                    ))}
                    <Divider />
                  </div>
                )}
                {filterUserList.length > 0 && (
                  <div>
                    {filterUserList.map((data) => (
                      <div key={data.id}>
                        <UserWithIcon
                          id={data.id}
                          name={data.name}
                          image={data?.avatarURL && getImage(data?.avatarURL)}
                          filterValue={filterValue}
                          setFilterValue={async (id) => {
                            await onUserClick(id)
                            setSelectFilterUser([id])
                          }}
                          t={t}
                          needHighlighter={true}
                          searchValue={searchValue}
                        />
                      </div>
                    ))}
                  </div>
                )}
                {filterOptionItem.length > 0 && (
                  <div className={styles.filterUserGroup}>
                    <Divider />
                    <div>{renderFilter(filterOptionItem, true)}</div>
                  </div>
                )}
              </CustomScrollbar>
            )
          ) : (
            <TabMenu
              menuItems={[
                t('activity.filter.popover.owner.tab.label'),
                t('activity.filter.popover.filter.tab.label'),
              ]}
              tabPosition="top"
              minHeight="1px"
            >
              {ownerTabContent}
              {filterTabContent}
            </TabMenu>
          )}
          <div className={styles.footerBtn}>
            <Button
              type="default"
              icon={<PlusOutlined />}
              onClick={() => {
                setFilterModalData(null)
                setShowModal(true)
              }}
            >
              {t('activity.filter.popover.add.new.filter.label')}
            </Button>
          </div>
          <CreateFilterModal
            showModal={showModal}
            setShowModal={() => setShowModal(false)}
            userList={userList}
            activityTypeOption={activityTypeOption}
            loggedUser={loggedUser}
            data={filterModalData}
            selectedColumn={selectedColumn}
            upsertActiveColumn={upsertActiveColumn}
            setSelectFilterUser={setSelectFilterUser}
            setFilterValue={setFilterValue}
            setFilterGroupValue={setFilterGroupValue}
            setActiveFilterId={setActiveFilterId}
            activeFilterId={activeFilterId}
            filterData={filterData}
            setFilterDataObject={setFilterDataObject}
            setFilterOption={setFilterOption}
            leadSourceData={leadSourceData}
            leadStageData={leadStageData}
            pipelineData={pipelineData}
            locationData={locationData}
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
                    {t('activity.filter.popover.label')}
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
              <Popover
                content={filterContent}
                trigger="click"
                placement="bottomRight"
                overlayClassName={styles.filterWrapper}
                visible={visible}
                onVisibleChange={() => setVisible(false)}
              >
                <Button icon={<FilterOutlined />} className={styles.filterBtn}>
                  {t('activity.filter.popover.label')}
                  <span className={styles.upArrow}>
                    {visible ? <UpOutlined /> : <DownOutlined />}
                  </span>
                </Button>
              </Popover>
            </div>
          </>
        )}
      </div>
    )
  }
)

export default ActivitiesHeader
