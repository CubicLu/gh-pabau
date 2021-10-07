import { queryField, list } from 'nexus'

export const CmCaseAggregateQuery = queryField('aggregateCmCase', {
  type: 'AggregateCmCase',
  args: {
    where: 'CmCaseWhereInput',
    orderBy: list('CmCaseOrderByWithRelationInput'),
    cursor: 'CmCaseWhereUniqueInput',
    distinct: 'CmCaseScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.cmCase.aggregate({ ...args, ...select }) as any
  },
})
