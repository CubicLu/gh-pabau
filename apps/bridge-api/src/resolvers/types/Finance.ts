import { extendType, arg, inputObjectType } from 'nexus'
import { Context } from '../../context'
import {
  retrieveSalesCount,
  retrieveSalesChartData,
  retrieveRetailSalesData,
  retrieveServiceSalesData,
  retriveOtherDetails,
} from '../../app/finance/finance'
import { FinanceResponseType } from '../../app/finance/nexus-type'

const FinanceInputTypes = inputObjectType({
  name: 'FinanceInputTypes',
  definition(t) {
    t.decimal('start_date')
    t.decimal('end_date')
    t.int('location_id')
    t.int('user_id')
  },
})

export const FinanceDetails = extendType({
  type: 'Query',
  definition(t) {
    t.field('getFinanceDetails', {
      type: FinanceResponseType,
      args: {
        data: arg({ type: FinanceInputTypes }),
      },
      async resolve(_root, { data }, ctx: Context) {
        const salesCount = await retrieveSalesCount(ctx, data)
        const allSales = await retrieveSalesChartData(ctx, data)
        const retailSales = await retrieveRetailSalesData(ctx, data)
        const serviceSales = await retrieveServiceSalesData(ctx, data)
        const otherSalesDetails = await retriveOtherDetails(ctx, data)
        return {
          salesCount: salesCount,
          allSales: allSales,
          retailSales: retailSales,
          serviceSales: serviceSales,
          otherSalesDetails: otherSalesDetails,
        }
      },
    })
  },
})
