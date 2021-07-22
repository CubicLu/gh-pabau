import { mutationField, nonNull } from 'nexus'

export const LoyaltyPointUpdateOneMutation = mutationField(
  'updateOneLoyaltyPoint',
  {
    type: nonNull('LoyaltyPoint'),
    args: {
      where: nonNull('LoyaltyPointWhereUniqueInput'),
      data: nonNull('LoyaltyPointUpdateInput'),
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
