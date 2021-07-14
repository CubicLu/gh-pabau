import { queryField, list } from 'nexus'

export const CleverpinSettingAggregateQuery = queryField(
  'aggregateCleverpinSetting',
  {
    type: 'AggregateCleverpinSetting',
    args: {
      where: 'CleverpinSettingWhereInput',
      orderBy: list('CleverpinSettingOrderByInput'),
      cursor: 'CleverpinSettingWhereUniqueInput',
      distinct: 'CleverpinSettingScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cleverpinSetting.aggregate({ ...args, ...select }) as any
    },
  },
)
