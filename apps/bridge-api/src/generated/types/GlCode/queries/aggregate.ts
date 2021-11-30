import { queryField, list } from 'nexus'

export const GlCodeAggregateQuery = queryField('aggregateGlCode', {
  type: 'AggregateGlCode',
  args: {
    where: 'GlCodeWhereInput',
    orderBy: list('GlCodeOrderByWithRelationInput'),
    cursor: 'GlCodeWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.glCode.aggregate({ ...args, ...select }) as any
  },
})
