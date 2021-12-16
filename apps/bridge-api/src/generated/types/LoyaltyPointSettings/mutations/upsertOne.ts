import { mutationField, nonNull } from 'nexus'

export const LoyaltyPointSettingsUpsertOneMutation = mutationField(
  'upsertOneLoyaltyPointSettings',
  {
    type: nonNull('LoyaltyPointSettings'),
    args: {
      where: nonNull('LoyaltyPointSettingsWhereUniqueInput'),
      create: nonNull('LoyaltyPointSettingsCreateInput'),
      update: nonNull('LoyaltyPointSettingsUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.loyaltyPointSettings.upsert({
        ...args,
        ...select,
      })
    },
  },
)
