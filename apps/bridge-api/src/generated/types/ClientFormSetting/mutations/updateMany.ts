import { mutationField, nonNull } from 'nexus'

export const ClientFormSettingUpdateManyMutation = mutationField(
  'updateManyClientFormSetting',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'ClientFormSettingWhereInput',
      data: nonNull('ClientFormSettingUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.clientFormSetting.updateMany(args as any)
    },
  },
)
