import { queryField, list } from 'nexus'

export const InvCategoryAggregateQuery = queryField('aggregateInvCategory', {
  type: 'AggregateInvCategory',
  args: {
    where: 'InvCategoryWhereInput',
    orderBy: list('InvCategoryOrderByWithRelationInput'),
    cursor: 'InvCategoryWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.invCategory.aggregate({ ...args, ...select }) as any
  },
})
