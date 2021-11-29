import { queryField, list } from 'nexus'

export const CmLeadAggregateQuery = queryField('aggregateCmLead', {
  type: 'AggregateCmLead',
  args: {
    where: 'CmLeadWhereInput',
    orderBy: list('CmLeadOrderByWithRelationInput'),
    cursor: 'CmLeadWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.cmLead.aggregate({ ...args, ...select }) as any
  },
})
