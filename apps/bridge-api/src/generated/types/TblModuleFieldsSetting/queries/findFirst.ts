import { queryField, list } from 'nexus'

export const TblModuleFieldsSettingFindFirstQuery = queryField(
  'findFirstTblModuleFieldsSetting',
  {
    type: 'TblModuleFieldsSetting',
    args: {
      where: 'TblModuleFieldsSettingWhereInput',
      orderBy: list('TblModuleFieldsSettingOrderByWithRelationInput'),
      cursor: 'TblModuleFieldsSettingWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('TblModuleFieldsSettingScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.tblModuleFieldsSetting.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
