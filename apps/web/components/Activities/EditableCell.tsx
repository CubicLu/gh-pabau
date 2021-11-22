import React, { FC, useState, useEffect, useRef, ReactNode } from 'react'
import { Input, Form, Popover, Select, Drawer, Spin, Tooltip } from 'antd'
import { getDuration, getFunction, prepareQueryPayload } from './utils'
import { merge, debounce, assign } from 'lodash'
import { ActivitiesDataProps, filterTabsObj } from '../../pages/activities'
import {
  DatePicker,
  Button,
  PhoneNumberInput,
  Avatar,
  Notification,
  NotificationType,
  CustomScrollbar,
} from '@pabau/ui'
import dayjs from 'dayjs'
import styles from '../../pages/activities/index.module.less'
import { useMedia } from 'react-use'
import {
  CheckOutlined,
  EditOutlined,
  CloseCircleOutlined,
  SearchOutlined,
  UserOutlined,
} from '@ant-design/icons'
import Highlighter from 'react-highlight-words'
import classNames from 'classnames'
import { useTranslationI18 } from '../../hooks/useTranslationI18'
import CreateLabel from './CreateLabel'
import { Labels } from '../../pages/activities'
// import { typeArray } from '../../mocks/Activities'
import { columnNames } from './AddColumnPopover'
import * as Icon from '@ant-design/icons'
import {
  useUpdateOneActivityMutation,
  Activity_Status,
  useUpdateOneCmLeadMutation,
} from '@pabau/graphql'
import { ClientLeadSelect } from './ClientLeadSelectMenu'
import { PersonList } from './FilterMenu'
import { ActivityTypeFilter } from './CreateActivity'
import { getImage } from '../Uploaders/UploadHelpers/UploadHelpers'
import { useUser } from '../../context/UserContext'

const { Option } = Select
const { TextArea } = Input

interface EditableCellProps {
  title: React.ReactNode
  editable: boolean
  children: React.ReactNode
  dataIndex: string
  id: string
  record: ActivitiesDataProps
  handleSave: (record) => void
  editName?: string
  ellipsis?: boolean
  labels?: Labels[]
  setLabels?: (val: Labels[]) => void
  type?: string
  selectOptions?: PersonList[]
  hideFooter?: boolean
  selectPrefixIcon?: ReactNode
  dateFormat: string
  activityType: ActivityTypeFilter[]
}

interface SearchWithSelectProps {
  displayHeading?: boolean
  searchValue?: string
  onSearch?: (val) => void
  options?: PersonList[]
  selectedOption?: string
  onOptionClick?: (item) => void
  displayAvatar?: boolean
  isSearch?: boolean
}

export const cellTypes = {
  date: 'date',
  phone: 'phone',
  selectWithSearch: 'selectWithSearch',
  listWithSearch: 'listWithSearch',
  activityType: 'activityType',
  list: 'list',
  number: 'number',
  email: 'email',
  multiple: 'multiple',
  string: 'string',
  text: 'text',
  url: 'url',
  label: 'label',
  client: 'client',
  lead: 'lead',
}

