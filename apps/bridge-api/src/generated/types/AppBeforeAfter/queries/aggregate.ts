import { queryField, list } from 'nexus'

export const AppBeforeAfterAggregateQuery = queryField(
  'aggregateAppBeforeAfter',
  {
    type: 'AggregateAppBeforeAfter',
    args: {
      where: 'AppBeforeAfterWhereInput',
      orderBy: list('AppBeforeAfterOrderByWithRelationInput'),
      cursor: 'AppBeforeAfterWhereUniqueInput',
      distinct: 'AppBeforeAfterScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.appBeforeAfter.aggregate({ ...args, ...select }) as any
    },
  },
)
