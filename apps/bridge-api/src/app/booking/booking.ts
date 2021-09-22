import { Context } from '../../context'
import { DateRangeInput } from '../../resolvers/types/Dashboard'
import dayjs from 'dayjs'
import { weekList, dayList, monthList } from './mock'
import { groupBy, uniqBy } from 'lodash'

export const retrieveBookingStatuses = async (
  ctx: Context,
  data: DateRangeInput
) => {
  const bookingStatusCount = await ctx.prisma.booking.groupBy({
    by: ['status'],
    where: {
      NOT: [{ Contact: null }],
      start_date: { gte: data.start_date },
      status: { not: '' },
      end_date: { lte: data.end_date },
      Online: { not: data.is_active },
    },
    _count: {
      id: true,
    },
  })
  const onlineBookingStatusCount = await ctx.prisma.booking.groupBy({
    by: ['status'],
    where: {
      NOT: [{ Contact: null }],
      status: { not: '' },
      start_date: { gte: data.start_date },
      end_date: { lte: data.end_date },
      Online: { equals: data.is_active },
    },
    _count: {
      id: true,
    },
  })
  const totalBookingStatusCount = await ctx.prisma.booking.aggregate({
    where: {
      Online: { not: data.is_active },
    },
    _count: {
      id: true,
    },
  })
  const totalOnlineBookingStatusCount = await ctx.prisma.booking.aggregate({
    where: {
      Online: { equals: data.is_active },
    },
    _count: {
      id: true,
    },
  })

  const onlineAppointment = []
  const appointment = []

  if (bookingStatusCount) {
    bookingStatusCount?.map((item) => {
      if (item.status !== '') {
        appointment.push({
          label: item.status,
          count: item._count.id,
          per:
            (
              ((item._count.id ?? 0) * 100) /
              (totalBookingStatusCount?._count?.id ?? 0)
            ).toFixed(2) + '%',
        })
      }
      return item
    })
  }
  if (onlineBookingStatusCount) {
    onlineBookingStatusCount?.map((item) => {
      if (item.status !== '') {
        onlineAppointment.push({
          label: item.status,
          count: item._count.id,
          per:
            (
              ((item._count.id ?? 0) * 100) /
              (totalOnlineBookingStatusCount?._count?.id ?? 0)
            ).toFixed(2) + '%',
        })
      }
      return item
    })
  }

  return {
    totalBooking: bookingStatusCount?.reduce((prev, cur) => {
      return prev + cur._count.id ?? 0
    }, 0), // total bookings for only required status
    totalBookingPer: `${(
      (bookingStatusCount?.reduce((prev, cur) => {
        return prev + cur._count.id ?? 0
      }, 0) *
        100) /
        totalBookingStatusCount?._count?.id ?? 0
    ).toFixed(2)}%`,
    totalOnlineBooking: onlineBookingStatusCount?.reduce((prev, cur) => {
      return prev + cur._count.id ?? 0
    }, 0), // total online bookings for only required status
    totalOnlineBookingPer: `${(
      (onlineBookingStatusCount?.reduce((prev, cur) => {
        return prev + cur._count.id ?? 0
      }, 0) *
        100) /
        totalOnlineBookingStatusCount?._count?.id ?? 0
    ).toFixed(2)}%`,
    totalBookingStatusCounts: totalBookingStatusCount?._count?.id, // total bookings
    totalOnlineBookingStatusCount: totalOnlineBookingStatusCount?._count?.id, // total online bookings
    appointmentList: appointment,
    onlineAppointmentList: onlineAppointment,
  }
}

