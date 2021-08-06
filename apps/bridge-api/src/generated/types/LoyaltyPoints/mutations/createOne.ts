import { mutationField, nonNull } from 'nexus'

export const LoyaltyPointsCreateOneMutation = mutationField(
  'createOneLoyaltyPoints',
  {
    type: nonNull('LoyaltyPoints'),
    args: {
      data: nonNull('LoyaltyPointsCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.loyaltyPoints.create({
        data,
        ...select,
      })
    },
  },
)
