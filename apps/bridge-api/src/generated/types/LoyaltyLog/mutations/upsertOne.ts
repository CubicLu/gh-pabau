import { mutationField, nonNull } from 'nexus'

export const LoyaltyLogUpsertOneMutation = mutationField(
  'upsertOneLoyaltyLog',
  {
    type: nonNull('LoyaltyLog'),
    args: {
      where: nonNull('LoyaltyLogWhereUniqueInput'),
      create: nonNull('LoyaltyLogCreateInput'),
      update: nonNull('LoyaltyLogUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.loyaltyLog.upsert({
        ...args,
        ...select,
      })
    },
  },
)
