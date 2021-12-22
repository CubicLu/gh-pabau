import { mutationField, nonNull } from 'nexus'

export const DiscountDisableProductUpsertOneMutation = mutationField(
  'upsertOneDiscountDisableProduct',
  {
    type: nonNull('DiscountDisableProduct'),
    args: {
      where: nonNull('DiscountDisableProductWhereUniqueInput'),
      create: nonNull('DiscountDisableProductCreateInput'),
      update: nonNull('DiscountDisableProductUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.discountDisableProduct.upsert({
        ...args,
        ...select,
      })
    },
  },
)