export const retrieveAllBookingData = async (
  ctx: Context,
  data: DateRangeInput
) => {
  const bookingCount = await ctx.prisma.booking.groupBy({
    by: ['status'],
    where: {
      NOT: [{ Contact: null }],
      status: { not: '' },
    },
    _count: {
      id: true,
      start_date: true,
    },
  })

  const bookingStatusCount = await ctx.prisma.booking.groupBy({
    by: ['status'],
    where: {
      NOT: [{ Contact: null }],
      start_date: { gte: data.start_date },
      status: { not: '' },
      end_date: { lte: data.end_date },
    },
    _count: {
      id: true,
      start_date: true,
    },
  })

  const bookingStatusData = await ctx.prisma.booking.findMany({
    where: {
      NOT: [{ Contact: null }],
      start_date: { gte: data.start_date },
      status: { not: '' },
      end_date: { lte: data.end_date },
    },
    select: {
      id: true,
      start_date: true,
      status: true,
    },
  })

  const bookingData = await ctx.prisma.booking.findMany({
    where: {
      NOT: [{ Contact: null }],
      status: { not: '' },
    },
    select: {
      id: true,
      start_date: true,
      status: true,
    },
  })
  const details = []

  if (bookingStatusData) {
    bookingStatusCount.map((status) => {
      const data = bookingStatusData.filter(
        (item) => item.status === status?.status
      )
      details.push({
        key: status?.status,
        values: [...new Set(data.map((item) => item.start_date))].filter(
          (item) => !!item
        ),
      })
      return status
    })
  }
  if (data.date_range === 'All records' && bookingData) {
    bookingCount.map((status) => {
      const data = bookingData.filter((item) => item.status === status?.status)
      details.push({
        key: status?.status,
        values: [...new Set(data.map((item) => item.start_date))].filter(
          (item) => !!item
        ),
      })
      return status
    })
  }
  let final = []
  if (details) {
    const DataSet = []
    if (details.length > 0) {
      details.map((record) => {
        let dataGroupByDateRange
        const endDate = dayjs(`${data.end_date}` as 'YYYYMMDDHHmmss').format(
          'YYYY-MM-DD'
        )
        const startDate = dayjs(
          `${data.start_date}` as 'YYYYMMDDHHmmss'
        ).format('YYYY-MM-DD')
        if (data.date_range === 'custom') {
          const month = dayjs(endDate).diff(startDate, 'month')
          const year = dayjs(endDate).diff(startDate, 'year')
          const week = dayjs(endDate).diff(startDate, 'week')
          const day = dayjs(endDate).diff(startDate, 'day')

          if (year > 0) {
            dataGroupByDateRange = groupByDateRange(
              record.values,
              'All records'
            )
          } else if (month > 0) {
            dataGroupByDateRange = groupByDateRange(record.values, 'This Year')
          } else if (week > 0) {
            dataGroupByDateRange = groupByDateRange(record.values, 'This Month')
          } else if (day > 0) {
            dataGroupByDateRange = groupByDateRange(record.values, 'This Week')
          }
        } else if (data.date_range === 'All records') {
          dataGroupByDateRange = groupByDateRange(record.values, 'All records')
        } else {
          dataGroupByDateRange = groupByDateRange(
            record.values,
            data.date_range
          )
        }

        DataSet.push({
          status: record?.key,
          dateRange: dataGroupByDateRange,
        })
        if (
          data.date_range === 'Last Month' ||
          data.date_range === 'This Month'
        ) {
          final = statusDataByDayMonth('This Month', DataSet, startDate)
        }

        if (
          data.date_range === 'This Year' ||
          data.date_range === 'Last Year'
        ) {
          console.log('-------abc')
          final = statusDataByDayMonth('This Year', DataSet, startDate)
        }

        if (
          data.date_range === 'This Week' ||
          data.date_range === 'Last Week' ||
          data.date_range === 'Today' ||
          data.date_range === 'Yesterday'
        ) {
          final = statusDataByDayMonth('This Week', DataSet, startDate)
        }

        if (data.date_range === 'All records') {
          final = statusDataByDayMonth('All records', DataSet, startDate)
        }
        return record
      })
    } else {
      if (
        data.date_range === 'Last Month' ||
        data.date_range === 'This Month'
      ) {
        final = [{ data: weekList }]
      }
      if (data.date_range === 'This Year' || data.date_range === 'Last Year') {
        final = [{ data: monthList }]
      }
      if (
        data.date_range === 'This Week' ||
        data.date_range === 'Last Week' ||
        data.date_range === 'Today' ||
        data.date_range === 'Yesterday'
      ) {
        final = [{ data: dayList }]
      }
    }

    //console.log('final------------', final)
  }

  return {
    bookingsByStatus: final,
  }
}

const groupByDateRange = (data, dataRange) => {
  switch (dataRange) {
    case 'All records': {
      const data1 = groupBy(data, (item) =>
        dayjs(`${item}`).startOf('year').format('YYYY')
      )
      return data1
    }
    case 'This Year': {
      const data1 = groupBy(data, (item) =>
        dayjs(`${item}`).startOf('month').format('MMM')
      )
      return data1
    }
    case 'Last Year': {
      const data1 = groupBy(data, (item) =>
        dayjs(`${item}`).startOf('month').format('MMM')
      )
      return data1
    }
    case 'This Month': {
      const data1 = groupBy(data, (item) => dayjs(`${item}`).startOf('week'))
      return data1
    }
    case 'Last Month': {
      const data1 = groupBy(data, (item) =>
        dayjs(`${item}`).startOf('week').format('YYYY-MM-DD')
      )
      return data1
    }
    case 'This Week': {
      const data1 = groupBy(data, (item) =>
        dayjs(`${item}`).startOf('day').format('ddd')
      )

      return data1
    }
    case 'Last Week': {
      const data1 = groupBy(data, (item) =>
        dayjs(`${item}`).startOf('day').format('ddd')
      )
      return data1
    }
    case 'Today': {
      const data1 = groupBy(data, (item) =>
        dayjs(`${item}`).startOf('day').format('ddd')
      )
      return data1
    }
    case 'Yesterday': {
      const data1 = groupBy(data, (item) =>
        dayjs(`${item}`).startOf('day').format('ddd')
      )
      return data1
    }
  }
}

