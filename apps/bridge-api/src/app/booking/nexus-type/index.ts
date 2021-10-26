import { inputObjectType, objectType } from 'nexus'

export const DashboardInputType = inputObjectType({
  name: 'DashboardInputType',
  definition(t) {
    t.decimal('start_date')
    t.decimal('end_date')
    t.int('location_id')
    t.int('user_id')
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

const bookingsByStatus = objectType({
  name: 'allBookingChartDetails',
  definition(t) {
    t.list.field('bookingsByStatus', { type: ChartData })
  },
})

export const BookingCountResponseType = objectType({
  name: 'getBookingStatusCount',
  definition(t) {
    t.field('onlineBookingCounts', { type: OnlineBookingCounts })
    t.field('allBookingCounts', { type: AllBookingCounts })
  },
})

export const BookingDetailResponseType = objectType({
  name: 'getBookingChartDetail',
  definition(t) {
    t.field('allBookingChartDetails', { type: bookingsByStatus })
  },
})

const OnlineBookingCounts = objectType({
  name: 'onlineBookingCounts',
  definition(t) {
    t.int('totalOnlineBooking')
    t.string('totalOnlineBookingPer')
    t.list.field('onlineAppointmentList', { type: CountDetails })
  },
})

const AllBookingCounts = objectType({
  name: 'allBookingCounts',
  definition(t) {
    t.int('totalBooking')
    t.string('totalBookingPer')
    t.list.field('appointmentList', { type: CountDetails })
  },
})
