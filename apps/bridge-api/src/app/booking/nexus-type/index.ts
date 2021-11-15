import { objectType } from 'nexus'

export const PublicBookingResponse = objectType({
  name: 'Public_Booking',
  definition(t) {
    t.int('id')
    t.float('start_date')
    t.float('end_date')
    t.int('UID')
    t.int('all_day')
    t.int('location_id')
  },
})
const CountDetails = objectType({
  name: 'CountDetails',
  definition(t) {
    t.string('label')
    t.int('count')
    t.string('per')
  },
})

const ChartValue = objectType({
  name: 'chartDataSet',
  definition(t) {
    t.string('label')
    t.int('value')
  },
})

const ChartData = objectType({
  name: 'bookingsByStatus',
  definition(t) {
    t.string('status')
    t.list.field('chartDataSet', { type: ChartValue })
  },
})

export const BookingCountResponseType = objectType({
  name: 'getBookingStatusCount',
  definition(t) {
    t.field('onlineBookingCounts', { type: BookingCounts })
    t.field('allBookingCounts', { type: BookingCounts })
  },
})

export const BookingDetailResponseType = objectType({
  name: 'getBookingChartDetail',
  definition(t) {
    t.list.field('bookingsByStatus', { type: ChartData })
  },
})

const BookingCounts = objectType({
  name: 'allBookingCounts',
  definition(t) {
    t.int('totalBooking')
    t.string('totalBookingPer')
    t.list.field('bookingList', { type: CountDetails })
  },
})
