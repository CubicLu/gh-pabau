import { queryField, list } from 'nexus'

export const LeadStatusFindFirstQuery = queryField('findFirstLeadStatus', {
  type: 'LeadStatus',
  args: {
    where: 'LeadStatusWhereInput',
    orderBy: list('LeadStatusOrderByWithRelationInput'),
    cursor: 'LeadStatusWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('LeadStatusScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.leadStatus.findFirst({
      ...args,
      ...select,
    })
  },
})
