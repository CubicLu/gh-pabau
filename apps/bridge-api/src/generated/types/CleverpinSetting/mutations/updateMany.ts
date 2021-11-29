import { mutationField, nonNull } from 'nexus'

export const CleverpinSettingUpdateManyMutation = mutationField(
  'updateManyCleverpinSetting',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('CleverpinSettingUpdateManyMutationInput'),
      where: 'CleverpinSettingWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.cleverpinSetting.updateMany(args as any)
    },
  },
)
