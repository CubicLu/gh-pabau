import { mutationField, nonNull, list, inputObjectType } from 'nexus'
import { Context } from '../../../context'
import ProductService from '../product-service'
import { UniqueConstraintError } from '../../error'

export const InvProductCustomFieldInput = inputObjectType({
  name: 'InvProductCustomFieldInput',
  definition(t) {
    t.nonNull.int('id')
    t.nonNull.string('value')
  },
})

export const InvProductCreateOneMutation = mutationField(
  'createOneInvProduct',
  {
    type: nonNull('InvProduct'),
    args: {
      data: nonNull('InvProductCreateInput'),
      stock: list('ProductsAvailableAmountAcrossLocationsInput'),
      custom_fields: list('InvProductCustomFieldInput'),
    },
    async resolve(_root, { data, stock, custom_fields }, ctx: Context) {
      const existingProduct = await ctx.prisma.invProduct.findFirst({
        where: {
          OR: [
            {
              name: {
                equals: data?.name,
              },
            },
            {
              code: {
                equals: data?.code,
              },
            },
          ],
        },
      })
      if (existingProduct?.name === data?.name) {
        throw new UniqueConstraintError('name', 'InvProduct')
      }
      if (existingProduct?.code === data?.code) {
        throw new UniqueConstraintError('barcode', 'InvProduct')
      }
      const service = new ProductService(ctx)
      const product = await service.newProduct(data, stock)
      for (const [, { id, value }] of Object.entries(custom_fields)) {
        await ctx.prisma.cmProductCustomField.create({
          data: {
            company_id: ctx.authenticated.company,
            custom_field_value: value,
            custom_field_id: id,
            product_id: product?.id,
          },
        })
      }
      return product
    },
  }
)
