import { useState } from 'react'
import { useSelectedDataStore } from '../store/selectedData'
import moment from 'moment'
import { decimalToISO8601 } from '../helpers/DatesHelper'

export default function useShifts(shiftsResult, bookingsResult) {
  const [selectedData] = useSelectedDataStore()
  const shiftsByDate = []
  if (shiftsResult) {
    for (const shift of shiftsResult.Public_Shifts) {
      if (!selectedData.employee || selectedData.employee.ID === shift.uid) {
        const index = shift.start.toString().substring(0, 8)
        if (!shiftsByDate[index]) {
          shiftsByDate[index] = [shift]
        } else {
          shiftsByDate[index].push(shift)
        }
      }
    }
  }

  const [shifts, setShifts] = useState(shiftsByDate)

  const getShiftsOnDate = (date) => {
    const shiftsIndex = date.format('YYYYMMDD')
    if (shifts[shiftsIndex]?.length > 0) {
      return {
        key: shiftsIndex,
        shifts: shifts[shiftsIndex],
        morning: true,
        afternoon: true,
        evening: false,
      }
    } else {
      return false
    }
  }

  const dateHasShift = (date) => {
    const shiftsIndex = Number.parseInt(date.format('YYYYMMDD'))
    if (shifts[shiftsIndex]) {
      return false
    }
    return true
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
    for (const b of bookingsResult.Public_Bookings.filter(
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

  return [getShiftsOnDate, dateHasShift, getDateTimeslots]
}
