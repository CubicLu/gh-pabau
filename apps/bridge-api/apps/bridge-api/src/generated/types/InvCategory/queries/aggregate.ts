import { queryField, list } from 'nexus'

export const InvCategoryAggregateQuery = queryField('aggregateInvCategory', {
  type: 'AggregateInvCategory',
  args: {
    where: 'InvCategoryWhereInput',
    orderBy: list('InvCategoryOrderByWithRelationInput'),
    cursor: 'InvCategoryWhereUniqueInput',
    distinct: 'InvCategoryScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.invCategory.aggregate({ ...args, ...select }) as any
  },
})
