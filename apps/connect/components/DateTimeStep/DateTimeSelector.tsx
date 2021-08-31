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
  useGetBookingsBetweeenDatesByUidQuery,
} from '@pabau/graphql'
import { useTranslationI18 } from '../../hooks/useTranslationI18'
import { decimalToISO8601 } from '../../helpers/DatesHelper'
import { useSelectedDataStore } from '../../store/selectedData'
import { SettingsContext } from '../../context/settings-context'

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
  const [selectedData, setSelectedData] = useSelectedDataStore()
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
  } = useGetBookingsBetweeenDatesByUidQuery({
    variables: {
      start_date: Number.parseInt(moment().format('YYYYMMDD000000')),
      end_date: Number.parseInt(moment().add(3, 'M').format('YYYYMMDD235959')),
      company_id: settings.id,
      user_id: selectedData.employee.ID,
    },
  })

  if (errorShifts || errorBookings) return <div>Error!</div>
  if (loadingShifts || loadingBookings) return <div>Loading...</div>

  const shiftsByDate = []
  for (const shift of shiftsResult.findManyRotaShift) {
    if (!selectedData.employee || selectedData.employee.ID === shift.uid) {
      const index = shift.start.toString().substring(0, 8)
      if (!shiftsByDate[index]) {
        shiftsByDate[index] = [shift]
      } else {
        shiftsByDate[index].push(shift)
      }
    }
  }

  const getShiftsOnDate = (date) => {
    const shiftsIndex = date.format('YYYYMMDD')
    if (shiftsByDate[shiftsIndex]?.length > 0) {
      return {
        key: shiftsIndex,
        shifts: shiftsByDate[shiftsIndex],
        morning: true,
        afternoon: true,
        evening: false,
      }
    } else {
      return false
    }
  }
  const dateCellRender = (value) => {
    const shifts = getShiftsOnDate(value)
    if (!shifts) {
      return []
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
  const dateHasShift = (date) => {
    const shiftsIndex = Number.parseInt(date.format('YYYYMMDD'))
    if (shiftsByDate[shiftsIndex]) {
      return false
    }
    return true
  }

  const dateSelectedHandler = (date) => {
    setSelectedDate(date)
  }

  const getDateTimeslots = (date) => {
    const shiftsIndex = Number.parseInt(date.format('YYYYMMDD'))
    if (!shiftsByDate[shiftsIndex]) {
      return []
    }
    const shift = shiftsByDate[shiftsIndex][0]
    const shiftStart = moment(decimalToISO8601(shift.start))
    const shiftEnd = moment(decimalToISO8601(shift.end))

    const timeslots = []
    for (
      let date = moment(shiftStart);
      date.isBefore(shiftEnd);
      date.add(15, 'minutes')
    ) {
      timeslots.push(date.format('HH:mm'))
    }

    const takenTimeslots = []
    for (const b of bookingsResult.findManyBooking.filter(
      (b) =>
        b.start_date.toString().substr(0, 8) === shiftStart.format('YYYYMMDD')
    )) {
      for (
        let apptDate = moment(decimalToISO8601(b.start_date));
        apptDate.isBefore(moment(decimalToISO8601(b.end_date)));
        apptDate.add(15, 'minutes')
      ) {
        takenTimeslots.push(apptDate.format('HH:mm'))
      }
    }

    return timeslots.filter((t) => !takenTimeslots.includes(t))
  }
  const renderTimeslots = () => {
    const timeslots = getDateTimeslots(selectedDate)
    const usedTimeslots = []
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
            {timeslots.map((val) => {
              if (val.substr(0, 2) > 11) {
                return null
              }
              return (
                <div
                  className={false ? Styles.gray : Styles.green}
                  key={val}
                  onClick={() => {
                    const hour = Number.parseInt(val.substring(0, 2))
                    const minute = Number.parseInt(val.substring(3, 5))
                    setSelectedData(
                      'SET_DATETIME',
                      moment(selectedDate).set({ hour: hour, minute: minute })
                    )
                    onSelected()
                  }}
                >
                  <p>{val}</p>
                </div>
              )
            })}
          </div>
          <div className={Styles.boxDay}>
            <p>
              <div className={Styles.after} />
              {t('connect.onlinebooking.date&time.afternoon')}
            </p>
            {timeslots.map((val) => {
              if (val.substr(0, 2) < 12 || val.substr(0, 2) > 16) {
                return null
              }
              return (
                <div
                  className={false ? Styles.gray : Styles.green}
                  key={val}
                  onClick={() => {}}
                >
                  <p>{val}</p>
                </div>
              )
            })}
          </div>
          <div className={Styles.boxDay}>
            <p>
              <div className={Styles.night} />
              {t('connect.onlinebooking.date&time.evening')}
            </p>
            {timeslots.map((val) => {
              if (val.substr(0, 2) < 17) {
                return null
              }
              return (
                <div
                  className={false ? Styles.gray : Styles.green}
                  key={val}
                  onClick={() => {}}
                >
                  <p>{val}</p>
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
              {selectedData.employee.ID === 0
                ? t('connect.onlinebooking.date&time.chooseanyone')
                : `${t('connect.onlinebooking.date&time.d&tfor')} ${
                    selectedData.employee.User.full_name
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
            {selectedData.employee.ID === 0
              ? t('connect.onlinebooking.date&time.chooseanyone')
              : `${t('conn  ect.onlinebooking.date&time.d&tfor')} ${
                  selectedData.employee.User.full_name
                } ${t('connect.onlinebooking.date&time.appointment')}`}
          </h4>
          <h4>{selectedDate.format('MMMM YYYY')}</h4>
          <Calendar
            value={selectedDate}
            dateCellRender={dateCellRender}
            onSelect={dateSelectedHandler}
            disabledDate={dateHasShift}
          />
          <h4>{moment(selectedDate).add(1, 'M').format('MMMM YYYY')}</h4>
          <Calendar
            value={moment(selectedDate).add(1, 'M')}
            dateCellRender={dateCellRender}
            onSelect={dateSelectedHandler}
            disabledDate={dateHasShift}
          />
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
