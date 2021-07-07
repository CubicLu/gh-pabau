import React, { FC, useState } from 'react'
import Styles from './datetime.module.less'
import { Calendar } from 'antd'
import moment from 'moment'
import { EmployData } from '../EmployeeStep/employ'
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
//import useWindowSize from '../../../hooks/useWindowSize'
import ClassNames from 'classnames'
//import { inspect } from 'util'

/* eslint-disable-next-line */
export interface DandT{
  date: boolean
  time: boolean
}
export interface DateTimeProps {
  time: string
  data: EmployData
  changescreen: () => void
  selectslot: (slotData) => void
  translation: (val: string) => string
  dateVal: moment.Moment
  oldValue: DandT
}
export interface DoctorType {
  key: number
  time: number
  name: string
  description: string
  charges: number
  image: any
}
const DateTime: FC<DateTimeProps> = ({
  time,
  data,
  changescreen,
  selectslot,
  translation,
  dateVal,
  oldValue,
}) => {
  const dateData = moment()
  const newDate = dateData.toDate()
  const date = moment(newDate).format('YYYY-MM-DD')
  const dateValue = moment(date)
  const [dnt, setDnt] = useState(dateValue)
  const [selV, setselV] = useState(oldValue.date ? true : false)

  const [mdisplay, setmdisplay] = useState(true)
  const [calcount, setcalcount] = useState(1)
  // const size = useWindowSize()
  const isMobile = useMedia('(max-width: 768px)', false)
  const [finaldate, setfinal] = useState(oldValue.date && dateVal)
  // console.log(oldValue.time)
  const setevent = (event): boolean => {
    console.log(oldValue.time, Number(time))
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
  // const [condate, setcondate] = useState({
  //   mor: false,
  //   after: false,
  //   eve: false,
  // })
  const [mor, setmor] = useState(oldValue.date ? setevent('mor') : false)
  const [after, setafter] = useState(oldValue.date ? setevent('aft') : false)
  const [eve, seteve] = useState(oldValue.date ? setevent('eve') : false)
  const [monthdnt, setmonthdnt] = useState(
    moment(dnt, 'YYYY-MM-DD').add(1, 'month')
  )
  const [twomonthdnt, settwomonthdnt] = useState(
    moment(dnt, 'YYYY-MM-DD').add(2, 'month')
  )

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
      // if (e.month() === dnt.month()) {
      //   console.log(e.month() === dnt.month())
      //   console.log(dnt.month())
      //   setselV(true)
      //
      //   setDnt(e)
      //   setfinal(e)
      //   setmor(dateobj.morning)
      //   setafter(dateobj.afternoon)
      //   seteve(dateobj.evening)
      // } else {
      //   setDnt(dnt)
      //   setfinal(finaldate)
      //   setmor(mor)
      //   setafter(after)
      //   seteve(eve)
      // }
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

  const getListData = (value) => {
    let listData = []
    const v = Check(value.date())
    if (v) {
      listData = [
        {
          key: 1,
          morning: dateobj.morning,
          afternoon: dateobj.afternoon,
          evening: dateobj.evening,
        },
      ]
      return listData
    } else {
      return []
    }
  }
  const dateCellRender = (value) => {
    const listData = getListData(value)
    // console.log(listData)
    return (
      <div className={Styles.listData}>
        {listData.map((item) => (
          <>
            <div
              className={ClassNames(
                Styles.celllist,
                !(item.morning && item.afternoon && item.evening) && Styles.xyzz
              )}
            >
              <div className={Styles.celldatap}>
                <p className={item.morning ? Styles.mor : Styles.white}>
                  {item.morning}
                </p>
                <p className={item.afternoon ? Styles.after : Styles.white}>
                  {item.afternoon}
                </p>
                <p className={item.evening ? Styles.night : Styles.white}>
                  {item.evening}
                </p>
              </div>
            </div>

            {/*{item.morning && (*/}
            {/*  <p className={item.morning ? Styles.mor : null}>{item.morning}</p>*/}
            {/*)}*/}
            {/*{item.afternoon && (*/}
            {/*  <p className={item.afternoon ? Styles.after : null}>*/}
            {/*    {item.afternoon}*/}
            {/*  </p>*/}
            {/*)}*/}
            {/*{item.evening && (*/}
            {/*  <p className={item.evening ? Styles.night : null}>*/}
            {/*    {item.evening}*/}
            {/*  </p>*/}
            {/*)}*/}
          </>
        ))}
      </div>
    )
  }
  // const empSelect = (dat) => {
  //   dateobj.time = dat.time
  //   dateobj.name = data.name
  //   dateobj.description = data.description
  //   dateobj.charges = data.charges + ''
  //   dateobj.image = data.image
  //   dateobj.date = dnt
  //   selectslot(dateobj)
  //   changescreen()
  //   //console.log(dat.time)
  // }
  const chooseSelect = (dat) => {
    dateobj.time = dat.time
    dateobj.name = dat.name
    dateobj.description = dat.description
    dateobj.charges = dat.charges + ''
    dateobj.image = dat.image
    dateobj.date = finaldate
    selectslot(dateobj)
    changescreen()
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
              {data.name === 'Choose anyone'
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
              // disabledDate={(currnet)=>{
              //   return false
              // }}
            />
          </div>
        )
      ) : (
        <div className={Styles.content}>
          <h4 className={Styles.headTitle}>
            {data.name === 'Choose anyone'
              ? translation('connect.onlinebooking.date&time.chooseanyone')
              : `${translation('connect.onlinebooking.date&time.d&tfor')} ${
                  data.name
                } ${translation(
                  'connect.onlinebooking.date&time.appointment'
                )}`}
          </h4>
          <h4>
            {moment(dnt).format('MMMM')} {moment(dnt).format('YYYY')}
          </h4>
          <Calendar
            value={
              oldValue.date
                ? dnt.month() === moment(finaldate).month()
                  ? moment(finaldate)
                  : dnt
                : dnt
            }
            dateCellRender={dateCellRender}
            onSelect={(e) => firstmonth(e)}
            disabledDate={(currnet) => {
              const dt = oldValue.date
                ? dnt.month() === moment(finaldate).month()
                  ? moment(finaldate)
                  : dnt
                : dnt
              if (dt.month() === currnet.month()) {
                return false
              } else return true
            }}
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
        {
          data.name === 'Choose anyone'
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
            : defaultrender()
          // <div className={Styles.emptyData}>
          //   <button className={Styles.btnDate}>
          //     {moment(dnt).format('MMMM')} {moment(dnt).format('YYYY')}
          //   </button>
          //   <div className={Styles.org}>
          //     <div className={Styles.boxDay}>
          //       <p>
          //         <div className={Styles.mor} />{' '}
          //         {translation('connect.onlinebooking.date&time.morning')}
          //       </p>
          //     </div>
          //     <div className={Styles.boxDay}>
          //       <p>
          //         <div className={Styles.after} />{' '}
          //         {translation('connect.onlinebooking.date&time.afternoon')}
          //       </p>
          //     </div>
          //     <div className={Styles.boxDay}>
          //       <p>
          //         <div className={Styles.night} />{' '}
          //         {translation('connect.onlinebooking.date&time.evening')}
          //       </p>
          //     </div>
          //   </div>
          //   <div className={Styles.datePikerWrap}>
          //     <CalendarOutlined />
          //     <p>
          //       {translation('connect.onlinebooking.date&time.description')}
          //     </p>
          //   </div>
          // </div>
        }
      </div>
    </div>
  )
}
export default DateTime
