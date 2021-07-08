import React, { FC, useState } from 'react'
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
import {
  monthData,
  Morning,
  Afternoon,
  Evening,
} from '../../../web/mocks/connect/Datemock'
import ClassNames from 'classnames'
import { useBookingAvailableShiftsQuery } from '@pabau/graphql'

export interface DandT {
  date: boolean
  time: boolean
}
export interface P {
  employeeID: number
  onSelectedTimeslot: (dateTime: moment.Moment) => void
  time: string
  selectslot: (slotData) => void
  translation: (val: string) => string
  dateVal: moment.Moment
  oldValue: DandT
}

const DateTimeSelector: FC<P> = ({
  employeeID,
  time,
  selectslot,
  translation,
  dateVal,
  oldValue,
}) => {
  // CRAP
  const dateData = moment()
  const newDate = dateData.toDate()
  const date = moment(newDate).format('YYYY-MM-DD')
  const dateValue = moment(date)
  const [dnt, setDnt] = useState(dateValue)
  const [selV, setselV] = useState(oldValue.date ? true : false)

  const [mdisplay, setmdisplay] = useState(true)
  const [calcount, setcalcount] = useState(1)
  const isMobile = useMedia('(max-width: 768px)', false)
  const [finaldate, setfinal] = useState(oldValue.date && dateVal)
  const setevent = (event): boolean => {
    if (event === 'mor') {
      for (const itm of monthData) {
        if (itm.date === moment(finaldate).date()) {
          return itm.morning
        }
      }
    }
    if (event === 'aft') {
      for (const itm of monthData) {
        if (itm.date === moment(finaldate).date()) {
          return itm.afternoon
        }
      }
    }
    if (event === 'eve') {
      for (const itm of monthData) {
        if (itm.date === moment(finaldate).date()) {
          return itm.evening
        }
      }
    }
    return false
  }
  const [mor, setmor] = useState(oldValue.date ? setevent('mor') : false)
  const [after, setafter] = useState(oldValue.date ? setevent('aft') : false)
  const [eve, seteve] = useState(oldValue.date ? setevent('eve') : false)
  const [monthdnt, setmonthdnt] = useState(
    moment(dnt, 'YYYY-MM-DD').add(1, 'month')
  )
  const [twomonthdnt, settwomonthdnt] = useState(
    moment(dnt, 'YYYY-MM-DD').add(2, 'month')
  )
  const data = {
    name: 'Nenad Jovanovski',
  }

  // FIXED
  const [selectedDate, setSelectedDate] = useState(moment())

  const {
    loading: loadingShifts,
    error: errorShifts,
    data: shiftsResult,
  } = useBookingAvailableShiftsQuery({
    variables: {
      company_id: 8021,
      shift_start: Number.parseInt(selectedDate.format('YYYYMMDD000000')),
      shift_end: Number.parseInt(moment().add(3, 'M').format('YYYYMMDD235959')),
    },
  })

  if (errorShifts) return <div>Error!</div>
  if (loadingShifts) return <div>Loading...</div>

  const shiftsByDate = []
  for (const shift of shiftsResult.rotaShifts) {
    if (employeeID === 0 || employeeID === shift.uid) {
      const index = shift.start.toString().substring(0, 8)
      if (!shiftsByDate[index]) {
        shiftsByDate[index] = [shift]
      } else {
        shiftsByDate[index].push(shift)
      }
    }
  }

  const firstmonth = (e) => {
    // console.log(e.month())
    Check(e.date())
    if (
      (dateobj.morning || dateobj.afternoon || dateobj.evening) &&
      e.month() === dnt.month()
    ) {
      console.log(e.month() === dnt.month())
      console.log(dnt.month())
      setselV(true)
      setDnt(e)
      setfinal(e)
      setmor(dateobj.morning)
      setafter(dateobj.afternoon)
      seteve(dateobj.evening)
    }
  }
  const secondmonth = (e) => {
    //console.log(e.date())
    Check(e.date())
    if (
      (dateobj.morning || dateobj.afternoon || dateobj.evening) &&
      e.month() === monthdnt.month()
    ) {
      console.log(e.month())
      console.log(monthdnt.month())
      setselV(true)
      setmonthdnt(e)
      setfinal(e)
      //console.log(dateobj.morning)
      setmor(dateobj.morning)
      setafter(dateobj.afternoon)
      seteve(dateobj.evening)
    }
  }
  const thirdmonth = (e) => {
    // console.log(e.date())
    Check(e.date())
    if (
      (dateobj.morning || dateobj.afternoon || dateobj.evening) &&
      e.month() === twomonthdnt.month()
    ) {
      console.log(e.month())
      console.log(twomonthdnt.month())
      setselV(true)
      settwomonthdnt(e)
      setfinal(e)
      setmor(dateobj.morning)
      setafter(dateobj.afternoon)
      seteve(dateobj.evening)
    }
  }
  const dateobj = {
    morning: false,
    afternoon: false,
    evening: false,
    name: '',
    description: '',
    charges: '',
    image: '',
    time: 0,
    date: null,
  }
  const Check = (da) => {
    const check = monthData.find((d) => d.date === da)
    if (check) {
      //console.log(check.date)
      dateobj.morning = check.morning
      dateobj.afternoon = check.afternoon
      dateobj.evening = check.evening
      return true
    } else {
      //console.log('------------')
      dateobj.morning = false
      dateobj.afternoon = false
      dateobj.evening = false
      return false
    }
  }

  const getShiftsOnDate = (date) => {
    const shiftsIndex = date.format('YYYYMMDD')
    if (shiftsByDate[shiftsIndex]?.length > 0) {
      return {
        key: shiftsIndex,
        shifts: shiftsByDate[shiftsIndex],
        morning: true,
        afternoon: false,
        evening: true,
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
    const shiftsIndex = date.format('YYYYMMDD')
    if (shiftsByDate[shiftsIndex]) {
      return true
    }
    return false
  }
  const chooseSelect = (dat) => {
    dateobj.time = dat.time
    dateobj.name = dat.name
    dateobj.description = dat.description
    dateobj.charges = dat.charges + ''
    dateobj.image = dat.image
    dateobj.date = finaldate
    selectslot(dateobj)
  }
  const cellrender = () => {
    return (
      <div className={Styles.scheduleWrap}>
        <div className={Styles.btnDate}>
          {`
                  ${moment(finaldate).format('DD')}th
                ${moment(finaldate).format('MMMM')}
                ${moment(finaldate).format('YYYY')}`}
          {isMobile && (
            <button
              className={Styles.closeicon}
              onClick={() => {
                setmdisplay(true)
                setselV(false)
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
              {translation('connect.onlinebooking.date&time.morning')}
            </p>
            {Morning.map((val) => (
              <div
                className={ClassNames(
                  mor
                    ? oldValue.time
                      ? Number(time) === val.time
                        ? Styles.blue
                        : Styles.green
                      : Styles.green
                    : Styles.gray
                )}
                key={val.key}
                onClick={() => {
                  if (mor) {
                    chooseSelect(val)
                  }
                }}
              >
                <p>
                  {mor && (
                    <img
                      className={Styles.imgIcon}
                      src={val.image}
                      alt={'nothing'}
                    />
                  )}
                  {val.time < 10 ? `0${val.time}:00` : `${val.time}:00`}
                </p>
              </div>
            ))}
          </div>
          <div className={Styles.boxDay}>
            <p>
              <div className={Styles.after} />
              {translation('connect.onlinebooking.date&time.afternoon')}
            </p>
            {Afternoon.map((val) => (
              <div
                className={
                  after
                    ? oldValue.time
                      ? Number(time) === val.time
                        ? Styles.blue
                        : Styles.green
                      : Styles.green
                    : Styles.gray
                }
                key={val.key}
                onClick={() => {
                  if (after) {
                    chooseSelect(val)
                  }
                }}
              >
                <p>
                  {after && (
                    <img
                      className={Styles.imgIcon}
                      src={val.image}
                      alt={'nothing'}
                    />
                  )}
                  {val.time < 10 ? `0${val.time}:00` : `${val.time}:00`}
                </p>
              </div>
            ))}
          </div>
          <div className={Styles.boxDay}>
            <p>
              {' '}
              <div className={Styles.night} />
              {translation('connect.onlinebooking.date&time.evening')}
            </p>
            {Evening.map((val) => (
              <div
                className={
                  eve
                    ? oldValue.time
                      ? Number(time) === val.time
                        ? Styles.blue
                        : Styles.green
                      : Styles.green
                    : Styles.gray
                }
                key={val.key}
                onClick={() => {
                  if (eve) {
                    chooseSelect(val)
                  }
                }}
              >
                <p>
                  {eve && (
                    <img
                      className={Styles.imgIcon}
                      src={val.image}
                      alt={'nothing'}
                    />
                  )}
                  {val.time < 10 ? `0${val.time}:00` : `${val.time}:00`}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
  const datarender = () => {
    return (
      <div className={Styles.scheduleWrap}>
        <div className={Styles.btnDate}>
          {`
                  ${moment(finaldate).format('DD')}th
                ${moment(finaldate).format('MMMM')}
                ${moment(finaldate).format('YYYY')}`}
          {isMobile && (
            <button
              className={Styles.closeicon}
              onClick={() => {
                setmdisplay(true)
                setselV(false)
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
              {translation('connect.onlinebooking.date&time.morning')}
            </p>
            {Morning.map((val) => (
              <div
                className={
                  mor
                    ? oldValue.time
                      ? Number(time) === val.time
                        ? Styles.blue
                        : Styles.green
                      : Styles.green
                    : Styles.gray
                }
                key={val.key}
                onClick={() => {
                  if (mor) {
                    chooseSelect(val)
                    // empSelect(val)
                  }
                }}
              >
                {console.log(mor)}
                <p>{val.time < 10 ? `0${val.time}:00` : `${val.time}:00`}</p>
              </div>
            ))}
          </div>
          <div className={Styles.boxDay}>
            <p>
              <div className={Styles.after} />
              {translation('connect.onlinebooking.date&time.afternoon')}
            </p>
            {Afternoon.map((val) => (
              <div
                className={
                  after
                    ? oldValue.time
                      ? Number(time) === val.key
                        ? Styles.blue
                        : Styles.green
                      : Styles.green
                    : Styles.gray
                }
                key={val.key}
                onClick={() => {
                  if (after) {
                    chooseSelect(val)
                    // empSelect(val)
                  }
                }}
              >
                <p>{val.time < 10 ? `0${val.time}:00` : `${val.time}:00`}</p>
              </div>
            ))}
          </div>
          <div className={Styles.boxDay}>
            <p>
              <div className={Styles.night} />
              {translation('connect.onlinebooking.date&time.evening')}
            </p>
            {Evening.map((val) => (
              <div
                className={
                  eve
                    ? oldValue.time
                      ? Number(time) === val.time
                        ? Styles.blue
                        : Styles.green
                      : Styles.green
                    : Styles.gray
                }
                key={val.key}
                onClick={() => {
                  if (eve) {
                    chooseSelect(val)
                    //empSelect(val)
                  }
                }}
              >
                <p>{val.time < 10 ? `0${val.time}:00` : `${val.time}:00`}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
  const defaultrender = () => {
    return (
      <div className={Styles.emptyData}>
        <button className={Styles.btnDate}>
          {moment(dnt).format('MMMM')} {moment(dnt).format('YYYY')}
        </button>
        <div className={Styles.org}>
          <div className={Styles.boxDay}>
            <p>
              <div className={Styles.mor} />{' '}
              {translation('connect.onlinebooking.date&time.morning')}
            </p>
          </div>
          <div className={Styles.boxDay}>
            <p>
              <div className={Styles.after} />{' '}
              {translation('connect.onlinebooking.date&time.afternoon')}
            </p>
          </div>
          <div className={Styles.boxDay}>
            <p>
              <div className={Styles.night} />{' '}
              {translation('connect.onlinebooking.date&time.evening')}
            </p>
          </div>
        </div>
        <div className={Styles.datePikerWrap}>
          <CalendarOutlined />
          <p>{translation('connect.onlinebooking.date&time.description')}</p>
        </div>
      </div>
    )
  }
  const mobiledates = (month) => {
    if (month === 'fr') {
      if (dnt.month() === moment(finaldate).month()) {
        return moment(finaldate)
      } else {
        return dnt
      }
    }
    if (month === 'se') {
      if (monthdnt.month() === moment(finaldate).month()) {
        return moment(finaldate)
      } else {
        return monthdnt
      }
    }
    if (month === 'th') {
      if (twomonthdnt.month() === moment(finaldate).month()) {
        return moment(finaldate)
      } else {
        return twomonthdnt
      }
    }
    return dnt
  }

  return (
    <div className={Styles.calanderWrapper}>
      {isMobile ? (
        mdisplay && (
          <div className={Styles.content}>
            <h4 className={Styles.headTitle}>
              {employeeID === 0
                ? translation('connect.onlinebooking.date&time.chooseanyone')
                : `${translation('connect.onlinebooking.date&time.d&tfor')} ${
                    data.name
                  } ${translation(
                    'connect.onlinebooking.date&time.appointment'
                  )}`}
            </h4>
            <div className={Styles.mobileHeader}>
              <LeftOutlined
                className={calcount > 1 ? Styles.active : Styles.InActive}
                onClick={() => {
                  console.log(calcount)
                  if (calcount === 3) {
                    setcalcount(calcount - 1)
                  }
                  if (calcount === 2) {
                    setcalcount(calcount - 1)
                  }
                }}
              />
              <h4>
                {moment(
                  calcount === 1 ? dnt : calcount === 2 ? monthdnt : twomonthdnt
                ).format('MMMM')}{' '}
                {moment(dnt).format('YYYY')}
              </h4>
              <RightOutlined
                onClick={() => {
                  console.log(calcount)
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
              value={
                calcount === 1
                  ? mobiledates('fr')
                  : calcount === 2
                  ? mobiledates('se')
                  : mobiledates('th')
              }
              dateCellRender={dateCellRender}
              onSelect={(e) => {
                calcount === 1
                  ? firstmonth(e)
                  : calcount === 2
                  ? secondmonth(e)
                  : thirdmonth(e)
                setmdisplay(false)
              }}
            />
          </div>
        )
      ) : (
        <div className={Styles.content}>
          <h4 className={Styles.headTitle}>
            {employeeID === 0
              ? translation('connect.onlinebooking.date&time.chooseanyone')
              : `${translation('connect.onlinebooking.date&time.d&tfor')} ${
                  data.name
                } ${translation(
                  'connect.onlinebooking.date&time.appointment'
                )}`}
          </h4>
          <h4>{selectedDate.format('MMMM YYYY')}</h4>
          <Calendar
            value={selectedDate}
            dateCellRender={dateCellRender}
            // onSelect={(e) => firstmonth(e)}
            disabledDate={dateHasShift}
          />
          <h4>
            {moment(monthdnt).format('MMMM')} {moment(monthdnt).format('YYYY')}
          </h4>
          <Calendar
            value={
              oldValue.date
                ? monthdnt.month() === moment(finaldate).month()
                  ? moment(finaldate)
                  : monthdnt
                : monthdnt
            }
            dateCellRender={dateCellRender}
            onSelect={(e) => secondmonth(e)}
            disabledDate={(currnet) => {
              const dt = oldValue.date
                ? monthdnt.month() === moment(finaldate).month()
                  ? moment(finaldate)
                  : monthdnt
                : monthdnt
              if (dt.month() === currnet.month()) {
                return false
              } else return true
            }}
          />
          <h4>
            {moment(twomonthdnt).format('MMMM')}{' '}
            {moment(twomonthdnt).format('YYYY')}
          </h4>
          <Calendar
            value={
              oldValue.date
                ? twomonthdnt.month() === moment(finaldate).month()
                  ? moment(finaldate)
                  : twomonthdnt
                : twomonthdnt
            }
            dateCellRender={dateCellRender}
            onSelect={(e) => thirdmonth(e)}
            disabledDate={(currnet) => {
              const dt = oldValue.date
                ? twomonthdnt.month() === moment(finaldate).month()
                  ? moment(finaldate)
                  : twomonthdnt
                : twomonthdnt
              if (dt.month() === currnet.month()) {
                return false
              } else return true
            }}
          />
        </div>
      )}

      <div className={Styles.rightSide}>
        {employeeID === 0
          ? selV
            ? isMobile
              ? !mdisplay && cellrender()
              : cellrender()
            : isMobile
            ? mdisplay && defaultrender()
            : defaultrender()
          : selV
          ? isMobile
            ? !mdisplay && datarender()
            : datarender()
          : isMobile
          ? mdisplay && defaultrender()
          : defaultrender()}
      </div>
    </div>
  )
}
export default DateTimeSelector
