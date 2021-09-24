import { inputObjectType, objectType } from 'nexus'

export const DashboardInputType = inputObjectType({
  name: 'DashboardInputType',
  definition(t) {
    t.decimal('start_date')
    t.decimal('end_date')
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

const BookingStatusDetails = objectType({
  name: 'bookingStatusCount',
  definition(t) {
    t.int('totalBooking')
    t.string('totalBookingPer')
    t.int('totalOnlineBooking')
    t.string('totalOnlineBookingPer')
    t.string('totalBookingStatusCounts')
    t.string('totalBookingCountOnline')
    t.list.field('appointmentList', { type: CountDetails })
    t.list.field('onlineAppointmentList', { type: CountDetails })
  },
})

const SalesCount = objectType({
  name: 'salesCount',
  definition(t) {
    t.int('totalSalesCounts')
    t.string('totalAvailableCategoryTypePer')
    t.int('totalAvailableCategoryTypeCount')
    t.list.field('salesList', { type: CountDetails })
  },
})

const ChartValue = objectType({
  name: 'data',
  definition(t) {
    t.string('label')
    t.int('value')
  },
})

const ChartData = objectType({
  name: 'allbooking',
  definition(t) {
    t.string('status')
    t.list.field('data', { type: ChartValue })
  },
})

const SaleChartData = objectType({
  name: 'allSales',
  definition(t) {
    t.string('status')
    t.list.field('data', { type: ChartValue })
  },
})

export const DashboardResponseType = objectType({
  name: 'getDashboardData',
  definition(t) {
    t.field('bookingStatusCount', { type: BookingStatusDetails })
    t.field('salesCount', { type: SalesCount })
    t.list.field('allbooking', { type: ChartData })
    t.list.field('allSales', { type: SaleChartData })
  },
})
