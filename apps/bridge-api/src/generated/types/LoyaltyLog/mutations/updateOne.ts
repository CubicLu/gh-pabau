import { mutationField, nonNull } from 'nexus'

export const LoyaltyLogUpdateOneMutation = mutationField(
  'updateOneLoyaltyLog',
  {
    type: nonNull('LoyaltyLog'),
    args: {
      data: nonNull('LoyaltyLogUpdateInput'),
      where: nonNull('LoyaltyLogWhereUniqueInput'),
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