export const EditableCell: FC<EditableCellProps> = React.memo(
  ({
    title,
    editable,
    children,
    dataIndex,
    id,
    record,
    handleSave,
    editName,
    labels,
    setLabels,
    type,
    selectOptions,
    hideFooter,
    showTime,
    selectPrefixIcon,
    dateFormat,
    activityType,
    leadSourceData,
    leadStageData,
    locationData,
    pipelineData,
    ...restProps
  }) => {
    console.log('id----------------', id)
    console.log('selectOptions---------------', selectOptions)
    const labelRef = useRef(null)
    const isMobile = useMedia('(max-width: 768px)', false)

    const [visible, setVisible] = useState(false)
    const [isValidPhone, setValidPhone] = useState(true)
    const [selectedType, setSelectedType] = useState('')
    const [listSearch, setListSearch] = useState('')
    const [filteredListData, setFilteredListData] = useState(selectOptions)
    const [selectedListItem, setSelectedListItem] = useState('')
    const [selectedLabels, setSelectedLabels] = useState<Labels[]>([])
    const [defaultSelectedLabels, setDefaultSelectedLabels] = useState<
      Labels[]
    >([])
    const eventDateFormat = 'D MMMM YYYY hh:mm'
    const [form] = Form.useForm()
    const { t } = useTranslationI18()
    const loggedUser = useUser()
    const [editActivity] = useUpdateOneActivityMutation({
      onCompleted() {
        Notification(
          NotificationType.success,
          t('update.activity.record.success.message')
        )
      },
    })
    const [editLead] = useUpdateOneCmLeadMutation({
      onCompleted() {
        Notification(
          NotificationType.success,
          t('update.activity.record.success.message')
        )
      },
    })

    useEffect(() => {
      if (record) {
        const {
          assigned: { full_name = '' },
          client: {
            firstName: cFirstName = '',
            lastName: cLastName = '',
            label,
          },
          lead: { owner, wonBy },
          activityLead,
          type_name,
        } = record
        id === columnNames.assignedToUser.id &&
          setSelectedListItem(`${full_name}`)
        id === columnNames.clientName.id &&
          setSelectedListItem(`${cFirstName} ${cLastName}`)
        id === columnNames.leadOwner.id &&
          setSelectedListItem(`${owner?.full_name}`)
        id === columnNames.wonBy.id && setSelectedListItem(wonBy)
        // id === columnNames.leadDescription.id &&
        //   setSelectedListItem(activityLead)
        setSelectedType(type_name)
        if (id === columnNames.label.id) {
          setSelectedLabels(label)
          setDefaultSelectedLabels(label)
        }
      }
    }, [record, id])

    const toggleVisible = () => {
      setVisible((e) => !e)
      clearFormData()
    }

    const clearFormData = () => {
      visible && form.resetFields()
      id === columnNames.clientName.id &&
        isMobile &&
        setSelectedListItem(
          `${record?.client?.firstName} ${record?.client?.lastName}`
        )
      // id === columnNames.leadDescription.id &&
      //   isMobile &&
      //   setSelectedListItem(`${record?.activityLead}`)
    }

    const renderSubjectIcon = (type_badge) => {
      return React.createElement(Icon?.[type_badge])
    }

    const convertStringToObject = (val) => {
      const k = Object.keys(val)[0]
      const kArr = k?.split('.')
      if (kArr.length === 1) {
        return val
      }
      const key = kArr.shift()
      const temp = {
        [kArr.join('.')]: Object.values(val)[0],
      }
      return { [key]: convertStringToObject(temp) }
    }

    const save = async (values) => {
      const [key] = Object.keys(values)
      const updatedValue = { ...values }
      let displayConfetti = false
      let needRefetch = false
      let payload
      switch (key) {
        case columnNames.dueDate.id: {
          const newDueDate = dayjs(values?.[key]).format()
          values = {
            [key]: newDueDate,
            duration: getDuration(newDueDate, record.dueEndDate),
          }
          payload = {
            due_start_date: { set: dayjs(values?.[key]) },
          }
          needRefetch = true
          break
        }
        case columnNames.clientName.id: {
          payload = {
            CmContact: {
              connect: {
                ID: Number(values?.[key]),
              },
            },
          }
          needRefetch = true
          break
        }
        case columnNames.leadName.id:
        case columnNames.leadTitle.id: {
          payload = {
            CmLead: {
              connect: {
                ID: Number(values?.[key]),
              },
            },
          }
          needRefetch = true
          break
        }
        case columnNames.duration.id: {
          const duration = values?.[key]
          const dueEndDate = dayjs(record.dueDate)
            .add(duration, 'minute')
            .format()
          payload = {
            due_end_date: { set: dueEndDate },
          }
          needRefetch = true
          values = { [key]: duration, dueEndDate: dueEndDate }
          break
        }
        case columnNames.doneTime.id: {
          values = { [key]: dayjs(values?.[key]) }
          const data = {
            finished_at: { set: dayjs(values?.[key]) },
          }
          if (record.status !== 'Done') {
            displayConfetti = true
            data['status'] = {
              set: Activity_Status.Done,
            }
            data['CompletedBy'] = {
              connect: {
                id: loggedUser?.me?.user,
              },
            }
          }
          payload = data
          needRefetch = true
          break
        }
        case columnNames.note.id: {
          payload = {
            note: {
              set: values?.[key],
            },
          }
          needRefetch = true
          break
        }
        case columnNames.freeBusy.id: {
          payload = {
            available: {
              set: Boolean(Number(values?.[key])),
            },
          }
          needRefetch = true
          values = { [key]: Boolean(Number(values?.[key])) }
          break
        }
        case columnNames.addTime.id: {
          payload = {
            created_at: {
              set: dayjs(values?.[key]),
            },
          }
          needRefetch = true
          break
        }
        case columnNames.leadEmail.id: {
          if (record?.lead_id) {
            payload = {
              Email: {
                set: values?.[key],
              },
            }
            needRefetch = true
            values = { lead: { email: values?.[key] } }
          }
          break
        }
        case columnNames.leadPhone.id: {
          const number = values?.[key]?.includes('+')
            ? values?.[key]
            : `+${values?.[key]}`
          if (record?.lead_id) {
            payload = {
              Phone: {
                set: number,
              },
            }
            needRefetch = true
            values = { lead: { phone: number } }
          }
          break
        }
        case columnNames.leadCreatedDate.id: {
          if (record?.lead_id) {
            payload = {
              CreatedDate: {
                set: dayjs(values?.[key]),
              },
            }
            needRefetch = true
            values = { lead: { createdDate: dayjs(values?.[key]) } }
          }
          break
        }
        case columnNames.leadSource.id: {
          const source = leadSourceData?.find(
            (item) => item?.id === values?.[key]
          )
          if (record?.lead_id) {
            payload = {
              MarketingSource: {
                connect: {
                  id: values?.[key],
                },
              },
            }
            needRefetch = true
            values = { lead: { leadSource: { name: source?.name } } }
          }
          break
        }
        case columnNames.leadStage.id: {
          const stage = leadStageData?.find(
            (item) => item?.id === values?.[key]
          )
          if (record?.lead_id) {
            payload = {
              LeadStatusData: {
                connect: {
                  id: values?.[key],
                },
              },
            }
            needRefetch = true
            values = { lead: { leadStage: stage?.name } }
          }
          break
        }
        case columnNames.leadStatus.id: {
          const stage = leadStageData?.find(
            (item) => item?.id === values?.[key]
          )
          if (record?.lead_id) {
            payload = {
              EnumStatus: {
                set: values?.[key],
              },
            }
            needRefetch = true
            values = { lead: { leadStatus: values?.[key] } }
          }
          break
        }
        case columnNames.leadLocation.id: {
          const location = locationData?.find(
            (item) => item?.id === values?.[key]
          )
          if (record?.lead_id) {
            payload = {
              Location: {
                connect: {
                  id: values?.[key],
                },
              },
            }
            needRefetch = true
            values = {
              lead: { Location: { id: values?.[key], name: location?.name } },
            }
          }
          break
        }
        case columnNames.leadPipeline.id: {
          const pipeline = pipelineData?.find(
            (item) => item?.id === values?.[key]
          )
          if (record?.lead_id) {
            needRefetch = true
            values = {
              lead: { PipelineStage: { Pipeline: { name: pipeline?.name } } },
            }
          }
          break
        }
        case columnNames.leadUpdateTime.id: {
          const updateTime = dayjs(values?.[key]).format()
          if (record?.lead_id) {
            payload = {
              LastUpdated: {
                set: updateTime,
              },
            }
            needRefetch = true
            values = { lead: { lastUpdated: updateTime } }
          }
          break
        }
        case columnNames.leadClosedOn.id:
        case columnNames.leadDateEnteringStage.id: {
          const closedOn = dayjs(values?.[key]).format()
          if (record?.lead_id) {
            payload = {
              ConvertDate: {
                set: closedOn,
              },
            }
            needRefetch = true
            values = { lead: { leadClosedOn: closedOn } }
          }
          break
        }
        default: {
          values = convertStringToObject(values)
          payload = prepareQueryPayload(key, values?.[key])
          break
        }
      }
      if (payload) {
        switch (dataIndex) {
          case 'lead': {
            await editLead({
              variables: {
                where: {
                  ID: record?.lead_id,
                },
                data: payload,
              },
            })
            break
          }
          case 'client': {
            break
          }
          default: {
            await editActivity({
              variables: {
                where: {
                  id: record?.id,
                },
                data: payload,
              },
            })
            break
          }
        }
      }
      handleSave(merge({}, record, values), displayConfetti, needRefetch)
      toggleVisible()
      form.setFieldsValue({
        [key]: updatedValue?.[key],
      })
    }

    const handleApplyLabel = (selectedLabels) => {
      handleSave({
        ...record,
        client: { ...record.client, label: selectedLabels },
      })
      toggleVisible()
    }

    const handleListSave = async (item) => {
      console.log('save--------------', item?.id)
      setSelectedListItem(item?.name)
      const [firstName, lastName] = item?.name?.split(' ')
      let value = {}
      switch (id) {
        case columnNames.assignedToUser.id: {
          await editActivity({
            variables: {
              where: {
                id: record?.id,
              },
              data: {
                AssignedUser: {
                  connect: {
                    id: item?.id,
                  },
                },
              },
            },
          })
          const user = filteredListData?.find((user) => user?.id === item?.id)
          console.log('personeList---------', filteredListData, user)
          value = {
            assigned: { full_name: user?.name, image: user?.avatarURL },
          }
          break
        }
        case columnNames.leadOwner.id: {
          if (record?.lead_id) {
            await editLead({
              variables: {
                where: {
                  ID: record?.lead_id,
                },
                data: {
                  User: {
                    connect: {
                      id: item?.id,
                    },
                  },
                },
              },
            })
            const user = filteredListData?.find((user) => user?.id === item?.id)
            value = {
              lead: {
                owner: { full_name: user?.name, image: user?.avatarURL },
              },
            }
          }
          break
        }
      }
      // if (id === columnNames.assignedToUser.id) {
      //   // value = { assigned: { firstName, lastName } }
      //   await editActivity({
      //     variables: {
      //       where: {
      //         id: record?.id,
      //       },
      //       data: {
      //         AssignedUser: {
      //           connect: {
      //             id: item?.id
      //           }
      //         }
      //       }
      //     }
      //   })
      // } else if (id === columnNames.wonBy.id) {
      //   value = { lead: { wonBy: item } }
      // } else if (id === columnNames.leadOwner.id) {
      //   value = { lead: { owner: { firstName, lastName } } }
      // }
      handleSave(merge({}, record, value))
      toggleVisible()
      form.setFieldsValue({
        [id]: item,
      })
    }

    const handleTypeSave = async (item: ActivityTypeFilter) => {
      setSelectedType(item?.name)
      await editActivity({
        variables: {
          where: {
            id: record?.id,
          },
          data: {
            ActivityType: {
              connect: {
                id: item?.id,
              },
            },
          },
        },
      })
      toggleVisible()
      handleSave(
        merge(record, { type_name: item?.name, type_badge: item?.icon })
      )
      console.log('record-----', record)
    }

    useEffect(() => {
      if (selectOptions) {
        let filteredList = [...selectOptions]
        if (listSearch) {
          filteredList = filteredList.filter(
            (data) =>
              data?.name?.toLowerCase().indexOf(listSearch.toLowerCase()) >= 0
          )
        }
        setFilteredListData(filteredList)
      }
    }, [listSearch, selectOptions])

    const renderSimpleSelect = ({ initialValue, options }) => {
      console.log('initialValue--------', initialValue, id, options)
      if (id === 'freeBusy') {
        initialValue = Number(initialValue).toString()
      }
      if (id === 'lead.leadSource' || id === 'lead.Location') {
        initialValue = initialValue?.name
      }
      return (
        <div className={styles.editPopup}>
          <h5>{`${t('activityList.edit')} ${editName}`}</h5>
          <div>
            <Form.Item name={id} initialValue={initialValue}>
              <Select
                allowClear
                placeholder={t('activityList.select.placeholder')}
              >
                {options.map((item) => (
                  <Option key={item?.id} value={item?.id}>
                    {item?.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </div>
        </div>
      )
    }

    const renderListWithSearch = ({
      displayHeading = true,
      searchValue = '',
      onSearch,
      options = [],
      selectedOption,
      onOptionClick,
      displayAvatar = true,
      isSearch = true,
    }: SearchWithSelectProps): JSX.Element => {
      return (
        <div className={styles.editPopup}>
          {displayHeading && <h5>{`${t('activityList.edit')} ${editName}`}</h5>}
          <div>
            {isSearch && (
              <Input
                placeholder={t('activityList.search.input.name')}
                suffix={<SearchOutlined />}
                value={searchValue}
                onChange={(e) => onSearch(e.target.value)}
                allowClear={true}
                size="small"
              />
            )}
            <div className={styles.profileMainWrapper}>
              {options.length === 0 ? (
                <div className={styles.noDataRecord}>
                  <span>{t('activityList.select.noData.message')}</span>
                </div>
              ) : (
                <CustomScrollbar
                  autoHide={true}
                  style={{ width: '300px', height: '250px' }}
                >
                  {options.map((item, index) => {
                    const [firstName] = item?.name?.split(' ')
                    return (
                      <div className={styles.profileName} key={index}>
                        {item?.name === selectedOption && <CheckOutlined />}
                        <div
                          className={styles.profileTitle}
                          onClick={() => onOptionClick(item)}
                        >
                          {displayAvatar && (
                            <Avatar
                              name={firstName}
                              size="small"
                              src={item?.avatarURL && getImage(item?.avatarURL)}
                            />
                          )}
                          <h5
                            className={classNames({
                              [styles.active]: item?.name === selectedOption,
                            })}
                          >
                            <Highlighter
                              highlightClassName={styles.highlight}
                              searchWords={[searchValue]}
                              textToHighlight={item?.name}
                            >
                              {item?.name}
                            </Highlighter>
                          </h5>
                        </div>
                      </div>
                    )
                  })}
                </CustomScrollbar>
              )}
            </div>
          </div>
        </div>
      )
    }

    const DebounceSelect = ({
      fetchOptions,
      debounceTimeout = 400,
      initialValue,
      isPrefixIcon = false,
      prefixIcon,
      ...props
    }) => {
      const [fetching, setFetching] = React.useState(false)
      const [options, setOptions] = React.useState(fetchOptions)
      const fetchRef = React.useRef(0)
      const [search, setSearch] = React.useState('')

      const debounceFetcher = React.useMemo(() => {
        const loadOptions = (value: string) => {
          setSearch(value)
          fetchRef.current += 1
          const fetchId = fetchRef.current
          setOptions([])
          setFetching(true)

          setTimeout(() => {
            if (fetchId !== fetchRef.current) {
              // for fetch callback order
              return
            }
            const newOptions = fetchOptions.filter((option) => {
              return option.toLowerCase().indexOf(value.toLowerCase()) >= 0
            })
            setOptions(newOptions)
            setFetching(false)
          }, 500)
        }

        return debounce(loadOptions, debounceTimeout)
      }, [fetchOptions, debounceTimeout])

      return (
        <div className={styles.selectWrap}>
          {isPrefixIcon && (
            <div className={styles.prefixIconWrap}>{prefixIcon}</div>
          )}
          <Form.Item name={id} initialValue={initialValue}>
            <Select
              onSearch={debounceFetcher}
              notFoundContent={fetching ? <Spin size="small" /> : null}
              {...props}
              onClick={() => setOptions(fetchOptions)}
              className={styles.selectClass}
            >
              {options.map((item, index) => (
                <Option key={index} value={item}>
                  <Highlighter
                    highlightClassName={styles.highlight}
                    searchWords={[search]}
                    textToHighlight={item}
                  >
                    {item}
                  </Highlighter>
                </Option>
              ))}
            </Select>
          </Form.Item>
        </div>
      )
    }

    const renderItem = () => {
      console.log('type----------', type)
      switch (type) {
        case cellTypes.date:
          console.log('Hello-----------', id, showTime)
          console.log(
            'getFunction(record, `${id}`)',
            getFunction(record, `${id}`)
          )
          console.log('value-----------', dayjs(getFunction(record, `${id}`)))
          console.log('dateFormat--------', dateFormat)
          const date = getFunction(record, `${id}`)
          return (
            <div className={styles.editPopup}>
              <h5>{`${t('activityList.edit')} ${editName}`}</h5>
              <Form.Item
                // initialValue={
                //   record?.[id] &&
                //   dayjs(getFunction(record, `${id}`))
                // }
                name={id}
              >
                <DatePicker
                  format={dateFormat}
                  name={id}
                  defaultValue={date && dayjs(date)}
                  allowClear={false}
                  showTime={showTime}
                />
              </Form.Item>
            </div>
          )
        case cellTypes.phone:
          const phone = getFunction(record, `${id}`)
          const number = phone?.includes('+') ? phone?.replace('+', '') : phone
          return (
            <div className={styles.editPopup}>
              <h5>{`${t('activityList.edit')} ${editName}`}</h5>
              {console.log('number input-------------', number)}
              <Form.Item name={id} initialValue={number}>
                <PhoneNumberInput
                  onChange={(value, valid) => {
                    form.setFieldsValue({
                      [id]: value,
                    })
                    if (!valid) {
                      setValidPhone(false)
                    } else {
                      setValidPhone(true)
                    }
                  }}
                />
              </Form.Item>
            </div>
          )
        case cellTypes.selectWithSearch:
          return (
            <div>
              {!isMobile ? (
                <div className={styles.editPopup}>
                  <h5>{`${t('activityList.edit')} ${editName}`}</h5>
                  <DebounceSelect
                    allowClear
                    showArrow={false}
                    showSearch
                    placeholder={t('activityList.search.input')}
                    fetchOptions={selectOptions}
                    initialValue={
                      columnNames.clientName.id === id
                        ? `${record.client.firstName} ${record.client.lastName}`
                        : getFunction(record, `${id}`)
                    }
                    isPrefixIcon={true}
                    prefixIcon={selectPrefixIcon}
                  />
                </div>
              ) : (
                <Form.Item name={id}>
                  {renderListWithSearch({
                    searchValue: listSearch,
                    onSearch: setListSearch,
                    options: filteredListData,
                    selectedOption: selectedListItem,
                    onOptionClick: setSelectedListItem,
                    displayAvatar: false,
                  })}
                </Form.Item>
              )}
            </div>
          )
        case cellTypes.listWithSearch:
          return (
            <div>
              {renderListWithSearch({
                displayHeading: isMobile,
                searchValue: listSearch,
                onSearch: setListSearch,
                options: filteredListData,
                selectedOption: selectedListItem,
                onOptionClick: handleListSave,
              })}
            </div>
          )
        case cellTypes.activityType:
          console.log('activityType-------', activityType)
          return (
            <div className={styles.editPopup}>
              {isMobile && <h5>{`${t('activityList.edit')} ${editName}`}</h5>}
              <div>
                {activityType.map((item) => {
                  return (
                    <div className={styles.profileName} key={item?.id}>
                      {item?.name === selectedType && <CheckOutlined />}
                      <div
                        className={styles.profileTitle}
                        onClick={() => handleTypeSave(item)}
                      >
                        {item?.hasIcon && renderSubjectIcon(item?.icon)}
                        <h5
                          className={classNames({
                            [styles.active]: item?.name === selectedType,
                          })}
                        >
                          {item?.name}
                        </h5>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        case cellTypes.list:
          return (
            <div>
              {renderSimpleSelect({
                initialValue: getFunction(record, `${id}`),
                options: selectOptions,
              })}
            </div>
          )
        case cellTypes.number:
          return (
            <div className={styles.editPopup}>
              <h5>{`${t('activityList.edit')} ${editName}`}</h5>
              <Form.Item name={id} initialValue={getFunction(record, `${id}`)}>
                <Input type={'number'} />
              </Form.Item>
            </div>
          )
        case cellTypes.email:
          return (
            <div className={styles.editPopup}>
              <h5>{`${t('activityList.edit')} ${editName}`}</h5>
              <Form.Item
                name={id}
                rules={[{ type: 'email', required: true }]}
                initialValue={getFunction(record, `${id}`)}
              >
                <Input />
              </Form.Item>
            </div>
          )
        case cellTypes.multiple:
          return (
            <div className={styles.editPopup}>
              <h5>{`${t('activityList.edit')} ${editName}`}</h5>
              <Form.Item name={id} initialValue={getFunction(record, `${id}`)}>
                <TextArea rows={4} />
              </Form.Item>
            </div>
          )
        case cellTypes.client:
          console.log('id-----------', id, record)
          console.log(
            'value client---------',
            `${record.client.firstName} ${record.client.lastName}`
          )
          return (
            <div className={styles.editPopup}>
              <h5>{`${t('activityList.edit')} ${editName}`}</h5>
              <Form.Item
                name={id}
                initialValue={[
                  record?.client?.firstName,
                  record?.client?.lastName,
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                <ClientLeadSelect
                  name="client"
                  isEdit={false}
                  // value={`${record.client.firstName} ${record.client.lastName}`}
                  // onChange={(value) =>
                  //   setFieldValue(
                  //     'client',
                  //     value && Number.parseInt(value)
                  //   )
                  // }
                  disabled={false}
                  // className={styles.clientContent}
                />
              </Form.Item>
            </div>
          )
        case cellTypes.lead:
          console.log('id-----------', id, record)
          console.log(
            'value client---------',
            `${record.lead.firstName} ${record.lead.lastName}`
          )
          return (
            <div className={styles.editPopup}>
              <h5>{`${t('activityList.edit')} ${editName}`}</h5>
              <Form.Item
                name={id}
                initialValue={[record?.lead?.firstName, record?.lead?.lastName]
                  .filter(Boolean)
                  .join(' ')}
              >
                <ClientLeadSelect
                  name="lead"
                  isEdit={false}
                  // value={`${record.client.firstName} ${record.client.lastName}`}
                  // onChange={(value) =>
                  //   setFieldValue(
                  //     'client',
                  //     value && Number.parseInt(value)
                  //   )
                  // }
                  disabled={false}
                  // className={styles.clientContent}
                />
              </Form.Item>
            </div>
          )
        default:
          return (
            <div className={styles.editPopup}>
              <h5>{`${t('activityList.edit')} ${editName}`}</h5>
              <Form.Item name={id} initialValue={getFunction(record, `${id}`)}>
                <Input />
              </Form.Item>
            </div>
          )
      }
    }
    const popoverContent = () => {
      const validateMessages = {
        required: t('activityList.column.email.required'),
        types: {
          email: t('activityList.column.email.validate'),
        },
      }
      return (
        <Form
          form={form}
          name="EditCell"
          onFinish={(value) => {
            console.log('Hello------------- submit', value)
            if (isValidPhone) {
              save(value)
            }
          }}
          validateMessages={validateMessages}
        >
          <div className={styles.popOverContent}>
            {renderItem()}
            {!hideFooter && (
              <div className={styles.footerBtnGroup}>
                <Button onClick={toggleVisible}>
                  {t('activityList.edit.cancel')}
                </Button>
                <Button type={'primary'} htmlType={'submit'}>
                  {t('activityList.edit.save')}
                </Button>
              </div>
            )}
          </div>
        </Form>
      )
    }

    let childNode = <td {...restProps}>{children}</td>
    const columnCell = (
      <td {...restProps}>
        <div className={styles.editableCellValueWrap}>
          <span
            style={{ height: '100%', width: '100%' }}
            className={styles.textEle}
          >
            {children}
          </span>
          {visible ? (
            <CloseCircleOutlined onClick={toggleVisible} />
          ) : (
            <Tooltip
              title={t('activityList.column.edit.tooltip')}
              placement={'topRight'}
            >
              <EditOutlined
                onClick={
                  type === cellTypes.label
                    ? () => {
                        labelRef.current.handleVisible(true)
                        toggleVisible()
                      }
                    : () => toggleVisible()
                }
              />
            </Tooltip>
          )}
        </div>
      </td>
    )

    const handleCloseLabelPopover = (val) => {
      !val && setVisible(val)
    }

    const handleClose = (val) => {
      setVisible(val)
      clearFormData()
    }

    if (editable) {
      childNode = (
        <>
          {type !== cellTypes.label ? (
            <Popover
              placement="bottomLeft"
              content={popoverContent}
              trigger="click"
              overlayClassName={styles.profileWrapper}
              visible={visible && !isMobile}
              onVisibleChange={(val) => !val && handleClose(val)}
            >
              {columnCell}
            </Popover>
          ) : (
            <CreateLabel
              ref={labelRef}
              selectedLabels={selectedLabels}
              setSelectedLabels={setSelectedLabels}
              labels={labels}
              setLabels={setLabels}
              fromHeader={true}
              defaultSelectedLabels={defaultSelectedLabels}
              setDefaultSelectedLabels={setDefaultSelectedLabels}
              handleApplyLabel={handleApplyLabel}
              handleClose={handleCloseLabelPopover}
            >
              {columnCell}
            </CreateLabel>
          )}
          {isMobile && type !== cellTypes.label && (
            <Drawer
              placement={'bottom'}
              closable={false}
              className={styles.statusMobileDrawer}
              onClose={toggleVisible}
              visible={visible}
              key={'bottom'}
            >
              <span className={styles.line}></span>
              {popoverContent()}
            </Drawer>
          )}
        </>
      )
    }

    return childNode
  }
)
