import { queryField, list } from 'nexus'

export const LeadStatusFindFirstQuery = queryField('findFirstLeadStatus', {
  type: 'LeadStatus',
  args: {
    where: 'LeadStatusWhereInput',
    orderBy: list('LeadStatusOrderByWithRelationInput'),
    cursor: 'LeadStatusWhereUniqueInput',
    distinct: 'LeadStatusScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.leadStatus.findFirst({
      ...args,
      ...select,
    })
  },
})
