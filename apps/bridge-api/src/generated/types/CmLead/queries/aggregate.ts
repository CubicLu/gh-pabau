import { queryField, list } from 'nexus'

export const CmLeadAggregateQuery = queryField('aggregateCmLead', {
  type: 'AggregateCmLead',
  args: {
    where: 'CmLeadWhereInput',
    orderBy: list('CmLeadOrderByInput'),
    cursor: 'CmLeadWhereUniqueInput',
    distinct: 'CmLeadScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.cmLead.aggregate({ ...args, ...select }) as any
  },
})
