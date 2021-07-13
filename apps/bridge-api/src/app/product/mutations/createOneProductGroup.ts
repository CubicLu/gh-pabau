import { mutationField, nonNull, list, intArg } from 'nexus'
import { Context } from '../../../context'

export const ServicesMasterCategoryCreateOneMutation = mutationField(
  'createOneServicesMasterCategory',
  {
    type: nonNull('ServicesMasterCategory'),
    args: {
      data: nonNull('ServicesMasterCategoryCreateInput'),
      categories: list(intArg()),
    },
    async resolve(_parent, { data, categories }, ctx: Context) {
      const productGroup = await ctx.prisma.servicesMasterCategory.create({
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
