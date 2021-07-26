import { mutationField, nonNull } from 'nexus'

export const LoyaltyPointUpsertOneMutation = mutationField(
  'upsertOneLoyaltyPoint',
  {
    type: nonNull('LoyaltyPoint'),
    args: {
      where: nonNull('LoyaltyPointWhereUniqueInput'),
      create: nonNull('LoyaltyPointCreateInput'),
      update: nonNull('LoyaltyPointUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.loyaltyPoint.upsert({
        ...args,
        ...select,
      })
    },
  },
)
