import { queryField, nonNull, list } from 'nexus'

export const LeadStatusFindCountQuery = queryField('findManyLeadStatusCount', {
  type: nonNull('Int'),
  args: {
    where: 'LeadStatusWhereInput',
    orderBy: list('LeadStatusOrderByWithRelationInput'),
    cursor: 'LeadStatusWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('LeadStatusScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.leadStatus.count(args as any)
  },
})
