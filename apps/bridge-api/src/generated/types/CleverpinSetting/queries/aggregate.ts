import { queryField, list } from 'nexus'

export const CleverpinSettingAggregateQuery = queryField(
  'aggregateCleverpinSetting',
  {
    type: 'AggregateCleverpinSetting',
    args: {
      where: 'CleverpinSettingWhereInput',
      orderBy: list('CleverpinSettingOrderByWithRelationInput'),
      cursor: 'CleverpinSettingWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cleverpinSetting.aggregate({ ...args, ...select }) as any
    },
  },
)
