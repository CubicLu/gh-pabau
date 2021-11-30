import { queryField, list } from 'nexus'

export const AcLogActionAggregateQuery = queryField('aggregateAcLogAction', {
  type: 'AggregateAcLogAction',
  args: {
    where: 'AcLogActionWhereInput',
    orderBy: list('AcLogActionOrderByWithRelationInput'),
    cursor: 'AcLogActionWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.acLogAction.aggregate({ ...args, ...select }) as any
  },
})
