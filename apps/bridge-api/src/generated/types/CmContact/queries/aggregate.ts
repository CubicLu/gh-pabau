import { queryField, list } from 'nexus'

export const CmContactAggregateQuery = queryField('aggregateCmContact', {
  type: 'AggregateCmContact',
  args: {
    where: 'CmContactWhereInput',
    orderBy: list('CmContactOrderByWithRelationInput'),
    cursor: 'CmContactWhereUniqueInput',
    distinct: 'CmContactScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.cmContact.aggregate({ ...args, ...select }) as any
  },
})
