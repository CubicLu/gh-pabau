import { mutationField, nonNull } from 'nexus'

export const LeadStatusUpdateOneMutation = mutationField(
  'updateOneLeadStatus',
  {
    type: nonNull('LeadStatus'),
    args: {
      where: nonNull('LeadStatusWhereUniqueInput'),
      data: nonNull('LeadStatusUpdateInput'),
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
