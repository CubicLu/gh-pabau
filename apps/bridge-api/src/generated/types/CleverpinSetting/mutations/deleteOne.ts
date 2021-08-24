import { mutationField, nonNull } from 'nexus'

export const CleverpinSettingDeleteOneMutation = mutationField(
  'deleteOneCleverpinSetting',
  {
    type: 'CleverpinSetting',
    args: {
      where: nonNull('CleverpinSettingWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.cleverpinSetting.delete({
        where,
        ...select,
      })
    },
  },
)
