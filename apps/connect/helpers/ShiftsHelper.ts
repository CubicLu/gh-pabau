export const getShiftsOnDate = (shiftsByDate, date) => {
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
