import { mutationField, nonNull } from 'nexus'

export const LoyaltyPointsUpsertOneMutation = mutationField(
  'upsertOneLoyaltyPoints',
  {
    type: nonNull('LoyaltyPoints'),
    args: {
      where: nonNull('LoyaltyPointsWhereUniqueInput'),
      create: nonNull('LoyaltyPointsCreateInput'),
      update: nonNull('LoyaltyPointsUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.loyaltyPoints.upsert({
        ...args,
        ...select,
      })
    },
  },
)
