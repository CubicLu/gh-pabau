import { queryField, list } from 'nexus'

export const LeadStatusAggregateQuery = queryField('aggregateLeadStatus', {
  type: 'AggregateLeadStatus',
  args: {
    where: 'LeadStatusWhereInput',
    orderBy: list('LeadStatusOrderByWithRelationInput'),
    cursor: 'LeadStatusWhereUniqueInput',
    distinct: 'LeadStatusScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.leadStatus.aggregate({ ...args, ...select }) as any
  },
})
