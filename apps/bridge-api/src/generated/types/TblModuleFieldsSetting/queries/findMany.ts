import { queryField, nonNull, list } from 'nexus'

export const TblModuleFieldsSettingFindManyQuery = queryField(
  'findManyTblModuleFieldsSetting',
  {
    type: nonNull(list(nonNull('TblModuleFieldsSetting'))),
    args: {
      where: 'TblModuleFieldsSettingWhereInput',
      orderBy: list('TblModuleFieldsSettingOrderByWithRelationInput'),
      cursor: 'TblModuleFieldsSettingWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('TblModuleFieldsSettingScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.tblModuleFieldsSetting.findMany({
        ...args,
        ...select,
      })
    },
  },
)
