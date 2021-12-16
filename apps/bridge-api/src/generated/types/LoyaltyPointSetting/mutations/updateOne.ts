import { mutationField, nonNull } from 'nexus'

export const LoyaltyPointSettingUpdateOneMutation = mutationField(
  'updateOneLoyaltyPointSetting',
  {
    type: nonNull('LoyaltyPointSetting'),
    args: {
      data: nonNull('LoyaltyPointSettingUpdateInput'),
      where: nonNull('LoyaltyPointSettingWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.loyaltyPointSetting.update({
        where,
        data,
        ...select,
      })
    },
  },
)
