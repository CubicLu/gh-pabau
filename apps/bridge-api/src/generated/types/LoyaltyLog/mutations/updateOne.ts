import { mutationField, nonNull } from 'nexus'

export const LoyaltyLogUpdateOneMutation = mutationField(
  'updateOneLoyaltyLog',
  {
    type: nonNull('LoyaltyLog'),
    args: {
      where: nonNull('LoyaltyLogWhereUniqueInput'),
      data: nonNull('LoyaltyLogUpdateInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.loyaltyLog.update({
        where,
        data,
        ...select,
      })
    },
  },
)
