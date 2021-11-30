import { mutationField, nonNull } from 'nexus'

export const LoyaltyPointsUpdateOneMutation = mutationField(
  'updateOneLoyaltyPoints',
  {
    type: nonNull('LoyaltyPoints'),
    args: {
      data: nonNull('LoyaltyPointsUpdateInput'),
      where: nonNull('LoyaltyPointsWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.loyaltyPoints.update({
        where,
        data,
        ...select,
      })
    },
  },
)
