import { queryField, list } from 'nexus'

export const PageAggregateQuery = queryField('aggregatePage', {
  type: 'AggregatePage',
  args: {
    where: 'PageWhereInput',
    orderBy: list('PageOrderByInput'),
    cursor: 'PageWhereUniqueInput',
    distinct: 'PageScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.page.aggregate({ ...args, ...select }) as any
  },
})
