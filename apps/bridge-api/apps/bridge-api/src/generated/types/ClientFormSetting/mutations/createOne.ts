import { mutationField, nonNull } from 'nexus'

export const ClientFormSettingCreateOneMutation = mutationField(
  'createOneClientFormSetting',
  {
    type: nonNull('ClientFormSetting'),
    args: {
      data: nonNull('ClientFormSettingCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.clientFormSetting.create({
        data,
        ...select,
      })
    },
  },
)
