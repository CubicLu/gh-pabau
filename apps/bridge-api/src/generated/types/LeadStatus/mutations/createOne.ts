import { mutationField, nonNull } from 'nexus'

export const LeadStatusCreateOneMutation = mutationField(
  'createOneLeadStatus',
  {
    type: nonNull('LeadStatus'),
    args: {
      data: nonNull('LeadStatusCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.leadStatus.create({
        data,
        ...select,
      })
    },
  },
)
