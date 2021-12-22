import { mutationField, nonNull } from 'nexus'

export const DiscountDisableServiceDeleteOneMutation = mutationField(
  'deleteOneDiscountDisableService',
  {
    type: 'DiscountDisableService',
    args: {
      where: nonNull('DiscountDisableServiceWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.discountDisableService.delete({
        where,
        ...select,
      })
    },
  },
)
