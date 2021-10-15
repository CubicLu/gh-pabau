import { queryField, list } from 'nexus'

export const GlCodeAggregateQuery = queryField('aggregateGlCode', {
  type: 'AggregateGlCode',
  args: {
    where: 'GlCodeWhereInput',
    orderBy: list('GlCodeOrderByInput'),
    cursor: 'GlCodeWhereUniqueInput',
    distinct: 'GlCodeScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.glCode.aggregate({ ...args, ...select }) as any
  },
})
