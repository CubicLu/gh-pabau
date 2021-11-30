import { queryField, list } from 'nexus'

export const CmCaseAggregateQuery = queryField('aggregateCmCase', {
  type: 'AggregateCmCase',
  args: {
    where: 'CmCaseWhereInput',
    orderBy: list('CmCaseOrderByWithRelationInput'),
    cursor: 'CmCaseWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.cmCase.aggregate({ ...args, ...select }) as any
  },
})
