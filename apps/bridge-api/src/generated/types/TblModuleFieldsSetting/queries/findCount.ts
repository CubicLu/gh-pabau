import { queryField, nonNull, list } from 'nexus'

export const TblModuleFieldsSettingFindCountQuery = queryField(
  'findManyTblModuleFieldsSettingCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'TblModuleFieldsSettingWhereInput',
      orderBy: list('TblModuleFieldsSettingOrderByInput'),
      cursor: 'TblModuleFieldsSettingWhereUniqueInput',
      distinct: 'TblModuleFieldsSettingScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.tblModuleFieldsSetting.count(args as any)
    },
  },
)
