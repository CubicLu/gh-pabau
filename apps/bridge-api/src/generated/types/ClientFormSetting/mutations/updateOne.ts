import { mutationField, nonNull } from 'nexus'

export const ClientFormSettingUpdateOneMutation = mutationField(
  'updateOneClientFormSetting',
  {
    type: nonNull('ClientFormSetting'),
    args: {
      where: nonNull('ClientFormSettingWhereUniqueInput'),
      data: nonNull('ClientFormSettingUpdateInput'),
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
