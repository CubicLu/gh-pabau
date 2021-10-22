import { inputObjectType, objectType } from 'nexus'

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

export const DashboardInputType = inputObjectType({
  name: 'DashboardInputType',
  definition(t) {
    t.float('start_date')
    t.float('end_date')
    t.int('location_id')
    t.int('user_id')
    t.float('prev_start_date')
    t.float('prev_end_date')
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
    t.list.field('appointmentList', { type: CountDetails })
    t.list.field('onlineAppointmentList', { type: CountDetails })
  },
})

const SalesCount = objectType({
  name: 'salesCount',
  definition(t) {
    t.string('totalAvailableCategoryTypePer')
    t.int('totalAvailableCategoryTypeCount')
    t.float('totalAvailableCategoryTypeAmount')
    t.list.field('salesList', { type: CountDetails })
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

const SaleChartData = objectType({
  name: 'salesByProductCategoryType',
  definition(t) {
    t.string('status')
    t.list.field('chartDataSet', { type: ChartValue })
  },
})

const bookingsByStatus = objectType({
  name: 'allbooking',
  definition(t) {
    t.list.field('bookingsByStatus', { type: ChartData })
  },
})

const salesByProductCategoryType = objectType({
  name: 'allSales',
  definition(t) {
    t.list.field('salesByProductCategoryType', { type: SaleChartData })
  },
})

const retailColumns = objectType({
  name: 'retailSalesDetails',
  definition(t) {
    t.string('name')
    t.int('units')
    t.float('value')
    t.string('per')
  },
})

const serviceColumns = objectType({
  name: 'serviceSalesDetails',
  definition(t) {
    t.string('name')
    t.int('units')
    t.float('value')
    t.string('per')
  },
})

const retailSalesData = objectType({
  name: 'retailSales',
  definition(t) {
    t.list.field('retailSalesDetails', { type: retailColumns })
  },
})

const serviceSalesData = objectType({
  name: 'serviceSales',
  definition(t) {
    t.list.field('serviceSalesDetails', { type: serviceColumns })
  },
})

const otherDashboardDetails = objectType({
  name: 'otherSalesDetails',
  definition(t) {
    t.int('newClientCount')
    t.string('avgBiller')
    t.string('RevPerhour')
  },
})

export const DashboardResponseType = objectType({
  name: 'dashboardData',
  definition(t) {
    t.field('bookingStatusCount', { type: BookingStatusDetails })
    t.field('salesCount', { type: SalesCount })
    t.field('allbooking', { type: bookingsByStatus })
    t.field('allSales', { type: salesByProductCategoryType })
    t.field('retailSales', { type: retailSalesData })
    t.field('serviceSales', { type: serviceSalesData })
    t.field('otherSalesDetails', { type: otherDashboardDetails })
  },
})
