import { mutationField, nonNull } from 'nexus'

export const DiscountDisableProductDeleteOneMutation = mutationField(
  'deleteOneDiscountDisableProduct',
  {
    type: 'DiscountDisableProduct',
    args: {
      where: nonNull('DiscountDisableProductWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.discountDisableProduct.delete({
        where,
        ...select,
      })
    },
  },
)
