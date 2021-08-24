import { mutationField, nonNull } from 'nexus'

export const CleverpinSettingUpdateManyMutation = mutationField(
  'updateManyCleverpinSetting',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'CleverpinSettingWhereInput',
      data: nonNull('CleverpinSettingUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.cleverpinSetting.updateMany(args as any)
    },
  },
)
