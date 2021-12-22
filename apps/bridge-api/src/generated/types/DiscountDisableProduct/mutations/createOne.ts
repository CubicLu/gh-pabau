import { mutationField, nonNull } from 'nexus'

export const DiscountDisableProductCreateOneMutation = mutationField(
  'createOneDiscountDisableProduct',
  {
    type: nonNull('DiscountDisableProduct'),
    args: {
      data: nonNull('DiscountDisableProductCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.discountDisableProduct.create({
        data,
        ...select,
      })
    },
  },
)
