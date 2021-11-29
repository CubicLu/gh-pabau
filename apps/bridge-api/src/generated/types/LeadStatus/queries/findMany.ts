import { queryField, nonNull, list } from 'nexus'

export const LeadStatusFindManyQuery = queryField('findManyLeadStatus', {
  type: nonNull(list(nonNull('LeadStatus'))),
  args: {
    where: 'LeadStatusWhereInput',
    orderBy: list('LeadStatusOrderByWithRelationInput'),
    cursor: 'LeadStatusWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('LeadStatusScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.leadStatus.findMany({
      ...args,
      ...select,
    })
  },
})
