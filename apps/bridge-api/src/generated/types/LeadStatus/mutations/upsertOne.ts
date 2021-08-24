import { mutationField, nonNull } from 'nexus'

export const LeadStatusUpsertOneMutation = mutationField(
  'upsertOneLeadStatus',
  {
    type: nonNull('LeadStatus'),
    args: {
      where: nonNull('LeadStatusWhereUniqueInput'),
      create: nonNull('LeadStatusCreateInput'),
      update: nonNull('LeadStatusUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.leadStatus.upsert({
        ...args,
        ...select,
      })
    },
  },
)
