import { queryField, list } from 'nexus'

export const CmContactAggregateQuery = queryField('aggregateCmContact', {
  type: 'AggregateCmContact',
  args: {
    where: 'CmContactWhereInput',
    orderBy: list('CmContactOrderByWithRelationInput'),
    cursor: 'CmContactWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.cmContact.aggregate({ ...args, ...select }) as any
  },
})
