import { queryField, nonNull, list } from 'nexus'

export const LeadStatusFindManyQuery = queryField('findManyLeadStatus', {
  type: nonNull(list(nonNull('LeadStatus'))),
  args: {
    where: 'LeadStatusWhereInput',
    orderBy: list('LeadStatusOrderByInput'),
    cursor: 'LeadStatusWhereUniqueInput',
    distinct: 'LeadStatusScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.leadStatus.findMany({
      ...args,
      ...select,
    })
  },
})
