import { mutationField, nonNull } from 'nexus'

export const LeadStatusUpdateOneMutation = mutationField(
  'updateOneLeadStatus',
  {
    type: nonNull('LeadStatus'),
    args: {
      data: nonNull('LeadStatusUpdateInput'),
      where: nonNull('LeadStatusWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.leadStatus.update({
        where,
        data,
        ...select,
      })
    },
  },
)
