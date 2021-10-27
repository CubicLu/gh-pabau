import { queryField, list } from 'nexus'

export const AcLogUrlAggregateQuery = queryField('aggregateAcLogUrl', {
  type: 'AggregateAcLogUrl',
  args: {
    where: 'AcLogUrlWhereInput',
    orderBy: list('AcLogUrlOrderByWithRelationInput'),
    cursor: 'AcLogUrlWhereUniqueInput',
    distinct: 'AcLogUrlScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.acLogUrl.aggregate({ ...args, ...select }) as any
  },
})
