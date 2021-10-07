import { queryField, list } from 'nexus'

export const AtSettingAggregateQuery = queryField('aggregateAtSetting', {
  type: 'AggregateAtSetting',
  args: {
    where: 'AtSettingWhereInput',
    orderBy: list('AtSettingOrderByWithRelationInput'),
    cursor: 'AtSettingWhereUniqueInput',
    distinct: 'AtSettingScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.atSetting.aggregate({ ...args, ...select }) as any
  },
})
