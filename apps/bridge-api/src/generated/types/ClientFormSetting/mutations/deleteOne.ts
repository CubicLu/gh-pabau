import { mutationField, nonNull } from 'nexus'

export const ClientFormSettingDeleteOneMutation = mutationField(
  'deleteOneClientFormSetting',
  {
    type: 'ClientFormSetting',
    args: {
      where: nonNull('ClientFormSettingWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.clientFormSetting.delete({
        where,
        ...select,
      })
    },
  },
)
