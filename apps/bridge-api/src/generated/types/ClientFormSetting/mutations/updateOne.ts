import { mutationField, nonNull } from 'nexus'

export const ClientFormSettingUpdateOneMutation = mutationField(
  'updateOneClientFormSetting',
  {
    type: nonNull('ClientFormSetting'),
    args: {
      data: nonNull('ClientFormSettingUpdateInput'),
      where: nonNull('ClientFormSettingWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.clientFormSetting.update({
        where,
        data,
        ...select,
      })
    },
  },
)
