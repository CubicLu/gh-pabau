import React, { FC, useEffect, useState } from 'react'
import { Button, BasicModal, Avatar, DatePicker, TimePicker, BigCalender } from '@pabau/ui'
import { Input, Select, Checkbox, Tooltip, Drawer, Spin } from 'antd'
import classNames from 'classnames'
import {
  FontColorsOutlined,
  ClockCircleOutlined,
  BlockOutlined,
  QuestionCircleOutlined,
  UserOutlined,
  LeftOutlined,
  MenuOutlined,
  TeamOutlined,
  FileOutlined,
  LinkOutlined,
  AimOutlined,
} from '@ant-design/icons'
import Highlighter from 'react-highlight-words'
import dayjs, { Dayjs } from 'dayjs'
import { useTranslation } from 'react-i18next'
import { useMedia } from 'react-use'
import { debounce } from 'lodash'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { Form, Input as FormikInput, SubmitButton } from 'formik-antd'
import * as Icon from '@ant-design/icons'
import { ClientLeadSelect } from './ClientLeadSelectMenu'
import styles from './CreateActivity.module.less'
import { useCreateOneActivityMutation } from '@pabau/graphql'

interface UserDetail {
  id: number
  name: string
  image?: string
}
export interface CreateActivityProps {
  visible?: boolean
  onCancel?: () => void
  events?: EventsData[]
  handleSave?: (data) => void
  isEdit?: boolean
  editData?: EditedData
  leadOptions: OptionProps[]
  clientOptions: OptionProps[]
  userOptions: UserDetail[]
  activityTypeOption: ActivityTypeFilter[]
  loggedUser: UserDetail
}

export interface ActivityTypeFilter {
  id: number
  name: string
  isSelected: boolean
  hasIcon?: boolean
  icon?: string
}

interface OptionProps {
  name: string
  value: string
}

interface EditedData {
  subject: string
  startDate: Dayjs
  endDate: Dayjs
  startTime: Dayjs | undefined
  endTime: Dayjs | undefined
  freeBusy: number
  notes: string
  user: string
  lead: string
  client: string
  isDone: boolean
}

interface DataProps {
  activityType?: number
  user?: number
  client?: number
  lead?: number
  subject: string
  startDate: Dayjs
  endDate: Dayjs
  startTime: Dayjs | undefined
  endTime: Dayjs | undefined
  freeBusy: number
  notes: string
  isDone: boolean
}

export interface EventsData {
  id: number
  title: string
  type: string
  start: string
  end: string
}

export const filterTabsObj = {
  call: 'Call',
  meeting: 'Meeting',
  message: 'Message',
  email: 'Email',
}

const { Option } = Select
const { TextArea } = Input

const defaultValue: DataProps = {
  subject: '',
  startDate: dayjs(),
  user: undefined,
  client: undefined,
  lead: undefined,
  endDate: dayjs(),
  startTime: dayjs('09:00', 'HH:mm'),
  endTime: dayjs('09:30', 'HH:mm'),
  freeBusy: 1,
  notes: '',
  activityType: undefined,
  isDone: false
}

