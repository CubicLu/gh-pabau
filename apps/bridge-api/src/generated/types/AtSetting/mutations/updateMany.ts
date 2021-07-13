import { mutationField, nonNull } from 'nexus'

export const AtSettingUpdateManyMutation = mutationField(
  'updateManyAtSetting',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'AtSettingWhereInput',
      data: nonNull('AtSettingUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.atSetting.updateMany(args as any)
    },
  },
)
