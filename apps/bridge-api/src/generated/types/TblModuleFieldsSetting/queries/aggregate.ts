import { queryField, list } from 'nexus'

export const TblModuleFieldsSettingAggregateQuery = queryField(
  'aggregateTblModuleFieldsSetting',
  {
    type: 'AggregateTblModuleFieldsSetting',
    args: {
      where: 'TblModuleFieldsSettingWhereInput',
      orderBy: list('TblModuleFieldsSettingOrderByWithRelationInput'),
      cursor: 'TblModuleFieldsSettingWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.tblModuleFieldsSetting.aggregate({
        ...args,
        ...select,
      }) as any
    },
  },
)
