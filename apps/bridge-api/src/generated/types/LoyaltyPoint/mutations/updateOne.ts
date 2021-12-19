import { mutationField, nonNull } from 'nexus'

export const LoyaltyPointUpdateOneMutation = mutationField(
  'updateOneLoyaltyPoint',
  {
    type: nonNull('LoyaltyPoint'),
    args: {
      data: nonNull('LoyaltyPointUpdateInput'),
      where: nonNull('LoyaltyPointWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.loyaltyPoint.update({
        where,
        data,
        ...select,
      })
    },
  },
)
