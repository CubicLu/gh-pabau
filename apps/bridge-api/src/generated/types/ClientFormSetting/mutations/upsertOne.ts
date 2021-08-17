import { mutationField, nonNull } from 'nexus'

export const ClientFormSettingUpsertOneMutation = mutationField(
  'upsertOneClientFormSetting',
  {
    type: nonNull('ClientFormSetting'),
    args: {
      where: nonNull('ClientFormSettingWhereUniqueInput'),
      create: nonNull('ClientFormSettingCreateInput'),
      update: nonNull('ClientFormSettingUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.clientFormSetting.upsert({
        ...args,
        ...select,
      })
    },
  },
)
