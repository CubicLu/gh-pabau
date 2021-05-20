import {
  CloseOutlined,
  MenuOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons'
import {
  BasicModal as RemoveModal,
  Button,
  HelpTooltip,
  TabMenu,
} from '@pabau/ui'
import { Card, Checkbox, Col, Row, Select, Typography } from 'antd'
import classNames from 'classnames'
import React, { FC, useEffect, useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { useTranslationI18 } from '../../../hooks/useTranslationI18'
import AppearanceSkeleton from './AppearanceSkeleton'
import styles from './Calendar.module.less'

const { Title } = Typography

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',

  // change background colour if dragging
  background: isDragging && '#eef7fb',
  color: isDragging && '#54b2d3',

  // styles we need to apply on draggables
  ...draggableStyle,
})

const reorder = (list, startIndex, endIndex) => {
  const result = [...list]
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)
  return result
}

interface AppearanceGeneralItemsTypes {
  type: string
  value: boolean
  help: string
  key: number
  name: string
}

interface P {
  initials?: boolean
  disable_surname?: boolean
  disable_time?: boolean
  font_size?: number
  appt_body?: string
  tooltip_body?: string
  onChange?: (data) => void
  isLoading?: boolean
}

const Appearance: FC<P> = ({
  initials = true,
  disable_surname = false,
  disable_time = true,
  font_size = 13,
  appt_body = JSON.stringify([]),
  tooltip_body = JSON.stringify([]),
  onChange,
  isLoading = true,
}) => {
  const { t } = useTranslationI18()
  const [apptData, setApptData] = useState([])
  const [tooltipData, setTooltipData] = useState([])
  const [deletingVal, setDeletingVal] = useState(null)
  const [deletingModal, setDeletingModal] = useState(false)

  const options = [
    {
      value: 13,
      label: t('settings.calendar.appearance.input.fontsize.option1'),
    },
    {
      value: 18,
      label: t('settings.calendar.appearance.input.fontsize.option2'),
    },
    {
      value: 24,
      label: t('settings.calendar.appearance.input.fontsize.option3'),
    },
  ]
  const AppearanceGeneralItems: AppearanceGeneralItemsTypes[] = [
    {
      name: 'initials',
      type: t('settings.calendar.appearance.input.staff.label'),
      value: initials,
      help: t('settings.calendar.appearance.input.staff.tooltip'),
      key: 1,
    },
    {
      name: 'disable_surname',
      type: t('settings.calendar.appearance.input.surnames.label'),
      value: disable_surname,
      help: t('settings.calendar.appearance.input.surnames.tooltip'),
      key: 2,
    },
    {
      name: 'disable_time',
      type: t('settings.calendar.appearance.input.appointment.label'),
      value: disable_time,
      help: t('settings.calendar.appearance.input.appointment.tooltip'),
      key: 3,
    },
  ]

  const apptPreviewTranslations = {
    DOB: t('settings.calendar.appearance.subheader.appointmentdisplay.dob'),
    gender: t(
      'settings.calendar.appearance.subheader.appointmentdisplay.gender'
    ),
    appt_loc: t(
      'settings.calendar.appearance.subheader.appointmentdisplay.apptloc'
    ),
    appt_note: t(
      'settings.calendar.appearance.subheader.appointmentdisplay.apptnote'
    ),
    service_price: t(
      'settings.calendar.appearance.subheader.appointmentdisplay.serviceprice'
    ),
    salutation: t(
      'settings.calendar.appearance.subheader.appointmentdisplay.salutation'
    ),
    Mobile: t(
      'settings.calendar.appearance.subheader.appointmentdisplay.mobile'
    ),
    Email: t('settings.calendar.appearance.subheader.appointmentdisplay.email'),
    MailingStreet: t(
      'settings.calendar.appearance.subheader.appointmentdisplay.mailingstreet'
    ),
    MailingCity: t(
      'settings.calendar.appearance.subheader.appointmentdisplay.mailingcity'
    ),
    MailingProvince: t(
      'settings.calendar.appearance.subheader.appointmentdisplay.mailingprov'
    ),
    MailingPostal: t(
      'settings.calendar.appearance.subheader.appointmentdisplay.mailingpost'
    ),
    insurer_name: t(
      'settings.calendar.appearance.subheader.appointmentdisplay.insurername'
    ),
    service_name: t(
      'settings.calendar.appearance.subheader.appointmentdisplay.servicename'
    ),
    employee: t(
      'settings.calendar.appearance.subheader.appointmentdisplay.employee'
    ),
    appt_duration: t(
      'settings.calendar.appearance.subheader.appointmentdisplay.apptduration'
    ),
    created_by: t(
      'settings.calendar.appearance.subheader.appointmentdisplay.createdby'
    ),
    full_name: t(
      'settings.calendar.appearance.subheader.appointmentdisplay.fullname'
    ),
    modified_by: t(
      'settings.calendar.appearance.subheader.appointmentdisplay.modified_by'
    ),
    appt_room: t(
      'settings.calendar.appearance.subheader.appointmentdisplay.apptroom'
    ),
  }

  const SortableItem = ({ value, label, type }) => {
    return (
      <div className={styles.draggableListItem}>
        <span className={styles.draggIcon}>
          <MenuOutlined />
        </span>
        <span>{label}</span>
        <span
          className={styles.crossIcon}
          onClick={() => toggleDeleteModal({ label, value, type })}
        >
          <CloseOutlined />
        </span>
      </div>
    )
  }

  useEffect(() => {
    const ApptBody = JSON.parse(appt_body)?.map((el, index) => {
      return (
        apptPreviewTranslations[`${el}`] && {
          content: (
            <SortableItem
              value={el}
              label={apptPreviewTranslations[`${el}`]}
              type="appt_body"
            />
          ),
          value: el,
          classes: ['helper'],
          id: `${el}${index}`,
        }
      )
    })
    setApptData(ApptBody.filter((el) => el !== undefined))

    const TooltipBody = JSON.parse(tooltip_body)?.map((el, index) => {
      return (
        apptPreviewTranslations[`${el}`] && {
          content: (
            <SortableItem
              value={el}
              label={apptPreviewTranslations[`${el}`]}
              type="tooltip_body"
            />
          ),
          value: el,
          classes: ['helper'],
          id: `${el}${index}`,
        }
      )
    })
    setTooltipData(TooltipBody.filter((el) => el !== undefined))
    // eslint-disable-next-line
  }, [])

  const toggleDeleteModal = (data = null) => {
    setDeletingVal(data)
    setDeletingModal((deletingModal) => !deletingModal)
  }

  const onDragEnd = (result, state, setState, previewName) => {
    if (!result.destination) {
      return
    }
    const items = reorder(state, result.source.index, result.destination.index)
    setState(items)
    const sortedVals = items?.map((el) => el.value)
    onChange?.({
      [`${previewName}`]: JSON.stringify(sortedVals),
    })
  }

  const RenderAppointmentPreviews = ({ data, setState, previewName }) => {
    return (
      <Card className={styles.appointmentTabCard}>
        <div className={styles.editBtn}>
          <Button type="default" size="middle">
            {t(
              'settings.calendar.appearance.subheader.appointmentdisplay.tabs.editbtn'
            )}
          </Button>
        </div>
        <div className={styles.appointmentsViewList}>
          <DragDropContext
            onDragEnd={(result) =>
              onDragEnd(result, data, setState, previewName)
            }
          >
            <Droppable droppableId="droppable">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {data.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                        >
                          {item.content}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
        <div className={styles.addBtn}>
          <PlusCircleOutlined /> &#160;
          <span>
            {t(
              'settings.calendar.appearance.subheader.appointmentdisplay.tabs.addbtn'
            )}
          </span>
        </div>
      </Card>
    )
  }

  const removePreview = () => {
    let data = null
    let index = -1
    if (deletingVal?.value) {
      const { value, type } = deletingVal
      switch (type) {
        case 'appt_body':
          data = [...apptData]
          index = data.findIndex((el) => el.value === value)
          if (index !== -1) {
            data.splice(index, 1)
            setApptData(data)
          }
          onChange?.({
            [`${type}`]: JSON.stringify(data.map((el) => el.value)),
          })
          break
        case 'tooltip_body':
          data = [...tooltipData]
          index = data.findIndex((el) => el.value === value)
          if (index !== -1) {
            data.splice(index, 1)
            setTooltipData(data)
          }
          onChange?.({
            [`${type}`]: JSON.stringify(data.map((el) => el.value)),
          })
          break
        default:
          return
      }
      toggleDeleteModal()
    }
  }

  return isLoading ? (
    <AppearanceSkeleton />
  ) : (
    <div className={styles.calendarSettingsAppearance}>
      <div className={styles.settingContent}>
        <Title className={styles.headerText}>
          {t('settings.calendar.appearance.title')}
        </Title>
        <span className={styles.description}>
          {t('settings.calendar.appearance.subtitle')}
        </span>
      </div>
      <div className={styles.generalControls}>
        <div className={styles.generalBlock}>
          <Title className={styles.blockText} level={4}>
            {t('settings.calendar.appearance.subheader.general')}
          </Title>
          {AppearanceGeneralItems.map((general) => {
            return (
              <div key={general.key}>
                <Checkbox
                  key={general.key}
                  checked={general.value}
                  defaultChecked={general.value}
                  onChange={(val) => {
                    if (general?.name) {
                      onChange?.({
                        [`${general.name}`]: val.target.checked ? 1 : 0,
                      })
                    }
                  }}
                >
                  <span className={styles.appointmentText}>{general.type}</span>
                </Checkbox>
                <HelpTooltip helpText={general.help} />
                <br />
              </div>
            )
          })}
        </div>
      </div>
      <div className={styles.fontControls}>
        <div className={styles.fontBlock}>
          <Title className={styles.blockText} level={4}>
            {t('settings.calendar.appearance.subheader.fontsize')}
          </Title>
          <Row>
            <Col md={8} sm={16} xs={24}>
              <Select
                className={styles.fontSizeSelect}
                placeholder={t(
                  'settings.calendar.appearance.subheader.fontsize.placeholder'
                )}
                value={
                  font_size
                    ? font_size >= 24
                      ? 24
                      : font_size >= 18
                      ? 18
                      : font_size >= 13 && 13
                    : null
                }
                defaultValue={options[0].value}
                options={options}
                onChange={(val) => {
                  onChange?.({
                    font_size: val,
                  })
                }}
              />
            </Col>
          </Row>
        </div>
      </div>
      <div
        className={classNames(styles.fontControls, styles.appointmentPreview)}
      >
        <div className={styles.fontBlock}>
          <Title className={styles.blockText} level={4}>
            {t('settings.calendar.appearance.subheader.appointmentdisplay')}
          </Title>
          <br />
          <TabMenu
            minHeight={'0vh'}
            tabPosition="top"
            menuItems={[
              `${t(
                'settings.calendar.appearance.subheader.appointmentdisplay.tabs.tab1'
              )}`,
              `${t(
                'settings.calendar.appearance.subheader.appointmentdisplay.tabs.tab2'
              )}`,
            ]}
          >
            <div className={styles.paddingDiv}>
              <RenderAppointmentPreviews
                data={apptData}
                setState={setApptData}
                previewName="appt_body"
              />
            </div>
            <div className={styles.paddingDiv}>
              <RenderAppointmentPreviews
                data={tooltipData}
                setState={setTooltipData}
                previewName="tooltip_body"
              />
            </div>
          </TabMenu>
          <RemoveModal
            modalWidth={682}
            centered={true}
            onCancel={toggleDeleteModal}
            onOk={removePreview}
            visible={deletingModal}
            title={`${t(
              'settings.calendar.appearance.subheader.appointmentdisplay.deletemodal.title'
            )} ${deletingVal?.label}`}
            newButtonText={t(
              'settings.calendar.appearance.subheader.appointmentdisplay.deletemodal.removebtn'
            )}
          >
            {deletingVal?.label
              ? `${deletingVal?.label} `
              : `${t(
                  'settings.calendar.appearance.subheader.appointmentdisplay.deletemodal.this'
                )}`}{' '}
            {t(
              'settings.calendar.appearance.subheader.appointmentdisplay.deletemodal.subtitle'
            )}
          </RemoveModal>
        </div>
      </div>
    </div>
  )
}

export default Appearance
