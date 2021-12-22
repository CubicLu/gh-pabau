import { mutationField, nonNull } from 'nexus'

export const DiscountDisableLocationDeleteOneMutation = mutationField(
  'deleteOneDiscountDisableLocation',
  {
    type: 'DiscountDisableLocation',
    args: {
      where: nonNull('DiscountDisableLocationWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.discountDisableLocation.delete({
        where,
        ...select,
      })
    },
  },
)
