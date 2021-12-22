import { mutationField, nonNull } from 'nexus'

export const DiscountDisableServiceUpsertOneMutation = mutationField(
  'upsertOneDiscountDisableService',
  {
    type: nonNull('DiscountDisableService'),
    args: {
      where: nonNull('DiscountDisableServiceWhereUniqueInput'),
      create: nonNull('DiscountDisableServiceCreateInput'),
      update: nonNull('DiscountDisableServiceUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.discountDisableService.upsert({
        ...args,
        ...select,
      })
    },
  },
)
