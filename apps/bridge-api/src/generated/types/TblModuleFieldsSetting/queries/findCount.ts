import { queryField, nonNull, list } from 'nexus'

export const TblModuleFieldsSettingFindCountQuery = queryField(
  'findManyTblModuleFieldsSettingCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'TblModuleFieldsSettingWhereInput',
      orderBy: list('TblModuleFieldsSettingOrderByWithRelationInput'),
      cursor: 'TblModuleFieldsSettingWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('TblModuleFieldsSettingScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.tblModuleFieldsSetting.count(args as any)
    },
  },
)
