import { queryField, list } from 'nexus'

export const ConnectThemeAggregateQuery = queryField('aggregateConnectTheme', {
  type: 'AggregateConnectTheme',
  args: {
    where: 'ConnectThemeWhereInput',
    orderBy: list('ConnectThemeOrderByWithRelationInput'),
    cursor: 'ConnectThemeWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.connectTheme.aggregate({ ...args, ...select }) as any
  },
})
