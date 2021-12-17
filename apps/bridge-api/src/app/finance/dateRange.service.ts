import dayjs from 'dayjs'

export const getPreviousDateRange = (stratDate, endDate) => {
  const start_date = dayjs(`${stratDate}`).format('DD-MM-YYYY')
  const end_date = dayjs(`${endDate}`).format('DD-MM-YYYY')
  switch (true) {
    case dayjs().startOf('day').format('DD-MM-YYYY') === start_date &&
      dayjs().endOf('day').format('DD-MM-YYYY') === end_date:
      return {
        prevStartDate: dayjs().subtract(1, 'day').format('YYYYMMDDHHmmss'),
        prevEndDate: dayjs().subtract(1, 'day').format('YYYYMMDDHHmmss'),
      }
      break
    case dayjs().subtract(1, 'day').format('DD-MM-YYYY') === start_date &&
      dayjs().subtract(1, 'day').format('DD-MM-YYYY') === end_date:
      return {
        prevStartDate: dayjs().subtract(2, 'day').format('YYYYMMDDHHmmss'),
        prevEndDate: dayjs().subtract(2, 'day').format('YYYYMMDDHHmmss'),
      }
      break
    case dayjs().day(1).format('DD-MM-YYYY') === start_date &&
      dayjs().format('DD-MM-YYYY') === end_date:
      return {
        prevStartDate: dayjs()
          .subtract(1, 'weeks')
          .day(1)
          .format('YYYYMMDDHHmmss'),
        prevEndDate: dayjs()
          .subtract(1, 'weeks')
          .day(6)
          .format('YYYYMMDDHHmmss'),
      }
      break
    case dayjs().subtract(1, 'weeks').day(1).format('DD-MM-YYYY') ===
      start_date &&
      dayjs().subtract(1, 'weeks').day(6).format('DD-MM-YYYY') === end_date:
      return {
        prevStartDate: dayjs()
          .subtract(2, 'weeks')
          .day(1)
          .format('YYYYMMDDHHmmss'),
        prevEndDate: dayjs()
          .subtract(2, 'weeks')
          .day(6)
          .format('YYYYMMDDHHmmss'),
      }
      break
    case dayjs().startOf('month').format('DD-MM-YYYY') === start_date &&
      dayjs().format('DD-MM-YYYY') === end_date:
      return {
        prevStartDate: dayjs()
          .subtract(1, 'month')
          .startOf('month')
          .format('YYYYMMDDHHmmss'),
        prevEndDate: dayjs()
          .subtract(1, 'months')
          .endOf('month')
          .format('YYYYMMDDHHmmss'),
      }
      break
    case dayjs().subtract(1, 'month').startOf('month').format('DD-MM-YYYY') ===
      start_date &&
      dayjs().subtract(1, 'months').endOf('month').format('DD-MM-YYYY') ===
        end_date:
      return {
        prevStartDate: dayjs()
          .subtract(2, 'month')
          .startOf('month')
          .format('YYYYMMDDHHmmss'),
        prevEndDate: dayjs()
          .subtract(2, 'months')
          .endOf('month')
          .format('YYYYMMDDHHmmss'),
      }
      break
    case dayjs().startOf('year').format('DD-MM-YYYY') === start_date &&
      dayjs().format('DD-MM-YYYY') === end_date:
      return {
        prevStartDate: dayjs()
          .subtract(1, 'year')
          .startOf('year')
          .format('YYYYMMDDHHmmss'),
        prevEndDate: dayjs()
          .subtract(1, 'year')
          .endOf('year')
          .format('YYYYMMDDHHmmss'),
      }
      break
    case dayjs().subtract(1, 'year').startOf('year').format('DD-MM-YYYY') ===
      start_date &&
      dayjs().subtract(1, 'year').endOf('year').format('DD-MM-YYYY') ===
        end_date:
      return {
        prevStartDate: dayjs()
          .subtract(2, 'year')
          .startOf('year')
          .format('YYYYMMDDHHmmss'),
        prevEndDate: dayjs()
          .subtract(2, 'year')
          .endOf('year')
          .format('YYYYMMDDHHmmss'),
      }
    default:
      return { prevStartDate: null, prevEndDate: null }
  }
}
