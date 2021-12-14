import { useSelectedDataStore } from '../store/selectedData'
import moment from 'moment'
import { decimalToISO8601 } from '../helpers/DatesHelper'
import { useContext } from 'react'
import { SettingsContext } from '../context/settings-context'

export default function useShifts(shiftsResult, bookingsResult) {
  const { selectedData } = useSelectedDataStore()
  const settings = useContext(SettingsContext)
  const shiftsByDate = []
  if (shiftsResult) {
    for (const shift of shiftsResult.Public_StaffShifts) {
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

  const employeeNumBookings = []
  if (bookingsResult) {
    for (const b of bookingsResult.Public_BookedAppointments) {
      const dateIndex = Number.parseInt(
        moment(decimalToISO8601(b.start_date)).format('YYYYMMDD')
      )
      if (!employeeNumBookings[dateIndex]) {
        employeeNumBookings[dateIndex] = []
      }

      if (employeeNumBookings[dateIndex][b.UID]) {
        employeeNumBookings[dateIndex][b.UID]++
      } else {
        employeeNumBookings[dateIndex][b.UID] = 1
      }
    }
  }

  const getShiftsOnDate = (date, duration = 60) => {
    const shiftsIndex = date.format('YYYYMMDD')
    if (shiftsByDate[shiftsIndex]?.length > 0) {
      const timeslots = getDateTimeslots(date, duration)
      const availability = timeOfDayTimeslotsAvailability(timeslots)

      return {
        key: shiftsIndex,
        shifts: shiftsByDate[shiftsIndex],
        ...availability,
      }
    } else {
      return {
        key: shiftsIndex,
        shifts: [],
        morning: false,
        afternoon: false,
        evening: false,
      }
    }
  }

  const dateHasShift = (date) => {
    const shiftsIndex = Number.parseInt(date.format('YYYYMMDD'))
    return !shiftsByDate[shiftsIndex]
  }

  const timeOfDayTimeslotsAvailability = (timeslots) => {
    const availability = {
      morning: false,
      afternoon: false,
      evening: false,
    }

    for (const t in timeslots) {
      const start_num = Number.parseInt(t.substr(0, 2))

      if (start_num < 12) {
        availability.morning = true
      }
      if (start_num >= 12 && start_num < 17) {
        availability.afternoon = true
      }
      if (start_num >= 17) {
        availability.evening = true
      }
    }

    return availability
  }

  const betterEmployeeForTimeslot = (dateIndex, employee1ID, employee2ID) => {
    if (!employeeNumBookings[dateIndex]) {
      return employee1ID
    }
    return employeeNumBookings[dateIndex][employee1ID] >
      employeeNumBookings[dateIndex][employee2ID]
      ? employee1ID
      : employee2ID
  }

  const getDateTimeslots = (date, duration = 60) => {
    const shiftsIndex = Number.parseInt(date.format('YYYYMMDD'))
    if (!bookingsResult || !shiftsByDate[shiftsIndex] || !date) {
      return []
    }

    const timeslots = []
    const shifts = shiftsByDate[shiftsIndex]
    for (const shift of shifts) {
      const shiftStart = moment(decimalToISO8601(shift.start))
      const shiftEnd = moment(decimalToISO8601(shift.end))
      const shiftMinusDuration = moment(shiftEnd).subtract(duration, 'minutes')
      for (
        const date = moment(shiftStart);
        date.isSameOrBefore(shiftMinusDuration);
        date.add(settings.BookitProGeneral.interval, 'minutes')
      ) {
        const startDateASDecimal = Number.parseInt(
          moment(date).format('YYYYMMDDHHmmss')
        )
        const endDateASDecimal = Number.parseInt(
          moment(date).add(duration, 'minutes').format('YYYYMMDDHHmmss')
        )
        const timeslotIndex = Number.parseInt(date.format('Hmm'))

        let allGood = true
        for (const g of []) {
          // THIS EMPTY FOR IS HAUNTED BY GHOSTS, IF YOU REMOVE IT YOUR APP WILL BREAK ON THE DATE STEP. TRY ME IF YOU WILL
        }

        for (const b of bookingsResult.Public_BookedAppointments?.filter(
          (b) =>
            b.start_date.toString().substr(0, 8) ===
              shiftStart.format('YYYYMMDD') && shift.Public_User.id === b.UID
        )) {
          if (
            endDateASDecimal > b.start_date &&
            startDateASDecimal < b.end_date
          ) {
            allGood = false
          }
        }

        if (allGood) {
          if (timeslots[timeslotIndex]) {
            const betterUserID = betterEmployeeForTimeslot(
              shiftsIndex,
              timeslots[timeslotIndex].user_id,
              shift.Public_User.id
            )
            if (betterUserID !== timeslots[timeslotIndex].user_id) {
              timeslots[timeslotIndex].user_id = shift.Public_User.id
              timeslots[timeslotIndex].image = shift.Public_User.image
              timeslots[timeslotIndex].full_name = shift.Public_User.full_name
            }
          } else {
            timeslots[timeslotIndex] = {
              slot: date.format('HH:mm'),
              staff_id: shift.uid,
              user_id: shift.Public_User.id,
              image: shift.Public_User.image,
              full_name: shift.Public_User.full_name,
            }
          }
        }
      }
    }

    return timeslots
  }

  return { getShiftsOnDate, dateHasShift, getDateTimeslots }
}
