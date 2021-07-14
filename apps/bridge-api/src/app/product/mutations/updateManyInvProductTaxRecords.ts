import { mutationField, nonNull, intArg } from 'nexus'
import { Context } from '../../../context'

export const UpdateManyInvProductTaxRecords = mutationField(
  'updateManyInvProductTaxRecords',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: nonNull('InvCategoryWhereUniqueInput'),
      tax_id: nonNull(intArg()),
    },
    async resolve(_root, args, ctx: Context) {
      return await ctx.prisma.invProduct.updateMany({
        data: {
          VATRate_id: {
            set: args.tax_id,
          },
        },
        where: {
          category_id: {
            equals: args.where.id,
          },
          company_id: {
            equals: ctx.authenticated.company,
          },
        },
      })
    },
  }
)
