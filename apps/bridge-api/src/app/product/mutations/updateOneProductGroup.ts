import { mutationField, nonNull, list, intArg } from 'nexus'
import { Context } from '../../../context'

export const ServicesMasterCategoryUpdateOneMutation = mutationField(
  'updateOneServicesMasterCategory',
  {
    type: nonNull('ServicesMasterCategory'),
    args: {
      where: nonNull('ServicesMasterCategoryWhereUniqueInput'),
      data: nonNull('ServicesMasterCategoryUpdateInput'),
      categories: list(intArg()),
    },
    async resolve(_parent, { data, where, categories }, ctx: Context) {
      const productGroup = await ctx.prisma.servicesMasterCategory.update({
        where,
        data: {
          ...data,
          Company: {
            connect: { id: ctx.authenticated.company },
          },
        },
        ...ctx.select,
      })
      if (categories) {
        await ctx.prisma.invCategory.updateMany({
          where: {
            id: {
              in: categories,
            },
            Company: {
              id: {
                equals: ctx.authenticated.company,
              },
            },
          },
          data: {
            master_cat_id: {
              set: productGroup.id,
            },
          },
        })
      }
      return productGroup
    },
  }
)