export const CreateActivity: FC<CreateActivityProps> = ({
  visible,
  onCancel,
  events,
  handleSave,
  isEdit = false,
  editData,
  leadOptions = [],
  clientOptions = [],
  userOptions = [],
  activityTypeOption = [],
  loggedUser,
}) => {
  const { t } = useTranslation('common')
  // const [activeActivityType, setActiveActivityType] = useState<number>()
  const [activityTypes, setActivityTypes] = useState<ActivityTypeFilter[]>()
  const [initialValue, setInitialValue] = useState<DataProps>(defaultValue)
  const isMobile = useMedia('(max-width: 768px)', false)
  // const [selectedUser, setSelectedUser] = useState('William Brandham (You)')
  const [selectedLead, setSelectedLead] = useState<string>('')
  const [selectedClient, setSelectedClient] = useState<string>('')
  const [isDone, setIsDone] = useState(false)
  const [visibleDrawer, setVisibleDrawer] = useState(false)
  const [defaultCalenderDate, setDefaultCalenderDate] = useState<Date>(
    new Date()
  )

  const [addMutation, { data, loading }] = useCreateOneActivityMutation()
  console.log('activityTypeOption----------------', activityTypeOption)

  useEffect(() => {
    if (activityTypeOption?.length > 0) {
      setActivityTypes([...activityTypeOption])
      // setActiveActivityType(activityTypeOption?.[0]?.name)
    }
  }, [activityTypeOption])

  useEffect(() => {
    if (isEdit && editData) {
      const {
        subject,
        startDate,
        endDate,
        startTime,
        endTime,
        freeBusy,
        notes,
      } = editData
      setInitialValue({
        subject,
        startDate,
        endDate,
        startTime,
        endTime,
        freeBusy,
        notes,
        isDone: false
      })
      setDefaultCalenderDate(dayjs(startDate, 'D MMMM YYYY hh:mm').toDate())
      editData.client && setSelectedClient(editData.client as never)
      // editData?.user && setSelectedUser(editData.user as never)
      editData?.lead && setSelectedLead(editData.lead as never)
    } else {
      setInitialValue({
        subject: '',
        startDate: dayjs(),
        endDate: dayjs(),
        startTime: dayjs('09:00', 'HH:mm'),
        endTime: dayjs('09:30', 'HH:mm'),
        freeBusy: 1,
        notes: '',
        activityType: activityTypeOption?.[0]?.id,
        user: loggedUser?.id,
        isDone: false,
        client: undefined,
        lead: undefined
      })
    }
  }, [editData, isEdit, activityTypeOption])

  const toggleDrawer = () => {
    setVisibleDrawer((e) => !e)
  }

  const handleCancel = () => {
    onCancel?.()
    setInitialValue({
      subject: '',
      startDate: dayjs(),
      endDate: dayjs(),
      startTime: undefined,
      endTime: undefined,
      freeBusy: 1,
      notes: '',
      isDone: false,
      activityType: undefined
    })
    // setSelectedUser('William Brandham (You)')
    setSelectedClient('')
    setSelectedLead('')
  }

  const renderTooltip = ({ title, icon }) => {
    return <Tooltip title={title}>{icon}</Tooltip>
  }

  const DebounceSelect = ({
    fetchOptions,
    debounceTimeout = 400,
    isPrefixIcon = false,
    prefixIcon,
    ...props
  }) => {
    const [fetching, setFetching] = React.useState(false)
    const [options, setOptions] = React.useState(fetchOptions)
    const [search, setSearch] = React.useState('')
    const fetchRef = React.useRef(0)

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
            return option.value.toLowerCase().indexOf(value.toLowerCase()) >= 0
          })
          setOptions(newOptions)
          setFetching(false)
        }, 500)
      }

      return debounce(loadOptions, debounceTimeout)
    }, [fetchOptions, debounceTimeout])

    return (
      <div>
        {isPrefixIcon && prefixIcon}
        <Select
          {...props}
          onSearch={debounceFetcher}
          notFoundContent={fetching ? <Spin size="small" /> : null}
          onClick={() => setOptions(fetchOptions)}
        >
          {options.map((item, index) => (
            <Option key={index} value={item.value}>
              <Highlighter
                highlightClassName={styles.highlight}
                searchWords={[search]}
                textToHighlight={item.name}
              >
                {item.name}
              </Highlighter>
            </Option>
          ))}
        </Select>
      </div>
    )
  }
  console.log('initial values------------------', initialValue)

  return (
    <div>
      <BasicModal
        modalWidth={926}
        title={!isMobile && t('activityList.createActivity')}
        visible={visible}
        onCancel={handleCancel}
        className={styles.activityModal}
        footer={false}
        closable={isMobile ? false : true}
        modalBodyClass={isMobile ? styles.modalBodyClass : ''}
      >
        <Formik
          initialValues={initialValue}
          enableReinitialize={true}
          validationSchema={Yup.object().shape({
            subject: Yup.string()
              .required(t('create.activity.modal.subject.required'))
              .max(50, t('create.activity.modal.subject.max.validation.message')),
          })}
          onSubmit={async (values, { resetForm }) => {
            // await handleSave?.(values)
            console.log('Hello submit', values)
            const data = {
              "ActivityType": {
                "connect": {
                  "id": values?.activityType
                }
              },
              "subject": values?.subject,
              "note": values?.notes,
              "available": Boolean(values?.freeBusy),
              "status": "pending",
              "due_start_date": values?.startTime,
              "due_end_date": values?.endTime,
              "Company": {},
              "User": {},
              "AssignedUser": {
                "connect": {
                  "id": values?.user
                }
              },
              "CmContact": {
                "connect": {
                  "ID": values?.client
                }
              },
              "CmLead": {
                "connect": {
                  "ID": values?.lead
                }
              },
            }
            if (!values?.lead) {
              delete data.CmLead
            }
            if (!values?.client) {
              delete data.CmContact
            }
            if (!values?.user) {
              delete data.AssignedUser
            }
            console.log('data----------------', data)
            await addMutation({
              variables: {
                data
              }
            })
            resetForm()
          }}
        >
      {({ setFieldValue, values, resetForm }) => (
        <Form layout="vertical">
        <div className={styles.headerWrapper}>
          {isMobile && (
            <div className={styles.mobileMenu}>
              <div>
                <LeftOutlined onClick={onCancel} />
                <span>{t('activityList.createActivity')}</span>
              </div>
              <div>
                <MenuOutlined onClick={toggleDrawer} />
              </div>
            </div>
          )}
          <div className={styles.subHeader}>
            <div className={styles.subHeaderLeft}>
              {activityTypes?.map((item) => (
              <div
                onClick={() => setFieldValue('activityType', item.id)}
                className={classNames({
                  [styles.active]: values.activityType === item.id,
                })}
              >
                {item.icon && renderTooltip({
                  title: item.name,
                  icon: React.createElement(Icon?.[item.icon]),
                })}
              </div>
              ))}
            </div>
          </div>
          {!isMobile && (
            <div className={styles.userName}>
              <Avatar name={loggedUser?.name} src={loggedUser?.image}/>
              <span className={styles.userText}>{t('create.activity.user.name', {
                        name: loggedUser?.name
                      })}</span>
            </div>
          )}
        </div>
        <div className={styles.mainContentWrapper}>
          <div className={styles.mainContent}>
            <div className={styles.inputText}>
              <FontColorsOutlined />
              <Form.Item name={'subject'}>
              <FormikInput
                name="subject"
                autoFocus={true}
                // value={data.subject}
                // onChange={(e) => handleDataChange('subject', e.target.value)}
                placeholder={activityTypes?.find((item) => item.id === values.activityType)?.name}
              />
              </Form.Item>
            </div>
            <div
              className={classNames(styles.widgetTool, styles.mobDeviceWidget)}
            >
              <ClockCircleOutlined />
              <div className={styles.dateGroup}>
                <DatePicker
                  format={'DD-MM-YYYY'}
                  value={values?.startDate || null}
                  onChange={(date) => setFieldValue('startDate', date)}
                  allowClear={false}
                />
                <div className={styles.timeInput}>
                  <TimePicker
                    format={'HH:mm'}
                    placeholder={'HH:mm'}
                    value={values?.startTime}
                    onChange={(value) => setFieldValue('startTime', value)}
                  />
                </div>
                <span className={styles.dashTag}>-</span>
                <div className={classNames(styles.timeInput, styles.mobInput)}>
                  <TimePicker
                    format={'HH:mm'}
                    placeholder={'HH:mm'}
                    value={(values?.endTime || null) as never}
                    onChange={(value) => setFieldValue('endTime', value)}
                  />
                </div>
                <DatePicker
                  format={'DD-MM-YYYY'}
                  value={values?.endDate || null}
                  onChange={(date) => setFieldValue('endDate', date)}
                  allowClear={false}
                />
              </div>
            </div>
            <div className={styles.widgetTool}>
              <BlockOutlined />
              <Select
                style={{ width: 200 }}
                value={values?.freeBusy}
                onChange={(val) => setFieldValue('freeBusy', val)}
              >
                {[
                  { name: t('createActivity.select.free'), value: 1 },
                  { name: t('createActivity.select.busy'), value: 0 },
                ].map((item) => {
                  return (
                    <Option key={item.value} value={item.value}>
                      {item.name}
                    </Option>
                  )
                })}
              </Select>
              <Tooltip title={t('create.activity.modal.free.busy.tooltip')}>
              <QuestionCircleOutlined />
              </Tooltip>
            </div>
            <div className={styles.textAreaWrapper}>
              <div className={styles.areaInput}>
                <FileOutlined />
                <TextArea
                  rows={2}
                  value={values?.notes}
                  onChange={(e) => setFieldValue('notes', e.target.value)}
                />
              </div>
            </div>
            <div className={styles.userSelect}>
              <TeamOutlined />
              <Select
                style={{ width: 200 }}
                showSearch
                allowClear
                value={values.user}
                onChange={(val) => setFieldValue('user', val)}
              >
                {userOptions.map((item) => {
                  return (
                    <Option key={item.id} value={item.id}>
                      {item.name}
                    </Option>
                  )
                })}
              </Select>
            </div>
            <div className={styles.beautyData}>
              <span className={styles.link}>
                <LinkOutlined />
              </span>
              <div className={styles.innerContent}>
                <div className={styles.customInputText}>
                  {/* <DebounceSelect
                    allowClear
                    style={{ width: '100%' }}
                    size={'small'}
                    showArrow={false}
                    value={(selectedLead || undefined) as never}
                    placeholder={t('createActivity.select.lead.placeholder')}
                    disabled={!!selectedClient}
                    onChange={(val) => setSelectedLead(val as never)}
                    showSearch
                    fetchOptions={leadOptions}
                    isPrefixIcon={true}
                    prefixIcon={
                      <div className={styles.leadIcon}>
                        <AimOutlined />
                      </div>
                    }
                  /> */}
                  <ClientLeadSelect
                    name="lead"
                    isEdit={isEdit}
                    value={values.lead?.toString()}
                    onChange={(value) => setFieldValue('lead', value && Number.parseInt(value))}
                    icon={<AimOutlined />}
                    disabled={false}
                    className={styles.clientContent}
/>
                </div>
                <div className={styles.orClass}>{t('createActivity.or')}</div>
                <div className={styles.customInputText}>
                <ClientLeadSelect
                  name="client"
                  isEdit={isEdit}
                  value={values.client?.toString()}
                  onChange={(value) => setFieldValue('client', value && Number.parseInt(value))}
                  icon={<UserOutlined />}
                  disabled={false}
                  className={styles.clientContent}
                />
                </div>
              </div>
            </div>
            {console.log('values----------', values)}
            <div className={styles.footerActions}>
              <div className={styles.checkName}>
                <Checkbox onChange={(e) => setFieldValue('isDone', e.target.checked)} checked={values?.isDone}>
                  {t('createActivity.markAsDone')}
                </Checkbox>
              </div>
              <div className={styles.activityBtnGroup}>
                <Button onClick={handleCancel}>
                  {t('activityList.addColumn.cancel')}
                </Button>
                <SubmitButton type={'primary'}>
                  {t('activityList.addColumn.save')}
                </SubmitButton>
              </div>
            </div>
          </div>
          <div className={styles.calendar}>
            {!isMobile ? (
              <BigCalender data={events} defaultDate={defaultCalenderDate} height={'525px'}/>
            ) : (
              <Drawer
                title={
                  <div className={styles.userName}>
                    <Avatar name={loggedUser?.name} src={loggedUser?.image} />
                    <span className={styles.userText}>
                      &nbsp; {t('create.activity.user.name', {
                        name: loggedUser?.name
                      })}
                    </span>
                  </div>
                }
                placement={'right'}
                closable={true}
                onClose={toggleDrawer}
                visible={visibleDrawer}
                key={'right'}
                width={'356'}
                className={styles.calendarDrawer}
              >
                <div className={styles.bigCalEvent}>
                  <BigCalender
                    data={events}
                    defaultDate={defaultCalenderDate}
                    height={'100%'}
                  />
                </div>
              </Drawer>
            )}
          </div>
        </div>
        </Form>
      )}
      </Formik>
      </BasicModal>
    </div>
  )
}

export default CreateActivity
