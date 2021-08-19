import { mutationField, nonNull } from 'nexus'

export const LoyaltyPointsUpdateOneMutation = mutationField(
  'updateOneLoyaltyPoints',
  {
    type: nonNull('LoyaltyPoints'),
    args: {
      where: nonNull('LoyaltyPointsWhereUniqueInput'),
      data: nonNull('LoyaltyPointsUpdateInput'),
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
