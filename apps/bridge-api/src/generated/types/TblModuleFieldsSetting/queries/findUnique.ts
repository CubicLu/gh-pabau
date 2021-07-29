import { queryField, nonNull } from 'nexus'

export const TblModuleFieldsSettingFindUniqueQuery = queryField(
  'findUniqueTblModuleFieldsSetting',
  {
    type: 'TblModuleFieldsSetting',
    args: {
      where: nonNull('TblModuleFieldsSettingWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.tblModuleFieldsSetting.findUnique({
        where,
        ...select,
      })
    },
  },
)
