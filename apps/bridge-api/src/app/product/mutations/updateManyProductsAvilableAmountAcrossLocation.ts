import { inputObjectType, intArg, list, mutationField, nonNull } from 'nexus'
import { Context } from '../../../context'
import ProductService from '../product-service'

export const ProductsAvailableAmountAcrossLocationsInput = list(
  inputObjectType({
    name: 'ProductsAvailableAmountAcrossLocationsInput',
    definition(t) {
      t.nonNull.int('id')
      t.nonNull.int('max')
    },
  })
)

export const UpdateManyProductsAvailableAmountAcrossLocation = mutationField(
  'updateManyProductsAvailableAmountAcrossLocation',
  {
    type: 'Boolean',
    description:
      'Accepts a param of product_id and an object as list of locations and max stock',
    args: {
      locations: nonNull(ProductsAvailableAmountAcrossLocationsInput),
      product_id: nonNull(intArg()),
    },
    async resolve(_root, { product_id, locations }, ctx: Context) {
      try {
        await new ProductService(ctx, product_id).updateStock(locations)
        return true
      } catch {
        return false
      }
    },
  }
)
