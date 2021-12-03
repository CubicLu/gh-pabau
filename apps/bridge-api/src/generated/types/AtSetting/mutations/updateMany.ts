import { mutationField, nonNull } from 'nexus'

export const AtSettingUpdateManyMutation = mutationField(
  'updateManyAtSetting',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('AtSettingUpdateManyMutationInput'),
      where: 'AtSettingWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.atSetting.updateMany(args as any)
    },
  },
)
