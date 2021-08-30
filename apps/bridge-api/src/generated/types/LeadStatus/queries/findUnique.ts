import { queryField, nonNull } from 'nexus'

export const LeadStatusFindUniqueQuery = queryField('findUniqueLeadStatus', {
  type: 'LeadStatus',
  args: {
    where: nonNull('LeadStatusWhereUniqueInput'),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.leadStatus.findUnique({
      where,
      ...select,
    })
  },
})
