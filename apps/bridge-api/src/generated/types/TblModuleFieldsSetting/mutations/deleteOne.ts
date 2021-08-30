import { mutationField, nonNull } from 'nexus'

export const TblModuleFieldsSettingDeleteOneMutation = mutationField(
  'deleteOneTblModuleFieldsSetting',
  {
    type: 'TblModuleFieldsSetting',
    args: {
      where: nonNull('TblModuleFieldsSettingWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.tblModuleFieldsSetting.delete({
        where,
        ...select,
      })
    },
  },
)
