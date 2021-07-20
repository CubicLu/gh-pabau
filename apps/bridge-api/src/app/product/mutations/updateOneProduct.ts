import { mutationField, nonNull, list } from 'nexus'
import { Context } from '../../../context'
import ProductService from '../../product/product-service'

export const InvProductUpdateOneMutation = mutationField(
  'updateOneInvProduct',
  {
    type: nonNull('InvProduct'),
    args: {
      where: nonNull('InvProductWhereUniqueInput'),
      data: nonNull('InvProductUpdateInput'),
      stock: list('ProductsAvailableAmountAcrossLocationsInput'),
      custom_fields: list('InvProductCustomFieldInput'),
    },
    async resolve(_root, { where, data, stock, custom_fields }, ctx: Context) {
      const service = new ProductService(ctx, where?.id)
      const product = await service.updateProduct(data, where, stock)
      if (custom_fields) {
        for (const [, { id, value }] of Object.entries(custom_fields)) {
          await ctx.prisma.cmProductCustomField.upsert({
            where: {
              unique_product_custom_field: {
                company_id: ctx.authenticated.company,
                custom_field_id: id,
                product_id: product?.id,
              },
            },
            create: {
              custom_field_value: value,
              Company: {
                connect: {
                  id: ctx.authenticated.company,
                },
              },
              CustomField: {
                connect: {
                  id: id,
                },
              },
              Product: {
                connect: {
                  id: product?.id,
                },
              },
            },
            update: {
              custom_field_value: value,
            },
          })
        }
      }
      return product
    },
  }
)
