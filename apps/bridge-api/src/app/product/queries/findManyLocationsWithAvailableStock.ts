import { extendType, intArg, objectType } from 'nexus'
import { Context } from '../../../context'
import ProductService from '../product-service'

export const LocationsWithAvailableProductStockResult = objectType({
  name: 'FindManyLocationsWithAvailableStockResult',
  definition(t) {
    t.int('id')
    t.string('name')
    t.nullable.int('quantity')
  },
})

export const FindManyLocationsWithAvailableStock = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('findManyLocationsWithAvailableProductStock', {
      type: LocationsWithAvailableProductStockResult,
      description:
        'Fetches one inv product with the available quantity assigned to company location',
      args: {
        id: intArg(),
      },
      resolve(_root, { id }, ctx: Context) {
        return new ProductService(ctx, id).availableProductStock()
      },
    })
  },
})