const statusDataByDayMonth = (range, DataSet, startDate) => {
  const Final_data = []
  switch (range) {
    case 'All records':
      {
        const data = [
          ...new Set(
            DataSet.map((x) => Object.keys(x.dateRange).map((y) => y))
          ),
        ]
        const max =
          data.find(
            (x: []) => x.length === Math.max(...data.map((el: []) => el.length))
          ) ?? []
        console.log('max', max)
        DataSet.map((record) => {
          const result = []
          max?.map((item) =>
            result.push({
              label: item,
              value: 0,
            })
          )

          if (record.status) {
            if (record.dateRange) {
              Object.keys(record.dateRange).map((key) => {
                const index = result.findIndex((item) => item.label === key)
                if (index) {
                  result[index].value = record.dateRange[key].length
                }
                return key
              })
            }
            Final_data.push({
              status: record.status,
              data: result,
            })
          }
          return Final_data
        })
      }
      return uniqBy(Final_data, 'status')
      break
    case 'This Month':
      {
        const result = weekList
        if (DataSet) {
          DataSet.map((record) => {
            if (record.status) {
              if (record.dateRange) {
                Object.keys(record.dateRange).map((key) => {
                  const diff = dayjs(key).diff(startDate, 'day')
                  switch (diff) {
                    case 0:
                      result[0].value = record.dateRange[key].length
                      break
                    case 7:
                      result[1].value = record.dateRange[key].length
                      break
                    case 14:
                      result[2].value = record.dateRange[key].length
                      break
                    case 21:
                      result[3].value = record.dateRange[key].length
                      break
                    case 28:
                      result[4].value = record.dateRange[key].length
                      break
                  }
                  return result
                })
              }
              Final_data.push({
                status: record.status,
                data: result ?? [],
              })
            }
            return Final_data
          })
        }
      }
      return uniqBy(Final_data, 'status')
      break
    case 'This Week':
      {
        const result = dayList
        if (DataSet) {
          DataSet.map((record) => {
            if (record.status) {
              if (record.dateRange) {
                Object.keys(record.dateRange).map((key) => {
                  switch (key) {
                    case 'Sun':
                      result[0].value = record.dateRange[key].length
                      break
                    case 'Mon':
                      result[1].value = record.dateRange[key].length
                      break
                    case 'Tue':
                      result[2].value = record.dateRange[key].length
                      break
                    case 'Wed':
                      result[3].value = record.dateRange[key].length
                      break
                    case 'Thu':
                      result[4].value = record.dateRange[key].length
                      break
                    case 'Fri':
                      result[5].value = record.dateRange[key].length
                      break
                    case 'Sat':
                      result[6].value = record.dateRange[key].length
                      break
                  }
                  return key
                })
              }
              Final_data.push({
                status: record.status,
                data: result,
              })
            }
            return Final_data
          })
        }
      }
      return uniqBy(Final_data, 'status')
      break
    case 'This Year':
      {
        const result = monthList
        console.log('DataSet', DataSet)
        if (DataSet) {
          DataSet.map((record) => {
            if (record.status) {
              if (record.dateRange) {
                Object.keys(record.dateRange).map((key) => {
                  switch (key) {
                    case 'Jan':
                      result[0].value = record.dateRange[key].length
                      break
                    case 'Feb':
                      result[1].value = record.dateRange[key].length
                      break
                    case 'Mar':
                      result[2].value = record.dateRange[key].length
                      break
                    case 'Apr':
                      result[3].value = record.dateRange[key].length
                      break
                    case 'May':
                      result[4].value = record.dateRange[key].length
                      break
                    case 'Jun':
                      result[5].value = record.dateRange[key].length
                      break
                    case 'Jul':
                      result[6].value = record.dateRange[key].length
                      break
                    case 'Aug':
                      result[7].value = record.dateRange[key].length
                      break
                    case 'Sep':
                      result[8].value = record.dateRange[key].length
                      break
                    case 'Oct':
                      result[9].value = record.dateRange[key].length
                      break
                    case 'Nev':
                      result[10].value = record.dateRange[key].length
                      break
                    case 'Dec':
                      result[11].value = record.dateRange[key].length
                      break
                  }
                  return result
                })
              }
              Final_data.push({
                status: record.status,
                data: result ?? [],
              })
            }
            console.log('Final_data', Final_data)
            return Final_data
          })
        }
      }
      return uniqBy(Final_data, 'status')
      break
  }
}
