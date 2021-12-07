import React, { FC, useEffect, useState } from 'react'
import {
  Button,
  BasicModal,
  Avatar,
  DatePicker,
  TimePicker,
  BigCalender,
  Notification,
  NotificationType,
} from '@pabau/ui'
import { Input, Select, Checkbox, Tooltip, Drawer } from 'antd'
import classNames from 'classnames'
import {
  FontColorsOutlined,
  ClockCircleOutlined,
  BlockOutlined,
  QuestionCircleOutlined,
  LeftOutlined,
  MenuOutlined,
  TeamOutlined,
  FileOutlined,
  LinkOutlined,
} from '@ant-design/icons'
import dayjs, { Dayjs } from 'dayjs'
import { useTranslation } from 'react-i18next'
import { useMedia } from 'react-use'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { Form, Input as FormikInput, SubmitButton } from 'formik-antd'
import * as Icon from '@ant-design/icons'
import { ClientLeadSelect } from './ClientLeadSelectMenu'
import styles from './CreateActivity.module.less'
import {
  useCreateOneActivityMutation,
  Activity_Status,
  useUpdateOneActivityMutation,
} from '@pabau/graphql'
import { useUser } from '../../context/UserContext'
import { getImage } from '../Uploaders/UploadHelpers/UploadHelpers'
import { updateActivityCountCache, ActivityCountOperand } from './utils'

interface UserDetail {
  id: number
  name: string
  image?: string
  format: string
}

export interface CreateActivityProps {
  visible?: boolean
  onCancel?: () => void
  events?: EventsData[]
  handleSave?: () => void
  editData?: ActivityInitialValue
  userOptions: UserDetail[]
  activityTypeOption: ActivityTypeFilter[]
}

export interface ActivityTypeFilter {
  id: number
  name: string
  isSelected: boolean
  hasIcon?: boolean
  icon?: string
}

