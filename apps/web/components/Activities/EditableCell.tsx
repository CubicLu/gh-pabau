import React, { FC, useState, useEffect, useRef, ReactNode } from 'react'
import { Input, Form, Popover, Select, Drawer, Spin } from 'antd'
import { getDuration, getFunction } from './utils'
import { merge, debounce } from 'lodash'
import { ActivitiesDataProps, filterTabsObj } from '../../pages/activities'
import { DatePicker, Button, PhoneNumberInput, Avatar } from '@pabau/ui'
import dayjs from 'dayjs'
import styles from '../../pages/activities/index.module.less'
import { useMedia } from 'react-use'
import {
  CheckOutlined,
  EditOutlined,
  CloseCircleOutlined,
  SearchOutlined,
} from '@ant-design/icons'
import Highlighter from 'react-highlight-words'
import classNames from 'classnames'
import { useTranslationI18 } from '../../hooks/useTranslationI18'
import CreateLabel from './CreateLabel'
import { Labels } from '../../pages/activities'
import { typeArray } from '../../mocks/Activities'
import { columnNames } from './AddColumnPopover'
import {
  SendOutlined,
  PhoneOutlined,
  MessageOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons'

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
  selectOptions?: string[]
  hideFooter?: boolean
  selectPrefixIcon?: ReactNode
}

interface SearchWithSelectProps {
  displayHeading?: boolean
  searchValue?: string
  onSearch?: (val) => void
  options?: string[]
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
    selectPrefixIcon,
    ...restProps
  }) => {
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
        id === columnNames.lead.id && setSelectedListItem(activityLead)
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
      id === columnNames.lead.id &&
        isMobile &&
        setSelectedListItem(`${record?.activityLead}`)
    }

    const renderSubjectIcon = (type) => {
      switch (type) {
        case filterTabsObj.call:
          return <PhoneOutlined />
        case filterTabsObj.email:
          return <SendOutlined />
        case filterTabsObj.message:
          return <MessageOutlined />
        case filterTabsObj.meeting:
          return <UsergroupAddOutlined />
      }
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

    const save = (values) => {
      const [key] = Object.keys(values)
      const updatedValue = { ...values }
      if (key === columnNames.dueDate.id) {
        const newDueDate = dayjs(values?.[key]).format(eventDateFormat)
        values = {
          [key]: newDueDate,
          duration: getDuration(newDueDate, record.dueEndDate, eventDateFormat),
        }
      } else if (key === columnNames.clientName.id) {
        const value = !isMobile ? values?.[key] : selectedListItem
        const [firstName, lastName] = value.split(' ')
        values = { client: { firstName, lastName } }
      } else if (key === columnNames.lead.id) {
        values = { [key]: !isMobile ? values?.[key] : selectedListItem }
      } else if (key === columnNames.duration.id) {
        const duration = values?.[key]
        const dueEndDate = dayjs(record.dueDate, eventDateFormat)
          .add(duration, 'minute')
          .format(eventDateFormat)
        values = { [key]: duration, dueEndDate: dueEndDate }
      } else {
        values = convertStringToObject(values)
      }
      handleSave(merge(record, values))
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

    const handleListSave = (item) => {
      setSelectedListItem(item)
      const [firstName, lastName] = item.split(' ')
      let value = {}
      if (id === columnNames.assignedToUser.id) {
        value = { assigned: { firstName, lastName } }
      } else if (id === columnNames.wonBy.id) {
        value = { lead: { wonBy: item } }
      } else if (id === columnNames.leadOwner.id) {
        value = { lead: { owner: { firstName, lastName } } }
      }
      handleSave(merge(record, value))
      toggleVisible()
      form.setFieldsValue({
        [id]: item,
      })
    }

    const handleTypeSave = (item) => {
      setSelectedType(item)
      handleSave(merge(record, { type: item }))
      toggleVisible()
    }

    useEffect(() => {
      if (selectOptions) {
        let filteredList = [...selectOptions]
        if (listSearch) {
          filteredList = filteredList.filter(
            (data) => data.toLowerCase().indexOf(listSearch.toLowerCase()) >= 0
          )
        }
        setFilteredListData(filteredList)
      }
    }, [listSearch, selectOptions])

    const renderSimpleSelect = ({ initialValue, options }) => {
      return (
        <div className={styles.editPopup}>
          <h5>{`${t('activityList.edit')} ${editName}`}</h5>
          <div>
            <Form.Item name={id} initialValue={initialValue}>
              <Select
                allowClear
                placeholder={t('activityList.select.placeholder')}
              >
                {options.map((item, index) => (
                  <Option key={index} value={item}>
                    {item}
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
              ></Input>
            )}
            <div className={styles.profileMainWrapper}>
              {options.length === 0 ? (
                <div className={styles.noDataRecord}>
                  <span>{t('activityList.select.noData.message')}</span>
                </div>
              ) : (
                <>
                  {options.map((item, index) => {
                    const [firstName] = item.split(' ')
                    return (
                      <div className={styles.profileName} key={index}>
                        {item === selectedOption && <CheckOutlined />}
                        <div
                          className={styles.profileTitle}
                          onClick={() => onOptionClick(item)}
                        >
                          {displayAvatar && (
                            <Avatar name={firstName} size="small" />
                          )}
                          <h5
                            className={classNames({
                              [styles.active]: item === selectedOption,
                            })}
                          >
                            <Highlighter
                              highlightClassName={styles.highlight}
                              searchWords={[searchValue]}
                              textToHighlight={item}
                            >
                              {item}
                            </Highlighter>
                          </h5>
                        </div>
                      </div>
                    )
                  })}
                </>
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
      switch (type) {
        case cellTypes.date:
          return (
            <div className={styles.editPopup}>
              <h5>{`${t('activityList.edit')} ${editName}`}</h5>
              <Form.Item
                initialValue={
                  record?.[id] &&
                  dayjs(getFunction(record, `${id}`), eventDateFormat)
                }
                name={id}
              >
                <DatePicker
                  format={eventDateFormat}
                  name={id}
                  defaultValue={
                    dayjs(getFunction(record, `${id}`), eventDateFormat) || null
                  }
                  allowClear={false}
                  showTime={{ defaultValue: dayjs('00:00', 'HH:mm') }}
                />
              </Form.Item>
            </div>
          )
        case cellTypes.phone:
          return (
            <div className={styles.editPopup}>
              <h5>{`${t('activityList.edit')} ${editName}`}</h5>
              <Form.Item name={id} initialValue={getFunction(record, `${id}`)}>
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
          return (
            <div className={styles.editPopup}>
              {isMobile && <h5>{`${t('activityList.edit')} ${editName}`}</h5>}
              <div>
                {typeArray.map((item, index) => {
                  return (
                    <div className={styles.profileName} key={index}>
                      {item === selectedType && <CheckOutlined />}
                      <div
                        className={styles.profileTitle}
                        onClick={() => handleTypeSave(item)}
                      >
                        {renderSubjectIcon(item)}
                        <h5
                          className={classNames({
                            [styles.active]: item === selectedType,
                          })}
                        >
                          {item}
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
