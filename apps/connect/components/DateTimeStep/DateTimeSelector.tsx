import React, { FC, useContext, useState } from 'react'
import Styles from './DateTimeSelector.module.less'
import { Calendar } from 'antd'
import moment from 'moment'
import { useMedia } from 'react-use'
import {
  CalendarOutlined,
  RightOutlined,
  LeftOutlined,
  CloseOutlined,
} from '@ant-design/icons'
import ClassNames from 'classnames'
import {
  useBookingAvailableShiftsQuery,
  useGetBookingsBetweenDatesByUidQuery,
  useOnlineBookableStaffQuery,
} from '@pabau/graphql'
import { useTranslationI18 } from '../../hooks/useTranslationI18'
import { useSelectedDataStore } from '../../store/selectedData'
import { SettingsContext } from '../../context/settings-context'
import useShifts from '../../hooks/useShifts'
import DefaultAvatar from '../../assets/images/default-avatar.png'
export interface P {
  onSelected: () => void
}
const DateTimeSelector: FC<P> = ({ onSelected }) => {
  // CRAP
  const [mdisplay, setmdisplay] = useState(true)
  const [calcount, setcalcount] = useState(1)
  const isMobile = useMedia('(max-width: 768px)', false)

  // FIXED
  const { t } = useTranslationI18()
  const [selectedDate, setSelectedDate] = useState(moment())
  const { selectedData, setSelectedData, actionTypes } = useSelectedDataStore()
  const settings = useContext(SettingsContext)

  const {
    loading: loadingShifts,
    error: errorShifts,
    data: shiftsResult,
  } = useBookingAvailableShiftsQuery({
    variables: {
      company_id: settings.id,
      shift_start: Number.parseInt(moment().format('YYYYMMDD000000')),
      shift_end: Number.parseInt(moment().add(3, 'M').format('YYYYMMDD235959')),
    },
  })

  const {
    loading: loadingBookings,
    error: errorBookings,
    data: bookingsResult,
  } = useGetBookingsBetweenDatesByUidQuery({
    variables: {
      start_date: Number.parseInt(moment().format('YYYYMMDD000000')),
      end_date: Number.parseInt(moment().add(3, 'M').format('YYYYMMDD235959')),
      company_id: settings.id,
      user_id: selectedData.employee
        ? selectedData.employee.Public_User.id
        : null,
    },
  })

  const {
    loading: loadingStaff,
    error: errorStaff,
    data: staffResult,
  } = useOnlineBookableStaffQuery({
    variables: {
      company_id: settings.id,
    },
  })

  const { getShiftsOnDate, dateHasShift, getDateTimeslots } = useShifts(
    shiftsResult,
    bookingsResult
  )

  if (errorShifts || errorBookings || errorStaff) return <div>Error!</div>
  if (loadingShifts || loadingBookings || loadingStaff)
    return <div>Loading...</div>

  const dateCellRender = (value) => {
    const shifts = getShiftsOnDate(value)

    if (!shifts) {
      return <div></div>
    }

    return (
      <div className={Styles.listData}>
        <div
          className={ClassNames(
            Styles.celllist,
            !(shifts.morning && shifts.afternoon && shifts.evening) &&
              Styles.xyzz
          )}
        >
          <div className={Styles.celldatap}>
            <p className={shifts.morning ? Styles.mor : Styles.white}>
              {shifts.morning}
            </p>
            <p className={shifts.afternoon ? Styles.after : Styles.white}>
              {shifts.afternoon}
            </p>
            <p className={shifts.evening ? Styles.night : Styles.white}>
              {shifts.evening}
            </p>
          </div>
        </div>
      </div>
    )
  }

  const dateSelectedHandler = (date) => {
    setSelectedDate(date)
  }

  const timeslotSelectedHandler = (t) => {
    const hour = Number.parseInt(t.slot.substring(0, 2))
    const minute = Number.parseInt(t.slot.substring(3, 5))
    setSelectedData(
      actionTypes.SET_DATETIME,
      moment(selectedDate).set({ hour: hour, minute: minute })
    )
    setSelectedData(
      actionTypes.SET_EMPLOYEE,
      staffResult.Public_Staff.find((s) => s.ID === t.staff_id)
    )
    onSelected()
  }

  const renderTimeslots = () => {
    const timeslots = getDateTimeslots(selectedDate)
    return (
      <div className={Styles.scheduleWrap}>
        <div className={Styles.btnDate}>
          {selectedDate.format('Do MMMM YYYY')}
          {isMobile && (
            <button
              className={Styles.closeicon}
              onClick={() => {
                setmdisplay(true)
              }}
            >
              <CloseOutlined />
            </button>
          )}
        </div>

        <div className={Styles.org}>
          <div className={Styles.boxDay}>
            <p>
              <div className={Styles.mor} />{' '}
              {t('connect.onlinebooking.date&time.morning')}
            </p>
            {timeslots.map((t, i) => {
              if (Number.parseInt(t.slot.substr(0, 2)) > 11) {
                return null
              }
              return (
                <div
                  className={Styles.green}
                  key={i}
                  onClick={() => timeslotSelectedHandler(t)}
                >
                  <p>
                    {!selectedData.employee && (
                      <img
                        className={Styles.imgIcon}
                        src={
                          t.image !== ''
                            ? settings.pod_url + t.image
                            : DefaultAvatar
                        }
                        title={t.full_name}
                        alt={t.full_name}
                      />
                    )}
                    {t.slot}
                  </p>
                </div>
              )
            })}
          </div>
          <div className={Styles.boxDay}>
            <p>
              <div className={Styles.after} />
              {t('connect.onlinebooking.date&time.afternoon')}
            </p>
            {timeslots.map((t, i) => {
              if (
                Number.parseInt(t.slot.substr(0, 2)) < 12 ||
                Number.parseInt(t.slot.substr(0, 2)) > 16
              ) {
                return null
              }
              return (
                <div
                  className={Styles.green}
                  key={i}
                  onClick={() => timeslotSelectedHandler(t)}
                >
                  <p>
                    {!selectedData.employee && (
                      <img
                        className={Styles.imgIcon}
                        src={
                          t.image !== ''
                            ? settings.pod_url + t.image
                            : DefaultAvatar
                        }
                        title={t.full_name}
                        alt={t.full_name}
                      />
                    )}
                    {t.slot}
                  </p>
                </div>
              )
            })}
          </div>
          <div className={Styles.boxDay}>
            <p>
              <div className={Styles.night} />
              {t('connect.onlinebooking.date&time.evening')}
            </p>
            {timeslots.map((t, i) => {
              if (Number.parseInt(t.slot.substr(0, 2)) < 17) {
                return null
              }
              return (
                <div
                  className={Styles.green}
                  key={i}
                  onClick={() => timeslotSelectedHandler(t)}
                >
                  <p>
                    {!selectedData.employee && (
                      <img
                        className={Styles.imgIcon}
                        src={
                          t.image !== ''
                            ? settings.pod_url + t.image
                            : DefaultAvatar
                        }
                        title={t.full_name}
                        alt={t.full_name}
                      />
                    )}
                    {t.slot}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  const defaultrender = () => {
    return (
      <div className={Styles.emptyData}>
        <button className={Styles.btnDate}>
          {selectedDate.format('MMMM YYYY')}
        </button>
        <div className={Styles.org}>
          <div className={Styles.boxDay}>
            <p>
              <div className={Styles.mor} />{' '}
              {t('connect.onlinebooking.date&time.morning')}
            </p>
          </div>
          <div className={Styles.boxDay}>
            <p>
              <div className={Styles.after} />{' '}
              {t('connect.onlinebooking.date&time.afternoon')}
            </p>
          </div>
          <div className={Styles.boxDay}>
            <p>
              <div className={Styles.night} />{' '}
              {t('connect.onlinebooking.date&time.evening')}
            </p>
          </div>
        </div>
        <div className={Styles.datePikerWrap}>
          <CalendarOutlined />
          <p>{t('connect.onlinebooking.date&time.description')}</p>
        </div>
      </div>
    )
  }

  return (
    <div className={Styles.calanderWrapper}>
      {isMobile ? (
        mdisplay && (
          <div className={Styles.content}>
            <h4 className={Styles.headTitle}>
              {!selectedData.employee
                ? t('connect.onlinebooking.date&time.chooseanyone')
                : `${t('connect.onlinebooking.date&time.d&tfor')} ${
                    selectedData.employee.Public_User.full_name
                  } ${t('connect.onlinebooking.date&time.appointment')}`}
            </h4>
            <div className={Styles.mobileHeader}>
              <LeftOutlined
                className={calcount > 1 ? Styles.active : Styles.InActive}
                onClick={() => {
                  if (calcount === 3) {
                    setcalcount(calcount - 1)
                  }
                  if (calcount === 2) {
                    setcalcount(calcount - 1)
                  }
                }}
              />
              <h4>{selectedDate.format('MMMM YYYY')}</h4>
              <RightOutlined
                onClick={() => {
                  if (calcount === 1) {
                    setcalcount(calcount + 1)
                  }
                  if (calcount === 2) {
                    setcalcount(calcount + 1)
                  }
                }}
              />
            </div>

            <Calendar
              value={moment()}
              dateCellRender={dateCellRender}
              onSelect={dateSelectedHandler}
            />
          </div>
        )
      ) : (
        <div className={Styles.content}>
          <h4 className={Styles.headTitle}>
            {!selectedData.employee
              ? t('connect.onlinebooking.date&time.chooseanyone')
              : `${t('connect.onlinebooking.date&time.d&tfor')} ${
                  selectedData.employee.Public_User.full_name
                } ${t('connect.onlinebooking.date&time.appointment')}`}
          </h4>
          <h4>{selectedDate.format('MMMM YYYY')}</h4>
          <Calendar
            value={selectedDate}
            dateCellRender={dateCellRender}
            onSelect={dateSelectedHandler}
            disabledDate={dateHasShift}
          />
          {/*<h4>{moment(selectedDate).add(1, 'M').format('MMMM YYYY')}</h4>*/}
          {/*<Calendar*/}
          {/*  value={moment(selectedDate).add(1, 'M')}*/}
          {/*  dateCellRender={dateCellRender}*/}
          {/*  onSelect={dateSelectedHandler}*/}
          {/*  disabledDate={dateHasShift}*/}
          {/*/>*/}
          {/*<h4>{moment(selectedDate).add(2, 'M').format('MMMM YYYY')}</h4>*/}
          {/*<Calendar*/}
          {/*  value={moment().add(2, 'M')}*/}
          {/*  dateCellRender={dateCellRender}*/}
          {/*  onSelect={dateSelectedHandler}*/}
          {/*  disabledDate={dateHasShift}*/}
          {/*/>*/}
        </div>
      )}

      <div className={Styles.rightSide}>
        {/*{employeeID === 0*/}
        {/*  ? true*/}
        {/*    ? isMobile*/}
        {/*      ? !mdisplay && cellrender()*/}
        {/*      : cellrender()*/}
        {/*    : isMobile*/}
        {/*    ? mdisplay && defaultrender()*/}
        {/*    : defaultrender()*/}
        {/*  : true*/}
        {/*  ? isMobile*/}
        {/*    ? !mdisplay && datarender()*/}
        {/*    : datarender()*/}
        {/*  : isMobile*/}
        {/*  ? mdisplay && defaultrender()*/}
        {/*  : defaultrender()}*/}
        {renderTimeslots()}
      </div>
    </div>
  )
}
export default DateTimeSelector
