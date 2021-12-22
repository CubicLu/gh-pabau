import { mutationField, nonNull } from 'nexus'

export const DiscountDisableLocationUpsertOneMutation = mutationField(
  'upsertOneDiscountDisableLocation',
  {
    type: nonNull('DiscountDisableLocation'),
    args: {
      where: nonNull('DiscountDisableLocationWhereUniqueInput'),
      create: nonNull('DiscountDisableLocationCreateInput'),
      update: nonNull('DiscountDisableLocationUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.discountDisableLocation.upsert({
        ...args,
        ...select,
      })
    },
  },
)
