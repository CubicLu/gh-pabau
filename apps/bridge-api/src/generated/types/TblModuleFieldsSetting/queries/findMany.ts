import { queryField, nonNull, list } from 'nexus'

export const TblModuleFieldsSettingFindManyQuery = queryField(
  'findManyTblModuleFieldsSetting',
  {
    type: nonNull(list(nonNull('TblModuleFieldsSetting'))),
    args: {
      where: 'TblModuleFieldsSettingWhereInput',
      orderBy: list('TblModuleFieldsSettingOrderByInput'),
      cursor: 'TblModuleFieldsSettingWhereUniqueInput',
      distinct: 'TblModuleFieldsSettingScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.tblModuleFieldsSetting.findMany({
        ...args,
        ...select,
      })
    },
  },
)
