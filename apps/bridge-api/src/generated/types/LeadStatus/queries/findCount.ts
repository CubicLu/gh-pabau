import { queryField, nonNull, list } from 'nexus'

export const LeadStatusFindCountQuery = queryField('findManyLeadStatusCount', {
  type: nonNull('Int'),
  args: {
    where: 'LeadStatusWhereInput',
    orderBy: list('LeadStatusOrderByWithRelationInput'),
    cursor: 'LeadStatusWhereUniqueInput',
    distinct: 'LeadStatusScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.leadStatus.count(args as any)
  },
})