export interface ActivityInitialValue {
  id?: number
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

const dateFormatMapper = {
  'd/m/Y': 'DD-MM-YYYY',
  'm/d/Y': 'MM-DD-YYYY',
}

const { Option } = Select
const { TextArea } = Input

const defaultValue: ActivityInitialValue = {
  id: undefined,
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
  isDone: false,
}

export const CreateActivity: FC<CreateActivityProps> = ({
  visible,
  onCancel,
  events,
  handleSave,
  editData,
  userOptions = [],
  activityTypeOption = [],
}) => {
  const { t } = useTranslation('common')
  const loggedUser = useUser()
  const [activityTypes, setActivityTypes] = useState<ActivityTypeFilter[]>()
  const [initialValue, setInitialValue] = useState<ActivityInitialValue>(
    defaultValue
  )
  const isMobile = useMedia('(max-width: 768px)', false)

  const [visibleDrawer, setVisibleDrawer] = useState(false)
  const [defaultCalenderDate, setDefaultCalenderDate] = useState<Date>(
    dayjs().toDate()
  )

  const [addMutation] = useCreateOneActivityMutation({
    onCompleted() {
      Notification(
        NotificationType.success,
        t('create.activity.modal.success.message')
      )
    },
    update(cache, { data: { createOneActivity } }) {
      if (createOneActivity.status !== Activity_Status.Done) {
        updateActivityCountCache(cache, ActivityCountOperand.Add)
      }
    },
  })
  const [editActivity] = useUpdateOneActivityMutation({
    onCompleted() {
      Notification(
        NotificationType.success,
        t('update.activity.record.success.message')
      )
    },
    update(cache, { data: { updateOneActivity } }) {
      if (
        !initialValue.isDone &&
        updateOneActivity.status === Activity_Status.Done
      ) {
        updateActivityCountCache(cache, ActivityCountOperand.Subtract)
      } else if (
        initialValue.isDone &&
        updateOneActivity.status !== Activity_Status.Done
      ) {
        updateActivityCountCache(cache, ActivityCountOperand.Add)
      }
    },
  })

  useEffect(() => {
    if (activityTypeOption?.length > 0) {
      setActivityTypes([...activityTypeOption])
    }
  }, [activityTypeOption])

  useEffect(() => {
    if (editData?.id) {
      setInitialValue({ ...editData })
      setDefaultCalenderDate(
        dayjs(editData?.startDate, 'D MMMM YYYY hh:mm').toDate()
      )
    } else {
      setInitialValue({
        ...defaultValue,
        activityType: activityTypeOption?.[0]?.id,
        user: loggedUser?.me?.user,
      })
    }
  }, [editData, activityTypeOption, loggedUser?.me?.user])

  const toggleDrawer = () => {
    setVisibleDrawer((e) => !e)
  }

  const handleCancel = () => {
    onCancel?.()
    setInitialValue(defaultValue)
  }

  const renderTooltip = ({ title, icon }) => {
    return <Tooltip title={title}>{icon}</Tooltip>
  }

  const calculateDueTime = (date, time) => {
    return dayjs()
      .year(dayjs(date).year())
      .month(dayjs(date).month())
      .date(dayjs(date).date())
      .hour(dayjs(time).hour())
      .minute(dayjs(time).minute())
      .second(dayjs(time).second())
  }

  return (
    <div>
      <BasicModal
        modalWidth={926}
        title={
          !isMobile &&
          (initialValue?.id
            ? t('activityList.editActivity')
            : t('activityList.createActivity'))
        }
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
              .max(
                50,
                t('create.activity.modal.subject.max.validation.message')
              ),
          })}
          onSubmit={async (values, { resetForm }) => {
            const dueStartDate = calculateDueTime(
              values.startDate,
              values.startTime
            )
            const dueEndDate = calculateDueTime(values.endDate, values.endTime)
            let data
            values?.id
              ? (data = {
                  ActivityType: {
                    connect: {
                      id: values.activityType,
                    },
                  },
                  subject: {
                    set: values.subject,
                  },
                  note: {
                    set: values.notes,
                  },
                  available: {
                    set: Boolean(values.freeBusy),
                  },
                  status: {
                    set: values.isDone
                      ? Activity_Status.Done
                      : Activity_Status.Pending,
                  },
                  due_start_date: {
                    set: dueStartDate,
                  },
                  due_end_date: {
                    set: dueEndDate,
                  },
                  Company: {},
                  User: {},
                  AssignedUser: {
                    connect: {
                      id: values.user,
                    },
                  },
                  CmContact: {
                    connect: {
                      ID: values.client,
                    },
                  },
                  CmLead: {
                    connect: {
                      ID: values.lead,
                    },
                  },
                  CompletedBy: {
                    disconnect: true,
                  },
                  finished_at: {
                    set: null,
                  },
                })
              : (data = {
                  ActivityType: {
                    connect: {
                      id: values.activityType,
                    },
                  },
                  subject: values.subject,
                  note: values.notes,
                  available: Boolean(values.freeBusy),
                  status: values.isDone
                    ? Activity_Status.Done
                    : Activity_Status.Pending,
                  due_start_date: dueStartDate,
                  due_end_date: dueEndDate,
                  Company: {},
                  User: {},
                  AssignedUser: {
                    connect: {
                      id: values.user,
                    },
                  },
                  CmContact: {
                    connect: {
                      ID: values.client,
                    },
                  },
                  CmLead: {
                    connect: {
                      ID: values.lead,
                    },
                  },
                  CompletedBy: {
                    disconnect: true,
                  },
                  finished_at: null,
                })
            if (!values.lead) {
              delete data.CmLead
            }
            if (!values.client) {
              delete data.CmContact
            }
            if (!values.user) {
              delete data.AssignedUser
            }
            if (!initialValue.isDone && values.isDone) {
              data['CompletedBy'] = {
                connect: {
                  id: loggedUser?.me?.user,
                },
              }
              values.id
                ? (data['finished_at'] = {
                    set: dayjs(),
                  })
                : (data['finished_at'] = dayjs())
            } else if (initialValue.isDone && values.isDone) {
              delete data.CompletedBy
              delete data.finished_at
            }

            values?.id
              ? await editActivity({
                  variables: {
                    where: {
                      id: values.id,
                    },
                    data,
                  },
                })
              : await addMutation({
                  variables: {
                    data,
                  },
                })
            handleSave()
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
                      <span>
                        {values?.id
                          ? t('activityList.editActivity')
                          : t('activityList.createActivity')}
                      </span>
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
                        key={item.id}
                      >
                        {item.icon &&
                          renderTooltip({
                            title: item.name,
                            icon: React.createElement(Icon?.[item.icon]),
                          })}
                      </div>
                    ))}
                  </div>
                </div>
                {!isMobile && (
                  <div className={styles.userName}>
                    <Avatar
                      name={loggedUser?.me?.fullName}
                      src={
                        loggedUser?.me?.imageUrl &&
                        getImage(loggedUser?.me?.imageUrl)
                      }
                    />
                    <span className={styles.userText}>
                      {t('create.activity.user.name', {
                        name: loggedUser?.me?.fullName,
                      })}
                    </span>
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
                        placeholder={
                          activityTypes?.find(
                            (item) => item.id === values.activityType
                          )?.name
                        }
                      />
                    </Form.Item>
                  </div>
                  <div
                    className={classNames(
                      styles.widgetTool,
                      styles.mobDeviceWidget
                    )}
                  >
                    <ClockCircleOutlined />
                    <div className={styles.dateGroup}>
                      <DatePicker
                        format={
                          dateFormatMapper[loggedUser?.me?.companyDateFormat]
                        }
                        value={values?.startDate || null}
                        onChange={(date) => {
                          setFieldValue('startDate', date)
                          setDefaultCalenderDate(date.toDate())
                        }}
                        allowClear={false}
                      />
                      <div className={styles.timeInput}>
                        <TimePicker
                          format={'HH:mm'}
                          placeholder={'HH:mm'}
                          value={values?.startTime}
                          onChange={(value) =>
                            setFieldValue('startTime', value)
                          }
                        />
                      </div>
                      <span className={styles.dashTag}>-</span>
                      <div
                        className={classNames(
                          styles.timeInput,
                          styles.mobInput
                        )}
                      >
                        <TimePicker
                          format={'HH:mm'}
                          placeholder={'HH:mm'}
                          value={(values?.endTime || null) as never}
                          onChange={(value) => setFieldValue('endTime', value)}
                        />
                      </div>
                      <DatePicker
                        format={
                          dateFormatMapper[loggedUser?.me?.companyDateFormat]
                        }
                        value={values?.endDate || null}
                        onChange={(date) => setFieldValue('endDate', date)}
                        allowClear={false}
                      />
                    </div>
                  </div>
                  <div className={styles.widgetTool}>
                    <BlockOutlined className={styles.blockIcon} />
                    <Select
                      className={styles.freeSelect}
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
                    <Tooltip
                      title={t('create.activity.modal.free.busy.tooltip')}
                    >
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
                      showSearch
                      allowClear
                      value={values.user}
                      optionFilterProp="children"
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
                        <ClientLeadSelect
                          name="lead"
                          isEdit={Boolean(values?.id)}
                          value={values.lead?.toString()}
                          onChange={(value) =>
                            setFieldValue(
                              'lead',
                              value && Number.parseInt(value)
                            )
                          }
                          disabled={false}
                          className={styles.clientContent}
                        />
                      </div>
                      <div className={styles.orClass}>
                        {t('createActivity.or')}
                      </div>
                      <div className={styles.customInputText}>
                        <ClientLeadSelect
                          name="client"
                          isEdit={Boolean(values?.id)}
                          value={values.client?.toString()}
                          onChange={(value) =>
                            setFieldValue(
                              'client',
                              value && Number.parseInt(value)
                            )
                          }
                          disabled={false}
                          className={styles.clientContent}
                        />
                      </div>
                    </div>
                  </div>
                  <div className={styles.footerActions}>
                    <div className={styles.checkName}>
                      <Checkbox
                        onChange={(e) =>
                          setFieldValue('isDone', e.target.checked)
                        }
                        checked={values?.isDone}
                      >
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
                    <BigCalender
                      data={events}
                      defaultDate={defaultCalenderDate}
                      setDate={setDefaultCalenderDate}
                      height={'525px'}
                    />
                  ) : (
                    <Drawer
                      title={
                        <div className={styles.userName}>
                          <Avatar
                            name={loggedUser?.me?.fullName}
                            src={
                              loggedUser?.me?.imageUrl &&
                              getImage(loggedUser?.me?.imageUrl)
                            }
                          />
                          <span className={styles.userText}>
                            &nbsp;{' '}
                            {t('create.activity.user.name', {
                              name: loggedUser?.me?.fullName,
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
                          setDate={setDefaultCalenderDate}
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
