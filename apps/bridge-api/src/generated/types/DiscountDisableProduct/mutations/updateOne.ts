import { mutationField, nonNull } from 'nexus'

export const DiscountDisableProductUpdateOneMutation = mutationField(
  'updateOneDiscountDisableProduct',
  {
    type: nonNull('DiscountDisableProduct'),
    args: {
      data: nonNull('DiscountDisableProductUpdateInput'),
      where: nonNull('DiscountDisableProductWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.discountDisableProduct.update({
        where,
        data,
        ...select,
      })
    },
  },
)
