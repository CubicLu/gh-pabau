import { mutationField, nonNull } from 'nexus'

export const ClientFormSettingUpdateManyMutation = mutationField(
  'updateManyClientFormSetting',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('ClientFormSettingUpdateManyMutationInput'),
      where: 'ClientFormSettingWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.clientFormSetting.updateMany(args as any)
    },
  },
)
